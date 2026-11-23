// Actualización rápida: index.html lleva todo el CSS y JavaScript.
const CACHE='ayc-service-pro-v2-quick-20261123';
const FILES=['./','./index.html'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('ayc-service-pro-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;e.respondWith((async()=>{const c=await caches.open(CACHE);try{const res=await fetch(e.request);if(res.ok)await c.put(e.request,res.clone());return res;}catch{return(await c.match(e.request,{ignoreSearch:true}))||(await c.match('./index.html'))||Response.error();}})());});
