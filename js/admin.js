// ===== 🦀 按按摩 - 管理后台 (Supabase 版) =====

let data = { siteName: "", tagline: "", whatsappNumber: "", telegram: "", areas: [], technicians: [] };
let nextId = 100;
let currentTab = 'config';
let sb = null;

// ===== Supabase 连接 =====
function getSupabaseClient() {
  const url = localStorage.getItem('supabase_url');
  const key = localStorage.getItem('supabase_anon_key');
  if (!url || !key || url.includes('YOUR_PROJECT')) return null;
  try {
    return supabase.createClient(url, key);
  } catch(e) {
    return null;
  }
}

async function loadAllData() {
  sb = getSupabaseClient();
  if (!sb) {
    // Fallback: 从 data.js 读
    data = {
      siteName: SITE_CONFIG.siteName,
      tagline: SITE_CONFIG.tagline,
      whatsappNumber: SITE_CONFIG.whatsappNumber,
      telegram: SITE_CONFIG.telegram,
      areas: SITE_CONFIG.areas,
      technicians: JSON.parse(JSON.stringify(technicians)),
    };
    if (data.technicians.length) nextId = Math.max(...data.technicians.map(t => t.id)) + 1;
    loadConfig();
    renderTechs();
    document.getElementById('supabaseStatus').textContent = '⚪ 本地模式';
    return;
  }

  document.getElementById('supabaseStatus').textContent = '🔄 加载中...';

  try {
    // 加载配置
    const { data: cfg } = await sb.from('site_config').select('*').eq('id', 1).maybeSingle();
    if (cfg) {
      data.siteName = cfg.site_name;
      data.tagline = cfg.tagline;
      data.whatsappNumber = cfg.whatsapp_number;
      data.telegram = cfg.telegram || '';
      data.areas = cfg.areas || [];
    }

    // 加载技师
    const { data: techs } = await sb.from('technicians').select('*').order('sort_order').order('id');
    if (techs && techs.length) {
      data.technicians = techs.map(t => ({
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
        services: (typeof t.services === 'string' ? JSON.parse(t.services) : t.services) || [],
        reviews: (typeof t.reviews === 'string' ? JSON.parse(t.reviews) : t.reviews) || [],
        sort_order: t.sort_order || 0,
      }));
      nextId = Math.max(...data.technicians.map(t => t.id)) + 1;
    }

    document.getElementById('supabaseStatus').textContent = '🟢 Supabase 在线';
  } catch(e) {
    document.getElementById('supabaseStatus').textContent = '🔴 加载失败: ' + e.message;
    console.error(e);
  }

  loadConfig();
  renderTechs();
}

// ===== Tab =====
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach((t,i) => {
    const tabNames = ['config', 'techs', 'analytics', 'database'];
    t.classList.toggle('active', tabNames[i] === tab);
  });
  document.getElementById('tab-config').classList.toggle('active', tab === 'config');
  document.getElementById('tab-techs').classList.toggle('active', tab === 'techs');
  document.getElementById('tab-analytics').classList.toggle('active', tab === 'analytics');
  document.getElementById('tab-database').classList.toggle('active', tab === 'database');
  if (tab === 'config') loadConfig();
  if (tab === 'techs') renderTechs();
  if (tab === 'analytics') loadAnalytics();
}

// ===== 新增：数据库配置 Tab =====
function renderDatabaseConfig() {
  const el = document.getElementById('tab-database');
  const savedUrl = localStorage.getItem('supabase_url') || '';
  const savedKey = localStorage.getItem('supabase_anon_key') || '';
  el.innerHTML = `
    <div style="max-width:600px;">
      <h3 style="margin-bottom:16px;font-size:1.1rem;">☁️ Supabase 数据库设置</h3>
      <div class="config-field" style="margin-bottom:16px;">
        <label>Project URL</label>
        <input type="text" id="db-url" value="${escHtml(savedUrl)}" placeholder="https://xxxxx.supabase.co" style="width:100%;padding:10px;background:var(--admin-input);border:1px solid var(--admin-border);border-radius:6px;color:white;font-size:0.85rem;font-family:inherit;outline:none;" />
      </div>
      <div class="config-field" style="margin-bottom:16px;">
        <label>Anon Public Key</label>
        <input type="text" id="db-key" value="${escHtml(savedKey)}" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." style="width:100%;padding:10px;background:var(--admin-input);border:1px solid var(--admin-border);border-radius:6px;color:white;font-size:0.85rem;font-family:inherit;outline:none;" />
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-primary" onclick="saveDatabaseConfig()">💾 保存并连接</button>
        <span id="dbTestResult" style="align-self:center;font-size:0.85rem;"></span>
      </div>
      <div style="margin-top:20px;padding:16px;background:var(--admin-card);border-radius:8px;border:1px solid var(--admin-border);">
        <h4 style="color:var(--admin-muted);font-size:0.85rem;margin-bottom:8px;">📋 首次使用步骤</h4>
        <ol style="font-size:0.82rem;color:var(--admin-muted);line-height:1.8;padding-left:20px;">
          <li>去 <a href="https://supabase.com" target="_blank" style="color:var(--admin-primary);">supabase.com</a> 注册免费账号</li>
          <li>创建新项目（选 Free 套餐）</li>
          <li>记下 Project Settings → API 里的 Project URL 和 anon key</li>
          <li>这里的 SQL Editor → 粘贴执行 <code style="background:#333;padding:1px 5px;border-radius:3px;">supabase/schema.sql</code></li>
          <li>回这里填上 URL 和 Key，保存即可</li>
        </ol>
      </div>
    </div>
  `;
}

function saveDatabaseConfig() {
  const url = document.getElementById('db-url').value.trim();
  const key = document.getElementById('db-key').value.trim();
  if (!url || !key) { showToast('⚠️ 请填写 URL 和 Key'); return; }
  if (!url.includes('supabase.co')) { showToast('⚠️ URL 格式不对，应该是 https://xxx.supabase.co'); return; }
  localStorage.setItem('supabase_url', url);
  localStorage.setItem('supabase_anon_key', key);
  document.getElementById('dbTestResult').textContent = '🔄 测试连接...';
  // 测试并重新加载
  sb = getSupabaseClient();
  if (!sb) {
    document.getElementById('dbTestResult').textContent = '🔴 连接失败';
    showToast('🔴 连接失败');
    return;
  }
  loadAllData();
  showToast('✅ 数据库配置已保存，数据已加载');
}

// ===== Config =====
function loadConfig() {
  document.getElementById('cfg-siteName').value = data.siteName || '';
  document.getElementById('cfg-tagline').value = data.tagline || '';
  document.getElementById('cfg-whatsapp').value = data.whatsappNumber || '';
  document.getElementById('cfg-telegram').value = data.telegram || '';
  document.getElementById('cfg-areas').value = (data.areas || []).join(', ');
}

async function saveConfig() {
  data.siteName = document.getElementById('cfg-siteName').value.trim();
  data.tagline = document.getElementById('cfg-tagline').value.trim();
  data.whatsappNumber = document.getElementById('cfg-whatsapp').value.trim();
  data.telegram = document.getElementById('cfg-telegram').value.trim();
  data.areas = document.getElementById('cfg-areas').value.split(/[,，\s]+/).filter(Boolean);

  if (sb) {
    try {
      const { error } = await sb.from('site_config').upsert({
        id: 1,
        site_name: data.siteName,
        tagline: data.tagline,
        whatsapp_number: data.whatsappNumber,
        telegram: data.telegram,
        areas: data.areas,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      showToast('✅ 设置已保存到 Supabase');
    } catch(e) {
      showToast('❌ 保存失败: ' + e.message);
      console.error(e);
    }
  } else {
    showToast('✅ 网站设置已保存（仅本地）');
  }
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
            <label>渐变背景色</label>
            <input type="text" value="${escHtml(t.coverBg)}" onchange="updateField(${idx},'coverBg',this.value)" />
          </div>
        </div>
        <div class="form-row form-row-2">
          <div class="field-group" style="grid-column:1/-1;">
            <label>照片 URL（每行一个）</label>
            <textarea rows="3" onchange="updatePhotos(${idx},this.value)">${(t.photos||[]).join('\n')}</textarea>
            <div style="margin-top:6px;font-size:0.75rem;color:var(--admin-muted);">
              当前 ${(t.photos||[]).filter(p => p).length} 张照片
              ${sb ? '<span style="color:var(--admin-success);"> · 建议上传到 Supabase Storage 后使用公开 URL</span>' : ''}
            </div>
          </div>
        </div>
        <div class="form-row form-row-2">
          <div class="field-group" style="grid-column:1/-1;">
            <label>视频 URL</label>
            <input type="text" value="${escHtml(t.videoUrl)}" onchange="updateField(${idx},'videoUrl',this.value)" />
          </div>
        </div>
        <div class="form-row form-row-2">
          <div class="field-group">
            <label>经验</label>
            <input type="text" value="${escHtml(t.experience||'')}" onchange="updateField(${idx},'experience',this.value)" />
          </div>
          <div class="field-group">
            <label>身高</label>
            <input type="text" value="${escHtml(t.height||'')}" onchange="updateField(${idx},'height',this.value)" />
          </div>
          <div class="field-group">
            <label>体重</label>
            <input type="text" value="${escHtml(t.weight||'')}" onchange="updateField(${idx},'weight',this.value)" />
          </div>
          <div class="field-group">
            <label>胸围</label>
            <input type="text" value="${escHtml(t.bust||'')}" onchange="updateField(${idx},'bust',this.value)" />
          </div>
          <div class="field-group">
            <label>产地</label>
            <input type="text" value="${escHtml(t.origin||'')}" onchange="updateField(${idx},'origin',this.value)" />
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

        <div class="field-group" style="margin-top:8px;">
          <label>专长标签</label>
          <div class="specialties-editor" id="specs-${idx}"></div>
          <div class="spec-input-row">
            <input type="text" id="specInput-${idx}" placeholder="输入新专长" onkeydown="if(event.key==='Enter'){event.preventDefault();addSpecialty(${idx})}" />
            <button class="btn btn-primary btn-sm" onclick="addSpecialty(${idx})">添加</button>
          </div>
        </div>

        <div class="field-group" style="margin-top:12px;">
          <label>服务项目与价格</label>
          <div class="services-editor" id="services-${idx}"></div>
          <button class="item-add" onclick="addService(${idx})">➕ 添加服务项目</button>
        </div>

        <div class="field-group" style="margin-top:12px;">
          <label>顾客评价</label>
          <div class="reviews-editor" id="reviews-${idx}"></div>
          <button class="item-add" onclick="addReview(${idx})">➕ 添加评价</button>
        </div>

        <div class="tech-card-actions">
          <button class="btn btn-primary btn-sm" onclick="saveTechnician(${idx})">💾 保存到数据库</button>
          <button class="btn btn-danger btn-sm" onclick="deleteTechnician(${idx})">🗑 删除</button>
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

// ===== 新增：保存单个技师到 Supabase =====
async function saveTechnician(idx) {
  if (!sb) { showToast('⚠️ 未连接数据库，先配置 Supabase'); return; }
  const t = data.technicians[idx];
  if (!t) return;

  try {
    const record = {
      name: t.name,
      age: t.age,
      area: t.area,
      cover_bg: t.coverBg,
      specialties: t.specialties || [],
      rating: t.rating,
      review_count: t.reviewCount || 0,
      price: t.price,
      phone: t.phone || '',
      available: t.available,
      experience: t.experience || '',
      height: t.height || '',
      weight: t.weight || '',
      bust: t.bust || '',
      origin: t.origin || '',
      bio: t.bio || '',
      service_range: t.serviceRange || '',
      photo_urls: (t.photos || []).filter(p => p),
      video_url: t.videoUrl || '',
      services: t.services || [],
      reviews: t.reviews || [],
      sort_order: t.sort_order || idx,
      updated_at: new Date().toISOString(),
    };

    if (t.id > 0) {
      // 更新
      const { error } = await sb.from('technicians').update(record).eq('id', t.id);
      if (error) throw error;
      showToast(`✅ ${t.name} 已更新`);
    } else {
      // 新增
      const { data: inserted, error } = await sb.from('technicians').insert(record).select();
      if (error) throw error;
      if (inserted && inserted[0]) {
        t.id = inserted[0].id;
      }
      showToast(`✅ ${t.name} 已添加`);
    }
  } catch(e) {
    showToast('❌ 保存失败: ' + e.message);
    console.error(e);
  }
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

function updatePhotos(idx, text) {
  data.technicians[idx].photos = text.split('\n').map(s => s.trim()).filter(Boolean);
}

function renderSpecialties(idx) {
  const el = document.getElementById(`specs-${idx}`);
  if (!el) return;
  const t = data.technicians[idx];
  el.innerHTML = (t.specialties || []).map((s, si) =>
    `<span class="spec-tag">${escHtml(s)} <span class="spec-remove" onclick="removeSpecialty(${idx},${si})">✕</span></span>`
  ).join('');
}

function addSpecialty(idx) {
  const input = document.getElementById(`specInput-${idx}`);
  const val = input.value.trim();
  if (!val) return;
  if (!data.technicians[idx].specialties) data.technicians[idx].specialties = [];
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
  el.innerHTML = (t.services || []).map((s, si) =>
    `<div class="item-row">
      <input type="text" value="${escHtml(s.name)}" placeholder="服务名称" onchange="updateService(${idx},${si},'name',this.value)" />
      <input type="text" class="item-price" value="${escHtml(s.price)}" placeholder="价格" onchange="updateService(${idx},${si},'price',this.value)" />
      <button class="item-remove" onclick="removeService(${idx},${si})">✕</button>
    </div>`
  ).join('');
}

function updateService(idx, si, key, value) {
  if (!data.technicians[idx].services[si]) data.technicians[idx].services[si] = {};
  data.technicians[idx].services[si][key] = value;
}

function addService(idx) {
  if (!data.technicians[idx].services) data.technicians[idx].services = [];
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
  el.innerHTML = (t.reviews || []).map((r, ri) =>
    `<div class="item-row">
      <input type="text" value="${escHtml(r.user)}" placeholder="评价人" onchange="updateReview(${idx},${ri},'user',this.value)" style="max-width:100px;" />
      <input type="number" class="item-rating" value="${r.rating}" min="1" max="5" placeholder="评分" onchange="updateReview(${idx},${ri},'rating',parseInt(this.value)||5)" />
      <input type="text" value="${escHtml(r.text)}" placeholder="评价内容" onchange="updateReview(${idx},${ri},'text',this.value)" />
      <button class="item-remove" onclick="removeReview(${idx},${ri})">✕</button>
    </div>`
  ).join('');
}

function updateReview(idx, ri, key, value) {
  if (!data.technicians[idx].reviews[ri]) data.technicians[idx].reviews[ri] = {};
  data.technicians[idx].reviews[ri][key] = value;
}

function addReview(idx) {
  if (!data.technicians[idx].reviews) data.technicians[idx].reviews = [];
  data.technicians[idx].reviews.push({ user: "", rating: 5, text: "" });
  renderReviews(idx);
}

function removeReview(idx, ri) {
  data.technicians[idx].reviews.splice(ri, 1);
  renderReviews(idx);
}

function addTechnician() {
  data.technicians.push({
    id: 0,  // 0 表示新技师，保存到 Supabase 时自动生成
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
    serviceRange: "",
    photos: [],
    videoUrl: "",
    services: [{ name: "按摩（1小时）", price: "RM 80" }],
    reviews: []
  });
  renderTechs();
}

function deleteTechnician(idx) {
  const t = data.technicians[idx];
  if (!confirm(`确定删除 ${t.name} 吗？`)) return;

  if (sb && t.id > 0) {
    sb.from('technicians').delete().eq('id', t.id).then(({ error }) => {
      if (error) console.error(error);
    });
  }

  data.technicians.splice(idx, 1);
  renderTechs();
  showToast('🗑 已删除');
}

// ===== Export / Preview =====
function exportData() {
  showToast('📥 使用 Supabase 后不需要导出 data.js，数据已在云端');
  // 仍然提供传统导出
  let areasStr = JSON.stringify(data.areas, null, 2);
  let techsStr = JSON.stringify(data.technicians.map(t => {
    const {id, name, age, area, coverBg, specialties, rating, reviewCount, price, phone, available, experience, height, weight, bust, origin, bio, serviceRange, photos, videoUrl, services, reviews} = t;
    return {id, name, age, area, coverBg, specialties, rating, reviewCount, price, phone, available, experience, height, weight, bust, origin, bio, serviceRange, photos, videoUrl, services, reviews};
  }), null, 2);

  const output = `const SITE_CONFIG = ${JSON.stringify({
    siteName: data.siteName,
    tagline: data.tagline,
    whatsappNumber: data.whatsappNumber,
    telegram: data.telegram,
    areas: data.areas,
  }, null, 2)};

const technicians = ${techsStr};

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

// ===== Analytics (Umami) =====
function loadAnalytics() {
  if (!localStorage.getItem('umamiConfig')) {
    localStorage.setItem('umamiConfig', JSON.stringify({
      url: 'https://d0bde631cd377f.lhr.life',
      siteId: '47384b7d-4d25-4293-9f69-c3b1e0e696e6'
    }));
  }
  const saved = localStorage.getItem('umamiConfig');
  const container = document.getElementById('analyticsIframeContainer');
  const status = document.getElementById('analytics-status');

  if (!saved) {
    container.innerHTML = `
      <div style="font-size:3rem;">📊</div>
      <div style="color:var(--admin-muted);text-align:center;font-size:0.9rem;max-width:400px;">
        <p style="margin-bottom:12px;">还没有配置 Umami 看板</p>
        <p>部署 Umami 后在后台创建站点，获得 Website ID</p>
      </div>
    `;
    if (status) status.textContent = '⚙️ 待配置';
    return;
  }

  try {
    const cfg = JSON.parse(saved);
    if (status) status.textContent = '🟢 已连接';
    const url = cfg.url.replace(/\/$/, '');
    container.innerHTML = `
      <div style="width:100%;display:flex;gap:8px;margin-bottom:12px;">
        <button onclick="resetUmamiConfig()" style="padding:6px 14px;border:1px solid var(--admin-border);border-radius:6px;background:transparent;color:var(--admin-muted);cursor:pointer;font-size:0.8rem;">⚙️ 重新配置</button>
        <a href="${url}" target="_blank" style="padding:6px 14px;border:1px solid var(--admin-border);border-radius:6px;background:transparent;color:var(--admin-primary);cursor:pointer;font-size:0.8rem;text-decoration:none;">🔗 打开 Umami</a>
      </div>
      <iframe src="${url}/share/${cfg.siteId}" style="width:100%;min-height:600px;border:none;border-radius:8px;"></iframe>
    `;
  } catch(e) {
    container.innerHTML = '<div style="color:var(--admin-danger);">配置读取失败</div>';
  }
}

function resetUmamiConfig() {
  localStorage.removeItem('umamiConfig');
  loadAnalytics();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2500);
}

function escHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ===== 实时订阅（别人改数据时自动刷新）=====
function subscribeAdminRealtime() {
  if (!sb) return;

  try {
    // 监听 site_config
    sb
      .channel('admin-site-config')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'site_config', filter: 'id=eq.1' },
        async () => {
          console.log('🦀 后台检测到设置变化，自动刷新');
          await loadAllData();
          if (currentTab === 'config') loadConfig();
          showToast('🔄 设置已同步（来自他人修改）');
        }
      )
      .subscribe();

    // 监听 technicians
    sb
      .channel('admin-technicians')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'technicians' },
        async () => {
          console.log('🦀 后台检测到技师变化，自动刷新');
          // 记住当前打开的卡片
          const openCards = [];
          data.technicians.forEach((t, i) => {
            const body = document.getElementById(`cardBody-${i}`);
            if (body && body.classList.contains('open')) {
              openCards.push(i);
            }
          });
          await loadAllData();
          if (currentTab === 'techs') {
            renderTechs();
            // 重新展开之前打开的卡片
            setTimeout(() => {
              openCards.forEach(i => {
                const body = document.getElementById(`cardBody-${i}`);
                const toggle = document.getElementById(`toggle-${i}`);
                if (body && toggle) {
                  body.classList.add('open');
                  toggle.textContent = '▲';
                }
              });
            }, 100);
          }
          showToast('🔄 技师数据已同步（来自他人修改）');
        }
      )
      .subscribe();

  } catch(e) {
    console.warn('🦀 后台实时订阅失败:', e.message);
  }
}

// ===== Init =====
(() => {
  loadAllData();
  renderDatabaseConfig();
  // 延迟一下等数据加载完再订阅
  setTimeout(() => subscribeAdminRealtime(), 2000);
})();
