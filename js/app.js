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
let cardPhotoIdx = 0; // 当前卡片显示第几张照片
let gridPhotoIdx = {}; // 网格卡片照片索引 {techId: index}
let currentMode = 'tech'; // 'tech' | 'guide'

// ============================================
//  模式切换
// ============================================

function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.mode === mode);
  });
  document.title = (mode === 'guide' ? '🤝 地陪 - ' : '💆 按摩 - ') + (SITE_CONFIG && SITE_CONFIG.siteName) || document.title;
  const logo = document.querySelector('.logo');
  if (logo) logo.textContent = (mode === 'guide' ? '🤝 ' : '🦀 ') + (SITE_CONFIG && SITE_CONFIG.siteName);
  currentIdx = 0;
  cardPhotoIdx = 0;
  currentTechs = [...(mode === 'guide' ? guides : technicians)];
  renderStack();
  renderActions();
}

// ============================================
//  首页 - Tinder滑动卡片
// ============================================

function initSwipe() {
  document.title = (SITE_CONFIG && SITE_CONFIG.siteName) + ' - ' + (SITE_CONFIG && SITE_CONFIG.tagline) || document.title;
  currentTechs = [...(currentMode === 'guide' ? guides : technicians)];
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
  // 收集所有可用的照片
  const allPhotos = (t.photos && t.photos.length) ? t.photos : (t.photo ? [t.photo] : []);
  const totalCardPhotos = allPhotos.length;
  // 确保 cardPhotoIdx 不越界
  if (cardPhotoIdx >= totalCardPhotos) cardPhotoIdx = 0;
  const currentCardPhoto = totalCardPhotos > 0 ? allPhotos[cardPhotoIdx] : '';
  const hasCardPhoto = currentCardPhoto && (currentCardPhoto.startsWith('data:') || currentCardPhoto.startsWith('http'));
  stack.innerHTML = `
    <div class="swipe-card" id="swipeCard">
      <div class="card-media" id="cardMedia" style="background:${hasCardPhoto ? '#000' : (t.coverBg || 'linear-gradient(135deg,#8B5CF6,#EC4899)')};${hasCardPhoto ? 'background-image:url('+currentCardPhoto+');background-size:cover;background-position:center;' : ''}">
        ${hasCardPhoto ? '' : '🦀'}
        ${totalCardPhotos > 1 ? '<div class="card-photo-nav" onclick="event.stopPropagation();"><div class="card-photo-arrow left" onclick="cardPhotoPrev(event)">‹</div><div class="card-photo-arrow right" onclick="cardPhotoNext(event)">›</div></div>' : ''}
      </div>
      <div class="card-overlay"></div>
      ${totalCardPhotos > 1 ? '<div class="card-photo-dots">'+allPhotos.map((p, i) => '<span class="card-dot'+(i===cardPhotoIdx?' active':'')+'" onclick="event.stopPropagation();jumpCardPhoto('+i+','+currentIdx+')"></span>').join('')+'</div>' : ''}
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
          ${currentMode === 'guide' && t.languages ? '<span>🗣️ ' + t.languages.slice(0,3).join('·') + '</span>' : ''}
          <span>${t.origin ? '🌏 '+t.origin + ' · ' : ''}⭐ ${t.rating}</span>
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

function resetCards() {
  currentIdx = 0;
  cardPhotoIdx = 0;
  currentTechs = [...(currentMode === 'guide' ? guides : technicians)];
  renderStack();
  renderActions();
}

// 卡片照片翻页
function cardPhotoNext(e) {
  if (e) e.stopPropagation();
  const t = currentTechs[currentIdx];
  const photos = (t.photos && t.photos.length) ? t.photos : (t.photo ? [t.photo] : []);
  if (photos.length < 2) return;
  cardPhotoIdx = (cardPhotoIdx + 1) % photos.length;
  renderStack();
  renderActions();
}
function cardPhotoPrev(e) {
  if (e) e.stopPropagation();
  const t = currentTechs[currentIdx];
  const photos = (t.photos && t.photos.length) ? t.photos : (t.photo ? [t.photo] : []);
  if (photos.length < 2) return;
  cardPhotoIdx = (cardPhotoIdx - 1 + photos.length) % photos.length;
  renderStack();
  renderActions();
}
function jumpCardPhoto(idx, techIdx) {
  if (techIdx !== currentIdx) return;
  cardPhotoIdx = idx;
  renderStack();
  renderActions();
}

function nextCard() {
  currentIdx++;
  cardPhotoIdx = 0;
  isAnimating = false;
  renderStack();
  renderActions();
}

// ============================================
//  跳转
// ============================================

function goDetail() {
  const t = currentTechs[currentIdx];
  if (!t) return;
  window.location.href = `technician.html?id=${t.id}${currentMode === 'guide' ? '&mode=guide' : ''}`;
}

function goBook() {
  const t = currentTechs[currentIdx];
  if (!t) return;
  window.location.href = `book.html?techId=${t.id}${currentMode === 'guide' ? '&mode=guide' : ''}`;
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

let exploreMode = 'tech';

function switchExploreMode(mode) {
  exploreMode = mode;
  document.querySelectorAll('.mode-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.mode === mode);
  });
  const sub = document.getElementById('exploreSubtitle');
  if (sub) sub.textContent = mode === 'guide' ? '找到你喜欢的本地向导' : '找到你喜欢的技师';
  // Rebuild filters
  const bar = document.getElementById('filterBar');
  if (bar) {
    bar.innerHTML = '<button class="filter-chip active" data-area="all" onclick="filterGrid(\'all\')">全部</button>';
    const areas = mode === 'guide' ? getAllGuideAreas() : getAllAreas();
    areas.forEach(a => {
      const btn = document.createElement('button');
      btn.className = 'filter-chip';
      btn.dataset.area = a;
      btn.textContent = a;
      btn.onclick = () => filterGrid(a);
      bar.appendChild(btn);
    });
  }
  const src = mode === 'guide' ? guides : technicians;
  renderGrid(src);
}

function initExplore() {
  document.title = '浏览 - ' + (SITE_CONFIG && SITE_CONFIG.siteName) || document.title;
  // 标语横幅
  const banner = document.getElementById('exploreBanner');
  if (banner && SITE_CONFIG.tagline) {
    let html = '<div>' + SITE_CONFIG.tagline + '</div>';
    const contactHtml = [];
    if (SITE_CONFIG.whatsappNumber) {
      contactHtml.push('<a class="wa-btn" href="https://wa.me/' + SITE_CONFIG.whatsappNumber + '" target="_blank">💬 WhatsApp</a>');
    }
    if (SITE_CONFIG.telegram) {
      contactHtml.push('<a class="tg-btn" href="https://t.me/' + SITE_CONFIG.telegram + '" target="_blank">✈️ Telegram</a>');
    }
    if (contactHtml.length) {
      html += '<div class="banner-contact">' + contactHtml.join('') + '</div>';
    }
    banner.innerHTML = html;
    banner.style.display = 'block';
  }
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
  const isGuide = exploreMode === 'guide';
  const emptyText = isGuide ? '没有找到地陪' : '没有找到技师';
  if (!list.length) {
    grid.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-light);">${emptyText}</div>`;
    return;
  }
  grid.innerHTML = list.map(t => {
    const allGridPhotos = (t.photos && t.photos.length) ? t.photos : (t.photo ? [t.photo] : []);
    if (gridPhotoIdx[t.id] === undefined) gridPhotoIdx[t.id] = 0;
    if (gridPhotoIdx[t.id] >= allGridPhotos.length) gridPhotoIdx[t.id] = 0;
    const gridMainPhoto = allGridPhotos.length > 0 ? allGridPhotos[gridPhotoIdx[t.id]] : '';
    const hasGridPhoto = gridMainPhoto && (gridMainPhoto.startsWith('data:')||gridMainPhoto.startsWith('http'));
    const modeSuffix = isGuide ? '&mode=guide' : '';
    const extraInfo = isGuide && t.languages ? '🗣️' + t.languages.slice(0,2).join('/') : '📏' + (t.height||'?') + ' ' + (t.weight||'?') + (t.bust ? ' 👙' + t.bust : '');
    return `
    <div class="grid-card">
      <div class="grid-card-cover" onclick="window.location.href='technician.html?id=${t.id}${modeSuffix}'" style="background:${hasGridPhoto ? '#111' : (t.coverBg || 'linear-gradient(135deg,#8B5CF6,#EC4899)')};">
        ${hasGridPhoto ? '<img src="'+gridMainPhoto+'" style="width:100%;height:100%;object-fit:contain;padding:8px;" />' : (isGuide ? '🤝' : '🦀')}
        ${allGridPhotos.length > 1 ? '<div class="grid-photo-nav"><div class="grid-photo-arrow left" onclick="event.stopPropagation();gridPhotoSwitch('+t.id+',-1)">‹</div><div class="grid-photo-arrow right" onclick="event.stopPropagation();gridPhotoSwitch('+t.id+',1)">›</div></div>' : ''}
      </div>
      <div class="grid-card-body" onclick="window.location.href='technician.html?id=${t.id}${modeSuffix}'">
        <div class="grid-card-top">
          <span class="grid-card-name">${t.name}</span>
          <span class="grid-card-age">${t.age}岁</span>
        </div>
        <div class="grid-card-area">📍 ${t.area} · ${t.experience}</div>
        <div class="grid-card-bodyinfo">${extraInfo}${t.origin?' 🌏'+t.origin:''}</div>
        <div class="grid-card-tags">
          ${t.specialties.slice(0,3).map(s => `<span class="grid-card-tag">#${s}</span>`).join('')}
        </div>
        <div class="grid-card-bottom">
          <span class="grid-card-price">💰 ${t.price}</span>
          <span class="grid-card-rating">⭐ ${t.rating}</span>
        </div>
      </div>
    </div>
  `;}).join('');
}

function filterGrid(area) {
  document.querySelectorAll('.filter-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.area === area);
  });
  const areaFn = exploreMode === 'guide' ? getGuidesByArea : getTechniciansByArea;
  renderGrid(areaFn(area));
}

function gridPhotoSwitch(id, dir) {
  const getFn = exploreMode === 'guide' ? getGuideById : getTechnicianById;
  const t = getFn(id);
  if (!t) return;
  const allPhotos = (t.photos && t.photos.length) ? t.photos : (t.photo ? [t.photo] : []);
  if (allPhotos.length < 2) return;
  if (gridPhotoIdx[id] === undefined) gridPhotoIdx[id] = 0;
  gridPhotoIdx[id] = (gridPhotoIdx[id] + dir + allPhotos.length) % allPhotos.length;
  renderGrid(getFilteredTechs());
}

function getFilteredTechs() {
  const q = document.getElementById('searchInput')?.value.trim().toLowerCase();
  const src = exploreMode === 'guide' ? guides : technicians;
  if (!q) return src;
  return src.filter(t =>
    t.name.includes(q) || t.area.includes(q) || t.specialties.some(s => s.includes(q))
  );
}

function searchTechs() {
  renderGrid(getFilteredTechs());
}

// ============================================
//  详情页
// ============================================

function getVideoEmbedUrl(url) {
  if (!url) return '';
  // YouTube watch URL -> embed
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  // YouTube shorts
  const shortsMatch = url.match(/youtube\.com\/shorts\/([\w-]+)/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  // Direct video URL
  return url;
}

function initDetail() {
  const container = document.getElementById('detailContainer');
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const mode = params.get('mode') || 'tech';
  const isGuide = mode === 'guide';
  const t = isGuide ? getGuideById(id) : getTechnicianById(id);
  if (!t) { container.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-light);">'+(isGuide?'找不到地陪':'找不到技师')+'</div>'; return; }
  document.title = `${t.name} - ${(SITE_CONFIG && SITE_CONFIG.siteName) || '按按摩'}`;
  const photos = (t.photos && t.photos.length) ? t.photos : (t.photo ? [t.photo] : []);
  const hasPhotos = photos.some(p => p.startsWith('data:')||p.startsWith('http'));
  const mainPhoto = photos[0] || '';
  container.innerHTML = `
    <div class="detail-cover" id="detailCover" style="background:${hasPhotos ? '#111' : (t.coverBg || 'linear-gradient(135deg,#8B5CF6,#EC4899)')};overflow:hidden;">
      ${hasPhotos ? '<img src="'+mainPhoto+'" id="detailCoverImg" style="width:100%;height:100%;object-fit:contain;padding:10px;" />' : (isGuide ? '<span style="font-size:5rem;">🤝</span>' : '<span style="font-size:5rem;">🦀</span>')}
      <div class="detail-cover-overlay"></div>
      <button class="detail-close" onclick="history.back()">←</button>
      ${hasPhotos && photos.length > 1 ? '<div class="detail-photo-dots">'+photos.map((p,i) => '<span class="dot '+(i===0?'active':'')+'" onclick="switchDetailPhoto('+t.id+','+i+')"></span>').join('')+'</div>' : ''}
    </div>
    ${hasPhotos ? '<div class="detail-thumbs">'+photos.map((p,i) => '<img src="'+p+'" class="detail-thumb'+(i===0?' active':'')+'" onclick="switchDetailPhoto('+t.id+','+i+')" />').join('')+'</div>' : ''}
    <div class="detail-body">
      <div class="detail-name">${t.name} <small>${t.age}岁</small></div>
      <div class="detail-meta">
        <span>📍 ${t.area}</span>
        <span>⏳ ${t.experience}</span>
        ${isGuide && t.languages ? '<span>🗣️ ' + t.languages.join(' · ') + '</span>' : '<span>📏 ' + (t.height || '?') + ' · ' + (t.weight || '?') + (t.bust ? ' · 👙 '+t.bust : '') + '</span>'}
        ${t.origin ? '<span>🌏 '+t.origin + '</span>' : ''}
        <span>⭐ ${t.rating}</span>
      </div>
      <div class="detail-specs">
        ${t.specialties.map(s => `<span class="detail-spec">${s}</span>`).join('')}
      </div>
      <div class="detail-section">
        <h3>📝 ${isGuide ? '地陪介绍' : '自我介绍'}</h3>
        <div class="detail-bio">${t.bio}</div>
      </div>
      ${t.videoUrl ? '<div class="detail-section"><h3>🎬 视频介绍</h3><div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:var(--radius-sm);border:1px solid var(--border);background:#000;">'+(t.videoUrl.startsWith('data:') ? '<video src="'+t.videoUrl+'" style="position:absolute;top:0;left:0;width:100%;height:100%;" controls playsinline></video>' : '<iframe src="'+getVideoEmbedUrl(t.videoUrl)+'" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allowfullscreen></iframe>')+'</div></div>' : ''}
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
      <a href="book.html?techId=${t.id}${isGuide ? '&mode=guide' : ''}" class="detail-book-btn">💬 立即预约 ${t.name}</a>
    </div>
  `;
}

function switchDetailPhoto(id, idx) {
  const mode = new URLSearchParams(window.location.search).get('mode') || 'tech';
  const getFn = mode === 'guide' ? getGuideById : getTechnicianById;
  const t = getFn(id);
  if (!t || !t.photos || !t.photos[idx]) return;
  const img = document.getElementById('detailCoverImg');
  if (img) {
    img.src = t.photos[idx];
  }
  document.querySelectorAll('.detail-thumb').forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });
}

// ============================================
//  预约页
// ============================================

function initBooking() {
  document.title = '预约 - ' + (SITE_CONFIG && SITE_CONFIG.siteName) || document.title;
  const techSel = document.getElementById('bookTech');
  const servSel = document.getElementById('bookService');
  if (!techSel) return;
  const params = new URLSearchParams(window.location.search);
  const preId = params.get('techId');
  const mode = params.get('mode') || 'tech';
  const isGuide = mode === 'guide';
  const dataList = isGuide ? guides : technicians;
  const getFn = isGuide ? getGuideById : getTechnicianById;

  dataList.forEach(t => {
    const o = document.createElement('option');
    o.value = t.id;
    o.textContent = `${t.name} · ${t.area} · ${t.price}`;
    techSel.appendChild(o);
  });

  if (preId) {
    techSel.value = preId;
    updateServices(preId, isGuide);
    updateTechInfo(preId, isGuide);
    const t = getFn(preId);
    const title = document.getElementById('formTitle');
    if (title && t) title.textContent = `预约 ${t.name}`;
  }

  techSel.addEventListener('change', () => {
    updateServices(techSel.value, isGuide);
    updateTechInfo(techSel.value, isGuide);
    const t = getFn(techSel.value);
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

function updateServices(id, isGuide) {
  const sel = document.getElementById('bookService');
  const getFn = isGuide ? getGuideById : getTechnicianById;
  const t = getFn(id);
  sel.innerHTML = '<option value="">请选择</option>';
  if (!t) return;
  t.services.forEach(s => {
    const o = document.createElement('option');
    o.value = `${s.name}|${s.price}`;
    o.textContent = `${s.name} — ${s.price}`;
    sel.appendChild(o);
  });
}

function updateTechInfo(id, isGuide) {
  const el = document.getElementById('bookTechInfo');
  const getFn = isGuide ? getGuideById : getTechnicianById;
  const t = getFn(id);
  if (!el || !t) return;
  let extra = '';
  if (isGuide && t.languages) {
    extra = `<span style="color:var(--text-muted);font-size:0.78rem;">🗣️ ${t.languages.join(' · ')}</span>`;
  }
  el.innerHTML = `
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
      ${t.specialties.map(s => `<span style="background:rgba(139,92,246,0.15);color:var(--primary-light);padding:3px 10px;border-radius:999px;font-size:0.78rem;">${s}</span>`).join('')}
      <span style="color:var(--text-muted);font-size:0.78rem;">⭐${t.rating} · 服务: ${t.serviceRange}</span>
      ${extra}
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
  const mode = new URLSearchParams(window.location.search).get('mode') || 'tech';
  const isGuide = mode === 'guide';
  const getFn = isGuide ? getGuideById : getTechnicianById;

  if (!techId || !sv || !date || !time || !name || !phone) {
    alert('请填写所有必填信息');
    return;
  }

  const t = getFn(techId);
  const [sn, sp] = sv.split('|');

  sessionStorage.setItem('bookingInfo', JSON.stringify({
    techName: t ? t.name : '',
    serviceName: sn, servicePrice: sp,
    date, time, customerName: name, customerPhone: phone, address: addr,
    isGuide: isGuide
  }));
  window.location.href = 'booking-success.html';
}

// ============================================
//  成功页
// ============================================

function initSuccess() {
  document.title = '预约成功 - ' + (SITE_CONFIG && SITE_CONFIG.siteName) || document.title;
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
  const isGuide = b.isGuide;
  const roleIcon = isGuide ? '🤝' : '💆';
  const roleLabel = isGuide ? '地陪' : '技师';
  const msg = [
    `${isGuide ? '🤝' : '🦀'} ${(SITE_CONFIG && SITE_CONFIG.siteName) || '按按摩'} - 新预约`,
    ``,
    `${roleIcon} ${roleLabel}：${b.techName}`,
    `📋 服务：${b.serviceName} (${b.servicePrice})`,
    `📅 时间：${b.date} ${b.time}`,
    `👤 客户：${b.customerName}`,
    `📞 电话：${b.customerPhone}`,
    b.address ? `🏠 地址：${b.address}` : '',
  ].filter(Boolean).join('\n');

  box.innerHTML = [
    `<p><strong>${roleIcon} ${roleLabel}：</strong>${b.techName}</p>`,
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
