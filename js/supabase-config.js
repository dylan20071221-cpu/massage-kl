/**
 * 🦀 按按摩 - Supabase 配置
 *
 * 🔧 使用方式：
 * 1. 去 https://supabase.com 注册免费账号
 * 2. 创建新项目
 * 3. 在 Project Settings → API 里找到：
 *    - Project URL
 *    - anon public key
 * 4. 把下面的 SUPABASE_URL 和 SUPABASE_ANON_KEY 替换成你的
 * 5. 到 SQL Editor 执行 supabase/schema.sql
 * 6. 搞定！
 *
 * 注：也可以在 admin 管理后台里直接配置
 *     admin.html → 新增的 "☁️ 数据库设置" Tab
 */

const SUPABASE_URL = 'https://egyfdetycxlgwdtyuofc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVneWZkZXR5Y3hsZ3dkdHl1b2ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NTExNTcsImV4cCI6MjA5ODEyNzE1N30.0C4PReYQZP2w93Hp_ztJsWLnu2ajvxYAi61QMZhyuUk';

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
