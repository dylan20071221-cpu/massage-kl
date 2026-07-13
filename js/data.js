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
  },
  {
    "id": 2,
    "name": "小美",
    "age": 26,
    "area": "Puchong",
    "coverBg": "linear-gradient(135deg, #f093fb, #f5576c)",
    "specialties": ["精油推拿", "脚底按摩", "淋巴排毒"],
    "rating": 4.6,
    "reviewCount": 98,
    "price": "RM 80/小时",
    "phone": "601114155848",
    "available": true,
    "experience": "5年经验",
    "height": "158cm",
    "weight": "48kg",
    "bust": "",
    "origin": "🇨🇳",
    "bio": "专精精油推拿和脚底穴位按摩，手法温柔细腻，第一次做按摩的客人都很喜欢。",
    "serviceRange": "Puchong及附近",
    "photos": [],
    "videoUrl": "",
    "services": [{"name": "精油推拿（1小时）", "price": "RM 80"}],
    "reviews": []
  },
  {
    "id": 3,
    "name": "小雅",
    "age": 24,
    "area": "Cheras",
    "coverBg": "linear-gradient(135deg, #a18cd1, #fbc2eb)",
    "specialties": ["泰式按摩", "古法拉伸"],
    "rating": 4.7,
    "reviewCount": 76,
    "price": "RM 90/小时",
    "phone": "601114155848",
    "available": true,
    "experience": "3年经验",
    "height": "162cm",
    "weight": "50kg",
    "bust": "C",
    "origin": "🇨🇳",
    "bio": "专业泰式按摩，擅长古法拉伸和穴位按压，让你全身放松。",
    "serviceRange": "Cheras及附近",
    "photos": [],
    "videoUrl": "",
    "services": [{"name": "泰式按摩（1小时）", "price": "RM 90"}],
    "reviews": []
  },
  {
    "id": 4,
    "name": "小雪",
    "age": 22,
    "area": "Kajang",
    "coverBg": "linear-gradient(135deg, #ffecd2, #fcb69f)",
    "specialties": ["足疗", "全身按摩"],
    "rating": 4.5,
    "reviewCount": 52,
    "price": "RM 70/小时",
    "phone": "601114155848",
    "available": true,
    "experience": "2年经验",
    "height": "160cm",
    "weight": "49kg",
    "bust": "B",
    "origin": "🇨🇳",
    "bio": "精通足底按摩和全身放松，价格实惠，服务周到。",
    "serviceRange": "Kajang及附近",
    "photos": [],
    "videoUrl": "",
    "services": [{"name": "足疗（1小时）", "price": "RM 70"}],
    "reviews": []
  },
  {
    "id": 5,
    "name": "小娜",
    "age": 23,
    "area": "Setapak",
    "coverBg": "linear-gradient(135deg, #89f7fe, #66a6ff)",
    "specialties": ["香薰按摩", "淋巴排毒"],
    "rating": 4.9,
    "reviewCount": 34,
    "price": "RM 100/小时",
    "phone": "601114155848",
    "available": true,
    "experience": "4年经验",
    "height": "165cm",
    "weight": "47kg",
    "bust": "C",
    "origin": "🇨🇳",
    "bio": "香薰按摩专家，环境舒适，手法轻柔，让你享受极致放松体验。",
    "serviceRange": "Setapak及附近",
    "photos": [],
    "videoUrl": "",
    "services": [{"name": "香薰按摩（1小时）", "price": "RM 100"}],
    "reviews": []
  },
  {
    "id": 6,
    "name": "Lina",
    "age": 25,
    "area": "Subang",
    "coverBg": "linear-gradient(135deg, #fccb90, #d57eeb)",
    "specialties": ["推拿", "刮痧"],
    "rating": 4.7,
    "reviewCount": 45,
    "price": "RM 85/小时",
    "phone": "601114155848",
    "available": true,
    "experience": "3年经验",
    "height": "163cm",
    "weight": "50kg",
    "bust": "C",
    "origin": "🇨🇳",
    "bio": "擅长中医推拿和刮痧，对肩颈酸痛有显著效果。",
    "serviceRange": "Subang及附近",
    "photos": [],
    "videoUrl": "",
    "services": [{"name": "推拿（1小时）", "price": "RM 85"}],
    "reviews": []
  }
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

  // 优先读取 localStorage（admin 后台动态配置），否则使用硬编码配置
  let url = localStorage.getItem('supabase_url');
  let key = localStorage.getItem('supabase_anon_key');

  if (!url || !key || url.includes('YOUR_PROJECT')) {
    // 尝试从 supabase-config.js 读取硬编码值
    if (typeof SUPABASE_URL !== 'undefined' && typeof SUPABASE_ANON_KEY !== 'undefined') {
      url = SUPABASE_URL;
      key = SUPABASE_ANON_KEY;
    }
  }

  if (!url || !key || url.includes('YOUR_PROJECT') || url.includes('YOUR')) {
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
