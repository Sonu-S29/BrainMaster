const CACHE_NAME = 'math-workout-v1';
const urlsToCache = [
  '/BrainMaster/',  // Ensure the base path is used
  '/BrainMaster/index.html',
  '/BrainMaster/static/js/bundle.js',
  '/BrainMaster/static/css/main.css',
  '/BrainMaster/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
    )
  });

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
