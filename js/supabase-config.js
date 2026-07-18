/**
 * 🦀 按按摩 - Supabase 配置
 */

const SUPABASE_URL = 'https://ovbomkiaaokrdyqaecfq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92Ym9ta2lhYW9rcmR5cWFlY2ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzOTIyOTMsImV4cCI6MjA5OTk2ODI5M30.ba8Wv1U5eVZg4wUsYuj1VaCLMrGSChmQzBx__KTgPnw';

// 挂载到 window 上，确保所有脚本都能访问
window.__SUPABASE_URL = SUPABASE_URL;
window.__SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;

// ===== 初始化 =====
let supabaseClient = null;

function initSupabase() {
  const savedUrl = localStorage.getItem('supabase_url');
  const savedKey = localStorage.getItem('supabase_anon_key');

  const url = savedUrl || SUPABASE_URL;
  const key = savedKey || SUPABASE_ANON_KEY;

  if (!url.includes('supabase.co') || key.length < 50) {
    console.warn('🦀 Supabase 未配置，使用本地数据');
    return null;
  }

  try {
    supabaseClient = supabase.createClient(url, key);
    return supabaseClient;
  } catch (e) {
    console.warn('🦀 Supabase 初始化失败:', e.message);
    return null;
  }
}
