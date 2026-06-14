const CACHE_NAME = "hamrah-govahiname-v1";
const ASSETS = [
  "/hamrah-govahiname/",
  "/hamrah-govahiname/index.html",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
