/**
 * 🦀 按按摩 3.0 - Tinder风格滑动卡片
 * 所有逻辑都在这里
 */

// ============================================
//  状态
// ============================================
let currentTechs = [];
let currentIdx = 0;
let isAnimating = false;
let startX = 0, startY = 0, isDragging = false;
let cardEl = null;

// ============================================
//  首页 - Tinder滑动卡片
// ============================================

function initSwipe() {
  currentTechs = [...technicians];
  currentIdx = 0;
  renderStack();
  renderActions();
}

function renderStack() {
  const stack = document.getElementById('cardStack');
  if (!stack) return;
  if (currentTechs.length === 0 || currentIdx >= currentTechs.length) {
    stack.innerHTML = `
      <div class="no-more">
        <div class="emoji">🦀</div>
        <h3>没有更多技师了</h3>
        <p>明天再来看看吧</p>
        <button class="btn-reset" onclick="resetCards()">重新开始</button>
      </div>
    `;
    return;
  }
  const t = currentTechs[currentIdx];
  stack.innerHTML = `
    <div class="swipe-card" id="swipeCard">
      <div class="card-media" style="background:${t.coverBg || 'linear-gradient(135deg,#8B5CF6,#EC4899)'}">
        🦀
      </div>
      <div class="card-overlay"></div>
      <div class="card-label like">❤️ 喜欢</div>
      <div class="card-label nope">👋 跳过</div>
      <div class="card-counter">${currentIdx + 1}/${currentTechs.length}</div>
      <div class="card-info">
        <div class="card-tags">
          ${t.specialties.slice(0,3).map(s => `<span class="card-tag">#${s}</span>`).join('')}
        </div>
        <div class="card-name">${t.name} <span>${t.age}岁</span></div>
        <div class="card-meta">
          <span>📍 ${t.area}</span>
          <span>⏳ ${t.experience}</span>
          <span>⭐ ${t.rating}</span>
        </div>
        <div class="card-price">💰 ${t.price}</div>
      </div>
    </div>
  `;
  cardEl = document.getElementById('swipeCard');
  bindSwipeEvents();
}

function renderActions() {
  const bar = document.getElementById('actionBar');
  if (!bar) return;
  if (!currentTechs.length || currentIdx >= currentTechs.length) {
    bar.innerHTML = '';
    return;
  }
  bar.innerHTML = `
    <div style="text-align:center;">
      <button class="action-btn nope" onclick="swipeNope()">✕</button>
      <div class="action-label">跳过</div>
    </div>
    <div style="text-align:center;">
      <button class="action-btn book" onclick="goBook()">💬</button>
      <div class="action-label">预约</div>
    </div>
    <div style="text-align:center;">
      <button class="action-btn like" onclick="swipeLike()">♥</button>
      <div class="action-label">喜欢</div>
    </div>
    <div style="text-align:center;">
      <button class="action-btn info" onclick="goDetail()">📋</button>
      <div class="action-label">详情</div>
    </div>
  `;
}

// ============================================
//  滑动逻辑
// ============================================

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
  cardEl.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
  const opacity = Math.min(Math.abs(dx) / 150, 1);
  const likeEl = cardEl.querySelector('.card-label.like');
  const nopeEl = cardEl.querySelector('.card-label.nope');
  if (likeEl && nopeEl) {
    likeEl.style.opacity = dx > 0 ? opacity : 0;
    nopeEl.style.opacity = dx < 0 ? opacity : 0;
  }
}

function onTouchEnd() {
  if (!isDragging || isAnimating || !cardEl) return;
  isDragging = false;
  const rect = cardEl.getBoundingClientRect();
  const dx = rect.left + rect.width / 2 - window.innerWidth / 2;
  if (Math.abs(dx) > 120) {
    // Swipe away
    const dir = dx > 0 ? 1 : -1;
    cardEl.style.transition = 'transform 0.3s ease';
    cardEl.style.transform = `translate(${dir * 800}px, 100px) rotate(${dir * 20}deg)`;
    setTimeout(() => {
      if (dx > 0) showToast('❤️ 已收藏');
      nextCard();
    }, 300);
  } else {
    // Snap back
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
function onMouseUp(e) {
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
  const t = currentTechs[currentIdx];
  showToast(`❤️ 已收藏 ${t.name}`);
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
  currentTechs = [...technicians];
  renderStack();
  renderActions();
}

// ============================================
//  跳转
// ============================================

function goDetail() {
  const t = currentTechs[currentIdx];
  if (!t) return;
  window.location.href = `technician.html?id=${t.id}`;
}

function goBook() {
  const t = currentTechs[currentIdx];
  if (!t) return;
  window.location.href = `book.html?techId=${t.id}`;
}

function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2000);
}

// ============================================
//  探索页 - 网格浏览
// ============================================

function initExplore() {
  const bar = document.getElementById('filterBar');
  const grid = document.getElementById('exploreGrid');
  if (!grid) return;

  const areas = getAllAreas();
  areas.forEach(a => {
    const btn = document.createElement('button');
    btn.className = 'filter-chip';
    btn.dataset.area = a;
    btn.textContent = a;
    btn.onclick = () => filterGrid(a);
    bar.appendChild(btn);
  });
  renderGrid(technicians);
}

function renderGrid(list) {
  const grid = document.getElementById('exploreGrid');
  if (!grid) return;
  if (!list.length) {
    grid.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-light);">没有找到技师</div>`;
    return;
  }
  grid.innerHTML = list.map(t => `
    <div class="grid-card" onclick="window.location.href='technician.html?id=${t.id}'">
      <div class="grid-card-cover" style="background:${t.coverBg || 'linear-gradient(135deg,#8B5CF6,#EC4899)'}">
        🦀
      </div>
      <div class="grid-card-body">
        <div class="grid-card-top">
          <span class="grid-card-name">${t.name}</span>
          <span class="grid-card-age">${t.age}岁</span>
        </div>
        <div class="grid-card-area">📍 ${t.area} · ${t.experience}</div>
        <div class="grid-card-tags">
          ${t.specialties.slice(0,3).map(s => `<span class="grid-card-tag">#${s}</span>`).join('')}
        </div>
        <div class="grid-card-bottom">
          <span class="grid-card-price">💰 ${t.price}</span>
          <span class="grid-card-rating">⭐ ${t.rating}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function filterGrid(area) {
  document.querySelectorAll('.filter-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.area === area);
  });
  renderGrid(getTechniciansByArea(area));
}

function searchTechs() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  if (!q) { renderGrid(technicians); return; }
  const filtered = technicians.filter(t =>
    t.name.includes(q) || t.area.includes(q) || t.specialties.some(s => s.includes(q))
  );
  renderGrid(filtered);
}

// ============================================
//  详情页
// ============================================

function initDetail() {
  const container = document.getElementById('detailContainer');
  if (!container) return;
  const id = new URLSearchParams(window.location.search).get('id');
  const t = getTechnicianById(id);
  if (!t) { container.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-light);">找不到技师</div>'; return; }
  document.title = `${t.name} - 按按摩`;
  container.innerHTML = `
    <div class="detail-cover" style="background:${t.coverBg || 'linear-gradient(135deg,#8B5CF6,#EC4899)'}">
      <span style="font-size:5rem;">🦀</span>
      <div class="detail-cover-overlay"></div>
      <button class="detail-close" onclick="history.back()">←</button>
    </div>
    <div class="detail-body">
      <div class="detail-name">${t.name} <small>${t.age}岁</small></div>
      <div class="detail-meta">
        <span>📍 ${t.area}</span>
        <span>⏳ ${t.experience}</span>
        <span>📏 ${t.height} · ${t.weight}</span>
        <span>⭐ ${t.rating}</span>
      </div>
      <div class="detail-specs">
        ${t.specialties.map(s => `<span class="detail-spec">${s}</span>`).join('')}
      </div>
      <div class="detail-section">
        <h3>📝 自我介绍</h3>
        <div class="detail-bio">${t.bio}</div>
      </div>
      <div class="detail-section">
        <h3>💰 服务价格</h3>
        ${t.services.map(s => `
          <div class="service-item">
            <span class="service-name">${s.name}</span>
            <span class="service-price">${s.price}</span>
          </div>
        `).join('')}
      </div>
      <div class="detail-section">
        <h3>⭐ 客户评价 (${t.reviewCount})</h3>
        ${t.reviews.length ? t.reviews.map(r => `
          <div class="review-item">
            <div class="review-header">
              <span class="review-user">${r.user}</span>
              <span class="review-stars">${'⭐'.repeat(r.rating)}</span>
            </div>
            <div class="review-text">${r.text}</div>
          </div>
        `).join('') : '<p style="color:var(--text-muted);font-size:0.85rem;">暂无评价</p>'}
      </div>
      <a href="book.html?techId=${t.id}" class="detail-book-btn">💬 立即预约 ${t.name}</a>
    </div>
  `;
}

// ============================================
//  预约页
// ============================================

function initBooking() {
  const techSel = document.getElementById('bookTech');
  const servSel = document.getElementById('bookService');
  if (!techSel) return;
  const preId = new URLSearchParams(window.location.search).get('techId');

  technicians.forEach(t => {
    const o = document.createElement('option');
    o.value = t.id;
    o.textContent = `${t.name} · ${t.area} · ${t.price}`;
    techSel.appendChild(o);
  });

  if (preId) {
    techSel.value = preId;
    updateServices(preId);
    updateTechInfo(preId);
    const t = getTechnicianById(preId);
    const title = document.getElementById('formTitle');
    if (title && t) title.textContent = `预约 ${t.name}`;
  }

  techSel.addEventListener('change', () => {
    updateServices(techSel.value);
    updateTechInfo(techSel.value);
    const t = getTechnicianById(techSel.value);
    const title = document.getElementById('formTitle');
    if (title && t) title.textContent = `预约 ${t.name}`;
  });

  const d = document.getElementById('bookDate');
  if (d) {
    const t = new Date(); t.setDate(t.getDate() + 1);
    d.value = t.toISOString().split('T')[0];
    d.min = new Date().toISOString().split('T')[0];
  }
}

function updateServices(id) {
  const sel = document.getElementById('bookService');
  const t = getTechnicianById(id);
  sel.innerHTML = '<option value="">请选择</option>';
  if (!t) return;
  t.services.forEach(s => {
    const o = document.createElement('option');
    o.value = `${s.name}|${s.price}`;
    o.textContent = `${s.name} — ${s.price}`;
    sel.appendChild(o);
  });
}

function updateTechInfo(id) {
  const el = document.getElementById('bookTechInfo');
  const t = getTechnicianById(id);
  if (!el || !t) return;
  el.innerHTML = `
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
      ${t.specialties.map(s => `<span style="background:rgba(139,92,246,0.15);color:var(--primary-light);padding:3px 10px;border-radius:999px;font-size:0.78rem;">${s}</span>`).join('')}
      <span style="color:var(--text-muted);font-size:0.78rem;">⭐${t.rating} · 服务: ${t.serviceRange}</span>
    </div>
  `;
}

function submitBooking(e) {
  e.preventDefault();
  const techId = document.getElementById('bookTech').value;
  const sv = document.getElementById('bookService').value;
  const date = document.getElementById('bookDate').value;
  const time = document.getElementById('bookTime').value;
  const name = document.getElementById('bookName').value;
  const phone = document.getElementById('bookPhone').value;
  const addr = document.getElementById('bookAddress')?.value || '';

  if (!techId || !sv || !date || !time || !name || !phone) {
    alert('请填写所有必填信息');
    return;
  }

  const t = getTechnicianById(techId);
  const [sn, sp] = sv.split('|');

  sessionStorage.setItem('bookingInfo', JSON.stringify({
    techName: t ? t.name : '',
    serviceName: sn, servicePrice: sp,
    date, time, customerName: name, customerPhone: phone, address: addr
  }));
  window.location.href = 'booking-success.html';
}

// ============================================
//  成功页
// ============================================

function initSuccess() {
  const box = document.getElementById('successBox');
  const link = document.getElementById('waLink');
  if (!box) return;
  const data = sessionStorage.getItem('bookingInfo');
  if (!data) {
    box.innerHTML = '<p style="text-align:center;">没有预约信息</p>';
    if (link) link.style.display = 'none';
    return;
  }
  const b = JSON.parse(data);
  const msg = [
    `🦀 按按摩 - 新预约`,
    ``,
    `💆 技师：${b.techName}`,
    `📋 服务：${b.serviceName} (${b.servicePrice})`,
    `📅 时间：${b.date} ${b.time}`,
    `👤 客户：${b.customerName}`,
    `📞 电话：${b.customerPhone}`,
    b.address ? `🏠 地址：${b.address}` : '',
  ].filter(Boolean).join('\n');

  box.innerHTML = [
    `<p><strong>💆 技师：</strong>${b.techName}</p>`,
    `<p><strong>📋 服务：</strong>${b.serviceName} (${b.servicePrice})</p>`,
    `<p><strong>📅 时间：</strong>${b.date} ${b.time}</p>`,
    `<p><strong>👤 客户：</strong>${b.customerName}</p>`,
    `<p><strong>📞 电话：</strong>${b.customerPhone}</p>`,
    b.address ? `<p><strong>🏠 地址：</strong>${b.address}</p>` : '',
  ].join('');

  if (link) link.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

// ============================================
//  页面路由
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const p = window.location.pathname;
  if (p.includes('explore.html')) initExplore();
  else if (p.includes('technician.html')) initDetail();
  else if (p.includes('book.html')) initBooking();
  else if (p.includes('booking-success.html')) initSuccess();
  else initSwipe();
});
