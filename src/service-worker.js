/**
 * Check out https://googlechrome.github.io/sw-toolbox/docs/master/index.html for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
// self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
// self.toolbox.router.default = self.toolbox.networkFirst;

self.addEventListener('install', function(event){
  event.waitUntil(
    caches
    .open('tdc-first-cache')
    .then(function(cache) {
      return cache.addAll([
        './build/main.js',
        './build/main.css'
      ]);
    })
    .then(function(){
      console.log('[ServiceWorker] Ativo e cache pré-definido');
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== 'tdc-first-cache') {
          console.log('[ServiceWorker] Removido', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('sync', function(event) {
  console.log('[ServiceWorker] sync');
});


self.addEventListener('fetch', function(event) {
	console.log('[ServiceWorker] ' + event.request.url);
	event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
});