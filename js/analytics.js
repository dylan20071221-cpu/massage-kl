/**
 * 🦀 按按摩 - Umami Analytics 跟踪脚本
 */
(function() {
  const UMAMI_URL = 'https://d0bde631cd377f.lhr.life';
  const WEBSITE_ID = '47384b7d-4d25-4293-9f69-c3b1e0e696e6';

  if (!UMAMI_URL || UMAMI_URL.includes('PLACEHOLDER')) return;

  const script = document.createElement('script');
  script.defer = true;
  script.src = UMAMI_URL + '/script.js';
  script.setAttribute('data-website-id', WEBSITE_ID);
  document.head.appendChild(script);
})();
