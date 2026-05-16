const CACHE_NAME = "expense-management-v3";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./assets/css/styles.css",
  "./src/main.js",
  "./src/application/auth-service.js",
  "./src/application/dashboard-service.js",
  "./src/application/export-service.js",
  "./src/application/finance-service.js",
  "./src/domain/finance-calculations.js",
  "./src/domain/state.js",
  "./src/domain/validators.js",
  "./src/infrastructure/crypto-provider.js",
  "./src/infrastructure/local-storage-repository.js",
  "./src/presentation/dom-elements.js",
  "./src/presentation/icons.js",
  "./src/presentation/components/box-card.js",
  "./src/presentation/components/charts.js",
  "./src/presentation/components/toast.js",
  "./src/presentation/views/auth-view.js",
  "./src/presentation/views/dashboard-view.js",
  "./src/presentation/views/modal-view.js",
  "./src/shared/config.js",
  "./src/shared/date.js",
  "./src/shared/encoding.js",
  "./src/shared/html.js",
  "./src/shared/ids.js",
  "./src/shared/money.js",
  "./src/shared/text.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          if (response.ok && new URL(event.request.url).origin === location.origin) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => {
          if (event.request.mode === "navigate") return caches.match("./index.html");
          return caches.match(event.request);
        });
    })
  );
});
