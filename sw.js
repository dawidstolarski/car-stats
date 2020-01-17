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
    "revision": "fbd86d8d50247684275f8cd94cde17f7"
  },
  {
    "url": "debug.log",
    "revision": "254d589337ceae96fe5a9ba3f3582f28"
  },
  {
    "url": "FileSaver.min.js",
    "revision": "3f24188b8cdbc5d4086af560a109ba29"
  },
  {
    "url": "index.html",
    "revision": "fe866cacf770a9821809b1bea29730d1"
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
    "revision": "a627ae817871c5bb9b03c9571c253c9c"
  },
  {
    "url": "xlsx.mini.min.js",
    "revision": "1fcb136d7f3c103b0b4999db100c883c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
