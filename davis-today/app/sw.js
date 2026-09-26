const CACHE = "davis-today-v43.3-muis4edi";
const ASSETS = ["./", "./index.html", "./app.enc", "./manifest.webmanifest",
  "/davis-today/icon-180.png", "/davis-today/icon-192.png", "/davis-today/icon-512.png", "/davis-today/icon.svg"];

self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).catch(function () {}));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(function (res) {
    var copy = res.clone();
    caches.open(CACHE).then(function (c) { c.put(e.request, copy); }).catch(function () {});
    return res;
  }).catch(function () {
    return caches.match(e.request).then(function (hit) { return hit || caches.match("./index.html"); });
  }));
});
