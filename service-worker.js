const CACHE_NAME = "umforum8-v3";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",

  "./style/main.css",

  "./js/bind_polyfill.js",
  "./js/classlist_polyfill.js",
  "./js/animframe_polyfill.js",
  "./js/keyboard_input_manager.js",
  "./js/html_actuator.js",
  "./js/grid.js",
  "./js/tile.js",
  "./js/local_storage_manager.js",
  "./js/game_manager.js",
  "./js/application.js",

  "./favicon.ico",

  // если используешь картинки плиток
  "./assets/img/2.png",
  "./assets/img/4.png",
  "./assets/img/8.png",
  "./assets/img/16.png",
  "./assets/img/32.png",
  "./assets/img/64.png",
  "./assets/img/128.png",
  "./assets/img/256.png",
  "./assets/img/512.png",
  "./assets/img/1024.png",
  "./assets/img/2048.png"
];

// Установка — кэшируем всё
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Активация
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

// Перехват запросов (offline-first)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
