// =============================================
//  🧧 红包局 - 陪酒女孩展示
// =============================================

// ===== 陪酒女孩数据 =====
const barGirls = [
  {
    id: 1,
    name: "Luna",
    age: 22,
    area: "吉隆坡",
    mode: "陪酒",
    coverBg: "linear-gradient(135deg, #FF2D55, #FF6B35)",
    specialties: ["红酒", "威士忌", "划拳"],
    rating: 4.9,
    reviewCount: 88,
    price: "RM 500/晚",
    phone: "601114155848",
    available: true,
    experience: "3年",
    height: "168cm",
    weight: "50kg",
    bust: "C",
    origin: "🇨🇳 中国成都",
    bio: "性格开朗大方，擅长红酒调配和各地酒桌文化。能陪你喝到尽兴，也能陪你聊到天亮。气氛担当，不冷场。",
    serviceRange: "吉隆坡市区",
    languages: ["中文", "英文", "粤语"],
    photos: [],
    videoUrl: "",
    services: [
      { name: "陪酒（包晚）", price: "RM 500" },
      { name: "KTV 包厢陪酒（4小时）", price: "RM 300" },
      { name: "商务饭局陪同", price: "RM 800" }
    ],
    reviews: [
      { user: "陈先生", rating: 5, text: "Luna真的很会带动气氛，整晚都很开心" },
      { user: "阿豪", rating: 5, text: "酒量好又不会硬劝，很舒服" }
    ]
  },
  {
    id: 2,
    name: "Yuna",
    age: 20,
    area: "Cheras",
    mode: "陪酒",
    coverBg: "linear-gradient(135deg, #FF6B6B, #C56CF0)",
    specialties: ["清酒", "鸡尾酒", "骰子游戏"],
    rating: 4.7,
    reviewCount: 65,
    price: "RM 400/晚",
    phone: "601114155848",
    available: true,
    experience: "2年",
    height: "162cm",
    weight: "47kg",
    bust: "B",
    origin: "🇯🇵 日本大阪",
    bio: "日式清酒品鉴师，精通各款鸡尾酒调配。气质温柔甜美，适合安静聊天的场合。偶尔会即兴唱几首日文歌。",
    serviceRange: "Cheras / 吉隆坡",
    languages: ["日语", "英文", "中文基础"],
    photos: [],
    videoUrl: "",
    services: [
      { name: "陪酒（包晚）", price: "RM 400" },
      { name: "清酒品鉴（2小时）", price: "RM 250" },
      { name: "酒吧陪同", price: "RM 350" }
    ],
    reviews: [
      { user: "Ken", rating: 5, text: "Yuna很温柔，聊天很舒服" },
      { user: "Jacky", rating: 4, text: "调的酒很好喝" }
    ]
  },
  {
    id: 3,
    name: "Vicky",
    age: 24,
    area: "吉隆坡",
    mode: "KTV",
    coverBg: "linear-gradient(135deg, #FC354C, #0ABFBC)",
    specialties: ["KTV陪唱", "划拳", "红酒"],
    rating: 4.8,
    reviewCount: 120,
    price: "RM 600/晚",
    phone: "601114155848",
    available: true,
    experience: "5年",
    height: "170cm",
    weight: "53kg",
    bust: "D",
    origin: "🇲🇾 马来西亚",
    bio: "KTV女王，中英粤三语歌曲随时点唱。气氛火热，人缘极好。各大夜场常驻嘉宾，会划拳会玩骰。",
    serviceRange: "吉隆坡 / 各大KTV",
    languages: ["中文", "英文", "粤语", "马来语"],
    photos: [],
    videoUrl: "",
    services: [
      { name: "KTV 包厢陪唱（包晚）", price: "RM 600" },
      { name: "夜店陪同", price: "RM 500" },
      { name: "生日派对助兴", price: "RM 800" }
    ],
    reviews: [
      { user: "Alex", rating: 5, text: "Vicky唱歌是真的好听！" },
      { user: "阿Ben", rating: 5, text: "她一来气氛直接拉满" },
      { user: "小马", rating: 5, text: "很会照顾人，喝多了会照顾你" }
    ]
  },
  {
    id: 4,
    name: "Mika",
    age: 21,
    area: "Puchong",
    mode: "陪酒",
    coverBg: "linear-gradient(135deg, #A18CD1, #FBC2EB)",
    specialties: ["香槟", "红酒", "聊天"],
    rating: 4.6,
    reviewCount: 42,
    price: "RM 350/晚",
    phone: "601114155848",
    available: true,
    experience: "1年",
    height: "158cm",
    weight: "44kg",
    bust: "A",
    origin: "🇹🇭 泰国曼谷",
    bio: "泰国妹妹新手出道，清纯可爱。酒量一般，但乖巧听话，适合喜欢清纯类型的客人。",
    serviceRange: "Puchong / Subang",
    languages: ["泰语", "英文", "中文简单"],
    photos: [],
    videoUrl: "",
    services: [
      { name: "陪酒（包晚）", price: "RM 350" },
      { name: "酒局陪玩（3小时）", price: "RM 250" }
    ],
    reviews: [
      { user: "Tan", rating: 5, text: "Mika很乖，很听话" },
      { user: "Wei", rating: 4, text: "新手但很努力" }
    ]
  },
  {
    id: 5,
    name: "Krystal",
    age: 23,
    area: "吉隆坡",
    mode: "DJ",
    coverBg: "linear-gradient(135deg, #667eea, #764ba2)",
    specialties: ["打碟", "电音", "派对"],
    rating: 4.9,
    reviewCount: 156,
    price: "RM 1500/晚",
    phone: "601114155848",
    available: true,
    experience: "6年",
    height: "165cm",
    weight: "50kg",
    bust: "B",
    origin: "🇰🇷 韩国首尔",
    bio: "专业女 DJ，曾在首尔各大夜店驻场。技术过硬，懂得看气氛调节音乐。可接私人派对、夜店演出。自带设备。",
    serviceRange: "全马",
    languages: ["韩语", "英文", "中文基础"],
    photos: [],
    videoUrl: "",
    services: [
      { name: "私人派对打碟（4小时）", price: "RM 1500" },
      { name: "夜店驻场（一晚）", price: "RM 2500" },
      { name: "生日宴演出", price: "RM 1800" }
    ],
    reviews: [
      { user: "夜店王经理", rating: 5, text: "Krystal专业水准，气氛掌控一流" },
      { user: "阿强", rating: 5, text: "私人派对找她，整晚嗨到爆" }
    ]
  },
  {
    id: 6,
    name: "Coco",
    age: 22,
    area: "Subang",
    mode: "KTV",
    coverBg: "linear-gradient(135deg, #ffecd2, #fcb69f)",
    specialties: ["华语金曲", "划拳", "红酒"],
    rating: 4.7,
    reviewCount: 78,
    price: "RM 450/晚",
    phone: "601114155848",
    available: true,
    experience: "3年",
    height: "163cm",
    weight: "49kg",
    bust: "C",
    origin: "🇨🇳 中国上海",
    bio: "上海姑娘，气质出众。华语老歌新歌都会唱，陪你从邓丽君唱到周杰伦。酒品好人品更好。",
    serviceRange: "Subang / PJ",
    languages: ["中文", "英文", "上海话"],
    photos: [],
    videoUrl: "",
    services: [
      { name: "KTV 包厢（包晚）", price: "RM 450" },
      { name: "商务陪同", price: "RM 700" },
      { name: "红酒品鉴（2小时）", price: "RM 300" }
    ],
    reviews: [
      { user: "老张", rating: 5, text: "Coco唱歌好听，气质也好" },
      { user: "小明", rating: 5, text: "上海女人就是有味道" }
    ]
  },
  {
    id: 7,
    name: "Bella",
    age: 25,
    area: "Cheras",
    mode: "陪酒",
    coverBg: "linear-gradient(135deg, #f093fb, #f5576c)",
    specialties: ["威士忌", "扑克", "气氛"],
    rating: 4.8,
    reviewCount: 95,
    price: "RM 550/晚",
    phone: "601114155848",
    available: true,
    experience: "4年",
    height: "166cm",
    weight: "52kg",
    bust: "D",
    origin: "🇻🇳 越南胡志明",
    bio: "火辣越南妹，身材超好。威士忌是强项，扑克骰子划拳样样精通。性格直爽大方，包你玩得开心。",
    serviceRange: "Cheras / 吉隆坡",
    languages: ["越南语", "英文", "中文简单"],
    photos: [],
    videoUrl: "",
    services: [
      { name: "陪酒（包晚）", price: "RM 550" },
      { name: "酒局游戏（4小时）", price: "RM 350" },
      { name: "夜场陪同", price: "RM 500" }
    ],
    reviews: [
      { user: "Ah Meng", rating: 5, text: "Bella太辣了，而且很会玩" },
      { user: "Jason", rating: 5, text: "划拳输了一晚上，但很开心" }
    ]
  },
  {
    id: 8,
    name: "Suki",
    age: 19,
    area: "吉隆坡",
    mode: "陪酒",
    coverBg: "linear-gradient(135deg, #fccb90, #d57eeb)",
    specialties: ["清纯陪伴", "聊天", "奶茶局"],
    rating: 4.5,
    reviewCount: 33,
    price: "RM 300/晚",
    phone: "601114155848",
    available: true,
    experience: "新人",
    height: "160cm",
    weight: "46kg",
    bust: "A",
    origin: "🇲🇾 马来西亚",
    bio: "刚出道的小妹妹，清纯学生妹类型。不抽烟不喝酒，适合纯聊天陪玩的客人。可爱乖巧，让人想保护的类型。",
    serviceRange: "吉隆坡临近",
    languages: ["中文", "英文", "马来语"],
    photos: [],
    videoUrl: "",
    services: [
      { name: "纯陪玩聊天（包晚）", price: "RM 300" },
      { name: "奶茶局（2小时）", price: "RM 150" },
      { name: "逛街陪同（3小时）", price: "RM 200" }
    ],
    reviews: [
      { user: "阿杰", rating: 5, text: "Suki真的很可爱，就像邻家妹妹" },
      { user: "David", rating: 4, text: "不喝酒也能玩得很开心" }
    ]
  }
];

// ===== 状态 =====
let currentGirls = [];
let currentIdx = 0;
let currentMode = 'all';
let currentView = 'card'; // 'card' | 'list'
let isAnimating = false;
let startX = 0, startY = 0, isDragging = false;
let cardEl = null;

// ===== 初始化导航 =====
document.addEventListener('DOMContentLoaded', () => {
  // 默认高亮全部
  document.querySelector('.rp-nav-item[data-mode="all"]').classList.add('active');
  filterByMode('all');
});

// ===== 模式筛选 =====
function filterByMode(mode) {
  currentMode = mode;
  currentIdx = 0;

  document.querySelectorAll('.rp-nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.mode === mode);
  });

  if (mode === 'all') {
    currentGirls = [...barGirls];
  } else {
    currentGirls = barGirls.filter(g => g.mode === mode);
  }

  renderStack();
  renderActions();
  if (currentView === 'list') renderList();
}

// ===== 渲染卡片堆栈 =====
function renderStack() {
  const stack = document.getElementById('cardStack');
  if (!stack) return;

  if (currentView === 'list') {
    stack.innerHTML = '';
    return;
  }

  if (!currentGirls.length || currentIdx >= currentGirls.length) {
    stack.innerHTML = `
      <div class="rp-no-more">
        <div class="emoji">🍸</div>
        <h3>这轮看完了</h3>
        <p>更多小姐姐稍后就来</p>
        <button class="btn-reset" onclick="resetCards()">重新看看</button>
      </div>
    `;
    return;
  }

  const g = currentGirls[currentIdx];
  const photos = g.photos || [];
  const hasPhoto = photos.length > 0 && (photos[0].startsWith('data:') || photos[0].startsWith('http'));

  stack.innerHTML = `
    <div class="swipe-card" id="swipeCard">
      <div class="card-media rp-card-media" style="background:${hasPhoto ? '#000' : g.coverBg};${hasPhoto ? 'background-image:url('+photos[0]+');background-size:cover;background-position:center;' : ''}">
        ${hasPhoto ? '' : getModeEmoji(g.mode)}
      </div>
      <div class="card-overlay"></div>
      <div class="rp-card-badge">${g.mode === '陪酒' ? '🥂' : g.mode === 'KTV' ? '🎤' : '🎧'} ${g.mode}</div>
      <div class="rp-card-price-tag">💰 ${g.price}</div>
      <div class="card-label like">❤️ 喜欢</div>
      <div class="card-label nope">👋 跳过</div>
      <div class="card-counter">${currentIdx + 1}/${currentGirls.length}</div>
      <div class="rp-card-info">
        <div class="rp-card-tags">
          ${g.specialties.slice(0,3).map(s => `<span class="rp-card-tag">#${s}</span>`).join('')}
        </div>
        <div class="rp-card-name">${g.name} <span>${g.age}岁</span></div>
        <div class="rp-card-meta">
          <span>📍 ${g.area}</span>
          <span>⏳ ${g.experience}</span>
          <span>🌏 ${g.origin}</span>
          <span>⭐ ${g.rating}</span>
        </div>
        <div class="rp-card-desc">${g.bio.slice(0, 60)}${g.bio.length > 60 ? '...' : ''}</div>
      </div>
    </div>
  `;

  cardEl = document.getElementById('swipeCard');
  bindSwipeEvents();
}

function getModeEmoji(mode) {
  switch(mode) {
    case '陪酒': return '🥂';
    case 'KTV': return '🎤';
    case 'DJ': return '🎧';
    default: return '🍸';
  }
}

// ===== 渲染操作栏 =====
function renderActions() {
  const bar = document.getElementById('actionBar');
  if (!bar) return;

  if (currentView === 'list' || !currentGirls.length || currentIdx >= currentGirls.length) {
    bar.innerHTML = '';
    return;
  }

  bar.innerHTML = `
    <div style="text-align:center;">
      <button class="rp-action-btn pass" onclick="swipeNope()">✕</button>
      <div class="rp-action-label">跳过</div>
    </div>
    <div style="text-align:center;">
      <button class="rp-action-btn invite" onclick="inviteGirl()">🍸</button>
      <div class="rp-action-label">邀约</div>
    </div>
    <div style="text-align:center;">
      <button class="rp-action-btn like" onclick="swipeLike()">♥</button>
      <div class="rp-action-label">喜欢</div>
    </div>
    <div style="text-align:center;">
      <button class="rp-action-btn info" onclick="goDetail()">📋</button>
      <div class="rp-action-label">详情</div>
    </div>
  `;
}

// ===== 滑动逻辑 =====
function bindSwipeEvents() {
  if (!cardEl) return;
  cardEl.addEventListener('touchstart', onTouchStart, { passive: true });
  cardEl.addEventListener('touchmove', onTouchMove, { passive: false });
  cardEl.addEventListener('touchend', onTouchEnd, { passive: true });
  cardEl.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function onTouchStart(e) {
  if (isAnimating) return;
  const t = e.touches[0];
  startX = t.clientX; startY = t.clientY;
  isDragging = true;
}

function onTouchMove(e) {
  if (!isDragging || isAnimating) return;
  e.preventDefault();
  const t = e.touches[0];
  const dx = t.clientX - startX;
  const dy = t.clientY - startY;
  const rot = dx * 0.1;
  if (cardEl) {
    cardEl.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
    const opacity = Math.min(Math.abs(dx) / 150, 1);
    const likeEl = cardEl.querySelector('.card-label.like');
    const nopeEl = cardEl.querySelector('.card-label.nope');
    if (likeEl && nopeEl) {
      likeEl.style.opacity = dx > 0 ? opacity : 0;
      nopeEl.style.opacity = dx < 0 ? opacity : 0;
    }
  }
}

function onTouchEnd() {
  if (!isDragging || isAnimating || !cardEl) return;
  isDragging = false;
  const rect = cardEl.getBoundingClientRect();
  const dx = rect.left + rect.width / 2 - window.innerWidth / 2;
  if (Math.abs(dx) > 120) {
    const dir = dx > 0 ? 1 : -1;
    cardEl.style.transition = 'transform 0.3s ease';
    cardEl.style.transform = `translate(${dir * 800}px, 100px) rotate(${dir * 20}deg)`;
    setTimeout(() => {
      if (dx > 0) showRpToast('❤️ 已收藏');
      nextCard();
    }, 300);
  } else {
    cardEl.style.transition = 'transform 0.25s ease';
    cardEl.style.transform = '';
  }
  setTimeout(() => { if (cardEl) cardEl.style.transition = ''; }, 300);
}

let mouseDown = false;
function onMouseDown(e) {
  if (isAnimating || !cardEl) return;
  mouseDown = true;
  startX = e.clientX; startY = e.clientY;
  isDragging = true;
}
function onMouseMove(e) {
  if (!mouseDown || !isDragging || !cardEl) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  const rot = dx * 0.1;
  cardEl.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
  const opacity = Math.min(Math.abs(dx) / 150, 1);
  const likeEl = cardEl.querySelector('.card-label.like');
  const nopeEl = cardEl.querySelector('.card-label.nope');
  if (likeEl && nopeEl) {
    likeEl.style.opacity = dx > 0 ? opacity : 0;
    nopeEl.style.opacity = dx < 0 ? opacity : 0;
  }
}
function onMouseUp() {
  if (!mouseDown) return;
  mouseDown = false;
  onTouchEnd();
}

function swipeNope() {
  if (isAnimating || !cardEl) return;
  isAnimating = true;
  cardEl.style.transition = 'transform 0.3s ease';
  cardEl.style.transform = 'translate(-800px, 100px) rotate(-20deg)';
  setTimeout(() => nextCard(), 300);
}

function swipeLike() {
  if (isAnimating || !cardEl) return;
  isAnimating = true;
  const g = currentGirls[currentIdx];
  showRpToast(`❤️ 喜欢 ${g.name}`);
  cardEl.style.transition = 'transform 0.3s ease';
  cardEl.style.transform = 'translate(800px, 100px) rotate(20deg)';
  setTimeout(() => nextCard(), 300);
}

function nextCard() {
  currentIdx++;
  isAnimating = false;
  renderStack();
  renderActions();
}

function resetCards() {
  currentIdx = 0;
  filterByMode(currentMode);
}

// ===== 邀约 =====
function inviteGirl() {
  const g = currentGirls[currentIdx];
  if (!g) return;
  showRpToast(`🍸 正在邀约 ${g.name}...`);
  const msg = encodeURIComponent(
    `🧧 红包局 · 邀约\n\n🥂 小姐姐：${g.name} ${g.age}岁\n🌏 ${g.origin}\n📍 ${g.area}\n💰 ${g.price}\n\n📝 我要约这位小姐姐，请安排！`
  );
  window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${msg}`, '_blank');
}

// ===== 详情 =====
function goDetail() {
  const g = currentGirls[currentIdx];
  if (!g) return;
  showDetail(g);
}

function showDetail(g) {
  const modal = document.getElementById('detailModal');
  const content = document.getElementById('detailContent');
  const title = document.getElementById('detailTitle');
  title.textContent = `📋 ${g.name} 详情`;

  const photos = g.photos || [];
  const hasPhoto = photos.length > 0 && (photos[0].startsWith('data:') || photos[0].startsWith('http'));

  content.innerHTML = `
    <div class="rp-detail-cover" style="background:${hasPhoto ? '#111' : g.coverBg};">
      ${hasPhoto ? '<img src="'+photos[0]+'" />' : getModeEmoji(g.mode)}
      <div class="rp-detail-overlay"></div>
    </div>
    <div class="rp-detail-body">
      <div class="rp-detail-name">${g.name} <small>${g.age}岁</small></div>
      <div class="rp-detail-meta">
        <span>📍 ${g.area}</span>
        <span>⏳ ${g.experience}</span>
        <span>🌏 ${g.origin}</span>
        <span>⭐ ${g.rating}</span>
      </div>
      <div class="rp-detail-tags">
        ${g.specialties.map(s => `<span class="rp-detail-tag">#${s}</span>`).join('')}
      </div>
      <div class="rp-detail-section">
        <h3>🗣️ 语言</h3>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          ${g.languages.map(l => `<span style="background:rgba(139,92,246,0.12);color:var(--primary-light);padding:4px 12px;border-radius:999px;font-size:0.82rem;">${l}</span>`).join('')}
        </div>
      </div>
      <div class="rp-detail-section">
        <h3>📝 自我介绍</h3>
        <div class="rp-detail-bio">${g.bio}</div>
      </div>
      <div class="rp-detail-section">
        <h3>💰 价格</h3>
        ${g.services.map(s => `
          <div class="rp-price-item">
            <span class="rp-price-name">${s.name}</span>
            <span class="rp-price-amount">${s.price}</span>
          </div>
        `).join('')}
      </div>
      <div class="rp-detail-section">
        <h3>⭐ 评价 (${g.reviewCount})</h3>
        ${g.reviews.length ? g.reviews.map(r => `
          <div class="review-item">
            <div class="review-header">
              <span class="review-user">${r.user}</span>
              <span class="review-stars">${'⭐'.repeat(r.rating)}</span>
            </div>
            <div class="review-text">${r.text}</div>
          </div>
        `).join('') : '<p style="color:var(--text-muted);font-size:0.85rem;">暂无评价</p>'}
      </div>
      <button class="rp-invite-btn" onclick="inviteFromDetail(${g.id})">🍸 邀约 ${g.name}</button>
    </div>
  `;

  modal.style.display = 'block';
}

function inviteFromDetail(id) {
  const g = barGirls.find(x => x.id === id);
  if (!g) return;
  closeDetail();
  const msg = encodeURIComponent(
    `🧧 红包局 · 邀约\n\n🥂 小姐姐：${g.name} ${g.age}岁\n🌏 ${g.origin}\n📍 ${g.area}\n💰 ${g.price}\n\n📝 我要约这位小姐姐，请安排！`
  );
  window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${msg}`, '_blank');
  showRpToast('🍸 已联系客服安排');
}

function closeDetail() {
  document.getElementById('detailModal').style.display = 'none';
}

// ===== 切换视图 =====
function toggleView() {
  currentView = currentView === 'card' ? 'list' : 'card';
  const cardArea = document.getElementById('cardArea');
  const listView = document.getElementById('listView');
  const bar = document.getElementById('actionBar');

  if (currentView === 'list') {
    cardArea.style.display = 'none';
    listView.classList.add('show');
    bar.innerHTML = '';
    renderList();
  } else {
    cardArea.style.display = 'flex';
    listView.classList.remove('show');
    renderStack();
    renderActions();
  }
}

function renderList() {
  const list = document.getElementById('listView');
  if (!currentGirls.length) {
    list.innerHTML = '<div class="rp-no-more"><div class="emoji">🍸</div><h3>暂无小姐姐</h3></div>';
    return;
  }
  list.innerHTML = currentGirls.map(g => {
    const photos = g.photos || [];
    const hasPhoto = photos.length > 0 && (photos[0].startsWith('data:') || photos[0].startsWith('http'));
    return `
      <div class="rp-list-item" onclick="showDetail(barGirls.find(x=>x.id===${g.id}))">
        <div class="rp-list-avatar" style="background:${hasPhoto ? '#111' : g.coverBg};">
          ${hasPhoto ? '<img src="'+photos[0]+'" />' : getModeEmoji(g.mode)}
        </div>
        <div class="rp-list-body">
          <div class="rp-list-name">${g.name} <span>${g.age}岁 · ${g.mode}</span></div>
          <div class="rp-list-meta">📍 ${g.area} · 🌏 ${g.origin} · ⏳ ${g.experience}</div>
          <div class="rp-list-tags">
            ${g.specialties.slice(0,3).map(s => `<span class="rp-list-tag">${s}</span>`).join('')}
          </div>
          <div class="rp-list-bottom">
            <span class="rp-list-price">💰 ${g.price}</span>
            <span class="rp-list-rating">⭐ ${g.rating}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ===== Toast =====
function showRpToast(msg) {
  const el = document.getElementById('rpToast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2000);
}

// ===== 关闭详情时点击外部 =====
document.addEventListener('click', (e) => {
  if (e.target.closest('#detailModal .rp-modal-close')) {
    closeDetail();
  }
});
