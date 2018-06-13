let CACHE_NAME = 'restaurant-v1';
let urlsToCache = [
  './',
  'restaurant.html',
  'css/styles.css',
  'js/main.js',
  'js/restaurant_info.js',
  'js/dbhelper.js',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
];

self.addEventListener('install', function(event) {
  // cache responses to requests for site assets
  event.waitUntil(
  	caches.open(CACHE_NAME).then( function(cache) {
  	  return cache.addAll(urlsToCache);
  	})
  )
});

// check the current cache and delete old version
self.addEventListener('activate', function(event) {
  console.log("new service working activating");
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cache) {
          if (CACHE_NAME.indexOf(cache) === -1) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});


self.addEventListener('fetch', function(event) {

  // check if restaurant.html is the request and customise the response
  if (event.request.url.includes('restaurant.html')) {
  	caches.match('restaurant.html').then(function(response) {
  	  return response;
  	});
  }
  // for all other requests use this
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );

})