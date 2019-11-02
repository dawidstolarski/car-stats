/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "app.js",
    "revision": "8c38dc328c366f2cfc8ae96891b12a4e"
  },
  {
    "url": "debug.log",
    "revision": "34c6e190edc778949432ce238047640b"
  },
  {
    "url": "FileSaver.min.js",
    "revision": "3f24188b8cdbc5d4086af560a109ba29"
  },
  {
    "url": "index.html",
    "revision": "4b4ddaaca88153bd715050b528b766b2"
  },
  {
    "url": "logo-leszekkeu.svg",
    "revision": "8378a25e2e59db8906127e90839b39de"
  },
  {
    "url": "materialize.min.css",
    "revision": "ec1df3ba49973dcb9ff212f052d39483"
  },
  {
    "url": "materialize.min.js",
    "revision": "5dcfc8944ed380b2215dc28b3f13835f"
  },
  {
    "url": "style.css",
    "revision": "bf3c858cc2f5fb228d2b17ee9a0c6bb7"
  },
  {
    "url": "xlsx.mini.min.js",
    "revision": "1fcb136d7f3c103b0b4999db100c883c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
