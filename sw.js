/* PitchScope service worker. Bump CACHE when publishing new page versions. */
const CACHE = 'pitchscope-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'pitchscope-prototype-v3.html',
  'pitchscope-12lane-v3.html',
  'icons/icon-192.png',
  'icons/icon-512.png'
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
