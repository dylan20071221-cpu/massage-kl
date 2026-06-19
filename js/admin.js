// ===== Data =====
// 优先从 data.js 读取，没有则用默认值
let data = (typeof SITE_CONFIG !== 'undefined') ? {
  siteName: SITE_CONFIG.siteName || "大马顶级会所，顶级水疗",
  tagline: SITE_CONFIG.tagline || "大马正规按摩 · 上门预约",
  whatsappNumber: SITE_CONFIG.whatsappNumber || "601114155848",
  telegram: SITE_CONFIG.telegram || "",
  areas: SITE_CONFIG.areas || ["吉隆坡", "Cheras", "Puchong", "Kajang", "Setapak", "Subang", "Petaling Jaya", "Ampang"],
  technicians: (typeof technicians !== 'undefined') ? JSON.parse(JSON.stringify(technicians)) : []
} : {
  siteName: "大马顶级会所，顶级水疗",
  tagline: "",
  whatsappNumber: "601114155848",
  telegram: "",
  areas: ["吉隆坡", "Cheras", "Puchong", "Kajang", "Setapak", "Subang", "Petaling Jaya", "Ampang"],
  technicians: [
    { id: 1, name: "小玲", age: 28, area: "Cheras", coverBg: "linear-gradient(135deg, #667eea, #764ba2)", specialties: ["泰式按摩", "肩颈理疗", "精油推拿"], rating: 4.8, reviewCount: 126, price: "RM 90/小时", phone: "601114155848", available: true, experience: "8年经验", height: "162cm", weight: "52kg", bust: "", origin: "", bio: "精通泰式古法按摩，擅长肩颈放松和全身拉伸。上门服务态度好，准时守约，顾客回头率极高。", serviceRange: "Cheras及周边5公里", photos: [], videoUrl: "", services: [{name:"泰式按摩（1小时）",price:"RM 90"},{name:"肩颈理疗（45分钟）",price:"RM 70"},{name:"全身精油推拿（1.5小时）",price:"RM 130"}], reviews: [{user:"匿名用户",rating:5,text:"手法很好，按完整个人都松了"},{user:"Alex",rating:5,text:"准时上门，态度好，推荐！"}] },
    { id: 2, name: "小美", age: 26, area: "Puchong", coverBg: "linear-gradient(135deg, #f093fb, #f5576c)", specialties: ["精油推拿", "脚底按摩", "淋巴排毒"], rating: 4.6, reviewCount: 98, price: "RM 80/小时", phone: "601114155848", available: true, experience: "5年经验", height: "158cm", weight: "48kg", bust: "", origin: "", bio: "专精精油推拿和脚底穴位按摩，手法温柔细腻，第一次做按摩的客人都很喜欢。", serviceRange: "Puchong及附近", photos: [], videoUrl: "", services: [{name:"精油推拿（1小时）",price:"RM 80"},{name:"脚底按摩（45分钟）",price:"RM 60"},{name:"淋巴排毒（1.5小时）",price:"RM 120"}], reviews: [{user:"Ken",rating:5,text:"小美人很温柔，按得很舒服"},{user:"薇薇",rating:4,text:"手法不错，推荐"}] },
    { id: 3, name: "丽丽", age: 32, area: "吉隆坡", coverBg: "linear-gradient(135deg, #4facfe, #00f2fe)", specialties: ["传统马来按摩", "产后修复", "全身拉伸"], rating: 4.9, reviewCount: 203, price: "RM 100/小时", phone: "601114155848", available: true, experience: "12年经验", height: "165cm", weight: "55kg", bust: "", origin: "", bio: "资深按摩师，专长传统马来按摩和产后修复。手法老道、力道精准，很多老顾客跟了她好几年。", serviceRange: "吉隆坡市区", photos: [], videoUrl: "", services: [{name:"传统马来按摩（1小时）",price:"RM 100"},{name:"产后修复（1.5小时）",price:"RM 150"},{name:"全身拉伸放松（1小时）",price:"RM 90"}], reviews: [{user:"江先生",rating:5,text:"做了半年多的老顾客了"},{user:"May",rating:5,text:"产后恢复得很好"}] },
    { id: 4, name: "小花", age: 27, area: "Kajang", coverBg: "linear-gradient(135deg, #a18cd1, #fbc2eb)", specialties: ["中式推拿", "拔罐刮痧", "穴位按摩"], rating: 4.7, reviewCount: 75, price: "RM 85/小时", phone: "601114155848", available: true, experience: "7年经验", height: "160cm", weight: "50kg", bust: "", origin: "", bio: "正宗中式推拿手法，兼修拔罐刮痧。擅长缓解肌肉酸痛，常年坐办公室的最爱。", serviceRange: "Kajang及周边", photos: [], videoUrl: "", services: [{name:"中式推拿（1小时）",price:"RM 85"},{name:"拔罐刮痧（45分钟）",price:"RM 65"},{name:"综合理疗（1.5小时）",price:"RM 120"}], reviews: [{user:"程序员小王",rating:5,text:"肩膀终于不酸了"},{user:"Lisa",rating:4,text:"拔罐力度刚好"}] },
    { id: 5, name: "Yuki", age: 25, area: "Setapak", coverBg: "linear-gradient(135deg, #fccb90, #d57eeb)", specialties: ["日式指压", "头部SPA", "香薰按摩"], rating: 4.5, reviewCount: 62, price: "RM 95/小时", phone: "601114155848", available: true, experience: "4年经验", height: "156cm", weight: "46kg", bust: "", origin: "", bio: "日式指压技法，配合头部SPA和芳香疗法。年轻有活力，服务态度超好。", serviceRange: "Setapak / Wangsa Maju", photos: [], videoUrl: "", services: [{name:"日式指压（1小时）",price:"RM 95"},{name:"头部SPA（45分钟）",price:"RM 75"},{name:"香薰放松套餐（1.5小时）",price:"RM 140"}], reviews: [{user:"Eric",rating:5,text:"头部SPA太舒服了"}] },
    { id: 6, name: "阿May", age: 34, area: "Subang", coverBg: "linear-gradient(135deg, #5ee7df, #b490ca)", specialties: ["泰式按摩", "热石理疗", "深层组织"], rating: 4.8, reviewCount: 154, price: "RM 110/小时", phone: "601114155848", available: true, experience: "10年经验", height: "163cm", weight: "54kg", bust: "", origin: "", bio: "泰式按摩和热石理疗，手法有力到位。常年肌肉酸痛的朋友找她准没错。", serviceRange: "Subang / USJ", photos: [], videoUrl: "", services: [{name:"泰式按摩（1小时）",price:"RM 110"},{name:"热石理疗（1.5小时）",price:"RM 160"},{name:"深层组织放松（2小时）",price:"RM 200"}], reviews: [{user:"阿Ben",rating:5,text:"May姐力度够"}] },
    { id: 7, name: "小玉", age: 29, area: "Petaling Jaya", coverBg: "linear-gradient(135deg, #fa709a, #fee140)", specialties: ["泰式按摩", "精油推拿"], rating: 4.7, reviewCount: 88, price: "RM 85/小时", phone: "601114155848", available: true, experience: "6年经验", height: "160cm", weight: "51kg", bust: "", origin: "", bio: "热情开朗，手法灵活多变，根据客人身体状况调整。", serviceRange: "PJ / Damansara", photos: [], videoUrl: "", services: [{name:"泰式按摩（1小时）",price:"RM 85"},{name:"精油推拿（1小时）",price:"RM 85"},{name:"全身放松（1.5小时）",price:"RM 120"}], reviews: [{user:"David",rating:5,text:"小玉很专业"}] },
    { id: 8, name: "Coco", age: 24, area: "Cheras", coverBg: "linear-gradient(135deg, #ffecd2, #fcb69f)", specialties: ["精油推拿", "香薰SPA", "热石"], rating: 4.4, reviewCount: 45, price: "RM 95/小时", phone: "601114155848", available: true, experience: "3年经验", height: "165cm", weight: "50kg", bust: "", origin: "", bio: "年轻时尚，擅长精油推拿和香薰SPA。手法温柔细腻。", serviceRange: "Cheras", photos: [], videoUrl: "", services: [{name:"精油推拿（1小时）",price:"RM 95"},{name:"香薰SPA（1.5小时）",price:"RM 140"},{name:"热石放松（1小时）",price:"RM 100"}], reviews: [{user:"阿杰",rating:5,text:"Coco环境香香的"}] },
  ]
};

// ===== State =====
let nextId = data.technicians.length ? Math.max(...data.technicians.map(t => t.id)) + 1 : 9;
let currentTab = 'config';

// ===== Tab =====
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach((t,i) => {
    const tabNames = ['config', 'techs', 'analytics'];
    t.classList.toggle('active', tabNames[i] === tab);
  });
  document.getElementById('tab-config').classList.toggle('active', tab === 'config');
  document.getElementById('tab-techs').classList.toggle('active', tab === 'techs');
  document.getElementById('tab-analytics').classList.toggle('active', tab === 'analytics');
  if (tab === 'config') loadConfig();
  if (tab === 'techs') renderTechs();
  if (tab === 'analytics') loadAnalytics();
}

// ===== Analytics / Umami 看板 =====
let umamiConfig = null;

function loadAnalytics() {
  // 从存储读取配置
  const saved = localStorage.getItem('umamiConfig');
  const container = document.getElementById('analyticsIframeContainer');
  const status = document.getElementById('analytics-status');

  if (!saved) {
    container.innerHTML = `
      <div style="font-size:3rem;">📊</div>
      <div style="color:var(--admin-muted);text-align:center;font-size:0.9rem;max-width:400px;">
        <p style="margin-bottom:12px;">还没有配置 Umami 看板</p>
        <p style="margin-bottom:4px;">部署 Umami 后在后台创建站点，获得：</p>
        <p style="margin-bottom:4px;">① Umami 部署地址（如：https://xxx.vercel.app）</p>
        <p style="margin-bottom:8px;">② Website ID（站点标识）</p>
        <div style="display:flex;flex-direction:column;gap:8px;margin-top:12px;">
          <input type="text" id="umami-url" placeholder="Umami 地址" style="padding:10px;border-radius:8px;border:1px solid var(--admin-border);background:var(--admin-input);color:white;font-size:0.85rem;">
          <input type="text" id="umami-site-id" placeholder="Website ID" style="padding:10px;border-radius:8px;border:1px solid var(--admin-border);background:var(--admin-input);color:white;font-size:0.85rem;">
          <button onclick="saveUmamiConfig()" style="padding:10px;border:none;border-radius:8px;background:var(--admin-primary);color:white;cursor:pointer;font-size:0.85rem;">💾 保存并加载</button>
        </div>
      </div>
    `;
    if (status) status.textContent = '⚙️ 待配置';
    return;
  }

  try {
    umamiConfig = JSON.parse(saved);
    if (status) status.textContent = '🟢 已连接';
    loadUmamiDashboard(umamiConfig);
  } catch(e) {
    container.innerHTML = '<div style="color:var(--admin-danger);">配置读取失败</div>';
  }
}

function saveUmamiConfig() {
  const url = document.getElementById('umami-url')?.value.trim();
  const siteId = document.getElementById('umami-site-id')?.value.trim();
  if (!url || !siteId) {
    alert('请填写 Umami 地址和 Website ID');
    return;
  }
  const config = { url, siteId };
  localStorage.setItem('umamiConfig', JSON.stringify(config));
  umamiConfig = config;
  const status = document.getElementById('analytics-status');
  if (status) status.textContent = '🟢 已连接';
  loadUmamiDashboard(config);
}

function loadUmamiDashboard(config) {
  const container = document.getElementById('analyticsIframeContainer');
  // 替换 analytics.js 中的占位符
  const umamiUrl = config.url.replace(/\/$/, '');
  container.innerHTML = `
    <div style="width:100%;display:flex;gap:8px;margin-bottom:12px;">
      <button onclick="resetUmamiConfig()" style="padding:6px 14px;border:1px solid var(--admin-border);border-radius:6px;background:transparent;color:var(--admin-muted);cursor:pointer;font-size:0.8rem;">⚙️ 重新配置</button>
      <a href="${umamiUrl}" target="_blank" style="padding:6px 14px;border:1px solid var(--admin-border);border-radius:6px;background:transparent;color:var(--admin-primary);cursor:pointer;font-size:0.8rem;text-decoration:none;">🔗 打开 Umami</a>
    </div>
    <iframe src="${umamiUrl}/share/${config.siteId}" style="width:100%;min-height:600px;border:none;border-radius:8px;" allow="cross-origin-isolated"></iframe>
  `;
}

function resetUmamiConfig() {
  localStorage.removeItem('umamiConfig');
  umamiConfig = null;
  loadAnalytics();
}

// ===== Config =====
function loadConfig() {
  document.getElementById('cfg-siteName').value = data.siteName;
  document.getElementById('cfg-tagline').value = data.tagline;
  document.getElementById('cfg-whatsapp').value = data.whatsappNumber;
  document.getElementById('cfg-telegram').value = data.telegram || '';
  document.getElementById('cfg-areas').value = data.areas.join(', ');
}

function saveConfig() {
  data.siteName = document.getElementById('cfg-siteName').value.trim();
  data.tagline = document.getElementById('cfg-tagline').value.trim();
  data.whatsappNumber = document.getElementById('cfg-whatsapp').value.trim();
  data.telegram = document.getElementById('cfg-telegram').value.trim();
  data.areas = document.getElementById('cfg-areas').value.split(/[,，\s]+/).filter(Boolean);
  showToast('✅ 网站设置已保存');
}

// ===== Technicians =====
function renderTechs() {
  const list = document.getElementById('techList');
  list.innerHTML = '';
  data.technicians.forEach((t, idx) => {
    const card = document.createElement('div');
    card.className = 'tech-card';
    card.innerHTML = `
      <div class="tech-card-header" onclick="toggleCard(${idx})">
        <div class="tech-card-title">
          #${t.id} ${t.name}
          <span class="area-tag">${t.area}</span>
          <span style="font-size:0.78rem;color:var(--admin-muted);font-weight:400;">${t.price}</span>
        </div>
        <span class="tech-card-toggle" id="toggle-${idx}">▼</span>
      </div>
      <div class="tech-card-body" id="cardBody-${idx}">
        <div class="form-row">
          <div class="field-group">
            <label>名字</label>
            <input type="text" value="${escHtml(t.name)}" onchange="updateField(${idx},'name',this.value)" />
          </div>
          <div class="field-group">
            <label>年龄</label>
            <input type="number" value="${t.age}" onchange="updateField(${idx},'age',parseInt(this.value)||0)" />
          </div>
          <div class="field-group">
            <label>区域</label>
            <input type="text" value="${escHtml(t.area)}" onchange="updateField(${idx},'area',this.value)" />
          </div>
        </div>
        <div class="form-row">
          <div class="field-group">
            <label>价格</label>
            <input type="text" value="${escHtml(t.price)}" onchange="updateField(${idx},'price',this.value)" />
          </div>
          <div class="field-group">
            <label>评分</label>
            <input type="number" step="0.1" min="0" max="5" value="${t.rating}" onchange="updateField(${idx},'rating',parseFloat(this.value)||0)" />
          </div>
          <div class="field-group">
            <label>评价数</label>
            <input type="number" value="${t.reviewCount}" onchange="updateField(${idx},'reviewCount',parseInt(this.value)||0)" />
          </div>
        </div>
        <div class="form-row">
          <div class="field-group">
            <label>电话</label>
            <input type="text" value="${escHtml(t.phone)}" onchange="updateField(${idx},'phone',this.value)" />
          </div>
          <div class="field-group">
            <label>状态</label>
            <select onchange="updateField(${idx},'available',this.value==='true')">
              <option value="true" ${t.available?'selected':''}>可预约</option>
              <option value="false" ${!t.available?'selected':''}>暂停</option>
            </select>
          </div>
          <div class="field-group">
            <label>渐变背景色（CSS）</label>
            <input type="text" value="${escHtml(t.coverBg)}" onchange="updateField(${idx},'coverBg',this.value)" />
          </div>
        </div>
        <div class="form-row form-row-2">
          <div class="field-group" style="grid-column:1/-1;">
            <label>技师照片（至少 3 张）</label>
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px;" id="photoGallery-${idx}">
              ${renderPhotoGallery(idx)}
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
              <input type="file" accept="image/*" multiple onchange="uploadPhotos(${idx},this)" style="font-size:0.8rem;color:var(--admin-muted);" />
              <span style="font-size:0.75rem;color:var(--admin-muted);">或</span>
              <div style="display:flex;gap:4px;flex:1;min-width:140px;">
                <input type="text" id="photoUrlInput-${idx}" placeholder="粘贴图片 URL" style="flex:1;padding:6px 10px;background:var(--admin-input);border:1px solid var(--admin-border);border-radius:4px;color:white;font-size:0.8rem;font-family:inherit;outline:none;" />
                <button class="btn btn-primary btn-sm" onclick="addPhotoUrl(${idx})">添加</button>
              </div>
            </div>
            <div style="margin-top:6px;font-size:0.75rem;color:var(--admin-muted);">
              当前 ${(t.photos||[]).length} 张照片 ${(t.photos||[]).length < 3 ? '（还差 '+(3-(t.photos||[]).length)+' 张）' : '✅'}
            </div>
          </div>
        </div>
        <div class="form-row form-row-2">
          <div class="field-group" style="grid-column:1/-1;">
            <label>视频（可选）</label>
            <div style="display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;">
              <div id="videoPreview-${idx}" style="width:140px;height:80px;border-radius:8px;overflow:hidden;background:var(--admin-input);border:1px solid var(--admin-border);display:flex;align-items:center;justify-content:center;font-size:0.7rem;color:var(--admin-muted);flex-shrink:0;">
                ${t.videoUrl ? (t.videoUrl.startsWith('data:') ? '<video src="'+escHtml(t.videoUrl)+'" style="width:100%;height:100%;object-fit:cover;" muted />' : '🎬') : '无视频'}
              </div>
              <div style="flex:1;min-width:120px;">
                <input type="file" accept="video/*" onchange="uploadVideo(${idx},this)" style="font-size:0.8rem;color:var(--admin-muted);margin-bottom:6px;" />
                <input type="text" placeholder="或粘贴 YouTube / 视频直链 URL" value="${escHtml(t.videoUrl&&!t.videoUrl.startsWith('data:')?t.videoUrl:'')}" onchange="setVideoUrl(${idx},this.value)" style="width:100%;padding:8px 10px;background:var(--admin-input);border:1px solid var(--admin-border);border-radius:4px;color:white;font-size:0.85rem;font-family:inherit;outline:none;" />
                <div style="margin-top:4px;font-size:0.75rem;color:var(--admin-muted);">支持上传视频文件（最大 10MB）或 YouTube / 直链</div>
                ${t.videoUrl ? '<button class="btn btn-danger btn-sm" onclick="removeVideo('+idx+')" style="margin-top:4px;">🗑 删除视频</button>' : ''}
              </div>
            </div>
          </div>
        </div>
        <div class="form-row form-row-2">
          <div class="field-group">
            <label>经验</label>
            <input type="text" value="${escHtml(t.experience||'')}" onchange="updateField(${idx},'experience',this.value)" />
          </div>
          <div class="field-group">
            <label>身高</label>
            <input type="text" value="${escHtml(t.height||'')}" placeholder="身高" onchange="updateField(${idx},'height',this.value)" />
          </div>
          <div class="field-group">
            <label>体重</label>
            <input type="text" value="${escHtml(t.weight||'')}" placeholder="体重" onchange="updateField(${idx},'weight',this.value)" />
          </div>
          <div class="field-group">
            <label>胸围</label>
            <input type="text" value="${escHtml(t.bust||'')}" placeholder="如：32C" onchange="updateField(${idx},'bust',this.value)" />
          </div>
          <div class="field-group">
            <label>产地</label>
            <input type="text" value="${escHtml(t.origin||'')}" placeholder="如：越南、泰国" onchange="updateField(${idx},'origin',this.value)" />
          </div>
        </div>
        <div class="form-row form-row-full">
          <div class="field-group">
            <label>个人简介</label>
            <textarea rows="3" onchange="updateField(${idx},'bio',this.value)">${escHtml(t.bio||'')}</textarea>
          </div>
        </div>
        <div class="form-row form-row-full">
          <div class="field-group">
            <label>服务范围</label>
            <input type="text" value="${escHtml(t.serviceRange||'')}" onchange="updateField(${idx},'serviceRange',this.value)" />
          </div>
        </div>

        <!-- Specialties -->
        <div class="field-group" style="margin-top:8px;">
          <label>专长标签</label>
          <div class="specialties-editor" id="specs-${idx}"></div>
          <div class="spec-input-row">
            <input type="text" id="specInput-${idx}" placeholder="输入新专长" onkeydown="if(event.key==='Enter'){event.preventDefault();addSpecialty(${idx})}" />
            <button class="btn btn-primary btn-sm" onclick="addSpecialty(${idx})">添加</button>
          </div>
        </div>

        <!-- Services -->
        <div class="field-group" style="margin-top:12px;">
          <label>服务项目与价格</label>
          <div class="services-editor" id="services-${idx}"></div>
          <button class="item-add" onclick="addService(${idx})">➕ 添加服务项目</button>
        </div>

        <!-- Reviews -->
        <div class="field-group" style="margin-top:12px;">
          <label>顾客评价</label>
          <div class="reviews-editor" id="reviews-${idx}"></div>
          <button class="item-add" onclick="addReview(${idx})">➕ 添加评价</button>
        </div>

        <div class="tech-card-actions">
          <button class="btn btn-danger btn-sm" onclick="deleteTechnician(${idx})">🗑 删除此技师</button>
        </div>
      </div>
    `;
    list.appendChild(card);
    renderSpecialties(idx);
    renderServices(idx);
    renderReviews(idx);
  });
  document.getElementById('techCount').textContent = `共 ${data.technicians.length} 位技师`;
}

function toggleCard(idx) {
  const body = document.getElementById(`cardBody-${idx}`);
  const toggle = document.getElementById(`toggle-${idx}`);
  body.classList.toggle('open');
  toggle.textContent = body.classList.contains('open') ? '▲' : '▼';
}

function updateField(idx, key, value) {
  data.technicians[idx][key] = value;
}

function renderPhotoGallery(idx) {
  const photos = data.technicians[idx].photos || [];
  if (!photos.length) return '<div style="color:var(--admin-muted);font-size:0.8rem;">暂无照片</div>';
  return photos.map((p, pi) => `
    <div style="position:relative;width:80px;height:80px;border-radius:8px;overflow:hidden;border:1px solid var(--admin-border);flex-shrink:0;">
      <img src="${escHtml(p)}" style="width:100%;height:100%;object-fit:cover;" />
      <button onclick="removePhotoFromGallery(${idx},${pi})" style="position:absolute;top:2px;right:2px;width:20px;height:20px;border-radius:50%;border:none;background:rgba(239,68,68,0.85);color:white;font-size:0.7rem;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;line-height:1;">✕</button>
    </div>
  `).join('');
}

function uploadPhotos(idx, input) {
  const files = Array.from(input.files);
  if (!files.length) return;
  const oversized = files.filter(f => f.size > 2 * 1024 * 1024);
  if (oversized.length) {
    showToast('⚠️ 部分图片超过 2MB，已跳过');
  }
  const validFiles = files.filter(f => f.size <= 2 * 1024 * 1024);
  if (!validFiles.length) { input.value = ''; return; }
  let loaded = 0;
  validFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = function(e) {
      data.technicians[idx].photos = data.technicians[idx].photos || [];
      data.technicians[idx].photos.push(e.target.result);
      loaded++;
      if (loaded === validFiles.length) {
        input.value = '';
        renderTechs();
        const body = document.getElementById(`cardBody-${idx}`);
        if (body) body.classList.add('open');
        showToast('✅ 已添加 ' + loaded + ' 张照片');
      }
    };
    reader.readAsDataURL(file);
  });
}

function addPhotoUrl(idx) {
  const input = document.getElementById(`photoUrlInput-${idx}`);
  const url = input.value.trim();
  if (!url) return;
  data.technicians[idx].photos = data.technicians[idx].photos || [];
  data.technicians[idx].photos.push(url);
  input.value = '';
  renderTechs();
  const body = document.getElementById(`cardBody-${idx}`);
  if (body) body.classList.add('open');
  showToast('✅ 已添加图片 URL');
}

function removePhotoFromGallery(idx, pi) {
  data.technicians[idx].photos = data.technicians[idx].photos || [];
  data.technicians[idx].photos.splice(pi, 1);
  renderTechs();
  const body = document.getElementById(`cardBody-${idx}`);
  if (body) body.classList.add('open');
  showToast('🗑 已删除');
}

function uploadVideo(idx, input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) {
    showToast('⚠️ 视频不能超过 10MB');
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    data.technicians[idx].videoUrl = e.target.result;
    input.value = '';
    renderTechs();
    const body = document.getElementById(`cardBody-${idx}`);
    if (body) body.classList.add('open');
    showToast('✅ 视频已添加');
  };
  reader.readAsDataURL(file);
}

function setVideoUrl(idx, url) {
  data.technicians[idx].videoUrl = url.trim();
  renderTechs();
  const body = document.getElementById(`cardBody-${idx}`);
  if (body) body.classList.add('open');
}

function removeVideo(idx) {
  data.technicians[idx].videoUrl = '';
  renderTechs();
  const body = document.getElementById(`cardBody-${idx}`);
  if (body) body.classList.add('open');
  showToast('🗑 视频已删除');
}

function renderSpecialties(idx) {
  const el = document.getElementById(`specs-${idx}`);
  if (!el) return;
  const t = data.technicians[idx];
  el.innerHTML = t.specialties.map((s, si) =>
    `<span class="spec-tag">${escHtml(s)} <span class="spec-remove" onclick="removeSpecialty(${idx},${si})">✕</span></span>`
  ).join('');
}

function addSpecialty(idx) {
  const input = document.getElementById(`specInput-${idx}`);
  const val = input.value.trim();
  if (!val) return;
  data.technicians[idx].specialties.push(val);
  input.value = '';
  renderSpecialties(idx);
}

function removeSpecialty(idx, si) {
  data.technicians[idx].specialties.splice(si, 1);
  renderSpecialties(idx);
}

function renderServices(idx) {
  const el = document.getElementById(`services-${idx}`);
  if (!el) return;
  const t = data.technicians[idx];
  el.innerHTML = t.services.map((s, si) =>
    `<div class="item-row">
      <input type="text" value="${escHtml(s.name)}" placeholder="服务名称" onchange="updateService(${idx},${si},'name',this.value)" />
      <input type="text" class="item-price" value="${escHtml(s.price)}" placeholder="价格" onchange="updateService(${idx},${si},'price',this.value)" />
      <button class="item-remove" onclick="removeService(${idx},${si})">✕</button>
    </div>`
  ).join('');
}

function updateService(idx, si, key, value) {
  data.technicians[idx].services[si][key] = value;
}

function addService(idx) {
  data.technicians[idx].services.push({ name: "", price: "" });
  renderServices(idx);
}

function removeService(idx, si) {
  data.technicians[idx].services.splice(si, 1);
  renderServices(idx);
}

function renderReviews(idx) {
  const el = document.getElementById(`reviews-${idx}`);
  if (!el) return;
  const t = data.technicians[idx];
  el.innerHTML = t.reviews.map((r, ri) =>
    `<div class="item-row">
      <input type="text" value="${escHtml(r.user)}" placeholder="评价人" onchange="updateReview(${idx},${ri},'user',this.value)" style="max-width:100px;" />
      <input type="number" class="item-rating" value="${r.rating}" min="1" max="5" placeholder="评分" onchange="updateReview(${idx},${ri},'rating',parseInt(this.value)||5)" />
      <input type="text" value="${escHtml(r.text)}" placeholder="评价内容" onchange="updateReview(${idx},${ri},'text',this.value)" />
      <button class="item-remove" onclick="removeReview(${idx},${ri})">✕</button>
    </div>`
  ).join('');
}

function updateReview(idx, ri, key, value) {
  data.technicians[idx].reviews[ri][key] = value;
}

function addReview(idx) {
  data.technicians[idx].reviews.push({ user: "", rating: 5, text: "" });
  renderReviews(idx);
}

function removeReview(idx, ri) {
  data.technicians[idx].reviews.splice(ri, 1);
  renderReviews(idx);
}

function addTechnician() {
  data.technicians.push({
    id: nextId++,
    name: "新技师",
    age: 25,
    area: "吉隆坡",
    coverBg: "linear-gradient(135deg, #667eea, #764ba2)",
    specialties: ["按摩"],
    rating: 4.5,
    reviewCount: 0,
    price: "RM 80/小时",
    phone: "",
    available: true,
    experience: "",
    height: "",
    weight: "",
    bust: "",
    origin: "",
    bio: "",
    serviceRange: "", photos: [], videoUrl: "",
    photo: "",
    services: [{ name: "按摩（1小时）", price: "RM 80" }],
    reviews: []
  });
  renderTechs();
  showToast('✅ 已添加新技师');
}

function deleteTechnician(idx) {
  if (!confirm(`确定删除 ${data.technicians[idx].name} 吗？`)) return;
  data.technicians.splice(idx, 1);
  renderTechs();
  showToast('🗑 已删除');
}

// ===== Export =====
function exportData() {
  // Build the data.js file content
  let areasStr = JSON.stringify(data.areas, null, 2);
  let techsStr = JSON.stringify(data.technicians.map(t => {
    // Reorder fields for cleaner output
    const {id, name, age, area, coverBg, specialties, rating, reviewCount, price, phone, available, experience, height, weight, bust, origin, bio, serviceRange, photos, videoUrl, services, reviews} = t;
    return {id, name, age, area, coverBg, specialties, rating, reviewCount, price, phone, available, experience, height, weight, bust, origin, bio, serviceRange, photos, videoUrl, services, reviews};
  }), null, 2);

  const output = `/**
 * 🦀 按按摩 - 技师数据
 * 由 懂懂的管理后台 生成 — 改这个文件就行
 */

const SITE_CONFIG = {
  siteName: ${JSON.stringify(data.siteName)},
  tagline: ${JSON.stringify(data.tagline)},
  whatsappNumber: "${data.whatsappNumber}",
  telegram: "${data.telegram}",
  areas: ${areasStr},
};

const technicians = ${techsStr};

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
`;

  const blob = new Blob([output], { type: 'text/javascript;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('📥 data.js 已下载，替换 massage-kl/js/data.js 即可');
}

function previewData() {
  const w = window.open('', '_blank');
  w.document.write('<html><head><title>数据预览</title><style>body{background:#0f0f1a;color:#e2e8f0;font-family:monospace;padding:20px;white-space:pre-wrap;font-size:13px;line-height:1.5;}h2{color:#8b5cf6;}hr{border-color:#2a2a4a;}</style></head><body>');
  w.document.write('<h2>📋 SITE_CONFIG</h2>');
  w.document.write(JSON.stringify({siteName:data.siteName,tagline:data.tagline,whatsappNumber:data.whatsappNumber,telegram:data.telegram,areas:data.areas}, null, 2));
  w.document.write('<hr><h2>👩‍⚕️ Technicians (' + data.technicians.length + ')</h2>');
  data.technicians.forEach((t, i) => {
    w.document.write(`<h3 style="color:#f59e0b;">#${t.id} ${t.name} (${t.area}) - ${t.price}</h3>`);
    w.document.write(JSON.stringify(t, null, 2) + '\n\n');
  });
  w.document.write('</body></html>');
  w.document.close();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function escHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ===== Init =====
loadConfig();
