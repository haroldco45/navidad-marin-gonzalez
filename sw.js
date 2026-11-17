const CACHE = 'navidad-mg-v2';
const BASE = ['./', 'index.html', 'styles.css', 'app.js', 'actividades.json', 'manifest.json', 'img/foto-1.jpg', 'img/foto-4.jpg', 'img/icon-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  if (url.pathname.endsWith('.mp4')) return; // los videos van directo a la red
  if (url.pathname.endsWith('actividades.json')) {
    e.respondWith(fetch(e.request).then(r => { const copia = r.clone(); caches.open(CACHE).then(c => c.put('actividades.json', copia)); return r; })
      .catch(() => caches.match('actividades.json')));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
    const copia = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return res;
  })));
});
