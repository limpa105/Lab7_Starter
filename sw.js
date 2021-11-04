// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab-7-starter';
const urlsToCache = ['/', 'assets/scripts/main.js', 'assets/scripts/Router.js', 'assets/styles/main.css',
  '/index.html'];

// Once the service worker has been installed, feed it some initial URLs to cache
// Using code from 
// https://developers.google.com/web/fundamentals/primers/service-workers#cache_and_return_requests
self.addEventListener('install', function (event) {
  console.log("Hello")
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Loading into Cache');
        return cache.addAll(urlsToCache);
  }))
  

  /**
   * TODO - Part 2 Step 2
   * Create a function as outlined above
   */
});

/**
 * Once the service worker 'activates', this makes it so clients loaded
 * in the same scope do not need to be reloaded before their fetches will
 * go through this service worker
 */
self.addEventListener('activate', function (event) {
  event.waitUntil(clients.claim());
})
  /**
   * TODO - Part 2 Step 3
   * Create a function as outlined above, it should be one line
   */


// Intercept fetch requests and store them in the cache
// using code from 
// https://developers.google.com/web/fundamentals/primers/service-workers#cache_and_return_requests
self.addEventListener('fetch', function (event) {
  event.respondWith(
    // Intercepting the fetched response
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();
            // Caching the responses
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
    );
});
  /**
   * TODO - Part 2 Step 4
   * Create a function as outlined above
   */