/**
 * 🦀 按按摩 - Service Worker
 * 缓存策略：Cache First + Network Fallback
 */

const CACHE_NAME = 'massage-kl-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/explore.html',
  '/chat.html',
  '/book.html',
  '/booking-success.html',
  '/technician.html',
  '/red-packet.html',
  '/admin.html',
  '/css/style.css',
  '/css/chat.css',
  '/css/red-packet.css',
  '/css/admin.css',
  '/js/data.js',
  '/js/app.js',
  '/js/chat.js',
  '/js/red-packet.js',
  '/js/admin.js',
  '/js/pwa.js',
  '/manifest.json'
];

// ===== 安装：预缓存核心文件 =====
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

// ===== 激活：清理旧缓存 =====
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// ===== 请求拦截：Cache First =====
self.addEventListener('fetch', (event) => {
  // 跳过非 GET 请求
  if (event.request.method !== 'GET') return;

  // 跳过 Vercel 部署相关的 API 请求
  if (event.request.url.includes('vercel') || event.request.url.includes('__openclaw')) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      // 有缓存则直接返回
      if (cached) return cached;

      // 无缓存则发起网络请求
      return fetch(event.request).then((response) => {
        // 只缓存成功的响应
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // 缓存 HTML/CSS/JS 等静态资源
        const url = new URL(event.request.url);
        if (
          url.pathname.endsWith('.html') ||
          url.pathname.endsWith('.css') ||
          url.pathname.endsWith('.js') ||
          url.pathname.endsWith('.json')
        ) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }

        return response;
      }).catch(() => {
        // 网络失败时返回离线页面
        return caches.match('/index.html');
      });
    })
  );
});
