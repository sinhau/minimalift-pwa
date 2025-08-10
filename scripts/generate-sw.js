import fs from 'fs';
import path from 'path';

const basePath = '';

const swContent = `const CACHE_NAME = 'minimalift-v2';
const basePath = '${basePath}';
const urlsToCache = [
  basePath + '/',
  basePath + '/index.html',
  basePath + '/manifest.webmanifest',
  basePath + '/icons/icon-192.png',
  basePath + '/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .catch((error) => console.log('Cache addAll failed:', error))
  );
  // Don't skip waiting automatically - let the app control when to update
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
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension requests
  if (event.request.url.startsWith('chrome-extension://')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        // Clone the request because it can only be consumed once
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then((response) => {
          // Check if response is valid
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response because it can only be consumed once
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
            
          return response;
        }).catch((error) => {
          console.log('Fetch failed:', error);
          // For navigation requests, fallback to index.html
          if (event.request.mode === 'navigate') {
            return caches.match(basePath + '/index.html');
          }
          throw error;
        });
      })
  );
});

// Handle messages from the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('Received SKIP_WAITING message');
    self.skipWaiting();
  }
});`;

// Write to dist folder during build
const distPath = path.join(process.cwd(), 'dist', 'sw.js');
const distDir = path.dirname(distPath);

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(distPath, swContent);
console.log(`Generated service worker: ${distPath}`);