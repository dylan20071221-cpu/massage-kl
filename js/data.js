/**
 * 🦀 按按摩 - 技师数据
 * 懂懂，改技师信息就在这里！
 */

const SITE_CONFIG = {
  siteName: "按按摩",
  tagline: "大马正规按摩 · 上门预约",
  whatsappNumber: "601114155848",
  areas: ["吉隆坡", "Cheras", "Puchong", "Kajang", "Setapak", "Subang", "Petaling Jaya", "Ampang"],
};

const technicians = [
  {
    id: 1, name: "小玲", age: 28, area: "Cheras",
    coverBg: "linear-gradient(135deg, #667eea, #764ba2)",
    specialties: ["泰式按摩", "肩颈理疗", "精油推拿"],
    rating: 4.8, reviewCount: 126, price: "RM 90/小时",
    phone: "601114155848", available: true,
    videoUrl: "", photos: [],
    experience: "8年经验", height: "162cm", weight: "52kg",
    bio: "精通泰式古法按摩，擅长肩颈放松和全身拉伸。上门服务态度好，准时守约，顾客回头率极高。",
    serviceRange: "Cheras及周边5公里",
    services: [
      { name: "泰式按摩（1小时）", price: "RM 90" },
      { name: "肩颈理疗（45分钟）", price: "RM 70" },
      { name: "全身精油推拿（1.5小时）", price: "RM 130" },
    ],
    reviews: [
      { user: "匿名用户", rating: 5, text: "手法很好，按完整个人都松了" },
      { user: "Alex", rating: 5, text: "准时上门，态度好，推荐！" },
    ],
  },
  {
    id: 2, name: "小美", age: 26, area: "Puchong",
    coverBg: "linear-gradient(135deg, #f093fb, #f5576c)",
    specialties: ["精油推拿", "脚底按摩", "淋巴排毒"],
    rating: 4.6, reviewCount: 98, price: "RM 80/小时",
    phone: "601114155848", available: true,
    videoUrl: "", photos: [],
    experience: "5年经验", height: "158cm", weight: "48kg",
    bio: "专精精油推拿和脚底穴位按摩，手法温柔细腻，第一次做按摩的客人都很喜欢。",
    serviceRange: "Puchong及附近",
    services: [
      { name: "精油推拿（1小时）", price: "RM 80" },
      { name: "脚底按摩（45分钟）", price: "RM 60" },
      { name: "淋巴排毒（1.5小时）", price: "RM 120" },
    ],
    reviews: [
      { user: "Ken", rating: 5, text: "小美人很温柔，按得很舒服" },
      { user: "薇薇", rating: 4, text: "手法不错，推荐" },
    ],
  },
  {
    id: 3, name: "丽丽", age: 32, area: "吉隆坡",
    coverBg: "linear-gradient(135deg, #4facfe, #00f2fe)",
    specialties: ["传统马来按摩", "产后修复", "全身拉伸"],
    rating: 4.9, reviewCount: 203, price: "RM 100/小时",
    phone: "601114155848", available: true,
    videoUrl: "", photos: [],
    experience: "12年经验", height: "165cm", weight: "55kg",
    bio: "资深按摩师，专长传统马来按摩和产后修复。手法老道、力道精准，很多老顾客跟了她好几年。",
    serviceRange: "吉隆坡市区",
    services: [
      { name: "传统马来按摩（1小时）", price: "RM 100" },
      { name: "产后修复（1.5小时）", price: "RM 150" },
      { name: "全身拉伸放松（1小时）", price: "RM 90" },
    ],
    reviews: [
      { user: "江先生", rating: 5, text: "做了半年多的老顾客了" },
      { user: "May", rating: 5, text: "产后恢复得很好" },
    ],
  },
  {
    id: 4, name: "小花", age: 27, area: "Kajang",
    coverBg: "linear-gradient(135deg, #a18cd1, #fbc2eb)",
    specialties: ["中式推拿", "拔罐刮痧", "穴位按摩"],
    rating: 4.7, reviewCount: 75, price: "RM 85/小时",
    phone: "601114155848", available: true,
    videoUrl: "", photos: [],
    experience: "7年经验", height: "160cm", weight: "50kg",
    bio: "正宗中式推拿手法，兼修拔罐刮痧。擅长缓解肌肉酸痛，常年坐办公室的最爱。",
    serviceRange: "Kajang及周边",
    services: [
      { name: "中式推拿（1小时）", price: "RM 85" },
      { name: "拔罐刮痧（45分钟）", price: "RM 65" },
      { name: "综合理疗（1.5小时）", price: "RM 120" },
    ],
    reviews: [
      { user: "程序员小王", rating: 5, text: "肩膀终于不酸了" },
      { user: "Lisa", rating: 4, text: "拔罐力度刚好" },
    ],
  },
  {
    id: 5, name: "Yuki", age: 25, area: "Setapak",
    coverBg: "linear-gradient(135deg, #fccb90, #d57eeb)",
    specialties: ["日式指压", "头部SPA", "香薰按摩"],
    rating: 4.5, reviewCount: 62, price: "RM 95/小时",
    phone: "601114155848", available: true,
    videoUrl: "", photos: [],
    experience: "4年经验", height: "156cm", weight: "46kg",
    bio: "日式指压技法，配合头部SPA和芳香疗法。年轻有活力，服务态度超好。",
    serviceRange: "Setapak / Wangsa Maju",
    services: [
      { name: "日式指压（1小时）", price: "RM 95" },
      { name: "头部SPA（45分钟）", price: "RM 75" },
      { name: "香薰放松套餐（1.5小时）", price: "RM 140" },
    ],
    reviews: [
      { user: "Eric", rating: 5, text: "头部SPA太舒服了" },
    ],
  },
  {
    id: 6, name: "阿May", age: 34, area: "Subang",
    coverBg: "linear-gradient(135deg, #5ee7df, #b490ca)",
    specialties: ["泰式按摩", "热石理疗", "深层组织"],
    rating: 4.8, reviewCount: 154, price: "RM 110/小时",
    phone: "601114155848", available: true,
    videoUrl: "", photos: [],
    experience: "10年经验", height: "163cm", weight: "54kg",
    bio: "泰式按摩和热石理疗，手法有力到位。常年肌肉酸痛的朋友找她准没错。",
    serviceRange: "Subang / USJ",
    services: [
      { name: "泰式按摩（1小时）", price: "RM 110" },
      { name: "热石理疗（1.5小时）", price: "RM 160" },
      { name: "深层组织放松（2小时）", price: "RM 200" },
    ],
    reviews: [
      { user: "阿Ben", rating: 5, text: "May姐力度够" },
    ],
  },
  {
    id: 7, name: "小玉", age: 29, area: "Petaling Jaya",
    coverBg: "linear-gradient(135deg, #fa709a, #fee140)",
    specialties: ["泰式按摩", "精油推拿"],
    rating: 4.7, reviewCount: 88, price: "RM 85/小时",
    phone: "601114155848", available: true,
    videoUrl: "", photos: [],
    experience: "6年经验", height: "160cm", weight: "51kg",
    bio: "热情开朗，手法灵活多变，根据客人身体状况调整。",
    serviceRange: "PJ / Damansara",
    services: [
      { name: "泰式按摩（1小时）", price: "RM 85" },
      { name: "精油推拿（1小时）", price: "RM 85" },
      { name: "全身放松（1.5小时）", price: "RM 120" },
    ],
    reviews: [
      { user: "David", rating: 5, text: "小玉很专业" },
    ],
  },
  {
    id: 8, name: "Coco", age: 24, area: "Cheras",
    coverBg: "linear-gradient(135deg, #ffecd2, #fcb69f)",
    specialties: ["精油推拿", "香薰SPA", "热石"],
    rating: 4.4, reviewCount: 45, price: "RM 95/小时",
    phone: "601114155848", available: true,
    videoUrl: "", photos: [],
    experience: "3年经验", height: "165cm", weight: "50kg",
    bio: "年轻时尚，擅长精油推拿和香薰SPA。手法温柔细腻。",
    serviceRange: "Cheras",
    services: [
      { name: "精油推拿（1小时）", price: "RM 95" },
      { name: "香薰SPA（1.5小时）", price: "RM 140" },
      { name: "热石放松（1小时）", price: "RM 100" },
    ],
    reviews: [
      { user: "阿杰", rating: 5, text: "Coco环境香香的" },
    ],
  },
];

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
