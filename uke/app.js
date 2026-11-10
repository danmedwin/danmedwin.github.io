(() => {
  // ================= Data =================
  const OPEN = [67, 60, 64, 69]; // G4 C4 E4 A4, standard reentrant tuning
  const STRINGS = ['G', 'C', 'E', 'A'];
  const FINGER = { 1: 'index', 2: 'middle', 3: 'ring', 4: 'pinky' };
  const CHORDS = {
    C:  { frets: [0,0,0,3], fingers: [0,0,0,3], tip: 'Ring finger alone on the A string, 3rd fret.' },
    G:  { frets: [0,2,3,2], fingers: [0,1,3,2], tip: 'A small triangle. Index on C, middle on A, ring on E.' },
    Am: { frets: [2,0,0,0], fingers: [2,0,0,0], tip: 'Middle finger on the G string, 2nd fret.' },
    F:  { frets: [2,0,1,0], fingers: [2,0,1,0], tip: 'Am plus your index on the E string, 1st fret.' },
    D:  { frets: [2,2,2,0], fingers: [1,2,3,0], tip: 'Three fingers in a row on the 2nd fret. Leave the A string open.' },
    Em: { frets: [0,4,3,2], fingers: [0,3,2,1], tip: 'A diagonal line: index on A, middle on E, ring on C.' }
  };

  const GOALS = [
    ['Clean first', 'Every string rings before speed matters. A slow clean change beats a fast muddy one.'],
    ['Small moves', 'Keep fingers hovering just above the strings between shapes instead of flying off.'],
    ['Light grip', 'Press just behind the fret with only as much pressure as it takes to stop the buzz.'],
    ['Tempo second', 'Turn the metronome on only after one calm pass with no stops.']
  ];

  const PROGS = {
    'c-g-am-f': {
      chords: ['C','G','Am','F'], level: 'Beginner progression', hard: ['C','G'],
      watch: 'G',
      answer: 'Practice C to G to Am to F on ukulele by landing each shape once at your own pace, giving G a little extra time, and turning on the metronome only after one calm pass. On uke this is a friendly progression: C, Am and F use one or two fingers, and G is the only shape that asks for three.',
      why: 'C uses only your ring finger, and then G immediately asks for three fingers in a small triangle. After that the work gets lighter: G to Am clears the triangle, and Am to F just adds one finger. Almost all the difficulty lives in the C to G change, so that is where your practice time goes.',
      tips: [
        'C to G: your ring finger slides across from the A string to the E string and stays on the 3rd fret. Let it lead, then drop index and middle around it.',
        'Set the three G fingers down together as one shape rather than one at a time.',
        'Am to F: leave your middle finger planted on the G string and add your index finger. Do not lift what can stay.',
        'F back to C: lift both fingers and drop your ring finger on the A string, 3rd fret.'
      ],
      mistake: 'Strumming through the G change before all three fingers have landed. Beginners learn faster when the first strum of each chord is clean, even if that means a short pause, and tempo comes second.',
      plan: ['Spend 30 seconds placing G and lifting it off, without strumming.', 'Spend 45 seconds moving from C to G only after your fingers land.', 'Spend 45 seconds tapping through one calm pass of all four chords before you start the loop.']
    },
    'c-g': {
      chords: ['C','G'], level: 'First-week beginner', hard: ['C','G'], watch: 'G',
      answer: 'Practice C to G on ukulele by sliding your ring finger from the A string to the E string, building the G triangle around it, and repeating the change slowly before adding the metronome. It is the first real chord change most uke players learn.',
      why: 'C is one finger. G is three. Going from one to the other means your hand has to wake up two fingers that were resting, and land them in a small space on the 2nd fret.',
      tips: [
        'Your ring finger stays on the 3rd fret for both chords. Slide it from the A string to the E string instead of lifting it.',
        'For G, think of the shape as a triangle pointing toward the headstock and place it all at once.',
        'G back to C: lift index and middle, and slide the ring finger back to the A string.'
      ],
      mistake: 'Looking at the fretboard for every finger. Look once, then try to feel the triangle. Your eyes should be free to read the next chord.',
      plan: ['Spend 30 seconds sliding your ring finger between the A and E strings on the 3rd fret.', 'Spend 45 seconds building G around that ring finger and lifting it off.', 'Spend 45 seconds switching C to G only after your fingers land.']
    },
    'g-d-em-c': {
      chords: ['G','D','Em','C'], level: 'Beginner progression', hard: ['D','Em'], watch: 'D to Em',
      answer: 'Practice G to D to Em to C on ukulele by learning D and Em as whole shapes first, giving the D to Em change extra time, and saving the metronome for after one calm pass. Three of the four chords use three fingers, so this is a good workout for your fretting hand.',
      why: 'D squeezes three fingers side by side onto the 2nd fret, and Em spreads three fingers across three different frets. Going straight from one to the other asks your hand to change from a tight line into a long diagonal.',
      tips: [
        'G to D: all three fingers end up on the 2nd fret. Think of flattening the G triangle into a straight line.',
        'If D feels cramped, angle your fingers diagonally, or lay your index finger across the G, C and E strings as a mini barre.',
        'For Em, place your ring finger on the C string first. The other two fingers fall into place below it.',
        'Em to C: lift everything and drop just your ring finger on the A string, 3rd fret.'
      ],
      mistake: 'Trying to fix D at full tempo. If the D sounds muted, stop the loop, press each string one at a time to find the buzz, and only then speed back up.',
      plan: ['Spend 30 seconds placing D and checking that each string rings.', 'Spend 45 seconds moving from D to Em only after your fingers land.', 'Spend 45 seconds tapping through one calm pass of all four chords before you start the loop.']
    },
    'am-f-c-g': {
      chords: ['Am','F','C','G'], level: 'Beginner progression', hard: ['C','G'], watch: 'G',
      answer: 'Practice Am to F to C to G on ukulele by keeping your middle finger planted for Am to F, sliding your ring finger for C to G, and adding the metronome only after one calm pass. The first half is easy, so save your focus for the second half.',
      why: 'Am to F is one added finger, which feels like nothing. Then C to G asks for three fingers at once, and G back to Am has to clear all three away again before the loop restarts.',
      tips: [
        'Am to F: keep your middle finger on the G string and add your index finger on the E string.',
        'F to C: lift both and drop your ring finger on the A string, 3rd fret.',
        'C to G: slide the ring finger from the A string to the E string, then add index and middle.',
        'G back to Am: lift all three and set just your middle finger on the G string, 2nd fret.'
      ],
      mistake: 'Rushing the easy changes and arriving late to G. Keep the same calm pace through the whole loop so the hard change gets the same time as the easy ones.',
      plan: ['Spend 30 seconds placing G and lifting it off.', 'Spend 45 seconds moving from C to G only after your fingers land.', 'Spend 45 seconds tapping through one calm pass of all four chords before you start the loop.']
    },
    'em-c-g-d': {
      chords: ['Em','C','G','D'], level: 'Beginner progression', hard: ['D','Em'], watch: 'D back to Em',
      answer: 'Practice Em to C to G to D on ukulele by learning Em and D as whole shapes, giving the loop back from D to Em extra time, and adding the metronome only after one calm pass.',
      why: 'Every chord here except C uses three fingers, so your hand gets very little rest. The hardest moment is the loop back from D to Em, where a tight line of fingers on the 2nd fret has to stretch into a diagonal across three frets.',
      tips: [
        'Em to C: lift everything and drop just your ring finger on the A string, 3rd fret.',
        'C to G: slide your ring finger from the A string to the E string, then add index and middle.',
        'G to D: flatten the triangle into a straight line on the 2nd fret.',
        'D to Em: lead with your ring finger on the C string, 4th fret.'
      ],
      mistake: 'Squeezing hard to make three-finger chords ring. Most buzz comes from where your fingertips land, not how hard you press. Move closer to the fret before pressing harder.',
      plan: ['Spend 30 seconds placing Em and lifting it off.', 'Spend 45 seconds moving from D to Em only after your fingers land.', 'Spend 45 seconds tapping through one calm pass of all four chords before you start the loop.']
    },
    'c-am-f-g': {
      chords: ['C','Am','F','G'], level: 'Beginner progression', hard: ['F','G'], watch: 'F to G',
      answer: 'Practice C to Am to F to G on ukulele by enjoying the easy first three chords, giving the F to G change extra time, and adding the metronome only after one calm pass. This is the classic 1950s progression.',
      why: 'C, Am and F are light shapes with one or two fingers. F to G is the big move: your middle finger leaves the G string and your hand has to rebuild the whole G triangle in a different spot.',
      tips: [
        'C to Am: lift your ring finger and place your middle finger on the G string, 2nd fret.',
        'Am to F: keep the middle finger planted and add your index finger on the E string.',
        'F to G: move your index from the E string 1st fret to the C string 2nd fret, then bring middle and ring into place.',
        'G back to C: lift index and middle, and slide your ring finger from the E string to the A string.'
      ],
      mistake: 'Letting the easy changes set a tempo the F to G change cannot keep. Pick a tempo where F to G lands on time, even if C, Am and F feel too slow.',
      plan: ['Spend 30 seconds placing G and lifting it off.', 'Spend 45 seconds moving from F to G only after your fingers land.', 'Spend 45 seconds tapping through one calm pass of all four chords before you start the loop.']
    }
  };
  const ORDER = ['c-g-am-f', 'c-g', 'g-d-em-c', 'am-f-c-g', 'em-c-g-d', 'c-am-f-g'];
  const urlFor = slug => slug === 'c-g-am-f' ? '/uke/' : `/uke/${slug}/`;

  const PATTERNS = {
    downs:   ['D','','D','','D','','D',''],
    du:      ['D','U','D','U','D','U','D','U'],
    island:  ['D','','D','U','','U','D','U'],
    calypso: ['D','','D','U','D','U','D','U'],
    off:     ['','','','','','','','']
  };
  const COUNTS = ['1','&','2','&','3','&','4','&'];
  const PRESETS = [['Slow', 50], ['Steady', 65], ['Fast', 80]];

  const PATTERN_NAMES = [['downs', 'All downs'], ['du', 'Down up'], ['island', 'Island'], ['calypso', 'Calypso'], ['off', 'Hide']];

  // ================= Progression (can change in place) =================
  let SLUG, P, SEQ, N, UNIQUE, PAIRS;
  function loadProg(slug) {
    SLUG = slug in PROGS ? slug : 'c-g-am-f';
    P = PROGS[SLUG]; SEQ = P.chords; N = SEQ.length; UNIQUE = [...new Set(SEQ)];
    PAIRS = [];
    for (let i = 0; i < N; i++) {
      const a = SEQ[i], b = SEQ[(i + 1) % N];
      if (a !== b && !PAIRS.some(p => p.includes(a) && p.includes(b))) PAIRS.push([a, b]);
    }
  }
  loadProg(document.body.dataset.prog);
  const scoreKey = (a, b) => [a, b].sort().join('-');

  // ================= Storage & state =================
  const store = {
    get(k, d) { try { const v = localStorage.getItem('uke:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('uke:' + k, JSON.stringify(v)); } catch (e) {} }
  };
  const S = {
    bpm: store.get('bpm', 65),
    beats: store.get('beats', 4),
    pattern: store.get('pattern', 'downs'),
    sound: store.get('sound', 'both'),
    shuffle: store.get('shuffle', false),
    lefty: store.get('lefty', false),
    countIn: store.get('countIn', true),
    theme: store.get('theme', 'auto'),
    scores: store.get('scores', {}),
    pair: 0,
    phase: 'idle',          // idle | step | ready | loop
    counting: false,        // true during the count-in bar
    stepIndex: 0,
    view: null,
    changes: 0,
    cv: false
  };
  function resetForProg() {
    S.pair = Math.min(store.get('pair:' + SLUG, 0), PAIRS.length - 1);
    S.phase = 'idle'; S.stepIndex = 0; S.changes = 0;
    S.view = { cur: SEQ[0], next: SEQ[1 % N] };
  }
  resetForProg();
  if (S.theme !== 'auto') document.documentElement.dataset.theme = S.theme;

  // ================= Helpers =================
  const $ = id => document.getElementById(id);
  const all = sel => document.querySelectorAll(sel);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const dots = arr => arr.map(c => `<span>${c}</span>`).join('<span class="dot">·</span>');
  const canShuffle = () => N > 2;

  function diagram(name) {
    const c = CHORDS[name];
    const idx = S.lefty ? [3,2,1,0] : [0,1,2,3];
    const x0 = 20, dx = 26, y0 = 34, dy = 26, nF = 4;
    const color = `var(--c-${name})`;
    const label = `${name} chord: ` + idx.map(i => `${STRINGS[i]} string ${c.frets[i] ? 'fret ' + c.frets[i] + ', ' + FINGER[c.fingers[i]] + ' finger' : 'open'}`).join('; ');
    let s = `<svg class="diagram" viewBox="0 0 118 172" role="img" aria-label="${label}">`;
    s += `<rect x="${x0}" y="${y0}" width="${dx*3}" height="${dy*nF}" fill="var(--wood)"/>`;
    for (let f = 1; f <= nF; f++) s += `<line x1="${x0}" x2="${x0+dx*3}" y1="${y0+f*dy}" y2="${y0+f*dy}" stroke="var(--fret)" stroke-width="2"/>`;
    s += `<rect x="${x0-1}" y="${y0-5}" width="${dx*3+2}" height="6" rx="1.5" fill="var(--nut)"/>`;
    idx.forEach((si, col) => {
      const x = x0 + col * dx, f = c.frets[si];
      s += `<line x1="${x}" x2="${x}" y1="${y0}" y2="${y0+dy*nF}" stroke="var(--string)" stroke-width="1.4"/>`;
      if (f === 0) s += `<circle cx="${x}" cy="${y0-15}" r="5.5" fill="none" stroke="var(--muted)" stroke-width="1.8"/>`;
      else {
        const y = y0 + (f - .5) * dy;
        s += `<circle cx="${x}" cy="${y}" r="10.5" fill="${color}"/>`;
        s += `<text x="${x}" y="${y+4.6}" text-anchor="middle" font-size="13" font-weight="800" fill="#fff" font-family="Open Sans,Arial,sans-serif">${c.fingers[si]}</text>`;
      }
      s += `<text x="${x}" y="${y0+dy*nF+20}" text-anchor="middle" font-size="12" font-weight="700" fill="var(--muted)" font-family="Open Sans,Arial,sans-serif">${STRINGS[si]}</text>`;
    });
    return s + '</svg>';
  }

  const presetButtons = cls => PRESETS.map(([n, v]) => `<button class="${cls} js-preset" data-act="preset" data-bpm="${v}"><span>${n}</span><b>${v}</b></button>`).join('');

  // ================= Main page =================
  function buildPage() {
    const related = ORDER.filter(s => s !== SLUG).map(s => {
      const r = PROGS[s];
      return `<a class="card rel" href="${urlFor(s)}"><div class="chords">${r.chords.join('<i>→</i>')}</div><h3>${r.chords.join(' ')} on ukulele</h3><div class="lvl">${r.level}</div></a>`;
    }).join('');

    $('app').innerHTML = `
<div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Tech Rabbi</a><span>/</span><a href="/uke/">Uke practice</a><span>/</span>${SEQ.join(' ')}</nav>
  <header class="page-head">
    <div>
      <p class="eyebrow">Ukulele chord change practice</p>
      <h1>${dots(SEQ)}</h1>
      <p class="lede">Practice the ${SEQ.join(' ')} progression on ukulele without panic. Tap through one clean pass at your own pace, then connect the loop with a metronome.</p>
    </div>
    <button class="cv-open" data-act="openCv">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>
      Class view
    </button>
  </header>

  <main>
    <section class="card tool" aria-label="Practice">
      <div class="coach">
        <div class="status" aria-live="polite">
          <span class="pill js-pill">Ready</span>
          <h2 class="js-head"></h2>
          <p class="js-text"></p>
        </div>
        <div class="box">
          <div class="tempo-head"><span class="label">Metronome</span><span class="tempo-now"><span class="js-bpm"></span> bpm</span></div>
          <div class="presets" role="group" aria-label="Preset tempo">${presetButtons('preset')}</div>
          <details class="custom" id="custom">
            <summary>Custom tempo</summary>
            <div class="custom-row">
              <button class="step" data-act="slower" aria-label="Slower">−</button>
              <output class="js-bpm"></output>
              <button class="step" data-act="faster" aria-label="Faster">+</button>
              <input type="range" id="bpmRange" min="40" max="180" step="1" aria-label="Tempo in beats per minute">
            </div>
          </details>
        </div>
        <div class="moves">
          <div class="box"><span class="label">First move</span><b>${SEQ[0]} to ${SEQ[1]}</b></div>
          <div class="box"><span class="label">Watch out for</span><b>${P.watch}</b></div>
        </div>
      </div>

      <div class="stage">
        <div class="now-head">
          <span class="label">Current chord</span>
          <span class="now-name js-now-name"></span>
        </div>
        <div class="now-diagram js-now-diagram"></div>
        <div class="next-bar">
          <span class="label">Next</span>
          <span class="js-next-diagram"></span>
          <span class="next-name js-next-name"></span>
        </div>
        <div class="pulse js-pulse" hidden>
          <div class="beats js-beats" aria-hidden="true"></div>
          <div class="strum js-strum" aria-label="Strum pattern"></div>
        </div>
        <p class="calm" id="calm"></p>
        <div>
          <div class="progress-row"><span class="label" id="progLabel">Progress</span><b id="progValue"></b></div>
          <div class="bar"><i id="progBar"></i></div>
        </div>
        <button class="primary js-primary" data-act="primary"></button>
        <div class="secondary">
          <button class="ghost" data-act="play">Play chord</button>
          <button class="ghost quiet js-end" data-act="end" disabled>End practice</button>
        </div>
        <div class="countin js-countin" hidden aria-live="assertive"></div>
      </div>
    </section>

    <section class="card settings" aria-label="Loop settings">
      <div class="selected">
        <div><span class="label">Selected chords</span><br><b>${SEQ.join(' → ')}</b></div>
        <a href="#more">Change progression ↓</a>
      </div>
      <div class="field">
        <span class="label">Beats per chord</span>
        <div class="seg" role="group" aria-label="Beats per chord">
          ${[1,2,4,8].map(v => `<button class="js-beats-btn" data-act="beats" data-v="${v}">${v}</button>`).join('')}
        </div>
      </div>
      <label class="field">
        <span class="label">Strum pattern</span>
        <select id="pattern">${PATTERN_NAMES.map(([v, n]) => `<option value="${v}">${v === 'off' ? 'Hide pattern' : n === 'Island' ? 'Island strum' : n}</option>`).join('')}</select>
      </label>
      <label class="field">
        <span class="label">Sound</span>
        <select id="sound">
          <option value="both">Click and strum</option>
          <option value="click">Click only</option>
          <option value="strum">Strum only</option>
          <option value="mute">Silent</option>
        </select>
      </label>
      <div class="field">
        <span class="label">Options</span>
        <div class="toggles">
          <button class="toggle js-countin-toggle" data-act="countIn" aria-pressed="false"><span class="knob"></span>Count-in</button>
          ${canShuffle() ? '<button class="toggle js-shuffle" data-act="shuffle" aria-pressed="false"><span class="knob"></span>Shuffle loop</button>' : ''}
          <button class="toggle js-lefty" data-act="lefty" aria-pressed="false"><span class="knob"></span>Lefty diagrams</button>
        </div>
      </div>
    </section>
    <p class="kbd-hint"><kbd>Space</kbd> presses the big button. <kbd>↑</kbd> <kbd>↓</kbd> change the tempo.</p>

    <section class="section" aria-labelledby="shapesTitle">
      <h2 id="shapesTitle">The shapes</h2>
      <p class="section-note">Standard GCEA tuning. Numbers in the dots are fingers: 1 index, 2 middle, 3 ring. Read each diagram as if the uke is standing up facing you.</p>
      <div class="strip${UNIQUE.length === 2 ? ' n2' : ''}" id="strip"></div>
    </section>

    <section class="section card omc" aria-labelledby="omcTitle">
      <h2 id="omcTitle">One-minute changes</h2>
      <p class="section-note">Pick two chords. For sixty seconds, switch back and forth as fast as you can while still sounding clean. Tap the button (or press <kbd>Space</kbd>) each time you land a chord. Your best score for each pair is saved on this device.</p>
      <div class="pairs" id="pairs" role="group" aria-label="Chord pair"></div>
      <div class="omc-body">
        <div class="ring">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle class="track" cx="50" cy="50" r="44" fill="none" stroke-width="8"/>
            <circle class="fill" id="ringFill" cx="50" cy="50" r="44" fill="none" stroke-width="8" stroke-linecap="round" stroke-dasharray="276.46" stroke-dashoffset="0"/>
          </svg>
          <div class="ring-inner">
            <div class="ring-count" id="omcCount" aria-live="polite">0</div>
            <div class="ring-sub" id="omcTime">60 seconds</div>
          </div>
        </div>
        <div class="omc-side">
          <div class="omc-pair" id="omcPair"></div>
          <div class="omc-buttons">
            <button class="tap" id="omcTap" data-act="omcTap" disabled>Changed</button>
            <button class="ghost" id="omcStart" data-act="omcStart">Start</button>
          </div>
          <p class="result" id="omcResult"></p>
          <div>
            <div class="history-label" id="historyLabel"></div>
            <div class="history" id="history" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="howTitle">
      <h2 id="howTitle">How to practice ${SEQ.join(' to ')} on ukulele</h2>
      <div class="guide">
        <div>
          <p class="answer">${esc(P.answer)}</p>
          <ol>
            <li>Press Start practice and put your fingers on ${SEQ[0]}.</li>
            <li>Tap Next chord only after your fingers land and the strum sounds clean.</li>
            <li>After the last chord, start the loop and follow the metronome.</li>
          </ol>
          <h3>Tips for ${SEQ.join(' ')}</h3>
          <ul>${P.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
          <h3>Why ${P.hard[0]} to ${P.hard[1]} feels hard on uke</h3>
          <p>${esc(P.why)}</p>
          <h3>Common mistake</h3>
          <p>${esc(P.mistake)}</p>
          <h3>Two-minute practice plan</h3>
          <ol>${P.plan.map(t => `<li>${esc(t)}</li>`).join('')}</ol>
        </div>
        <aside class="card goals-card">
          <table class="goals">
            <thead><tr><th>Goal</th><th>What to watch</th></tr></thead>
            <tbody>${GOALS.map(([g, w]) => `<tr><td>${g}</td><td>${w}</td></tr>`).join('')}</tbody>
          </table>
        </aside>
      </div>
    </section>

    <section class="section" id="more" aria-labelledby="relTitle">
      <h2 id="relTitle">More uke progressions</h2>
      <p class="section-note">Each page opens straight into the same practice tool with a different set of chords.</p>
      <div class="related">${related}</div>
    </section>

    <section class="section faq" aria-labelledby="faqTitle">
      <h2 id="faqTitle">FAQ</h2>
      <details><summary>Can I use this on a smartboard or projector?</summary><p>Yes. Press Class view at the top of the page. It fills the screen with a large chord diagram, the next chord, the beat and big touch buttons, and you can switch progressions without leaving it. Every loop starts with a one-bar count-in so the class comes in together.</p></details>
      <details><summary>Does this page need my microphone?</summary><p>No. Nothing listens to you. You decide when a change is clean and press the button yourself.</p></details>
      <details><summary>Where does my progress go?</summary><p>Your tempo, settings and one-minute scores are saved in this browser on this device. Nothing is sent anywhere, and clearing your browser data clears them.</p></details>
      <details><summary>What tuning do the diagrams use?</summary><p>Standard GCEA tuning for soprano, concert and tenor ukuleles. The shapes are the same whether your G string is high or low. A baritone uke is tuned DGBE like the top four guitar strings, so these shapes will sound different on it.</p></details>
      <details><summary>I play left-handed. Can I flip the diagrams?</summary><p>Yes. Turn on Lefty diagrams in the settings and every chord shape is mirrored so the strings read A E C G from left to right.</p></details>
      <details><summary>Why does a string buzz or sound dead?</summary><p>Usually a fingertip is too far from the fret or is leaning on the next string. Play the chord one string at a time to find the culprit, then curl that finger so only the tip touches.</p></details>
    </section>
  </main>

  <footer>Made for <a href="https://techrabbi.org">Tech Rabbi</a>. Practice slowly first. Speed comes from clean changes.</footer>
</div>`;
  }

  // ================= Class view =================
  function buildClassView() {
    const cv = document.createElement('div');
    cv.className = 'cv';
    cv.id = 'cv';
    cv.hidden = true;
    cv.setAttribute('role', 'dialog');
    cv.setAttribute('aria-modal', 'true');
    cv.setAttribute('aria-label', 'Class view');
    cv.innerHTML = `
  <div class="cv-top">
    <div class="cv-progs" id="cvProgs" role="group" aria-label="Progression"></div>
    <div class="cv-tools">
      <button class="cv-icon" data-act="theme" id="cvTheme"></button>
      <button class="cv-icon" data-act="closeCv" aria-label="Exit class view">✕ <span>Exit</span></button>
    </div>
  </div>
  <div class="cv-main">
    <div class="cv-now card">
      <div class="cv-status" aria-live="polite"><span class="pill js-pill"></span><span class="cv-head js-head"></span></div>
      <div class="cv-name js-now-name"></div>
      <div class="cv-diagram js-now-diagram"></div>
      <div class="countin js-countin" hidden aria-live="assertive"></div>
    </div>
    <div class="cv-side">
      <div class="cv-next card">
        <span class="label">Next</span>
        <div class="cv-next-name js-next-name"></div>
        <div class="cv-next-diagram js-next-diagram"></div>
      </div>
      <div class="cv-pulse card">
        <div class="js-pulse" hidden>
          <div class="beats js-beats" aria-hidden="true"></div>
          <div class="strum js-strum" aria-label="Strum pattern"></div>
        </div>
        <p class="cv-calm js-text"></p>
      </div>
    </div>
  </div>
  <div class="cv-bar">
    <div class="cv-actions">
      <button class="primary cv-primary js-primary" data-act="primary"></button>
      <button class="ghost cv-btn" data-act="play">Play chord</button>
      <button class="ghost cv-btn js-end" data-act="end">Start over</button>
    </div>
    <div class="cv-settings">
      <div class="cv-group"><span class="label">Tempo · <span class="js-bpm"></span> bpm</span>
        <div class="seg cv-seg">${PRESETS.map(([n, v]) => `<button class="js-preset" data-act="preset" data-bpm="${v}">${n} ${v}</button>`).join('')}</div>
      </div>
      <div class="cv-group"><span class="label">Strum</span>
        <div class="seg cv-seg">${PATTERN_NAMES.map(([v, n]) => `<button class="js-pattern-btn" data-act="pattern" data-p="${v}">${n}</button>`).join('')}</div>
      </div>
      <div class="cv-group js-shuffle-wrap"><span class="label">Order</span>
        <button class="toggle cv-toggle js-shuffle" data-act="shuffle" aria-pressed="false"><span class="knob"></span>Shuffle</button>
      </div>
    </div>
  </div>`;
    document.body.appendChild(cv);
  }
  function renderCvProgs() {
    $('cvProgs').innerHTML = ORDER.map(s =>
      `<button class="cv-prog" data-act="prog" data-slug="${s}" aria-pressed="${s === SLUG}">${PROGS[s].chords.join(' ')}</button>`).join('');
    all('.js-shuffle-wrap').forEach(el => el.hidden = !canShuffle());
  }
  function effectiveTheme() {
    return document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  function renderThemeBtn() {
    const dark = effectiveTheme() === 'dark';
    $('cvTheme').innerHTML = dark ? '☀ <span>Light</span>' : '☾ <span>Dark</span>';
    $('cvTheme').setAttribute('aria-label', dark ? 'Switch to light colors' : 'Switch to dark colors');
  }
  let wakeLock = null, wantFs = false;
  async function lockScreen() {
    try { if ('wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen'); } catch (e) {}
  }
  function openCv() {
    S.cv = true;
    $('cv').hidden = false;
    document.body.classList.add('cv-on');
    renderCvProgs(); renderThemeBtn(); renderChord();
    const el = document.documentElement;
    const req = el.requestFullscreen || el.webkitRequestFullscreen;
    if (req) { try { wantFs = true; const p = req.call(el); if (p && p.catch) p.catch(() => { wantFs = false; }); } catch (e) { wantFs = false; } }
    lockScreen();
    $('cv').querySelector('.js-primary').focus();
  }
  function closeCv() {
    S.cv = false;
    $('cv').hidden = true;
    document.body.classList.remove('cv-on');
    wantFs = false;
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (fsEl) { const ex = document.exitFullscreen || document.webkitExitFullscreen; try { ex && ex.call(document); } catch (e) {} }
    try { wakeLock && wakeLock.release(); } catch (e) {}
    wakeLock = null;
    renderChord();
    const btn = document.querySelector('.cv-open'); if (btn) btn.focus();
  }
  function onFsChange() {
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (!fsEl && S.cv && wantFs) closeCv();
  }

  // ================= Render =================
  function renderChord() {
    const { cur, next } = S.view;
    all('.js-now-name').forEach(el => { el.textContent = cur; el.style.color = `var(--c-${cur})`; });
    all('.js-next-name').forEach(el => { el.textContent = next; el.style.color = `var(--c-${next})`; });
    const dc = diagram(cur), dn = diagram(next);
    all('.js-now-diagram').forEach(el => el.innerHTML = dc);
    all('.js-next-diagram').forEach(el => el.innerHTML = dn);
    all('.chip').forEach(el => el.classList.toggle('current', el.dataset.chord === cur));
  }
  function statusCopy() {
    const p = S.phase;
    const beatsTxt = `${S.beats} ${S.beats === 1 ? 'beat' : 'beats'} per chord`;
    if (p === 'idle') return { pill: 'Ready', head: `Ready: ${SEQ[0]} to ${SEQ[1]}`, text: 'First tap through each chord at your own pace. Then connect the whole progression with the metronome.', btn: 'Start practice' };
    if (p === 'step') return { pill: 'Step 1 of 2', head: `${S.view.cur} to ${S.view.next}`, text: 'Press Next chord only after your fingers land and the strum sounds clean.', btn: 'Next chord' };
    if (p === 'ready') return { pill: 'Step 2 of 2', head: 'Now connect the loop', text: `You landed every change. Start the loop at ${S.bpm} bpm and switch on beat one.`, btn: 'Start the loop' };
    if (S.counting) return { pill: 'Get ready', head: `Count-in at ${S.bpm} bpm`, text: `Fingers on ${SEQ[0]}. Start strumming after four.`, btn: 'Stop loop' };
    return { pill: 'Looping', head: `${S.bpm} bpm, ${beatsTxt}`, text: 'Watch the next chord and start moving on the last beat. If it gets messy, stop and pick a slower tempo.', btn: 'Stop loop' };
  }
  function renderStatus() {
    const c = statusCopy(), p = S.phase;
    all('.js-pill').forEach(el => { el.textContent = c.pill; el.classList.toggle('loop', p === 'loop'); });
    all('.js-head').forEach(el => el.textContent = c.head);
    all('.js-text').forEach(el => el.textContent = c.text);
    all('.js-primary').forEach(el => { el.textContent = c.btn; el.classList.toggle('go', p === 'ready'); });
    all('.js-end').forEach(el => el.disabled = p === 'idle');
    all('.js-pulse').forEach(el => el.hidden = p !== 'loop');
    all('.cv-calm').forEach(el => el.hidden = p === 'loop');
    const calm = $('calm');
    calm.hidden = p === 'loop';
    calm.textContent = p === 'ready' ? 'Your fingers know the way. Time to add the beat.' : 'No clock is running. Move on when your fingers are ready.';
    renderProgress();
  }
  function renderProgress(frac) {
    let label = 'Progress', value, pct;
    if (S.phase === 'loop') {
      label = 'Changes made'; value = String(S.changes); pct = (frac || 0) * 100;
    } else {
      const total = N - 1;
      const done = S.phase === 'ready' ? total : S.phase === 'step' ? S.stepIndex : 0;
      value = `${done} / ${total}`; pct = done / total * 100;
    }
    $('progLabel').textContent = label;
    $('progValue').textContent = value;
    $('progBar').style.width = pct + '%';
  }
  function renderTempo() {
    all('.js-bpm').forEach(el => el.textContent = S.bpm);
    $('bpmRange').value = S.bpm;
    let preset = false;
    all('.js-preset').forEach(b => {
      const on = +b.dataset.bpm === S.bpm; preset = preset || on;
      b.setAttribute('aria-pressed', String(on));
    });
    if (!preset) $('custom').open = true;
    if (S.phase === 'loop' || S.phase === 'ready') renderStatus();
  }
  function renderSettings() {
    all('.js-beats-btn').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.v === S.beats)));
    all('.js-pattern-btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.p === S.pattern)));
    $('pattern').value = S.pattern;
    $('sound').value = S.sound;
    all('.js-shuffle').forEach(b => b.setAttribute('aria-pressed', String(S.shuffle)));
    all('.js-lefty').forEach(b => b.setAttribute('aria-pressed', String(S.lefty)));
    all('.js-countin-toggle').forEach(b => b.setAttribute('aria-pressed', String(S.countIn)));
  }
  function renderBeats() {
    const html = Array.from({ length: S.beats }, (_, i) => `<span class="beat${i === 0 ? ' first' : ''}"></span>`).join('');
    all('.js-beats').forEach(el => el.innerHTML = html);
  }
  function renderStrum() {
    const p = PATTERNS[S.pattern];
    const html = p.map((d, i) =>
      `<div class="slot"><span class="arrow${d ? '' : ' rest'}">${d === 'D' ? '↓' : d === 'U' ? '↑' : '·'}</span><span class="count">${COUNTS[i]}</span></div>`).join('');
    all('.js-strum').forEach(el => { el.innerHTML = html; el.hidden = S.pattern === 'off'; });
  }
  function renderStrip() {
    $('strip').innerHTML = UNIQUE.map(n =>
      `<div class="card chip" data-chord="${n}" style="--chord:var(--c-${n})"><h3>${n}</h3>${diagram(n)}<p>${CHORDS[n].tip}</p></div>`).join('');
    all('.chip').forEach(el => el.classList.toggle('current', el.dataset.chord === S.view.cur));
  }
  function showCount(n) {
    all('.js-countin').forEach(el => { el.hidden = !n; el.textContent = n || ''; });
  }

  // ================= Audio =================
  let ctx = null;
  const pluckCache = {};
  function audio() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function pluckBuffer(midi) { // Karplus-Strong plucked string
    if (pluckCache[midi]) return pluckCache[midi];
    const sr = ctx.sampleRate, freq = 440 * Math.pow(2, (midi - 69) / 12);
    const len = Math.floor(sr * 1.4), period = Math.round(sr / freq);
    const buf = ctx.createBuffer(1, len, sr), d = buf.getChannelData(0);
    const ring = new Float32Array(period);
    for (let i = 0; i < period; i++) ring[i] = Math.random() * 2 - 1;
    let p = 0;
    for (let i = 0; i < len; i++) {
      const nx = (p + 1) % period, v = ring[p];
      ring[p] = 0.996 * 0.5 * (ring[p] + ring[nx]);
      d[i] = v * 0.5; p = nx;
    }
    return (pluckCache[midi] = buf);
  }
  function playStrum(name, dir, t) {
    const notes = CHORDS[name].frets.map((f, i) => OPEN[i] + f);
    const order = dir === 'U' ? [3,2,1,0] : [0,1,2,3];
    const vol = dir === 'U' ? 0.22 : 0.32;
    order.forEach((si, k) => {
      const at = t + k * 0.014;
      const src = ctx.createBufferSource(); src.buffer = pluckBuffer(notes[si]);
      const g = ctx.createGain();
      g.gain.setValueAtTime(vol, at);
      g.gain.exponentialRampToValueAtTime(0.001, at + 1.3);
      src.connect(g).connect(ctx.destination);
      src.start(at); src.stop(t + 1.4);
    });
  }
  function playClick(t, accent) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = accent ? 1600 : 1050;
    g.gain.setValueAtTime(accent ? 0.35 : 0.2, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    o.connect(g).connect(ctx.destination);
    o.start(t); o.stop(t + 0.06);
  }
  const strumNow = name => { if (S.sound === 'mute') return; audio(); playStrum(name, 'D', ctx.currentTime + 0.02); };

  // ================= Step mode =================
  function startStep() {
    S.phase = 'step'; S.stepIndex = 0;
    S.view = { cur: SEQ[0], next: SEQ[1 % N] };
    renderChord(); renderStatus();
    strumNow(SEQ[0]);
  }
  function nextStep() {
    S.stepIndex++;
    if (S.stepIndex >= N - 1) {
      S.view = { cur: SEQ[N - 1], next: SEQ[0] };
      S.stepIndex = N - 1;
      S.phase = 'ready';
    } else {
      S.view = { cur: SEQ[S.stepIndex], next: SEQ[S.stepIndex + 1] };
    }
    renderChord(); renderStatus();
    strumNow(S.view.cur);
  }
  function endPractice() {
    if (S.phase === 'loop') stopLoop(false);
    S.phase = 'idle'; S.stepIndex = 0;
    S.view = { cur: SEQ[0], next: SEQ[1 % N] };
    renderChord(); renderStatus();
  }

  // ================= Loop mode (eighth-note scheduler) =================
  const sched = { cur: '', next: '', seqPos: 0, changes: 0 };
  function pickNext(from) {
    if (S.shuffle && canShuffle()) {
      const opts = UNIQUE.filter(c => c !== from);
      return opts[Math.floor(Math.random() * opts.length)];
    }
    sched.seqPos = (sched.seqPos + 1) % N;
    return SEQ[sched.seqPos];
  }
  let timer = null, nextTime = 0, eighth = 0, inChord = 0, raf = 0;
  const queue = [];
  function schedule() {
    while (nextTime < ctx.currentTime + 0.12) {
      const per = S.beats * 2;
      if (inChord === 0 && eighth > 0) {
        sched.cur = sched.next;
        sched.next = pickNext(sched.cur);
        sched.changes++;
      }
      const slot = eighth % 8, onBeat = inChord % 2 === 0, dir = PATTERNS[S.pattern][slot], snd = S.sound;
      if (onBeat && (snd === 'both' || snd === 'click')) playClick(nextTime, inChord === 0);
      if (dir && (snd === 'both' || snd === 'strum')) playStrum(sched.cur, dir, nextTime);
      queue.push({ t: nextTime, cur: sched.cur, next: sched.next, changes: sched.changes, beat: onBeat ? inChord / 2 : -1, slot, frac: (inChord + 1) / per });
      nextTime += 60 / S.bpm / 2;
      eighth++;
      inChord = (inChord + 1) % per;
    }
  }
  function draw() {
    if (S.phase !== 'loop') return;
    while (queue.length && queue[0].t <= ctx.currentTime) {
      const ev = queue.shift();
      if (ev.countIn) { showCount(ev.countIn); continue; }
      if (S.counting) { S.counting = false; showCount(0); renderStatus(); }
      if (ev.cur !== S.view.cur || ev.next !== S.view.next || ev.changes !== S.changes) {
        S.view = { cur: ev.cur, next: ev.next };
        S.changes = ev.changes;
        renderChord();
      }
      if (ev.beat >= 0) all('.beat').forEach(b => b.classList.toggle('on', b.parentNode.children[ev.beat] === b));
      all('.js-strum').forEach(st => [...st.children].forEach((s, i) => s.classList.toggle('on', i === ev.slot && !!PATTERNS[S.pattern][i])));
      renderProgress(ev.frac);
    }
    raf = requestAnimationFrame(draw);
  }
  function startLoop() {
    audio();
    if (omc.running) omcCancel();
    S.phase = 'loop'; S.changes = 0;
    sched.seqPos = 0; sched.cur = SEQ[0]; sched.changes = 0;
    if (S.shuffle && canShuffle()) sched.next = pickNext(SEQ[0]);
    else { sched.seqPos = 1 % N; sched.next = SEQ[sched.seqPos]; }
    S.view = { cur: sched.cur, next: sched.next };
    eighth = 0; inChord = 0; queue.length = 0;
    let t0 = ctx.currentTime + 0.1;
    S.counting = S.countIn;
    if (S.countIn) {
      const beat = 60 / S.bpm;
      for (let i = 0; i < 4; i++) {
        if (S.sound !== 'mute') playClick(t0 + i * beat, i === 0);
        queue.push({ t: t0 + i * beat, countIn: i + 1 });
      }
      t0 += 4 * beat;
    }
    nextTime = t0;
    renderChord(); renderBeats(); renderStrum(); renderStatus();
    schedule();
    timer = setInterval(schedule, 25);
    raf = requestAnimationFrame(draw);
  }
  function stopLoop(backToReady = true) {
    clearInterval(timer); cancelAnimationFrame(raf);
    queue.length = 0;
    S.counting = false; showCount(0);
    all('.beat.on,.slot.on').forEach(el => el.classList.remove('on'));
    S.phase = backToReady ? 'ready' : 'idle';
    S.view = { cur: SEQ[0], next: SEQ[1 % N] };
    renderChord(); renderStatus();
  }
  function primary() {
    if (S.phase === 'idle') startStep();
    else if (S.phase === 'step') nextStep();
    else if (S.phase === 'ready') startLoop();
    else stopLoop(true);
  }

  // ================= One-minute changes =================
  const CIRC = 276.46;
  const omc = { running: false, count: 0, end: 0, raf: 0 };
  function renderPairs() {
    $('pairs').innerHTML = PAIRS.map((p, i) => {
      const best = (S.scores[scoreKey(...p)] || {}).best;
      return `<button class="pair" data-act="pair" data-i="${i}" aria-pressed="${i === S.pair}">${p[0]} ↔ ${p[1]}${best ? `<span class="best">best ${best}</span>` : ''}</button>`;
    }).join('');
  }
  function renderOmcPair() {
    const [a, b] = PAIRS[S.pair];
    $('omcPair').innerHTML = `${diagram(a)}<span class="swap" aria-hidden="true">⇄</span>${diagram(b)}`;
  }
  function renderHistory() {
    const rec = S.scores[scoreKey(...PAIRS[S.pair])];
    const hist = rec ? rec.history : [];
    if (!hist.length) { $('historyLabel').textContent = 'No scores yet for this pair.'; $('history').innerHTML = ''; return; }
    const max = Math.max(...hist, 1);
    $('historyLabel').textContent = `Best ${rec.best} changes. Your last ${hist.length} ${hist.length === 1 ? 'try' : 'tries'}:`;
    $('history').innerHTML = hist.map((v, i) =>
      `<div class="b${i === hist.length - 1 ? ' last' : ''}" style="height:${Math.max(6, v / max * 100)}%" title="${v}"></div>`).join('');
  }
  function renderOmc() { renderPairs(); renderOmcPair(); renderHistory(); }
  function omcTick() {
    const left = Math.max(0, omc.end - performance.now());
    $('ringFill').style.strokeDashoffset = String(CIRC * (1 - left / 60000));
    $('omcTime').textContent = `${Math.ceil(left / 1000)} seconds`;
    if (left <= 0) return omcFinish();
    omc.raf = requestAnimationFrame(omcTick);
  }
  function omcStart() {
    if (S.phase === 'loop') stopLoop(true);
    Object.assign(omc, { running: true, count: 0, end: performance.now() + 60000 });
    $('omcCount').textContent = '0';
    $('omcResult').textContent = '';
    $('omcTap').disabled = false; $('omcTap').focus();
    $('omcStart').textContent = 'Cancel';
    if (S.sound !== 'mute') { audio(); playClick(ctx.currentTime + 0.01, true); }
    omcTick();
  }
  function omcReset() {
    cancelAnimationFrame(omc.raf);
    omc.running = false;
    $('omcTap').disabled = true;
    $('omcStart').textContent = 'Start';
    $('ringFill').style.strokeDashoffset = '0';
    $('omcTime').textContent = '60 seconds';
  }
  function omcCancel() { omcReset(); $('omcCount').textContent = '0'; $('omcResult').textContent = 'Cancelled.'; }
  function omcFinish() {
    const n = omc.count;
    omcReset();
    $('omcCount').textContent = n;
    const key = scoreKey(...PAIRS[S.pair]);
    const rec = S.scores[key] || { best: 0, history: [] };
    const isBest = n > rec.best;
    rec.best = Math.max(rec.best, n);
    rec.history = [...rec.history, n].slice(-12);
    S.scores[key] = rec; store.set('scores', S.scores);
    $('omcResult').textContent = isBest && n > 0 ? `${n} changes. A new best!` : `${n} changes. Your best is ${rec.best}.`;
    if (S.sound !== 'mute') { audio(); playClick(ctx.currentTime + 0.01, true); playClick(ctx.currentTime + 0.15, true); }
    renderPairs(); renderHistory();
  }
  function omcTap() { if (omc.running) $('omcCount').textContent = ++omc.count; }

  // ================= Actions =================
  function setBpm(v) {
    S.bpm = Math.max(40, Math.min(180, Math.round(v)));
    store.set('bpm', S.bpm);
    renderTempo();
  }
  function restartLoopIfRunning() { if (S.phase === 'loop') { stopLoop(true); startLoop(); } }
  function switchProg(slug) {
    if (slug === SLUG) return;
    if (S.phase === 'loop') stopLoop(false);
    if (omc.running) omcReset();
    loadProg(slug);
    resetForProg();
    document.body.dataset.prog = SLUG;
    document.title = `${SEQ.join(' ')} Ukulele Chord Practice | Tech Rabbi`;
    try { history.replaceState(null, '', urlFor(SLUG)); } catch (e) {}
    renderAll();
    renderCvProgs();
  }
  const ACTIONS = {
    primary, play: () => { audio(); playStrum(S.view.cur, 'D', ctx.currentTime + 0.02); },
    end: endPractice,
    preset: b => setBpm(+b.dataset.bpm),
    slower: () => setBpm(S.bpm - 1),
    faster: () => setBpm(S.bpm + 1),
    beats: b => { S.beats = +b.dataset.v; store.set('beats', S.beats); renderSettings(); renderBeats(); restartLoopIfRunning(); },
    pattern: b => { S.pattern = b.dataset.p; store.set('pattern', S.pattern); renderSettings(); renderStrum(); },
    shuffle: () => { S.shuffle = !S.shuffle; store.set('shuffle', S.shuffle); renderSettings(); restartLoopIfRunning(); },
    countIn: () => { S.countIn = !S.countIn; store.set('countIn', S.countIn); renderSettings(); },
    lefty: () => { S.lefty = !S.lefty; store.set('lefty', S.lefty); renderSettings(); renderStrip(); renderChord(); renderOmcPair(); },
    pair: b => {
      if (omc.running) return;
      S.pair = +b.dataset.i; store.set('pair:' + SLUG, S.pair);
      $('omcResult').textContent = ''; $('omcCount').textContent = '0';
      renderOmc();
    },
    omcStart: () => omc.running ? omcCancel() : omcStart(),
    openCv, closeCv,
    theme: () => {
      const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next; S.theme = next; store.set('theme', next);
      renderThemeBtn();
    },
    prog: b => switchProg(b.dataset.slug)
  };
  function wire() {
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-act]');
      if (!b || b.dataset.act === 'omcTap' || !ACTIONS[b.dataset.act]) return;
      ACTIONS[b.dataset.act](b);
    });
    document.addEventListener('pointerdown', e => {
      const b = e.target.closest('[data-act="omcTap"]');
      if (b && !b.disabled) { e.preventDefault(); omcTap(); }
    });
    document.addEventListener('input', e => { if (e.target.id === 'bpmRange') setBpm(+e.target.value); });
    document.addEventListener('change', e => {
      if (e.target.id === 'pattern') { S.pattern = e.target.value; store.set('pattern', S.pattern); renderSettings(); renderStrum(); }
      if (e.target.id === 'sound') { S.sound = e.target.value; store.set('sound', S.sound); }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && S.cv) { closeCv(); return; }
      if (e.target.matches('[data-act="omcTap"]') && e.key === 'Enter') { e.preventDefault(); omcTap(); return; }
      if (e.target.matches('select,input,summary,a')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (e.repeat) return;
        omc.running && !S.cv ? omcTap() : primary();
      } else if (e.key === 'ArrowUp') { e.preventDefault(); setBpm(S.bpm + 1); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setBpm(S.bpm - 1); }
    });
    // Stop a focused button from also firing its click when Space is released
    document.addEventListener('keyup', e => { if (e.code === 'Space' && e.target.matches('button')) e.preventDefault(); });
    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);
    document.addEventListener('visibilitychange', () => { if (S.cv && document.visibilityState === 'visible') lockScreen(); });
    matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => S.cv && renderThemeBtn());
  }

  function renderAll() {
    buildPage();
    renderSettings(); renderTempo(); renderStrip(); renderChord(); renderBeats(); renderStrum(); renderStatus(); renderOmc();
  }

  buildClassView();
  wire();
  renderAll();
  renderCvProgs();
})();
