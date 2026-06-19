/**
 * 🦀 按按摩 - PWA 注册与状态
 */

// ===== Service Worker 注册 =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log('🦀 SW registered:', reg.scope);
    }).catch((err) => {
      console.warn('🦀 SW registration failed:', err);
    });
  });
}

// ===== 检测是否以 standalone 模式运行（添加到主屏幕） =====
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
  document.documentElement.classList.add('pwa-mode');
}
