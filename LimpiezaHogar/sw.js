// sw.js — Service Worker (v1.0)
const CACHE = 'nexus-pwa-v2';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './img/logos/LOGO.png',
    './img/bg/fondo_tarjeta_digital_web.png',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(ASSETS).catch(() => {}))
    );
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;
    e.respondWith(
        caches.match(e.request).then(cached => {
            const fresh = fetch(e.request).then(resp => {
                if (resp && resp.status === 200 && resp.type !== 'opaque') {
                    const clone = resp.clone();
                    caches.open(CACHE).then(c => c.put(e.request, clone));
                }
                return resp;
            }).catch(() => cached);
            return cached || fresh;
        })
    );
});


