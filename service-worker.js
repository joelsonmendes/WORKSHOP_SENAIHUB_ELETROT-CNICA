const CACHE_NAME = "aulao-fundamentos-eletricos-v1";

const FILES_TO_CACHE = [
  "index.html",
  "manifest.json",
  "css/style.css",
  "js/app.js",
  "js/utils.js",
  "js/dia01.js",
  "js/dia02.js",
  "js/dia03.js",
  "js/dia04.js",
  "js/dia05.js",
  "js/dia06.js",
  "js/dia07.js",
  "js/dia08.js",
  "pages/dia01-medicoes.html",
  "pages/dia02-ca.html",
  "pages/dia03-impedancia.html",
  "pages/dia04-potencia.html",
  "pages/dia05-fator-potencia.html",
  "pages/dia06-megometro.html",
  "pages/dia07-eletronica.html",
  "pages/dia08-desafio.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
