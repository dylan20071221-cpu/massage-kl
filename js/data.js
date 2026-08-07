/**
 * 🦀 按按摩 - 技师数据
 * 支持静态数据 + Supabase 动态加载
 * Supabase 加载失败时自动 fallback 到本地数据
 */

// ===== 默认静态数据（32位技师，2026-07-25 后台导出） =====
const SITE_CONFIG_STATIC = {
  "siteName": "大马顶级会所，顶级水疗",
  "tagline": "我们服务宗旨：诚信经营：服务至上：怀着期待而来，装着满意而归，一次体验，此生无憾…",
  "whatsappNumber": "601114155848",
  "telegram": "Dong0155",
  "areas": [
    "吉隆坡",
    "Cheras",
    "Puchong",
    "Kajang",
    "Setapak",
    "Subang",
    "Petaling Jaya",
    "Ampang"
  ]
};

const techniciansStatic = [
  {
    "id": 1,
    "name": "M866",
    "age": 25,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.8,
    "reviewCount": 15,
    "price": "1700RM/60min",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "165cm",
    "weight": "45kg",
    "bust": "C",
    "origin": "🇨🇳中国广东",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "1700RM"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "5600RM"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "3800RM"
      }
    ],
    "reviews": []
  },
  {
    "id": 2,
    "name": "M456",
    "age": 24,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #f093fb, #f5576c)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.6,
    "reviewCount": 22,
    "price": "1700RM/60min",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "167cm",
    "weight": "52kg",
    "bust": "C",
    "origin": "🇨🇳中国四川",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-19_22.03.01.jpeg",
      "images/photo_2026-07-19_22.03.15.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "1700RM"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "5600RM"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "3800RM"
      }
    ],
    "reviews": []
  },
  {
    "id": 3,
    "name": "M333",
    "age": 24,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #4facfe, #00f2fe)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.7,
    "reviewCount": 18,
    "price": "1700RM/60min",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "168cm",
    "weight": "48kg",
    "bust": "C",
    "origin": "🇨🇳中国广州",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-19_22.05.21.jpeg",
      "images/photo_2026-07-19_22.05.27.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "1700RM"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "5600RM"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "3800RM"
      }
    ],
    "reviews": []
  },
  {
    "id": 4,
    "name": "M567",
    "age": 24,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #a18cd1, #fbc2eb)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 12,
    "price": "1700RM/60min",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "168cm",
    "weight": "46kg",
    "bust": "C",
    "origin": "🇨🇳中国东北",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-19_22.06.32.jpeg",
      "images/photo_2026-07-19_22.06.36.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "1700RM"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "5600RM"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "3800RM"
      }
    ],
    "reviews": []
  },
  {
    "id": 5,
    "name": "M888",
    "age": 20,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #ffecd2, #fcb69f)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.9,
    "reviewCount": 30,
    "price": "1700RM/60min",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "169cm",
    "weight": "48kg",
    "bust": "D",
    "origin": "🇨🇳中国青岛",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-19_22.07.45.jpeg",
      "images/photo_2026-07-19_22.07.50.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "1700RM"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "5600RM"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "3800RM"
      }
    ],
    "reviews": []
  },
  {
    "id": 6,
    "name": "M999",
    "age": 22,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #fa709a, #fee140)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.4,
    "reviewCount": 8,
    "price": "1700RM/60min",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "168cm",
    "weight": "48kg",
    "bust": "C",
    "origin": "🇨🇳中国福建",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-25_13.41.34.jpeg",
      "images/photo_2026-07-25_13.41.37.jpeg",
      "images/photo_2026-07-25_13.41.40.jpeg",
      "images/photo_2026-07-25_13.41.44.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "1700RM"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "5600RM"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "3800RM"
      }
    ],
    "reviews": []
  },
  {
    "id": 7,
    "name": "C18",
    "age": 22,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 900/小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "158cm",
    "weight": "43kg",
    "bust": "B",
    "origin": "🇨🇳中国广东",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-19_22.10.25.jpeg",
      "images/photo_2026-07-19_22.10.32.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 900"
      },
      {
        "name": "莞式全套（90分钟）",
        "price": "RM 1500"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 4100"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 2800"
      }
    ],
    "reviews": []
  },
  {
    "id": 8,
    "name": "C69",
    "age": 24,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 900/小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "162cm",
    "weight": "50kg",
    "bust": "B",
    "origin": "🇻🇳越南",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-19_22.11.21.jpeg",
      "images/photo_2026-07-19_22.11.24.jpeg",
      "images/photo_2026-07-19_22.11.26.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 900"
      },
      {
        "name": "莞式全套（90分钟）",
        "price": "RM 1500"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 4100"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 2800"
      }
    ],
    "reviews": []
  },
  {
    "id": 9,
    "name": "C22",
    "age": 19,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 900/小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "160cm",
    "weight": "47kg",
    "bust": "B",
    "origin": "🇻🇳越南",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-19_21.43.08.jpeg",
      "images/photo_2026-07-19_21.43.12.jpeg",
      "images/photo_2026-07-19_21.44.00.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 900"
      },
      {
        "name": "莞式全套（90分钟）",
        "price": "RM 1500"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 4100"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 2800"
      }
    ],
    "reviews": []
  },
  {
    "id": 10,
    "name": "C15",
    "age": 23,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 900/小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "160cm",
    "weight": "47kg",
    "bust": "C",
    "origin": "🇻🇳越南",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-19_22.12.27.jpeg",
      "images/photo_2026-07-19_22.12.31.jpeg",
      "images/photo_2026-07-19_22.12.34.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 900"
      },
      {
        "name": "莞式全套（90分钟）",
        "price": "RM 1500"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 4100"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 2800"
      }
    ],
    "reviews": []
  },
  {
    "id": 11,
    "name": "C12",
    "age": 23,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 900/小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "170cm",
    "weight": "48kg",
    "bust": "B",
    "origin": "🇻🇳越南",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-19_22.13.55.jpeg",
      "images/photo_2026-07-19_22.14.07.jpeg",
      "images/photo_2026-07-19_22.14.09.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 900"
      },
      {
        "name": "莞式全套（90分钟）",
        "price": "RM 1500"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 4100"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 2800"
      }
    ],
    "reviews": []
  },
  {
    "id": 12,
    "name": "C70",
    "age": 25,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 900/小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "165cm",
    "weight": "48kg",
    "bust": "C",
    "origin": "🇻🇳越南",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-19_22.18.15.jpeg",
      "images/photo_2026-07-19_22.18.23.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 900"
      },
      {
        "name": "莞式全套（90分钟）",
        "price": "RM 1500"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 4100"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 2800"
      }
    ],
    "reviews": []
  },
  {
    "id": 14,
    "name": "T07",
    "age": 24,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 1400/1小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "167cm",
    "weight": "49kg",
    "bust": "B",
    "origin": "🇨🇳中国西安",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-19_22.23.09.jpeg",
      "images/photo_2026-07-19_22.23.12.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 1400"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 4700"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 3200"
      }
    ],
    "reviews": []
  },
  {
    "id": 15,
    "name": "T12",
    "age": 25,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 1400/1小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "160cm",
    "weight": "47kg",
    "bust": "C",
    "origin": "🇨🇳中国重庆",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-19_22.25.57.jpeg",
      "images/photo_2026-07-19_22.26.00.jpeg",
      "images/photo_2026-07-19_22.26.02.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 1400"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 4700"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 3200"
      }
    ],
    "reviews": []
  },
  {
    "id": 16,
    "name": "T03",
    "age": 25,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 1400/1小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "160cm",
    "weight": "51kg",
    "bust": "B",
    "origin": "🇨🇳中国湖南",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-19_22.26.52.jpeg",
      "images/photo_2026-07-19_22.26.57.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 1400"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 4700"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 3200"
      }
    ],
    "reviews": []
  },
  {
    "id": 17,
    "name": "T18",
    "age": 26,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 1400/1小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "168cm",
    "weight": "49kg",
    "bust": "B",
    "origin": "🇯🇵日本",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-19_22.28.30.jpeg",
      "images/photo_2026-07-19_22.28.39.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 1400"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 4700"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 3200"
      }
    ],
    "reviews": []
  },
  {
    "id": 18,
    "name": "T19",
    "age": 22,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 1400/1小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "163cm",
    "weight": "45kg",
    "bust": "C",
    "origin": "🇨🇳中国广西",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-19_23.46.26.jpeg",
      "images/photo_2026-07-19_23.46.33.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 1400"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 4700"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 3200"
      }
    ],
    "reviews": []
  },
  {
    "id": 19,
    "name": "T01",
    "age": 25,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 1400/1小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "160cm",
    "weight": "49kg",
    "bust": "D",
    "origin": "🇨🇳中国广西",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-19_23.54.43.jpeg",
      "images/photo_2026-07-19_23.54.47.jpeg",
      "images/photo_2026-07-19_23.54.51.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 1400"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 4700"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 3200"
      }
    ],
    "reviews": []
  },
  {
    "id": 20,
    "name": "T06",
    "age": 22,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 1400/1小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "164cm",
    "weight": "48kg",
    "bust": "B",
    "origin": "🇨🇳中国四川",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-19_23.58.47.jpeg",
      "images/photo_2026-07-19_23.58.50.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 1400"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 4700"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 3200"
      }
    ],
    "reviews": []
  },
  {
    "id": 21,
    "name": "T13",
    "age": 24,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 1400/1小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "163cm",
    "weight": "52kg",
    "bust": "B",
    "origin": "🇨🇳中国湖南",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-20_00.02.37.jpeg",
      "images/photo_2026-07-20_00.02.41.jpeg",
      "images/photo_2026-07-20_00.02.44.jpeg",
      "images/photo_2026-07-20_00.02.48.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 1400"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 4700"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 3200"
      }
    ],
    "reviews": []
  },
  {
    "id": 22,
    "name": "M688",
    "age": 25,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "1700RM/60min",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "169cm",
    "weight": "47kg",
    "bust": "C",
    "origin": "🇨🇳中国四川",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-20_00.05.10.jpeg",
      "images/photo_2026-07-20_00.05.13.jpeg",
      "images/photo_2026-07-20_00.05.17.jpeg",
      "images/photo_2026-07-20_00.05.21.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "1700RM"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "5600RM"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "3800RM"
      }
    ],
    "reviews": []
  },
  {
    "id": 23,
    "name": "M678",
    "age": 22,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "1700RM/60min",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "165cm",
    "weight": "45kg",
    "bust": "C",
    "origin": "🇫🇷法国",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-20_00.09.11.jpeg",
      "images/photo_2026-07-20_00.09.14.jpeg",
      "images/photo_2026-07-20_00.09.17.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "1700RM"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "5600RM"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "3800RM"
      }
    ],
    "reviews": []
  },
  {
    "id": 24,
    "name": "F2222",
    "age": 22,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 2000/1小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "168cm",
    "weight": "43kg",
    "bust": "B+",
    "origin": "🇨🇳中国西安",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-20_00.20.26.jpeg",
      "images/photo_2026-07-20_00.20.34.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 2000"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 6500"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 4400"
      }
    ],
    "reviews": []
  },
  {
    "id": 25,
    "name": "F5555",
    "age": 25,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 2000/1小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "180cm",
    "weight": "55kg",
    "bust": "C",
    "origin": "🇨🇳中国沈阳",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-20_00.24.07.jpeg",
      "images/photo_2026-07-20_00.24.37.jpeg",
      "images/photo_2026-07-20_00.24.45.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 2000"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 6500"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 4400"
      }
    ],
    "reviews": []
  },
  {
    "id": 26,
    "name": "F6666",
    "age": 23,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 2000/1小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "175cm",
    "weight": "48kg",
    "bust": "36D",
    "origin": "🇨🇳中国河北",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-20_00.41.36.jpeg",
      "images/photo_2026-07-20_00.41.52.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 2000"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 6500"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 4400"
      }
    ],
    "reviews": []
  },
  {
    "id": 27,
    "name": "F7777",
    "age": 22,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 2000/1小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "168cm",
    "weight": "44kg",
    "bust": "C",
    "origin": "🇨🇳中国四川",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-20_00.43.37.jpeg",
      "images/photo_2026-07-20_00.43.44.jpeg",
      "images/photo_2026-07-20_00.43.47.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 2000"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 6500"
      },
      {
        "name": "莞式全套（包夜4小时）",
        "price": "RM 4400"
      }
    ],
    "reviews": []
  },
  {
    "id": 28,
    "name": "C79",
    "age": 23,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 900/小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "168cm",
    "weight": "50kg",
    "bust": "C",
    "origin": "🇻🇳越南",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-25_14.16.31.jpeg",
      "images/photo_2026-07-25_14.16.34_(1).jpeg",
      "images/photo_2026-07-25_14.16.37_(1).jpeg",
      "images/photo_2026-07-25_14.16.41_(1).jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 900"
      },
      {
        "name": "莞式全套（90分钟）",
        "price": "RM 1500"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 2800"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 4100"
      }
    ],
    "reviews": []
  },
  {
    "id": 29,
    "name": "T29",
    "age": 18,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "RM 1400/1小时",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "160cm",
    "weight": "40kg",
    "bust": "A",
    "origin": "🇨🇳中国广东",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-25_15.01.24.jpeg",
      "images/photo_2026-07-25_15.01.29.jpeg",
      "images/photo_2026-07-25_15.01.32.jpeg",
      "images/photo_2026-07-25_15.01.35.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "RM 1400"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "RM 3200"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "RM 4700"
      }
    ],
    "reviews": []
  },
  {
    "id": 30,
    "name": "M520",
    "age": 25,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "1700RM/60min",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "170cm",
    "weight": "50kg",
    "bust": "C",
    "origin": "🇨🇳中国湖南",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-25_15.08.11.jpeg",
      "images/photo_2026-07-25_15.08.13.jpeg",
      "images/photo_2026-07-25_15.08.28.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式服务（60分钟）",
        "price": "1700RM"
      },
      {
        "name": "莞式服务（四次4小时）",
        "price": "3800RM"
      },
      {
        "name": "莞式服务（包夜8小时）",
        "price": "5600RM"
      }
    ],
    "reviews": []
  },
  {
    "id": 31,
    "name": "M123",
    "age": 24,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "1700RM/60min",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "165cm",
    "weight": "49kg",
    "bust": "C",
    "origin": "🇨🇳中国浙江",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-25_15.13.19.jpeg",
      "images/photo_2026-07-25_15.13.22.jpeg",
      "images/photo_2026-07-25_15.13.25.jpeg",
      "images/photo_2026-07-25_15.13.28.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "1700RM"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "3800RM"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "5600RM"
      }
    ],
    "reviews": []
  },
  {
    "id": 32,
    "name": "M789(AV女优)可潮喷可拍视频（另收费）",
    "age": 25,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "1700RM/60min",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "164cm",
    "weight": "50kg",
    "bust": "F",
    "origin": "🇨🇳中国台湾",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-25_15.19.19.jpeg",
      "images/photo_2026-07-25_15.19.28.jpeg"
    ],
    "videoUrl": "images/IMG_3469.MP4",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "1700RM"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "3800RM"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "5600RM"
      }
    ],
    "reviews": []
  },
  {
    "id": 33,
    "name": "M788",
    "age": 26,
    "area": "吉隆坡",
    "coverBg": "linear-gradient(135deg, #667eea, #764ba2)",
    "specialties": [
      "莞式服务一条龙"
    ],
    "rating": 4.5,
    "reviewCount": 0,
    "price": "1700RM/60min",
    "phone": "601114155848",
    "available": true,
    "experience": "",
    "height": "164cm",
    "weight": "50kg",
    "bust": "D",
    "origin": "🇨🇳中国浙江",
    "bio": "鸳鸯浴、十指弹琴、胸推过水、吸皮、环游、高山流水\n毒龙、口吹，口爆、按摩\n到店：可以免费接送\n上门：+100RM车费（偏远地区另算）",
    "serviceRange": "吉隆坡全范围",
    "photos": [
      "images/photo_2026-07-25_15.23.58.jpeg",
      "images/photo_2026-07-25_15.24.02.jpeg",
      "images/photo_2026-07-25_15.24.04.jpeg"
    ],
    "videoUrl": "",
    "services": [
      {
        "name": "莞式全套（60分钟）",
        "price": "1700RM"
      },
      {
        "name": "莞式全套（四次4小时）",
        "price": "3800RM"
      },
      {
        "name": "莞式全套（包夜8小时）",
        "price": "5600RM"
      }
    ],
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
