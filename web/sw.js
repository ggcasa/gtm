const CACHE_NAME = 'gtm-v4';

// Punem doar fișierele sigure care există 100% în proiectul tău
const ASSETS_TO_CACHE = [
    '/',
    '/static/css/style.css',
    '/static/js/a11y.js',
    '/static/js/auth.js',
    '/static/js/operator-tools.js',
    '/static/js/app.js',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('SW: Se salvează fișierele de bază în cache...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('SW: Se șterge cache-ul vechi:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});