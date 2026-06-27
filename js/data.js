/**
 * 🦀 按按摩 - 技师数据
 * 支持静态数据 + Supabase 动态加载
 * Supabase 加载失败时自动 fallback 到本地数据
 */

// ===== 默认静态数据（作为 fallback） =====
const SITE_CONFIG_STATIC = {
  siteName: "大马顶级会所，顶级水疗",
  tagline: "我们服务宗旨：诚信经营：服务至上：怀着期待而来，装着满意而归，一次体验，此生无憾…",
  whatsappNumber: "601114155848",
  telegram: "Dong0155",
  areas: [
    "吉隆坡",
    "Cheras",
    "Puchong",
    "Kajang",
    "Setapak",
    "Subang",
    "Petaling Jaya",
    "Ampang"
  ],
};

const techniciansStatic = [
  {
    "id": 1,
    "name": "M588",
    "age": 21,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": ["莞式服务一条龙"],
    "rating": 4.8,
    "reviewCount": 15,
    "price": "2000RM/90min",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "168cm",
    "weight": "48kg",
    "bust": "D",
    "origin": "🇨🇳中国湖南",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [],
    "videoUrl": "",
    "services": [{"name": "莞式全套（90分钟）", "price": "2000RM"}],
    "reviews": []
  }
  // 👆 这里是 static fallback 数据
  // 启用 Supabase 后，数据从数据库加载，这个文件只需要保留基本结构
];

// ===== 运行时变量 =====
let SITE_CONFIG = { ...SITE_CONFIG_STATIC };
let technicians = [...techniciansStatic];

// ===== 工具函数 =====
function getTechnicianById(id) {
  return technicians.find(t => t.id === parseInt(id));
}
function getAllAreas() {
  return [...new Set(technicians.map(t => t.area))];
}
function getTechniciansByArea(area) {
  if (!area || area === "all") return technicians;
  return technicians.filter(t => t.area === area);
}

// ===== Supabase 数据加载 =====
async function loadFromSupabase() {
  if (typeof supabase === 'undefined') {
    console.warn('🦀 Supabase JS 库未加载');
    return false;
  }

  const url = localStorage.getItem('supabase_url');
  const key = localStorage.getItem('supabase_anon_key');

  if (!url || !key || url.includes('YOUR_PROJECT')) {
    console.warn('🦀 Supabase 未配置，使用本地数据');
    return false;
  }

  try {
    const sb = supabase.createClient(url, key);

    // 加载网站设置
    const { data: config, error: cfgErr } = await sb
      .from('site_config')
      .select('*')
      .eq('id', 1)
      .maybeSingle();

    if (cfgErr) throw cfgErr;

    if (config) {
      SITE_CONFIG = {
        siteName: config.site_name || SITE_CONFIG_STATIC.siteName,
        tagline: config.tagline || SITE_CONFIG_STATIC.tagline,
        whatsappNumber: config.whatsapp_number || SITE_CONFIG_STATIC.whatsappNumber,
        telegram: config.telegram || SITE_CONFIG_STATIC.telegram,
        areas: config.areas || SITE_CONFIG_STATIC.areas,
      };
    }

    // 加载技师
    const { data: techs, error: techErr } = await sb
      .from('technicians')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('id', { ascending: true });

    if (techErr) throw techErr;

    if (techs && techs.length > 0) {
      technicians = techs.map(t => ({
        id: t.id,
        name: t.name,
        age: t.age,
        area: t.area,
        coverBg: t.cover_bg,
        specialties: t.specialties || [],
        rating: t.rating,
        reviewCount: t.review_count,
        price: t.price,
        phone: t.phone || '',
        available: t.available,
        experience: t.experience || '',
        height: t.height || '',
        weight: t.weight || '',
        bust: t.bust || '',
        origin: t.origin || '',
        bio: t.bio || '',
        serviceRange: t.service_range || '',
        photos: t.photo_urls || [],
        videoUrl: t.video_url || '',
        services: t.services || [],
        reviews: t.reviews || [],
      }));
    }

    console.log('🦀 已从 Supabase 加载数据');
    return true;
  } catch (e) {
    console.warn('🦀 Supabase 加载失败，使用本地数据:', e.message);
    return false;
  }
}

// ===== 实时订阅 =====
let realtimeChannels = [];

function subscribeRealtime() {
  const url = localStorage.getItem('supabase_url');
  const key = localStorage.getItem('supabase_anon_key');
  if (!url || !key || url.includes('YOUR_PROJECT')) return;

  try {
    const sb = supabase.createClient(url, key);

    // 监听 site_config 变化
    const cfgChan = sb
      .channel('site-config-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'site_config', filter: 'id=eq.1' },
        async (payload) => {
          console.log('🦀 数据库设置已更新:', payload.new);
          const c = payload.new;
          SITE_CONFIG = {
            siteName: c.site_name || SITE_CONFIG.siteName,
            tagline: c.tagline || SITE_CONFIG.tagline,
            whatsappNumber: c.whatsapp_number || SITE_CONFIG.whatsappNumber,
            telegram: c.telegram || SITE_CONFIG.telegram,
            areas: c.areas || SITE_CONFIG.areas,
          };
          // 刷新页面
          document.title = SITE_CONFIG.siteName + ' - ' + SITE_CONFIG.tagline;
          const logo = document.querySelector('.logo');
          if (logo) logo.textContent = '🦀 ' + SITE_CONFIG.siteName;
          if (window.initSwipe) window.initSwipe();
          if (window.initExplore) window.initExplore();
        }
      )
      .subscribe((status) => console.log('🦀 site_config 订阅状态:', status));
    realtimeChannels.push(cfgChan);

    // 监听 technicians 变化
    const techChan = sb
      .channel('technicians-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'technicians' },
        async (payload) => {
          console.log('🦀 技师数据已更新:', payload.eventType);
          // 重新加载所有技师
          const { data: techs } = await sb
            .from('technicians')
            .select('*')
            .order('sort_order', { ascending: true })
            .order('id', { ascending: true });
          if (techs && techs.length > 0) {
            technicians = techs.map(t => ({
              id: t.id, name: t.name, age: t.age, area: t.area,
              coverBg: t.cover_bg, specialties: t.specialties || [],
              rating: t.rating, reviewCount: t.review_count, price: t.price,
              phone: t.phone || '', available: t.available,
              experience: t.experience || '', height: t.height || '',
              weight: t.weight || '', bust: t.bust || '',
              origin: t.origin || '', bio: t.bio || '',
              serviceRange: t.service_range || '',
              photos: t.photo_urls || [], videoUrl: t.video_url || '',
              services: t.services || [], reviews: t.reviews || [],
            }));
          }
          // 刷新页面
          if (window.initSwipe) window.initSwipe();
          if (window.initExplore) window.initExplore();
          if (window.initDetail) window.initDetail();
          if (window.initBooking) window.initBooking();
        }
      )
      .subscribe((status) => console.log('🦀 technicians 订阅状态:', status));
    realtimeChannels.push(techChan);

  } catch(e) {
    console.warn('🦀 实时订阅失败:', e.message);
  }
}

// ===== 初始化 =====
(async function init() {
  const loaded = await loadFromSupabase();
  if (loaded) {
    subscribeRealtime();
  }
  // 触发页面重新渲染
  if (window.initSwipe) window.initSwipe();
  if (window.initExplore) window.initExplore();
  if (window.initDetail) window.initDetail();
  if (window.initBooking) window.initBooking();
  if (window.initSuccess) window.initSuccess();
})();
