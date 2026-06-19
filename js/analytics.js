/**
 * 🦀 按按摩 - Umami Analytics 跟踪脚本
 * 部署后替换 YOUR_UMAMI_URL 和 YOUR_WEBSITE_ID
 */

(function() {
  const UMAMI_URL = 'YOUR_UMAMI_URL';       // 例如：https://umami-analytics.vercel.app
  const WEBSITE_ID = 'YOUR_WEBSITE_ID';     // Umami 后台创建站点后获得的 ID

  if (!UMAMI_URL || UMAMI_URL.includes('YOUR_UMAMI')) return;

  const script = document.createElement('script');
  script.defer = true;
  script.src = UMAMI_URL + '/script.js';
  script.setAttribute('data-website-id', WEBSITE_ID);
  document.head.appendChild(script);
})();
