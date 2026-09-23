// Service worker: laat de app offline werken in de kas.
// Verhoog CACHE bij elke nieuwe versie zodat telefoons de update ophalen.
const CACHE = 'plantmetingen-v1';
const SHELL = ['./', './index.html', './manifest.json', './icon.svg', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Eigen bestanden: eerst netwerk (nieuwste versie), anders cache (offline)
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(e.request)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
        .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Chart.js en lettertypes: uit cache, op de achtergrond bijwerken
  e.respondWith(
    caches.match(e.request).then(cached => {
      const net = fetch(e.request)
        .then(res => { if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return res; })
        .catch(() => cached);
      return cached || net;
    })
  );
});
