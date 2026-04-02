const CACHE_NAME = 'epsilon-heckle-v2'; // Bumped version
const ASSETS = [
    '/',
    '/index.html',
    './epsilon-heckle-logo.png',
    // We'll cache local files; CDNs are better handled dynamically
];

// Install: Cache local assets
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

// Activate: Clean up old versions so Warren's updates actually work
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

// Fetch: Network first, then Cache (better for dev) or Cache first (better for speed)
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => res || fetch(e.request))
    );
});