/* The Davis Academy · 8th Grade Trip to Israel 2027 · interactive map
   Data: data/trip.json (itinerary), data/routes.json (tools/routes.py), data/photos.json (tools/photos.py)
   Map: MapLibre GL JS 5 with Esri satellite imagery and AWS terrain tiles. */
(async function () {
  'use strict';

  // ---------------------------------------------------------------- constants
  const DAY_COLORS = { 1: '#F6F5F0', 2: '#74D2E7', 3: '#B6D77B', 4: '#46D39A', 5: '#FFC843', 6: '#FF9F45',
    7: '#FF6F61', 8: '#F27BB5', 9: '#B892FF', 10: '#6F95FF', 11: '#3EE0D2', 12: '#F6F5F0' };
  const DEF_ZOOM = { site: 15.4, nature: 14, view: 14.6, meal: 16, evening: 15, activity: 14.2, hotel: 13.4, airport: 13.2, memorial: 15 };
  const GEO_LABELS = [
    { name: 'Mediterranean Sea', at: [34.38, 32.45] },
    { name: 'Sea of Galilee', at: [35.585, 32.82] },
    { name: 'Negev Desert', at: [34.86, 30.82] },
    { name: 'Judean Desert', at: [35.27, 31.57] },
  ];
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // ?speed=1.5 plays the tour faster, ?speed=0.75 slower (handy for presenting or testing)
  const SPEED = clampSpeed(+new URLSearchParams(location.search).get('speed') || 1);
  function clampSpeed(v) { return Math.max(0.25, Math.min(20, v)); }

  // ---------------------------------------------------------------- helpers
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const isMobile = () => matchMedia('(max-width: 899px)').matches;
  const RAD = Math.PI / 180;
  function hav(a, b) {
    const la1 = a[1] * RAD, la2 = b[1] * RAD, dla = la2 - la1, dlo = (b[0] - a[0]) * RAD;
    const h = Math.sin(dla / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dlo / 2) ** 2;
    return 6371 * 2 * Math.asin(Math.sqrt(h));
  }
  function bearingOf(a, b) {
    const p1 = a[1] * RAD, p2 = b[1] * RAD, dl = (b[0] - a[0]) * RAD;
    const y = Math.sin(dl) * Math.cos(p2), x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
    return (Math.atan2(y, x) / RAD + 360) % 360;
  }
  function arc(a, b, n = 180) { // great-circle points
    const v = ([lo, la]) => [Math.cos(la * RAD) * Math.cos(lo * RAD), Math.cos(la * RAD) * Math.sin(lo * RAD), Math.sin(la * RAD)];
    const A = v(a), B = v(b), w = Math.acos(clamp(A[0] * B[0] + A[1] * B[1] + A[2] * B[2], -1, 1)), s = Math.sin(w), out = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, k1 = Math.sin((1 - t) * w) / s, k2 = Math.sin(t * w) / s;
      const p = [k1 * A[0] + k2 * B[0], k1 * A[1] + k2 * B[1], k1 * A[2] + k2 * B[2]];
      out.push([Math.atan2(p[1], p[0]) / RAD, Math.atan2(p[2], Math.hypot(p[0], p[1])) / RAD]);
    }
    return out;
  }
  function measure(c) { const cum = [0]; for (let i = 1; i < c.length; i++) cum.push(cum[i - 1] + hav(c[i - 1], c[i])); return cum; }
  function sliceLine(c, cum, t) {
    const target = cum[cum.length - 1] * t;
    let i = 1;
    while (i < cum.length && cum[i] < target) i++;
    if (i >= cum.length) return { line: c.slice(), head: c[c.length - 1], i: c.length - 1 };
    const seg = cum[i] - cum[i - 1], f = seg ? (target - cum[i - 1]) / seg : 0;
    const p = [lerp(c[i - 1][0], c[i][0], f), lerp(c[i - 1][1], c[i][1], f)];
    return { line: [...c.slice(0, i), p], head: p, i };
  }
  function boundsOf(pts) {
    const b = new maplibregl.LngLatBounds(pts[0], pts[0]);
    pts.forEach((p) => b.extend(p));
    return b;
  }
  const fmtDate = (iso, opts) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { timeZone: 'UTC', ...opts });
  const longDate = (d) => fmtDate(d.date, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const shortDate = (d) => fmtDate(d.date, { weekday: 'short', month: 'short', day: 'numeric' });
  const words = (s) => String(s || '').trim().split(/\s+/).length;

  const ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>',
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2.2v14H6zM19 5.5v13L9.6 12z" fill="currentColor"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.8 5H18v14h-2.2zM5 5.5v13l9.4-6.5z" fill="currentColor"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    fwd: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 14.8A8 8 0 0 1 9.2 4.5a8 8 0 1 0 10.3 10.3z" fill="currentColor"/></svg>',
    meal: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M16 3c-2 1.5-2.5 4-2.5 7h2.5v11" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    bed: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5M7.5 11.5a1.8 1.8 0 1 0 0-.01" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" fill="currentColor"/></svg>',
    route: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="18" r="2.4" fill="currentColor"/><circle cx="18" cy="6" r="2.4" fill="currentColor"/><path d="M8 17c6 0 2-9 8-10" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="2.5 2.5" stroke-linecap="round"/></svg>',
    plane: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c.9 0 1.5.9 1.5 2V10l7 4.2v2l-7-2.2v4.6l2 1.5v1.6L12 20.8l-3.5.9v-1.6l2-1.5V14l-7 2.2v-2l7-4.2V4.5c0-1.1.6-2 1.5-2z" fill="currentColor"/></svg>',
    spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  };
  const kindIcon = (it) => ({ hotel: ICON.bed, evening: ICON.moon, meal: ICON.meal, flight: ICON.plane, airport: ICON.plane }[it.kind] || ICON.spark);

  // ---------------------------------------------------------------- data
  async function getJSON(u) { const r = await fetch(u, { cache: 'no-cache' }); if (!r.ok) throw new Error(u + ' ' + r.status); return r.json(); }

  // ---------------------------------------------------------------- passphrase lock
  // The published site has only data/trip.enc.json (built by tools/publish.mjs): the trip, routes and
  // photo list, AES-GCM encrypted with a key derived from the passphrase. We decrypt it here, in the
  // browser. In the project folder the plain data/*.json files load directly, with no lock.
  const KEY_STORE = 'israel2027-key';
  const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  const toB64 = (u8) => { let s = ''; u8.forEach((b) => (s += String.fromCharCode(b))); return btoa(s); };
  // must match normPass() in tools/publish.mjs: case, spaces, apostrophes and dash style don't matter
  const normPass = (s) => s.normalize('NFKC').toLowerCase().replace(/[’'`]/g, '').trim().replace(/[\s_\-–—]+/g, '-');
  async function decryptWith(raw, enc) {
    const key = await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt']);
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(enc.iv) }, key, b64(enc.ct));
    return JSON.parse(new TextDecoder().decode(pt));
  }
  async function keyFrom(pass, enc) {
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(normPass(pass)), 'PBKDF2', false, ['deriveBits']);
    return new Uint8Array(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: b64(enc.salt), iterations: enc.iter }, base, 256));
  }
  async function unlock(enc) {
    try { // a key remembered on this device from an earlier visit
      const saved = JSON.parse(localStorage.getItem(KEY_STORE) || 'null');
      if (saved && saved.salt === enc.salt) return await decryptWith(b64(saved.key), enc);
    } catch (e) { try { localStorage.removeItem(KEY_STORE); } catch (_) { /* storage blocked */ } }
    const lock = $('#lock'), form = $('#lock-form'), input = $('#lock-pass'), err = $('#lock-err'), btn = $('#lock-go');
    $('#loading').classList.add('done');
    document.body.classList.add('locked');
    lock.hidden = false;
    input.focus();
    return new Promise((resolve) => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!input.value.trim()) return;
        btn.disabled = true; err.hidden = true; btn.textContent = 'Opening…';
        try {
          const raw = await keyFrom(input.value, enc);
          const data = await decryptWith(raw, enc);
          if ($('#lock-remember').checked) { try { localStorage.setItem(KEY_STORE, JSON.stringify({ salt: enc.salt, key: toB64(raw) })); } catch (_) { /* fine */ } }
          lock.hidden = true;
          document.body.classList.remove('locked');
          $('#loading').classList.remove('done');
          resolve(data);
        } catch (e2) {
          err.hidden = false; btn.disabled = false; btn.textContent = 'Open the map';
          input.select();
        }
      });
    });
  }

  let trip, routesData, photos, isLocked = false;
  try {
    const enc = await fetch('data/trip.enc.json', { cache: 'no-cache' }).then((r) => (r.ok ? r.json() : null)).catch(() => null);
    if (enc) {
      isLocked = true;
      if (!(window.crypto && crypto.subtle)) throw new Error('This browser cannot open the protected map.');
      const d = await unlock(enc);
      trip = d.trip; routesData = d.routes || { legs: [] }; photos = d.photos || {};
    } else {
      [trip, routesData, photos] = await Promise.all([
        getJSON('data/trip.json'),
        getJSON('data/routes.json').catch(() => ({ legs: [] })),
        getJSON('data/photos.json').catch(() => ({})),
      ]);
    }
  } catch (e) {
    $('#loading').classList.remove('done');
    $('#loading').innerHTML = '<p>Sorry, the trip information could not load. Please refresh the page.</p>';
    return;
  }
  // header details live in the (protected) data, not in the page itself
  $('.top-dates').textContent = trip.trip.dates;
  $('.top-run').innerHTML = `Run by <b>${esc(trip.trip.operator)}</b> · Led by ${esc(trip.trip.leader)}`;
  const days = trip.days;
  const bases = trip.bases;
  const items = [];
  days.forEach((d) => {
    d.color = DAY_COLORS[d.day];
    let n = 0;
    d.items.forEach((it) => {
      it.day = d.day; it.dayObj = d; it.gi = items.length;
      it.pos = it.coords || (it.base ? bases[it.base].coords : null);
      if (it.pin) it.num = ++n;
      items.push(it);
    });
    d.pinCount = n;
    d.pins = d.items.filter((i) => i.pin);
  });
  const byId = Object.fromEntries(items.map((i) => [i.id, i]));
  const TLV = (items.find((i) => i.kind === 'airport') || {}).pos;
  // photoFrom (in trip.json) borrows another stop's photo, e.g. lunch in a place we already visited
  function photoFor(it) {
    return photos[it.id] || (it.photoFrom && photos[it.photoFrom]) || (it.base && !it.coords ? photos['base-' + it.base] : null) || null;
  }
  const israelPts = items.filter((i) => i.pin).map((i) => i.pos);
  const legs = (routesData.legs || []).filter((l) => byId[l.to]).map((l) => ({ ...l, toGi: byId[l.to].gi, color: DAY_COLORS[l.day] }));
  // nights at each base, for the overview
  Object.entries(bases).forEach(([k, b]) => { b.key = k; b.days = days.filter((d) => d.base === k); });
  // area centroids for labels
  const areaPts = {};
  items.filter((i) => i.pin && i.area).forEach((i) => (areaPts[i.area] ||= []).push(i.pos));
  const areaCenter = Object.fromEntries(Object.entries(areaPts).map(([k, pts]) => [k, [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length]]));
  areaCenter.jerusalem = [35.2237, 31.7787];
  areaCenter.telaviv = [34.7745, 32.0700];

  // ---------------------------------------------------------------- map
  const map = new maplibregl.Map({
    container: 'map',
    style: {
      version: 8,
      sky: {
        'sky-color': '#0b3a6e', 'sky-horizon-blend': 0.55, 'horizon-color': '#cfe8f0', 'horizon-fog-blend': 0.6,
        'fog-color': '#d9ecf2', 'fog-ground-blend': 0.75, 'atmosphere-blend': ['interpolate', ['linear'], ['zoom'], 0, 1, 5, 0.9, 9, 0.2],
      },
      sources: {
        sat: {
          type: 'raster', tileSize: 256, maxzoom: 19,
          tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
          attribution: 'Imagery © <a href="https://www.esri.com/" target="_blank" rel="noopener">Esri</a>, Maxar, Earthstar Geographics, and the GIS User Community',
        },
        dem: {
          type: 'raster-dem', tileSize: 256, maxzoom: 14, encoding: 'terrarium',
          tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
          attribution: 'Terrain: <a href="https://registry.opendata.aws/terrain-tiles/" target="_blank" rel="noopener">Mapzen Terrain Tiles</a>',
        },
      },
      layers: [
        { id: 'bg', type: 'background', paint: { 'background-color': '#0b2a42' } },
        { id: 'sat', type: 'raster', source: 'sat', paint: { 'raster-saturation': -0.05, 'raster-contrast': 0.06, 'raster-fade-duration': 200 } },
      ],
    },
    center: [35.0, 31.7], zoom: 6.8, pitch: 0,
    maxPitch: 72,
    attributionControl: { compact: true, customAttribution: 'Routes: <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap</a> contributors, OSRM' },
    pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
    fadeDuration: 150,
  });
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
  map.on('error', (e) => console.warn('map:', e && e.error && e.error.message));
  await new Promise((res) => map.once('load', res));
  try { map.setTerrain({ source: 'dem', exaggeration: 1.35 }); } catch (e) { console.warn('terrain off', e); }
  const attrib = document.querySelector('.maplibregl-ctrl-attrib');
  if (attrib) attrib.classList.remove('maplibregl-compact-show');

  // arrows, one image per day colour
  function arrowImage(color) {
    const s = 44, c = document.createElement('canvas');
    c.width = c.height = s;
    const g = c.getContext('2d');
    g.translate(s / 2, s / 2);
    g.beginPath(); g.moveTo(-9, -11); g.lineTo(12, 0); g.lineTo(-9, 11); g.lineTo(-3.5, 0); g.closePath();
    g.lineJoin = 'round'; g.lineWidth = 5; g.strokeStyle = 'rgba(3,31,63,.92)'; g.stroke();
    g.fillStyle = color; g.fill();
    return g.getImageData(0, 0, s, s);
  }
  for (let d = 2; d <= 12; d++) map.addImage('arrow-' + d, arrowImage(DAY_COLORS[d]), { pixelRatio: 2 });

  const fc = (features) => ({ type: 'FeatureCollection', features });
  const legFeature = (l) => ({ type: 'Feature', properties: { day: l.day, color: l.color, mode: l.mode, toGi: l.toGi }, geometry: { type: 'LineString', coordinates: l.coords } });
  map.addSource('routes', { type: 'geojson', data: fc(legs.map(legFeature)) });
  const W = (a, b, c) => ['interpolate', ['linear'], ['zoom'], 5, a, 10, b, 15, c];
  const ROUTE_FILTERS = {
    'r-casing': ['==', ['get', 'mode'], 'bus'],
    'r-bus': ['==', ['get', 'mode'], 'bus'],
    'r-walk': ['==', ['get', 'mode'], 'walk'],
    'r-arrows': ['==', ['get', 'mode'], 'bus'],
  };
  map.addLayer({ id: 'r-casing', type: 'line', source: 'routes', filter: ROUTE_FILTERS['r-casing'], layout: { 'line-join': 'round', 'line-cap': 'round' }, paint: { 'line-color': '#031f3f', 'line-width': W(3.2, 6, 10), 'line-opacity': 0.55 } });
  map.addLayer({ id: 'r-bus', type: 'line', source: 'routes', filter: ROUTE_FILTERS['r-bus'], layout: { 'line-join': 'round', 'line-cap': 'round' }, paint: { 'line-color': ['get', 'color'], 'line-width': W(1.6, 3.2, 5.5) } });
  map.addLayer({ id: 'r-walk', type: 'line', source: 'routes', filter: ROUTE_FILTERS['r-walk'], layout: { 'line-join': 'round', 'line-cap': 'round' }, paint: { 'line-color': ['get', 'color'], 'line-width': W(1.6, 3.4, 6), 'line-dasharray': [0.1, 1.9] } });
  map.addLayer({
    id: 'r-arrows', type: 'symbol', source: 'routes', filter: ROUTE_FILTERS['r-arrows'], minzoom: 6,
    layout: {
      'symbol-placement': 'line', 'symbol-spacing': ['interpolate', ['linear'], ['zoom'], 6, 60, 12, 110, 16, 150],
      'icon-image': ['concat', 'arrow-', ['to-string', ['get', 'day']]], 'icon-size': ['interpolate', ['linear'], ['zoom'], 6, 0.5, 12, 0.75, 16, 0.95],
      'icon-allow-overlap': true, 'icon-ignore-placement': true, 'icon-rotation-alignment': 'map', 'icon-pitch-alignment': 'map',
    },
  });
  // the line being drawn during the tour
  map.addSource('draw', { type: 'geojson', data: fc([]) });
  map.addLayer({ id: 'draw-glow', type: 'line', source: 'draw', filter: ['==', ['geometry-type'], 'LineString'], layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#ffffff', 'line-width': 12, 'line-opacity': 0.3, 'line-blur': 5 } });
  map.addLayer({ id: 'draw-line', type: 'line', source: 'draw', filter: ['==', ['geometry-type'], 'LineString'], layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': ['get', 'color'], 'line-width': 5 } });
  map.addLayer({ id: 'draw-head', type: 'circle', source: 'draw', filter: ['==', ['geometry-type'], 'Point'], paint: { 'circle-radius': 7, 'circle-color': '#ffffff', 'circle-stroke-color': ['get', 'color'], 'circle-stroke-width': 3.5, 'circle-pitch-alignment': 'map' } });

  // clustered stops for the "all days" view
  const clusterProps = {};
  for (let d = 1; d <= 12; d++) clusterProps['d' + d] = ['+', ['case', ['==', ['get', 'day'], d], 1, 0]];
  map.addSource('stops', {
    type: 'geojson', cluster: true, clusterRadius: 30, clusterMaxZoom: 15, clusterProperties: clusterProps,
    data: fc(items.filter((i) => i.pin).map((i) => ({ type: 'Feature', properties: { id: i.id, day: i.day }, geometry: { type: 'Point', coordinates: i.pos } }))),
  });
  map.addLayer({ id: 'stops-hit', type: 'circle', source: 'stops', paint: { 'circle-radius': 1, 'circle-opacity': 0, 'circle-stroke-opacity': 0 } });

  function setRouteView({ focusDay = 0, upTo = Infinity } = {}) {
    for (const [id, f] of Object.entries(ROUTE_FILTERS)) map.setFilter(id, upTo === Infinity ? f : ['all', f, ['<=', ['get', 'toGi'], upTo]]);
    const op = (on, off) => (focusDay ? ['case', ['==', ['get', 'day'], focusDay], on, off] : on);
    map.setPaintProperty('r-bus', 'line-opacity', op(1, 0.22));
    map.setPaintProperty('r-walk', 'line-opacity', op(1, 0.22));
    map.setPaintProperty('r-casing', 'line-opacity', op(0.6, 0.12));
    map.setPaintProperty('r-arrows', 'icon-opacity', op(1, 0));
  }
  const clearDraw = () => map.getSource('draw').setData(fc([]));

  // ---------------------------------------------------------------- layout / padding
  const stage = $('#stage');
  const panel = $('#panel');
  const panelBody = $('#panel-body');
  const tourcard = $('#tourcard');
  let panelHidden = false;
  function pad() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (tour.on) {
      if (isMobile()) return { top: 70, bottom: Math.round(h * 0.4), left: 24, right: 24 };
      const cw = tourcard.offsetWidth || 450;
      return { top: 80, bottom: 50, left: Math.min(cw + 40, w * 0.45), right: 50 };
    }
    if (panelHidden) return { top: 50, bottom: 50, left: 50, right: 50 };
    if (isMobile()) return { top: 30, bottom: Math.min(panel.offsetHeight + 20, h * 0.7), left: 24, right: 24 };
    return { top: 50, bottom: 50, left: panel.offsetWidth + 50, right: 70 };
  }
  // Camera moves. MapLibre 5.24's flyTo/easeTo/fitBounds leave the terrain "elevation freeze" stuck
  // and never update the centre's height, so after a flight the camera aims at the old altitude
  // (e.g. a city's 800 m while looking at a desert site far below). We animate the camera ourselves with jumpTo,
  // which does accept an elevation, gliding the height to the target's ground level.
  const camAnim = { id: 0, raf: 0, on: false };
  function groundAt(ll) {
    try { return map.terrain ? map.terrain.getElevationForLngLatZoom(maplibregl.LngLat.convert(ll), map.transform.tileZoom) : 0; }
    catch (e) { return 0; }
  }
  function cancelCam() {
    camAnim.id++;
    cancelAnimationFrame(camAnim.raf);
    if (camAnim.on) { camAnim.on = false; map._elevationFreeze = false; map.triggerRepaint(); }
  }
  function fly(target, { duration = 2000, hop = 'auto' } = {}) {
    cancelCam();
    const id = camAnim.id;
    const padding = target.padding || pad();
    const z1 = target.zoom ?? map.getZoom(), p1 = target.pitch ?? map.getPitch();
    if (REDUCED || duration <= 0) {
      map.jumpTo({ center: target.center, zoom: z1, pitch: p1, bearing: target.bearing ?? map.getBearing(), padding, elevation: groundAt(target.center) });
      map.triggerRepaint();
      return Promise.resolve(true);
    }
    const s = { zoom: map.getZoom(), pitch: map.getPitch(), bearing: map.getBearing(), elev: map.transform.elevation, pad: map.getPadding() };
    const c0 = maplibregl.MercatorCoordinate.fromLngLat(map.getCenter()), c1 = maplibregl.MercatorCoordinate.fromLngLat(target.center);
    const dMerc = Math.hypot(c1.x - c0.x, c1.y - c0.y);
    const vw = Math.max(320, map.getCanvas().clientWidth);
    const zFit = dMerc > 1e-9 ? Math.log2((0.75 * vw) / (512 * dMerc)) : 99;
    const hopAmt = hop === 'auto' ? Math.max(0, Math.min(s.zoom, z1) - zFit) : hop;
    const b1 = target.bearing ?? s.bearing;
    const db = ((((b1 - s.bearing) % 360) + 540) % 360) - 180;
    const lp = (k, e) => lerp(s.pad[k] || 0, padding[k] || 0, e);
    camAnim.on = true;
    map._elevationFreeze = true;
    return new Promise((res) => {
      const t0 = performance.now();
      const frame = (now) => {
        if (id !== camAnim.id) return res(false);
        const t = clamp((now - t0) / duration, 0, 1), e = ease(t), arcT = Math.sin(Math.PI * t);
        const c = new maplibregl.MercatorCoordinate(lerp(c0.x, c1.x, e), lerp(c0.y, c1.y, e)).toLngLat();
        map.jumpTo({
          center: c,
          zoom: lerp(s.zoom, z1, e) - hopAmt * arcT,
          pitch: clamp(lerp(s.pitch, p1, e) - Math.min(28, hopAmt * 9) * arcT, 0, 72),
          bearing: s.bearing + db * e,
          padding: { top: lp('top', e), bottom: lp('bottom', e), left: lp('left', e), right: lp('right', e) },
          elevation: lerp(s.elev, groundAt(target.center), e),
        });
        if (t < 1) { camAnim.raf = requestAnimationFrame(frame); return; }
        camAnim.on = false;
        map._elevationFreeze = false;
        map.triggerRepaint();
        res(true);
      };
      camAnim.raf = requestAnimationFrame(frame);
    });
  }
  function fitTo(points, { pitch = 0, bearing = 0, maxZoom = 16, duration = 1600 } = {}) {
    // Our own "fit bounds": MapLibre's cameraForBounds adds the map's current padding on top of
    // ours, which on phones (tall bottom sheet) makes the fit fail.
    if (!points.length) return Promise.resolve();
    const p = pad();
    const cv = map.getCanvas(), W = cv.clientWidth, H = cv.clientHeight;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    points.forEach((pt) => {
      const m = maplibregl.MercatorCoordinate.fromLngLat(pt);
      x0 = Math.min(x0, m.x); x1 = Math.max(x1, m.x); y0 = Math.min(y0, m.y); y1 = Math.max(y1, m.y);
    });
    const dx = Math.max(x1 - x0, 2e-7), dy = Math.max(y1 - y0, 2e-7);
    const aw = Math.max(80, W - p.left - p.right), ah = Math.max(80, H - p.top - p.bottom);
    let zoom = Math.log2(Math.min(aw / (dx * 512), ah / (dy * 512)));
    if (pitch > 30) zoom -= 0.35; // tilted views foreshorten the far side
    zoom = clamp(Math.min(zoom, maxZoom), 1, 18);
    const center = new maplibregl.MercatorCoordinate((x0 + x1) / 2, (y0 + y1) / 2).toLngLat();
    return fly({ center, zoom, pitch, bearing, padding: p }, { duration });
  }
  const camTo = (opts) => fly(opts, { duration: opts.duration ?? 1500, hop: opts.hop ?? 'auto' });
  // the whole country, used for Day 1, the tour's opening and its ending
  function wideView(duration = 2400, pitch = 20) {
    return fitTo(israelPts, { pitch, maxZoom: 8.6, duration });
  }
  map.on('moveend', () => { if (!camAnim.on && !map.isMoving()) map._elevationFreeze = false; });

  // ---------------------------------------------------------------- markers
  const mapEl = $('#map');
  function updateZoomClass() {
    const z = map.getZoom();
    mapEl.dataset.z = z < 5.2 ? 'globe' : z < 8.2 ? 'lo' : z < 11.6 ? 'mid' : z < 13.6 ? 'near' : 'hi';
  }
  map.on('zoom', updateZoomClass);
  map.on('moveend', updateZoomClass);
  // zoom-dependent marker visibility (kept here so all marker rules live together)
  const zstyle = document.createElement('style');
  zstyle.textContent = `
    #map[data-z="globe"] .area-label, #map[data-z="globe"] .geo-label, #map[data-z="globe"] .pin, #map[data-z="globe"] .cluster, #map[data-z="globe"] .base-pin { display: none; }
    #map[data-z="lo"] .area-label.minor, #map[data-z="near"] .area-label, #map[data-z="hi"] .area-label { display: none; }
    #map:not([data-z="hi"]) .pin-label { display: none; }
    #map[data-z="near"] .geo-label, #map[data-z="hi"] .geo-label { display: none; }
    body.mode-all #map[data-z="lo"] .base-pin { display: none; }
    body.touring .area-label.minor, body.mode-day .area-label.minor { display: none; }
    .area-label { pointer-events: auto; cursor: pointer; background: none; border: 0; padding: 2px 4px; font: inherit; }
    .area-label:hover b { text-decoration: underline; text-underline-offset: 3px; }
  `;
  document.head.appendChild(zstyle);

  function pinEl(it, mode) {
    const wrap = document.createElement('div');
    wrap.className = 'mk';
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'pin' + (it.approx ? ' approx' : '');
    el.style.setProperty('--c', DAY_COLORS[it.day]);
    el.textContent = mode === 'day' ? it.num : it.day;
    el.setAttribute('aria-label', `Day ${it.day}, stop ${it.num}: ${it.name}`);
    el.dataset.id = it.id;
    const lab = document.createElement('span');
    lab.className = 'pin-label';
    lab.textContent = it.name;
    el.appendChild(lab);
    el.addEventListener('click', (e) => { e.stopPropagation(); if (tour.on) return; openStop(it.id); });
    wrap.appendChild(el);
    return wrap;
  }

  // clusters + single pins (all-days view)
  const clusterCache = new Map();
  let clusterOn = new Map();
  let clustersEnabled = true;
  function syncClusters() {
    if (!clustersEnabled) {
      if (clusterOn.size) { for (const m of clusterOn.values()) m.remove(); clusterOn = new Map(); }
      return;
    }
    if (!map.getSource('stops') || !map.isSourceLoaded('stops')) return;
    const next = new Map();
    for (const f of map.querySourceFeatures('stops')) {
      const p = f.properties;
      const key = p.cluster ? 'c' + p.cluster_id : 's' + p.id;
      if (next.has(key)) continue;
      let m = clusterCache.get(key);
      if (!m) {
        const el = p.cluster ? clusterEl(p, f.geometry.coordinates) : pinEl(byId[p.id], 'all');
        m = new maplibregl.Marker({ element: el, subpixelPositioning: true }).setLngLat(f.geometry.coordinates);
        clusterCache.set(key, m);
      }
      next.set(key, m);
      if (!clusterOn.has(key)) m.addTo(map);
    }
    for (const [k, m] of clusterOn) if (!next.has(k)) m.remove();
    clusterOn = next;
    markSelected();
  }
  function clusterEl(p, coords) {
    const total = p.point_count;
    let acc = 0;
    const segs = [];
    for (let d = 1; d <= 12; d++) {
      const n = p['d' + d] || 0;
      if (!n) continue;
      segs.push(`${DAY_COLORS[d]} ${(acc / total) * 360}deg ${((acc + n) / total) * 360}deg`);
      acc += n;
    }
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'cluster' + (total >= 8 ? ' lg' : '');
    el.style.setProperty('--ring', `conic-gradient(${segs.join(',')})`);
    el.innerHTML = `<span>${total}</span>`;
    el.setAttribute('aria-label', `${total} stops here. Zoom in to see them.`);
    el.addEventListener('click', (e) => { e.stopPropagation(); if (!tour.on) zoomCluster(p.cluster_id); });
    const wrap = document.createElement('div');
    wrap.className = 'mk';
    wrap.appendChild(el);
    return wrap;
  }
  async function zoomCluster(cid) {
    const src = map.getSource('stops');
    try {
      const leaves = await src.getClusterLeaves(cid, 200, 0);
      const its = leaves.map((l) => byId[l.properties.id]).filter(Boolean);
      openArea(its);
    } catch (e) { console.warn(e); }
  }
  map.on('render', syncClusters);

  // stop pins for one day (day view + tour)
  let dayPins = [];
  function showDayPins(d) {
    clearDayPins();
    d.pins.forEach((it) => {
      const m = new maplibregl.Marker({ element: pinEl(it, 'day'), subpixelPositioning: true }).setLngLat(it.pos).addTo(map);
      dayPins.push(m);
    });
    showBasePins(d.base ? [d.base] : []);
  }
  function clearDayPins() { dayPins.forEach((m) => m.remove()); dayPins = []; }
  let selectedId = null;
  function markSelected() {
    $$('.pin.sel', mapEl).forEach((el) => el.dataset.id !== selectedId && el.classList.remove('sel'));
    if (selectedId) $$(`.pin[data-id="${selectedId}"]`, mapEl).forEach((el) => el.classList.add('sel'));
  }
  function setNowPin(id) {
    $$('.pin.now', mapEl).forEach((el) => el.classList.remove('now'));
    if (id) $$(`.pin[data-id="${id}"]`, mapEl).forEach((el) => el.classList.add('now'));
  }

  // overnight bases
  const baseMarkers = {};
  Object.values(bases).forEach((b) => {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'base-pin';
    el.innerHTML = ICON.moon;
    el.setAttribute('aria-label', `Overnight in ${b.name}`);
    el.title = `Overnight: ${b.name} (${b.note.toLowerCase()})`;
    el.addEventListener('click', (e) => { e.stopPropagation(); if (!tour.on) openBase(b.key); });
    baseMarkers[b.key] = new maplibregl.Marker({ element: el }).setLngLat(b.coords);
  });
  function showBasePins(keys) {
    Object.entries(baseMarkers).forEach(([k, m]) => (keys.includes(k) ? m.addTo(map) : m.remove()));
  }

  // area + geography labels
  const areaMarkers = [];
  Object.entries(trip.areas).forEach(([k, a]) => {
    if (!areaCenter[k]) return;
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'area-label' + (a.major ? '' : ' minor');
    el.innerHTML = `<b>${esc(a.name)}</b><span class="he" lang="he">${esc(a.he)}</span>`;
    el.setAttribute('aria-label', `Zoom into ${a.name}`);
    el.addEventListener('click', (e) => { e.stopPropagation(); if (!tour.on) openArea(items.filter((i) => i.pin && i.area === k)); });
    areaMarkers.push(new maplibregl.Marker({ element: el, anchor: 'left', offset: [30, 0] }).setLngLat(areaCenter[k]).addTo(map));
  });
  GEO_LABELS.forEach((g) => {
    const el = document.createElement('div');
    el.className = 'geo-label';
    el.textContent = g.name;
    new maplibregl.Marker({ element: el }).setLngLat(g.at).addTo(map);
  });
  updateZoomClass();

  // ---------------------------------------------------------------- panel views
  function setPanel(html, { scrollTop = true } = {}) {
    panelBody.innerHTML = html;
    if (scrollTop) panelBody.scrollTop = 0;
    if (isMobile() && panel.classList.contains('low')) setSheet('mid');
  }
  function showPanel() { panelHidden = false; panel.classList.remove('away'); $('#panel-reopen').hidden = true; }
  function hidePanel(withReopen = true) { panelHidden = true; panel.classList.add('away'); $('#panel-reopen').hidden = !withReopen; }
  function setSheet(state) { panel.classList.remove('tall', 'low'); if (state !== 'mid') panel.classList.add(state); }
  $('#sheet-handle').addEventListener('click', () => {
    if (panel.classList.contains('tall')) setSheet('low');
    else if (panel.classList.contains('low')) setSheet('mid');
    else setSheet('tall');
  });
  $('#panel-reopen').addEventListener('click', () => { showPanel(); });

  function dayChipDots(list) { return `<span class="dots">${list.map((d) => `<i style="--c:${d.color}" title="Day ${d.day}"></i>`).join('')}</span>`; }

  function overviewHTML() {
    const daysList = days.map((d) => `
      <li><button type="button" data-act="day" data-day="${d.day}" style="--c:${d.color}">
        <span class="sw"></span>
        <span><span class="dl-s">Day ${d.day} · ${esc(shortDate(d))}</span><br><span class="dl-t">${esc(d.title)}</span>${d.tag ? ` <span class="dl-tag">${esc(d.tag)}</span>` : ''}</span>
        ${ICON.chev}
      </button></li>`).join('');
    const baseList = Object.values(bases).map((b) => {
      const n = b.days.length;
      const nights = ['', 'one night', 'two nights', 'three nights', 'four nights', 'five nights'][n] || `${n} nights`;
      return `<button type="button" class="base-btn" data-act="base" data-base="${b.key}">
        <span class="moon">${ICON.moon}</span>
        <span><span class="bn">${esc(b.name)}</span> <span class="he" lang="he" style="display:inline;color:var(--teal-dark)">${esc(b.he)}</span><br>
        <span class="bd">Days ${b.days[0].day}–${b.days[n - 1].day} · ${nights}</span></span>
        ${dayChipDots(b.days)}
      </button>`;
    }).join('');
    return `<div class="pane">
      <span class="eyebrow">A preview · ${esc(trip.trip.dates)}</span>
      <h2>Our trip to Israel, as planned so far</h2>
      <p class="lede">This map is a preview of our 8th grade trip to Israel as it is currently planned. It follows J²’s draft itinerary day by day, so families and staff can picture where the group will be and what students will experience.</p>
      <p>The plan is still being finalized, and some stops, times, and places may change before we leave.</p>
      <p class="run">Run by <b>J² Adventures</b> and led by ${esc(trip.trip.leader)}.</p>
      <button type="button" class="btn btn-gold play-cta" data-act="play">${ICON.play}<span>Play the trip</span></button>
      <h3>Three home bases</h3>
      <div class="bases">${baseList}</div>
      <h3>Day by day</h3>
      <ul class="daylist">${daysList}</ul>
      <h3>Reading the map</h3>
      <div class="legend">
        <div><svg viewBox="0 0 44 12"><path d="M2 6h40" stroke="#031f3f" stroke-width="7" stroke-linecap="round" opacity=".5"/><path d="M2 6h40" stroke="#007A8A" stroke-width="3.5" stroke-linecap="round"/><path d="M19 2.5l6 3.5-6 3.5" fill="#007A8A" stroke="#031f3f" stroke-width="1.2"/></svg> Bus route, arrows show direction</div>
        <div><svg viewBox="0 0 44 12"><path d="M3 6h40" stroke="#007A8A" stroke-width="4" stroke-linecap="round" stroke-dasharray="0.1 7"/></svg> Walking</div>
        <div><svg viewBox="0 0 44 12"><path d="M2 6h40" stroke="#05305E" stroke-width="2" stroke-dasharray="5 4"/></svg> Flight</div>
        <div><svg viewBox="0 0 44 12"><circle cx="10" cy="6" r="5" fill="#FFC843" stroke="#fff" stroke-width="1.5"/><circle cx="10" cy="6" r="5.8" fill="none" stroke="#05305E" stroke-dasharray="1.6 1.6" stroke-width="1"/></svg> Dashed ring: exact spot to be confirmed</div>
        <div><svg viewBox="0 0 44 12"><circle cx="10" cy="6" r="5.5" fill="#05305E"/><path d="M12.3 7.6A3 3 0 0 1 8.4 3.7a3 3 0 1 0 3.9 3.9z" fill="#FFC843"/></svg> Where we sleep (hotel to be confirmed)</div>
      </div>
      <p class="note" style="margin-top:14px">Tap a colored circle or a city name on the map to zoom in. ${esc(trip.trip.disclaimer)}</p>
    </div>`;
  }

  function dayHTML(d) {
    const agenda = d.items.map((it) => `
      <li><button type="button" data-act="stop" data-id="${it.id}" style="--c:${d.color}">
        ${it.pin ? `<span class="num">${it.num}</span>` : `<span class="num ico">${kindIcon(it)}</span>`}
        <span><span class="a-name">${esc(it.name)}</span><span class="a-text">${esc(it.text)}</span></span>
      </button></li>`).join('');
    const prev = days[d.day - 2], next = days[d.day];
    return `<div class="pane">
      <div class="pane-top"><button type="button" class="back" data-act="home">${ICON.back}All days</button><span class="eyebrow">Day ${d.day} of ${days.length}</span></div>
      <div class="daybar" style="--c:${d.color}"></div>
      <span class="eyebrow">${esc(longDate(d))}</span>
      <h2>${esc(d.title)}</h2>
      ${d.tag ? `<span class="tag">${esc(d.tag)}</span>` : ''}
      <div class="meta">
        <span>${ICON.moon}Overnight: ${esc(d.overnight)}</span>
        ${d.meals ? `<span>${ICON.meal}Meals: ${esc(d.meals)}</span>` : ''}
      </div>
      <button type="button" class="btn btn-navy" data-act="playday" data-day="${d.day}">${ICON.play}<span>Play from this day</span></button>
      <ol class="agenda">${agenda}</ol>
      <div class="daynav">
        ${prev ? `<button type="button" class="btn btn-ghost" data-act="day" data-day="${prev.day}">${ICON.back}Day ${prev.day}</button>` : '<span></span>'}
        ${next ? `<button type="button" class="btn btn-ghost" data-act="day" data-day="${next.day}">Day ${next.day}${ICON.fwd}</button>` : '<span></span>'}
      </div>
    </div>`;
  }

  function photoHTML(it) {
    const ph = photoFor(it);
    if (!ph) return '';
    const pos = it.photoPos ? ` style="object-position:${esc(it.photoPos)}"` : '';
    return `<div class="photo"><img src="${esc(ph.file)}" alt="${esc(it.name)}" loading="lazy" decoding="async"${pos}></div>`;
  }
  function creditHTML(it) {
    const ph = photoFor(it);
    if (!ph) return '';
    return `<p class="credit">Photo: ${esc(ph.author || 'Unknown')}, ${ph.licenseUrl ? `<a href="${esc(ph.licenseUrl)}" target="_blank" rel="noopener">${esc(ph.license)}</a>` : esc(ph.license)}, via <a href="${esc(ph.source)}" target="_blank" rel="noopener">Wikimedia Commons</a></p>`;
  }
  const knowHTML = (it) => (it.know ? `<div class="know"><span class="eyebrow">Good to know</span><p>${esc(it.know)}</p></div>` : '');
  const approxHTML = (it) => (it.approx ? '<span class="approx">Exact location to be confirmed</span>' : '');
  const heHTML = (it) => (it.he ? `<span class="he" lang="he" dir="rtl">${esc(it.he)}</span>` : '');

  function stopHTML(it) {
    const d = it.dayObj;
    const i = items.indexOf(it);
    const prev = items[i - 1], next = items[i + 1];
    return `<div class="pane">
      ${photoHTML(it)}
      <div class="pane-top"><button type="button" class="back" data-act="day" data-day="${d.day}">${ICON.back}Day ${d.day}</button>
        <button type="button" class="close-x" data-act="home" aria-label="Close and show all days">${ICON.close}</button></div>
      <span class="eyebrow">Day ${d.day} · ${esc(shortDate(d))}${it.pin ? ` · Stop ${it.num} of ${d.pinCount}` : ''}</span>
      <h2>${esc(it.name)}</h2>
      ${heHTML(it)}
      ${approxHTML(it)}
      <p>${esc(it.text)}</p>
      ${knowHTML(it)}
      ${creditHTML(it)}
      <div class="stopnav">
        <button type="button" class="btn btn-ghost" data-act="stop" data-id="${prev ? prev.id : ''}" ${prev ? '' : 'disabled'}>${ICON.back}Previous</button>
        <button type="button" class="btn btn-ghost" data-act="stop" data-id="${next ? next.id : ''}" ${next ? '' : 'disabled'}>Next${ICON.fwd}</button>
      </div>
    </div>`;
  }

  function areaHTML(its, title, he) {
    const byDay = {};
    its.forEach((it) => (byDay[it.day] ||= []).push(it));
    const groups = Object.keys(byDay).sort((a, b) => a - b).map((dn) => {
      const d = days[dn - 1];
      return `<div class="area-day" style="--c:${d.color}"><i></i>Day ${d.day} · ${esc(shortDate(d))}</div>
        <ol class="agenda">${byDay[dn].map((it) => `
          <li><button type="button" data-act="stop" data-id="${it.id}" style="--c:${d.color}">
            <span class="num">${it.num}</span>
            <span><span class="a-name">${esc(it.name)}</span><span class="a-text">${esc(it.text)}</span></span>
          </button></li>`).join('')}</ol>`;
    }).join('');
    return `<div class="pane">
      <div class="pane-top"><button type="button" class="back" data-act="home">${ICON.back}All days</button></div>
      <span class="eyebrow">${its.length} ${its.length === 1 ? 'stop' : 'stops'}</span>
      <h2>${esc(title)}</h2>
      ${he ? `<span class="he" lang="he" dir="rtl">${esc(he)}</span>` : ''}
      ${groups}
    </div>`;
  }

  function baseHTML(b) {
    return `<div class="pane">
      ${photos['base-' + b.key] ? `<div class="photo"><img src="${esc(photos['base-' + b.key].file)}" alt="${esc(b.name)}"></div>` : ''}
      <div class="pane-top"><button type="button" class="back" data-act="home">${ICON.back}All days</button></div>
      <span class="eyebrow">Home base</span>
      <h2>${esc(b.name)}</h2>
      <span class="he" lang="he" dir="rtl">${esc(b.he)}</span>
      <p>We sleep in ${esc(b.name)} after Days ${b.days[0].day}–${b.days[b.days.length - 1].day}. ${esc(b.note)}; the moon on the map marks the city, not the hotel.</p>
      <ul class="daylist">${b.days.map((d) => `
        <li><button type="button" data-act="day" data-day="${d.day}" style="--c:${d.color}">
          <span class="sw"></span>
          <span><span class="dl-s">Day ${d.day} · ${esc(shortDate(d))}</span><br><span class="dl-t">${esc(d.title)}</span></span>${ICON.chev}
        </button></li>`).join('')}</ul>
      ${photos['base-' + b.key] ? creditHTML({ id: 'base-' + b.key }) : ''}
    </div>`;
  }

  panelBody.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b || b.disabled) return;
    const act = b.dataset.act;
    if (act === 'day') showDay(+b.dataset.day);
    else if (act === 'stop' && b.dataset.id) openStop(b.dataset.id);
    else if (act === 'home') showOverview();
    else if (act === 'play') openPlayDialog(1);
    else if (act === 'playday') openPlayDialog(+b.dataset.day);
    else if (act === 'base') openBase(b.dataset.base);
  });

  // ---------------------------------------------------------------- day strip
  const daysNav = $('#days');
  daysNav.innerHTML = `<button type="button" class="chip all" data-day="0"><b>Overview</b><small>${esc(trip.trip.dates.replace(/,? \d{4}$/, ''))}</small></button>` +
    days.map((d) => `<button type="button" class="chip" data-day="${d.day}" style="--c:${d.color}" aria-label="Day ${d.day}, ${esc(longDate(d))}: ${esc(d.title)}">
      <b>Day ${d.day}</b><small>${esc(fmtDate(d.date, { weekday: 'short' }))} ${esc(fmtDate(d.date, { day: 'numeric' }))}</small></button>`).join('');
  daysNav.addEventListener('click', (e) => {
    const c = e.target.closest('.chip');
    if (!c) return;
    const n = +c.dataset.day;
    if (tour.on) { jumpTourToDay(n); return; }
    n ? showDay(n) : showOverview();
  });
  function markChip(n) {
    $$('.chip', daysNav).forEach((c) => {
      const on = +c.dataset.day === n;
      c.classList.toggle('on', on);
      if (on) { c.setAttribute('aria-current', 'true'); c.scrollIntoView({ block: 'nearest', inline: 'center', behavior: REDUCED ? 'auto' : 'smooth' }); }
      else c.removeAttribute('aria-current');
    });
  }

  // ---------------------------------------------------------------- explore actions
  let view = { kind: 'all', day: 0 };
  function setMode(kind) {
    document.body.classList.toggle('mode-all', kind === 'all');
    document.body.classList.toggle('mode-day', kind === 'day');
    clustersEnabled = kind === 'all';
    if (kind === 'all') { clearDayPins(); showBasePins(Object.keys(bases)); }
    syncClusters();
  }

  function showOverview({ fly = true } = {}) {
    view = { kind: 'all', day: 0 };
    selectedId = null;
    setMode('all');
    setRouteView({});
    showPanel();
    setPanel(overviewHTML());
    markChip(0);
    setHash('');
    if (fly) fitTo(israelPts, { pitch: 20, maxZoom: 9, duration: 1800 });
  }
  function showDay(n, { fly = true } = {}) {
    const d = days[n - 1];
    if (!d) return;
    view = { kind: 'day', day: n };
    selectedId = null;
    setMode('day');
    setRouteView({ focusDay: n });
    showDayPins(d);
    showPanel();
    setPanel(dayHTML(d));
    markChip(n);
    setHash('day-' + n);
    if (!fly) return;
    if (!d.pins.length) { wideView(2400); return; }
    const pts = [...d.pins.map((i) => i.pos)];
    if (d.base) pts.push(bases[d.base].coords);
    const start = d.start === 'airport' ? TLV : bases[d.start] ? bases[d.start].coords : null;
    if (start) pts.push(start);
    fitTo(pts, { pitch: 45, bearing: 0, maxZoom: 14.5, duration: 1800 });
  }
  function camForStop(it, from) {
    const c = it.cam || {};
    let bearing = c.bearing;
    if (bearing == null && c.bearingTo) bearing = bearingOf(it.pos, c.bearingTo);
    if (bearing == null && from && hav(from, it.pos) > 0.3) bearing = bearingOf(from, it.pos);
    if (bearing == null) bearing = map.getBearing();
    return {
      center: it.pos,
      zoom: c.zoom ?? (it.pin ? DEF_ZOOM[it.kind] ?? 15 : 13.2),
      pitch: c.pitch ?? (it.pin ? 60 : 48),
      bearing,
    };
  }
  function openStop(id) {
    const it = byId[id];
    if (!it) return;
    const d = it.dayObj;
    if (view.kind !== 'day' || view.day !== d.day) {
      view = { kind: 'day', day: d.day };
      setMode('day');
      setRouteView({ focusDay: d.day });
      showDayPins(d);
      markChip(d.day);
    }
    view.stop = id;
    selectedId = it.pin ? id : null;
    markSelected();
    showPanel();
    setPanel(stopHTML(it));
    setHash('stop-' + id);
    if (!it.pos) { d.pins.length ? fitTo(d.pins.map((i) => i.pos), { pitch: 45, maxZoom: 13, duration: 2000 }) : wideView(2400); return; }
    const prev = items[items.indexOf(it) - 1];
    camTo({ ...camForStop(it, prev && prev.pos), duration: 2200 });
  }
  function openArea(its) {
    if (!its.length) return;
    view = { kind: 'all', day: 0 };
    setMode('all');
    setRouteView({});
    markChip(0);
    const areas = [...new Set(its.map((i) => i.area))];
    const a = areas.length === 1 ? trip.areas[areas[0]] : null;
    const title = a ? a.name : areas.map((k) => trip.areas[k] && trip.areas[k].name).filter(Boolean).join(', ');
    showPanel();
    setPanel(areaHTML(its, title, a && a.he));
    setHash('');
    fitTo(its.map((i) => i.pos), { pitch: 50, bearing: map.getBearing(), maxZoom: 15.6, duration: 1800 });
  }
  function openBase(k) {
    const b = bases[k];
    setPanel(baseHTML(b));
    showPanel();
    camTo({ center: b.coords, zoom: 12.4, pitch: 50, bearing: map.getBearing(), duration: 2000 });
  }

  // ---------------------------------------------------------------- tour engine
  const tour = { on: false, steps: [], i: 0, token: 0, paused: false, hold: false, mode: 'highlights', curDay: 0, raf: 0, readRaf: 0, lastPos: null };
  function buildSteps(mode, fromDay = 1) {
    const st = [];
    const chosen = items.filter((it) => it.day >= fromDay && (mode === 'full' || it.highlight));
    let prevGi = chosen.length ? chosen[0].gi - 1 : -1;
    if (fromDay === 1) st.push({ type: 'intro', prevGi });
    chosen.forEach((it) => { st.push({ type: 'item', it, prevGi }); prevGi = it.gi; });
    st.push({ type: 'outro', prevGi });
    return st;
  }
  function readMs(it, mode) {
    const txt = mode === 'highlights' ? it.short || it.text : it.text;
    const w = words(txt);
    const ms = mode === 'highlights' ? clamp(1800 + w * 300, 4300, 7800) : clamp(2600 + w * 265, 5000, 18000);
    return (ms + (it.solemn ? 1500 : 0)) / SPEED;
  }
  function flyMs(a, b, it) {
    if (REDUCED) return 500;
    if (!a || !b) return 3000;
    const km = hav(a, b);
    if (km < 0.05) return 1200;
    let ms = km < 2 ? 2400 : clamp(2600 + km * 20, 2800, 6200);
    if (it && it.solemn) ms *= 1.2;
    return ms / SPEED;
  }
  function estimateMin(mode) {
    let ms = 0, prev = null;
    for (const s of buildSteps(mode, 1)) {
      if (s.type !== 'item') { ms += 3500; continue; }
      const it = s.it;
      ms += readMs(it, mode) + 400 + (it.kind === 'flight' ? 0 : flyMs(prev, it.pos, it));
      prev = it.pos;
    }
    return Math.max(1, Math.round(ms / 60000));
  }

  function wait(ms, token) {
    return new Promise((res) => {
      let el = 0, last = performance.now();
      const tick = (now) => {
        if (token !== tour.token) return res(false);
        if (!tour.paused) el += now - last;
        last = now;
        if (el >= ms) return res(true);
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }
  function drawLine(coords, color, dur, token) {
    return new Promise((res) => {
      if (coords.length < 2) return res();
      const cum = measure(coords), src = map.getSource('draw'), t0 = performance.now();
      const step = (now) => {
        if (token !== tour.token) return res();
        const t = clamp((now - t0) / dur, 0, 1);
        const { line, head } = sliceLine(coords, cum, ease(t));
        src.setData(fc([
          { type: 'Feature', properties: { color }, geometry: { type: 'LineString', coordinates: line.length > 1 ? line : [line[0], line[0]] } },
          { type: 'Feature', properties: { color }, geometry: { type: 'Point', coordinates: head } },
        ]));
        if (t < 1) tour.raf = requestAnimationFrame(step);
        else res();
      };
      tour.raf = requestAnimationFrame(step);
    });
  }

  async function travel(it, ls, token) {
    const from = tour.lastPos || map.getCenter().toArray();
    const cam = camForStop(it, from);
    const dur = flyMs(from, it.pos, it);
    const coords = ls.flatMap((l, k) => (k ? l.coords.slice(1) : l.coords));
    const color = DAY_COLORS[it.day];
    await Promise.all([camTo({ ...cam, duration: dur, curve: hav(from, it.pos) > 40 ? 1.4 : 1.15 }), drawLine(coords, color, dur * 0.9, token)]);
    tour.lastPos = it.pos;
  }

  async function runStep(i) {
    if (!tour.on) return;
    if (i < 0) i = 0;
    if (i >= tour.steps.length) return endTour();
    const token = ++tour.token;
    tour.i = i;
    tour.hold = false;
    cancelAnimationFrame(tour.raf);
    cancelAnimationFrame(tour.readRaf);
    cancelCam();
    clearDraw();
    const s = tour.steps[i];
    setRouteView({ upTo: s.prevGi });

    if (s.type === 'intro') {
      tourCardTravel(null);
      tourcard.hidden = true;
      showIntro();
      // start high over the eastern Mediterranean, then settle over Israel while the title shows
      map.jumpTo({ center: [34.2, 31.8], zoom: isMobile() ? 4.6 : 5.4, pitch: 0, bearing: 0, padding: pad() });
      await Promise.all([wideView(REDUCED ? 0 : 3400 / SPEED, 0), wait(3600 / SPEED, token)]);
      if (token !== tour.token) return;
      hideIntro();
      return runStep(i + 1);
    }
    if (s.type === 'outro') {
      tourcard.hidden = true;
      $('#banner').hidden = true;
      setRouteView({});
      showOutro();
      return;
    }
    hideIntro();
    tourcard.hidden = false;
    const it = s.it, d = it.dayObj;
    if (tour.curDay !== d.day) {
      tour.curDay = d.day;
      showBanner(d);
      markChip(d.day);
      clearDayPins();
      if (d.pins.length) showDayPins(d); else showBasePins([]);
    }
    const ls = legs.filter((l) => l.toGi > s.prevGi && l.toGi <= it.gi).sort((a, b) => a.toGi - b.toGi);
    let credit = 0;
    if (it.kind === 'flight') {
      // Day 1 departure and Day 12 return: no flight drawn, just a wide view of the country
      tourCardShow(it, i);
      const t0 = performance.now();
      await wideView(REDUCED ? 0 : 2600 / SPEED, it.day === 1 ? 30 : 15);
      credit = performance.now() - t0;
      tour.lastPos = null;
    } else {
      tourCardTravel(it);
      await travel(it, ls, token);
    }
    if (token !== tour.token) return;
    setRouteView({ upTo: it.gi });
    clearDraw();
    setNowPin(it.pin ? it.id : null);
    if (it.kind !== 'flight') tourCardShow(it, i);
    readTimer(it, token, credit);
  }
  function readTimer(it, token, credit = 0) {
    const total = Math.max(2500, readMs(it, tour.mode) - credit);
    let el = 0, last = performance.now();
    const bar = $('.tc-bar i', tourcard);
    const tick = (now) => {
      if (token !== tour.token) return;
      if (!tour.paused && !tour.hold) el += now - last;
      last = now;
      if (bar) bar.style.width = Math.min(100, (el / total) * 100) + '%';
      if (el >= total) {
        tourcard.classList.add('hide');
        setTimeout(() => token === tour.token && runStep(tour.i + 1), REDUCED ? 0 : 380);
        return;
      }
      tour.readRaf = requestAnimationFrame(tick);
    };
    tour.readRaf = requestAnimationFrame(tick);
  }

  function stepCountLabel(i) {
    const itemSteps = tour.steps.filter((s) => s.type === 'item');
    const n = itemSteps.indexOf(tour.steps[i]) + 1;
    return `Stop ${n} of ${itemSteps.length}`;
  }
  function controlsHTML() {
    return `<div class="tc-bar"><i></i></div>
      <div class="tc-controls">
        <button type="button" class="rb" data-t="prev" aria-label="Previous stop">${ICON.prev}</button>
        <button type="button" class="rb main" data-t="pause" aria-label="${tour.paused ? 'Play' : 'Pause'}">${tour.paused ? ICON.play : ICON.pause}</button>
        <button type="button" class="rb" data-t="next" aria-label="Next stop">${ICON.next}</button>
        <span class="tc-pos"><b class="tc-count"></b><span class="tc-state">${tour.paused ? '<span class="paused-note">Paused</span>' : tour.mode === 'highlights' ? 'Highlights tour' : 'Full tour'}</span></span>
        <button type="button" class="rb exit" data-t="exit" aria-label="Exit the tour">${ICON.close}</button>
      </div>`;
  }
  function ensureCardFrame() {
    if (!$('.tc-controls', tourcard)) tourcard.innerHTML = `<div class="tc-scroll"></div>${controlsHTML()}`;
  }
  function tourCardTravel(it) {
    ensureCardFrame();
    tourcard.classList.remove('hide', 'solemn');
    $('.tc-scroll', tourcard).innerHTML = it
      ? `<div class="tc-body"><span class="eyebrow">Day ${it.day} · ${esc(shortDate(it.dayObj))}</span>
          <p style="margin:4px 0 10px;font-weight:600;color:var(--navy)">Heading to <b>${esc(it.name)}</b>…</p></div>`
      : '';
    $('.tc-count', tourcard).textContent = it ? stepCountLabel(tour.i) : '';
    $('.tc-bar i', tourcard).style.width = '0%';
  }
  function tourCardShow(it, i) {
    ensureCardFrame();
    const short = tour.mode === 'highlights' && it.short ? it.short : null;
    const extra = (short ? `<p>${esc(it.text)}</p>` : '') + knowHTML(it);
    $('.tc-scroll', tourcard).innerHTML = `
      ${photoHTML(it)}
      <div class="tc-body">
        <span class="eyebrow">Day ${it.day} · ${esc(shortDate(it.dayObj))}</span>
        <h2>${esc(it.name)}</h2>
        ${heHTML(it)}
        ${approxHTML(it)}
        <p>${esc(short || it.text)}</p>
        ${extra ? `<button type="button" class="tc-more" aria-expanded="false" data-t="more">${ICON.fwd}${short ? 'Read more' : 'Good to know'}</button><div class="tc-extra" hidden>${extra}</div>` : ''}
      </div>`;
    tourcard.classList.toggle('solemn', !!it.solemn);
    $('.tc-count', tourcard).textContent = stepCountLabel(i);
    tourcard.classList.remove('hide');
    $('.tc-scroll', tourcard).scrollTop = 0;
  }
  tourcard.addEventListener('click', (e) => {
    const b = e.target.closest('[data-t]');
    if (!b) return;
    const t = b.dataset.t;
    if (t === 'pause') setPaused(!tour.paused);
    else if (t === 'next') runStep(tour.i + 1);
    else if (t === 'prev') runStep(Math.max(0, tour.i - 1));
    else if (t === 'exit') endTour();
    else if (t === 'more') {
      const open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(open));
      $('.tc-extra', tourcard).hidden = !open;
      tour.hold = open || !!tour.hover;
      tour.hoverHold = !open && !!tour.hover;
      updateTourState();
    }
  });
  // reading: hovering the card holds the timer
  tourcard.addEventListener('mouseenter', () => { if (tour.on && matchMedia('(hover: hover)').matches) tour.hover = true; });
  tourcard.addEventListener('mouseleave', () => { tour.hover = false; });
  function updateTourState() {
    const st = $('.tc-state', tourcard);
    if (!st) return;
    const txt = tour.paused ? '<span class="paused-note">Paused. Press play to continue.</span>'
      : tour.hold ? '<span class="paused-note">Holding while you read</span>'
      : tour.mode === 'highlights' ? 'Highlights tour' : 'Full tour';
    if (st.innerHTML !== txt) st.innerHTML = txt;
  }
  function setPaused(p) {
    tour.paused = p;
    const b = $('[data-t="pause"]', tourcard);
    if (b) { b.innerHTML = p ? ICON.play : ICON.pause; b.setAttribute('aria-label', p ? 'Play' : 'Pause'); }
    updateTourState();
  }
  // hovering over the card holds the timer (and says so)
  setInterval(() => {
    if (!tour.on) return;
    if (tour.hover && !tour.hold) { tour.hold = true; tour.hoverHold = true; }
    else if (!tour.hover && tour.hoverHold) { tour.hold = false; tour.hoverHold = false; }
    updateTourState();
  }, 150);

  function showBanner(d) {
    const b = $('#banner');
    b.style.setProperty('--c', d.color);
    b.innerHTML = `<span class="bdot">${d.day}</span><span class="bt"><small>Day ${d.day} · ${esc(isMobile() ? shortDate(d) : longDate(d).replace(/, \d{4}$/, ''))}</small><b>${esc(d.title)}</b></span>${d.tag ? `<span class="btag">${esc(d.tag)}</span>` : ''}`;
    b.hidden = false;
    b.style.animation = 'none'; void b.offsetWidth; b.style.animation = '';
  }
  function showIntro() {
    const el = $('#intro');
    el.innerHTML = `<div><span class="eyebrow">The Davis Academy · ${esc(trip.trip.dates)}</span>
      <h1>8th Grade Trip <span class="acc">to Israel</span></h1>
      <p>A preview of the trip as currently planned</p>
      <p>Run by J² Adventures · Led by ${esc(trip.trip.leader)}</p></div>`;
    el.hidden = false;
  }
  function hideIntro() { $('#intro').hidden = true; }
  function showOutro() {
    const el = $('#intro');
    el.innerHTML = `<div><span class="eyebrow">Day 12 · Until we meet again</span>
      <h1>L’hitraot, <span class="acc">Israel!</span></h1>
      <p>Twelve days, three home bases, and a lifetime of connections.</p>
      <div class="btns"><button type="button" class="btn btn-gold" data-o="explore">Explore the map</button>
      <button type="button" class="btn btn-ghost" data-o="again">${ICON.play}Watch again</button></div></div>`;
    el.hidden = false;
    $('[data-o="explore"]', el).focus();
  }
  $('#intro').addEventListener('click', (e) => {
    const b = e.target.closest('[data-o]');
    if (!b) return;
    if (b.dataset.o === 'explore') endTour();
    else { const mode = tour.mode; endTour({ silent: true }); startTour(mode, 1); }
  });

  function startTour(mode, fromDay = 1) {
    $$('dialog[open]').forEach((d) => d.close());
    tour.on = true;
    tour.mode = mode;
    tour.steps = buildSteps(mode, fromDay);
    tour.curDay = 0;
    tour.lastPos = fromDay > 1 ? (days[fromDay - 1].start === 'airport' ? TLV : bases[days[fromDay - 1].start]?.coords) : null;
    tour.hover = false;
    setPaused(false);
    document.body.classList.add('touring');
    document.body.classList.remove('mode-all', 'mode-day');
    clustersEnabled = false;
    syncClusters();
    clearDayPins();
    showBasePins([]);
    selectedId = null;
    hidePanel(false);
    tourcard.innerHTML = '';
    tourcard.hidden = true;
    setHash('tour');
    runStep(0);
  }
  function jumpTourToDay(n) {
    if (!n) return;
    const idx = tour.steps.findIndex((s) => s.type === 'item' && s.it.day >= n);
    if (idx >= 0) runStep(idx);
    else { const mode = tour.mode; endTour({ silent: true }); startTour(mode, n); }
  }
  function endTour({ silent = false } = {}) {
    if (!tour.on) return;
    tour.on = false;
    tour.token++;
    cancelAnimationFrame(tour.raf);
    cancelAnimationFrame(tour.readRaf);
    cancelCam();
    clearDraw();
    setNowPin(null);
    tourcard.hidden = true;
    $('#banner').hidden = true;
    hideIntro();
    document.body.classList.remove('touring');
    if (silent) return;
    const d = tour.curDay;
    if (d && d !== 12) showDay(d); else showOverview();
  }

  // ---------------------------------------------------------------- dialogs
  const dlgPlay = $('#dlg-play'), dlgAbout = $('#dlg-about');
  [dlgPlay, dlgAbout].forEach((dl) => dl.addEventListener('click', (e) => { if (e.target === dl) dl.close(); }));
  function openPlayDialog(fromDay = 1) {
    const from = fromDay > 1 ? days[fromDay - 1] : null;
    dlgPlay.innerHTML = `<div class="pane">
      <div class="pane-top"><span class="eyebrow">${from ? `Starting from Day ${from.day} · ${esc(shortDate(from))}` : 'Fly through the whole trip'}</span>
      <button type="button" class="close-x" data-p="close" aria-label="Close">${ICON.close}</button></div>
      <h2 id="dlg-play-title">Play the trip</h2>
      <p>Sit back and fly from stop to stop through the trip as it is planned today. Each stop pops up and moves on by itself. Pause any time, hover over a card to keep reading, or use the arrows to skip.</p>
      <div class="choice">
        <button type="button" data-p="highlights"><span class="ic">${ICON.star}</span><span><b>Highlights</b><span>About ${estimateMin('highlights')} minutes for the whole trip: two or three moments from each day.</span></span></button>
        <button type="button" data-p="full"><span class="ic">${ICON.route}</span><span><b>Full tour</b><span>About ${estimateMin('full')} minutes for the whole trip: every stop, in order, with J²’s full descriptions.</span></span></button>
      </div>
      <p class="note">Keyboard: space bar pauses, arrow keys skip, Esc exits.${isMobile() ? '' : ' Showing it on a big screen? Use the full-screen button at the top right.'}</p>
    </div>`;
    dlgPlay.dataset.from = fromDay;
    dlgPlay.showModal();
  }
  dlgPlay.addEventListener('click', (e) => {
    const b = e.target.closest('[data-p]');
    if (!b) return;
    const p = b.dataset.p;
    if (p === 'close') return dlgPlay.close();
    dlgPlay.close();
    startTour(p, +dlgPlay.dataset.from || 1);
  });
  function openAbout() {
    const photoCredits = items.filter((it) => photos[it.id]).map((it) => {
      const ph = photos[it.id];
      return `<li><b>${esc(it.name)}</b>: <a href="${esc(ph.source)}" target="_blank" rel="noopener">${esc(ph.author || 'Unknown')}</a>, ${esc(ph.license)}</li>`;
    }).concat(Object.values(bases).filter((b) => photos['base-' + b.key]).map((b) => {
      const ph = photos['base-' + b.key];
      return `<li><b>${esc(b.name)}</b>: <a href="${esc(ph.source)}" target="_blank" rel="noopener">${esc(ph.author || 'Unknown')}</a>, ${esc(ph.license)}</li>`;
    })).join('');
    dlgAbout.innerHTML = `<div class="pane">
      <div class="pane-top"><span class="eyebrow">About this map</span><button type="button" class="close-x" data-a="close" aria-label="Close">${ICON.close}</button></div>
      <h2 id="dlg-about-title">The Davis Academy 8th Grade Trip to Israel</h2>
      <p>This map is a preview of our 8th grade trip to Israel, ${esc(trip.trip.dates)}, as it is currently planned. The trip is run by J² Adventures and led by ${esc(trip.trip.leader)}. We built the map so families and staff can picture where the group will be each day.</p>
      <p><b>${esc(trip.trip.disclaimer)}</b> Stop descriptions come from J²’s ${esc(trip.trip.source.replace('J² ', ''))}. The “Good to know” notes, the short tour captions, and the map positions were added by The Davis Academy. A pin with a dashed ring marks a place J² has not named yet. Routes are drawn along likely roads and are approximate.</p>
      <h3>How to use it</h3>
      <p>Press <b>Play the trip</b> to fly through the itinerary, or pick a day along the bottom. Tap a colored circle or a city name to zoom into that area, and tap any numbered pin to read about the stop. On a computer you can tilt and turn the map by right-clicking and dragging (or Ctrl-dragging).</p>
      <h3>Credits</h3>
      <p class="note" style="font-style:normal">Satellite imagery: Esri, Maxar, Earthstar Geographics, and the GIS User Community. Terrain: Mapzen Terrain Tiles on AWS Open Data. Routes: OSRM on OpenStreetMap data, © OpenStreetMap contributors. Map engine: MapLibre GL JS. Photos from Wikimedia Commons:</p>
      ${photoCredits ? `<ul class="credits">${photoCredits}</ul>` : '<p class="note">Photos are still being added.</p>'}
      ${isLocked ? `<p style="margin-top:16px"><button type="button" class="btn btn-ghost" data-a="relock">Lock the map on this device</button></p>
        <p class="note">Use this on a shared computer. The passphrase will be needed again.</p>` : ''}
    </div>`;
    dlgAbout.showModal();
  }
  dlgAbout.addEventListener('click', (e) => {
    if (e.target.closest('[data-a="close"]')) dlgAbout.close();
    if (e.target.closest('[data-a="relock"]')) { try { localStorage.removeItem(KEY_STORE); } catch (_) { /* fine */ } location.reload(); }
  });

  // ---------------------------------------------------------------- global controls
  $('#btn-play').addEventListener('click', () => (tour.on ? setPaused(!tour.paused) : openPlayDialog(1)));
  $('#btn-about').addEventListener('click', () => { if (tour.on) setPaused(true); openAbout(); });
  $('#btn-full').addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  });
  $('.brand').addEventListener('click', (e) => { e.preventDefault(); if (tour.on) endTour({ silent: true }); showOverview(); });
  ['dragstart', 'wheel', 'touchstart', 'pitchstart', 'rotatestart'].forEach((ev) => map.on(ev, (e) => {
    if (!e.originalEvent) return;
    cancelCam();
    if (tour.on && !tour.paused) setPaused(true);
    if (!tour.on && isMobile() && ev !== 'wheel' && !panel.classList.contains('low') && !panelHidden) setSheet('low');
  }));
  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea, select') || $$('dialog[open]').length) return;
    if (tour.on) {
      if (e.key === ' ' || e.key === 'k') { e.preventDefault(); setPaused(!tour.paused); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); runStep(tour.i + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); runStep(Math.max(0, tour.i - 1)); }
      else if (e.key === 'Escape') endTour();
      return;
    }
    if (e.target.closest('button') && (e.key === ' ' || e.key === 'Enter')) return;
    if (e.key === 'ArrowRight' && view.day < 12) { e.preventDefault(); showDay((view.day || 0) + 1); }
    else if (e.key === 'ArrowLeft' && view.day > 1) { e.preventDefault(); showDay(view.day - 1); }
    else if (e.key === 'Escape' && view.kind !== 'all') showOverview();
  });
  let rz;
  addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => map.resize(), 120); });

  function setHash(h) { history.replaceState(null, '', h ? '#' + h : location.pathname + location.search); }
  function route() {
    const h = location.hash.slice(1);
    let m;
    if ((m = h.match(/^day-(\d+)$/))) showDay(+m[1]);
    else if ((m = h.match(/^stop-(.+)$/)) && byId[m[1]]) openStop(m[1]);
    else if (h === 'tour' || h === 'play') { showOverview(); openPlayDialog(1); }
    else showOverview();
  }
  addEventListener('hashchange', () => { if (!tour.on) route(); });

  // ---------------------------------------------------------------- go
  route();
  setTimeout(() => $('#loading').classList.add('done'), 300);
  window.__trip = { map, tour, items, legs, startTour, showDay, openStop }; // handy for debugging
})();
