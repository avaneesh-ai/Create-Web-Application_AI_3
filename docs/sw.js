self.APP_CACHE = "access-app-v9";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(self.APP_CACHE).then((cache) =>
      cache.addAll(["./", "./index.html", "./styles.css", "./app.js", "./manifest.json", "./icon.svg"]),
    ),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== self.APP_CACHE).map((key) => caches.delete(key)))),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request)),
  );
});
