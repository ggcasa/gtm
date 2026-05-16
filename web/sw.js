const CACHE_NAME = 'gtm-v1';

// Fișierele esențiale pe care le salvăm pentru a rula offline
const ASSETS_TO_CACHE = [
    '/',
    '/static/css/style.css',
    '/static/js/app.js',
    '/manifest.json',
    '/favicon.ico',
    '/static/icons/icon-192.png',
    '/static/icons/icon-512.png'
];

// 1. Evenimentul de Instalare: Salvăm fișierele în cache-ul browserului
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('SW: Fișierele de bază au fost salvate în cache!');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting(); // Activează noul SW imediat
});

// 2. Evenimentul de Activare: Ștergem cache-urile vechi dacă updatăm aplicația
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('SW: Curățat cache vechi:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// 3. Evenimentul de Fetch: Interceptăm cererile de rețea
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});