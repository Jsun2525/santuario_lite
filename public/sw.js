const CACHE_NAME = "inner-path-v2";
const AUDIO_CACHE = "inner-path-audio-v1";
const STATIC_CACHE = "inner-path-static-v1";

const PRECACHE_URLS = [
    "/",
    "/manifest.json",
    "/favicon.ico",
    "/offline"
];

self.addEventListener("install", (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            return cache.addAll(PRECACHE_URLS);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (![CACHE_NAME, AUDIO_CACHE, STATIC_CACHE].includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // 1. Audio and Images (Supabase Storage or /sounds) -> Cache First, then Network
    if (url.pathname.endsWith('.mp3') || url.pathname.endsWith('.wav') || url.pathname.includes('/storage/v1/object/public/')) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) return cachedResponse;

                return fetch(event.request).then((networkResponse) => {
                    if (networkResponse.ok) {
                        const clonedResponse = networkResponse.clone();
                        caches.open(AUDIO_CACHE).then((cache) => {
                            cache.put(event.request, clonedResponse);
                        });
                    }
                    return networkResponse;
                }).catch(() => {
                    // Offline fallback for audio could be a specific offline sound or just fail silently
                    return new Response(null, { status: 404, statusText: "Offline Audio Not Cached" });
                });
            })
        );
        return;
    }

    // 2. Next.js Static Assets (_next/static/) -> Cache First, then Network
    if (url.pathname.startsWith('/_next/static/')) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || fetch(event.request).then((networkResponse) => {
                    const cloned = networkResponse.clone();
                    caches.open(STATIC_CACHE).then(cache => cache.put(event.request, cloned));
                    return networkResponse;
                });
            })
        );
        return;
    }

    // 3. API Requests (Supabase Postgrest / Auth / n8n Webhooks) -> Network ONLY (don't cache sensitive data)
    if (event.request.method !== 'GET' || url.pathname.startsWith('/rest/v1/') || url.pathname.startsWith('/auth/v1/')) {
        event.respondWith(fetch(event.request));
        return;
    }

    // 4. Everything else (HTML navigations) -> Network First, then Cache
    event.respondWith(
        fetch(event.request).then((networkResponse) => {
            const cloned = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
            return networkResponse;
        }).catch(async () => {
            const cached = await caches.match(event.request);
            if (cached) return cached;

            // If it's a page navigation request, return offline fallback page
            if (event.request.mode === 'navigate') {
                const offlineCache = await caches.open(STATIC_CACHE);
                return offlineCache.match('/offline');
            }
        })
    );
});
