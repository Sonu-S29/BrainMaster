// src/serviceWorker.js

// This code is a basic setup to register the service worker.
// You can customize it according to your PWA needs.

// Check if the browser supports service workers
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname === '127.0.0.1'
);

// Register service worker to enable PWA
export function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The service worker will be registered if the app is in production mode.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      // Update the service worker URL to include the GitHub Pages base path
      const swUrl = `/BrainMaster/service-worker.js`;  // Adjust the path to include /BrainMaster/

      if (isLocalhost) {
        // In localhost, we need to ensure service workers work as expected.
        checkValidServiceWorker(swUrl);
      } else {
        // In production, we can just register the service worker directly.
        registerValidSW(swUrl);
      }
    });
  }
}

// Register the service worker in production mode
function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl, { scope: '/BrainMaster/' })  // Set scope to /BrainMaster/
    .then(registration => {
      console.log('Service Worker registered with scope: ', registration.scope);
    })
    .catch(error => {
      console.error('Service Worker registration failed: ', error);
    });
}

// Check if the service worker is valid in localhost (dev mode)
function checkValidServiceWorker(swUrl) {
  fetch(swUrl)
    .then(response => {
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        // Service worker file doesn't exist. Probably not a PWA.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister();
        });
      } else {
        // Service worker exists. Proceed with the registration.
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

// Unregister service worker (optional)
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}
