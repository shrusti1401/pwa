const staticCacheName = "pwa-clothing-cache-v1";
const filesToCache = [
  './',
  './index.html',
  './offline.html'
];

// Install event
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

// Activate event
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== staticCacheName) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch event
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => caches.match('./offline.html'));
    })
  );
});
