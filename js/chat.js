/**
 * 🦀 按按摩 - 内置聊天客服
 * WhatsApp 集成 · 自动回复
 */

// ============================================
//  Auto-reply 知识库
// ============================================
const FAQ = {
  '技师|预约|有谁|可以约|推荐': {
    reply: '我们目前有以下技师可供预约：\n\n💆 按摩技师\n' +
      (technicians.length ? technicians.map(t => `  • #${t.id} ${t.name}（${t.age}岁）📍${t.area} 💰${t.price}`).join('\n') : '  • 暂无数据') +
      '\n\n🤝 地陪服务\n' +
      (typeof guides !== 'undefined' && guides.length ? guides.map(g => `  • #${g.id} ${g.name}（${g.age}岁）📍${g.area}`).join('\n') : '  • 暂无数据') +
      '\n\n📱 点击下方按钮直接通过 WhatsApp 咨询 👇',
    action: 'contact'
  },
  '预约|怎么预约|如何预约|book|预订': {
    reply: '预约很简单！通过以下方式即可：\n\n1️⃣ 在首页滑动卡片找到喜欢的技师\n2️⃣ 点击 💬 预约按钮\n3️⃣ 填写信息提交\n4️⃣ 我们会通过 WhatsApp 确认\n\n或者直接联系我们：',
    action: 'contact'
  },
  '上门|可以来|到府|outcall|外送': {
    reply: '✅ 提供上门服务！\n\n• 吉隆坡市区内免费上门\n• 其他区域 +RM 车费（偏远地区另议）\n• 也可以到店享受\n\n具体费用请直接联系客服确认 👇',
    action: 'contact'
  },
  '价格|费用|多少钱|收费|how much|价钱': {
    reply: '💵 价格参考：\n\n' +
      (technicians.length ? technicians.slice(0, 5).map(t => `  • ${t.name}：${t.price}`).join('\n') : '') +
      '\n\n具体价格按技师和服务项目不同，建议直接联系了解详情 👇',
    action: 'contact'
  },
  '营业|时间|几点|开门|几点关门': {
    reply: '🕐 营业时间：\n\n  • 每天 09:00 - 凌晨 02:00\n  • 提前预约可安排更晚时间\n\n建议提前预约，热门时段容易满 ~',
    action: ''
  },
  '安全|正规|靠谱|真假': {
    reply: '✅ 正规按摩水疗会所，诚信经营，服务至上。\n\n所有技师均有多年经验，手法专业。客户满意度 ⭐4.7+。\n\n怀着期待而来，装着满意而归 💯',
    action: ''
  },
  '区域|哪里|位置|地址|在哪儿|在哪': {
    reply: '📍 服务区域：\n\n' +
      (SITE_CONFIG && SITE_CONFIG.areas ? SITE_CONFIG.areas.map(a => `  • ${a}`).join('\n') : '') +
      '\n\n具体地址预约后客服会发给您。也可以安排上门服务~',
    action: ''
  },
  '地陪|guide|导游|陪玩': {
    reply: '🤝 地陪服务：\n\n本地向导，带你吃喝玩乐，逛街购物，语言翻译一应俱全！\n\n' +
      (typeof guides !== 'undefined' && guides.length ? guides.map(g => `  • #${g.id} ${g.name}（${g.age}岁）📍${g.area} 🗣️ ${(g.languages || []).join('/')}`).join('\n') : '  • 暂无地陪数据') +
      '\n\n切换到 🤝 地陪 模式浏览详情 👆',
    action: 'contact'
  }
};

// ============================================
//  State
// ============================================
let messageHistory = [];
let isTyping = false;

// ============================================
//  工具
// ============================================
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function getCurrentDate() {
  const now = new Date();
  return now.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
}

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function escHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ============================================
//  渲染消息
// ============================================
function addMessage(text, type, time) {
  if (!time) time = getCurrentTime();
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  div.innerHTML = `
    <div class="chat-msg-avatar">${type === 'incoming' ? '🦀' : '👤'}</div>
    <div>
      <div class="chat-bubble">${escHtml(text).replace(/\n/g, '<br>')}</div>
      <div class="chat-msg-time">${time}</div>
    </div>
  `;
  container.appendChild(div);
  scrollToBottom();
  messageHistory.push({ text, type, time });
}

function addSystemMessage(text) {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-system-msg';
  div.innerHTML = escHtml(text);
  container.appendChild(div);
  scrollToBottom();
}

function addDateDivider(text) {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-date-divider';
  div.innerHTML = escHtml(text);
  container.appendChild(div);
  scrollToBottom();
}

function addContactCard() {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg incoming';
  div.innerHTML = `
    <div class="chat-msg-avatar">🦀</div>
    <div>
      <div class="chat-bubble">
        点击下方按钮直接联系我们：
        <div class="chat-contact-card" onclick="contactWhatsApp()">
          <div class="contact-row">
            <div class="contact-icon wa">💬</div>
            <div>
              <div class="contact-label">WhatsApp</div>
              <div class="contact-value">${SITE_CONFIG && SITE_CONFIG.whatsappNumber ? '+'+SITE_CONFIG.whatsappNumber : '联系客服'}</div>
            </div>
          </div>
        </div>
        ${SITE_CONFIG && SITE_CONFIG.telegram ? `
        <div class="chat-contact-card" onclick="contactTelegram()">
          <div class="contact-row">
            <div class="contact-icon tg">✈️</div>
            <div>
              <div class="contact-label">Telegram</div>
              <div class="contact-value">@${SITE_CONFIG.telegram}</div>
            </div>
          </div>
        </div>
        ` : ''}
      </div>
      <div class="chat-msg-time">${getCurrentTime()}</div>
    </div>
  `;
  container.appendChild(div);
  scrollToBottom();
}

function scrollToBottom() {
  const container = document.getElementById('chatMessages');
  setTimeout(() => { container.scrollTop = container.scrollHeight; }, 50);
}

// ============================================
//  正在输入动画
// ============================================
function showTyping() {
  if (isTyping) return;
  isTyping = true;
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-typing';
  div.id = 'typingIndicator';
  div.innerHTML = `
    <div class="chat-msg-avatar">🦀</div>
    <div class="chat-typing-dots">
      <span></span><span></span><span></span>
    </div>
  `;
  container.appendChild(div);
  scrollToBottom();
}

function hideTyping() {
  isTyping = false;
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

// ============================================
//  自动回复匹配
// ============================================
function findAutoReply(text) {
  const lower = text.toLowerCase();
  for (const [keywords, data] of Object.entries(FAQ)) {
    const kwList = keywords.split('|');
    for (const kw of kwList) {
      if (lower.includes(kw.toLowerCase())) {
        return data;
      }
    }
  }
  return null;
}

function getDefaultReply() {
  const greetings = [
    '你好！🦀 欢迎来到按按摩~',
    '有什么可以帮到你的？😊',
    '需要技师推荐、预约咨询，还是了解价格？',
    '可以直接告诉我你的需求，我来帮你安排~'
  ];
  return {
    reply: greetings[Math.floor(Math.random() * greetings.length)] + '\n\n你也可以试试上面的快捷按钮 👆',
    action: ''
  };
}

// ============================================
//  发送 & 回复
// ============================================
function sendMessage(text) {
  const input = document.getElementById('chatInput');
  if (!text) {
    text = input.value.trim();
    if (!text) return;
  }
  input.value = '';

  // 添加用户消息
  addMessage(text, 'outgoing');

  // 隐藏快捷回复
  document.getElementById('quickReplies').style.display = 'none';

  // 显示正在输入
  showTyping();

  // 延迟自动回复
  const delay = 800 + Math.random() * 1200;
  setTimeout(() => {
    hideTyping();

    const match = findAutoReply(text);
    const data = match || getDefaultReply();

    addMessage(data.reply, 'incoming');

    // 如果需要展示联系方式
    if (data.action === 'contact') {
      setTimeout(() => {
        addContactCard();
        addSystemMessage('💡 也可以通过上面按钮直接联系真人客服，回复更快哦~');
      }, 400);
    }

    // 恢复快捷回复
    setTimeout(() => {
      document.getElementById('quickReplies').style.display = 'flex';
    }, 300);
  }, delay);
}

// ============================================
//  外部联系
// ============================================
function contactWhatsApp() {
  const num = SITE_CONFIG && SITE_CONFIG.whatsappNumber;
  if (!num) { alert('WhatsApp 号码未设置'); return; }
  // 获取最后几条消息拼成上下文
  const recentMsgs = messageHistory.slice(-6);
  const context = recentMsgs.map(m =>
    (m.type === 'outgoing' ? '我' : '客服') + '：' + m.text
  ).join('\n');
  const msg = '🦀 你好！我在按按摩咨询：\n\n' + context + '\n\n---\n请尽快回复我，谢谢！';
  window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, '_blank');
}

function contactTelegram() {
  const tg = SITE_CONFIG && SITE_CONFIG.telegram;
  if (!tg) return;
  const recentMsgs = messageHistory.slice(-4);
  const context = recentMsgs.map(m =>
    (m.type === 'outgoing' ? '我' : '客服') + '：' + m.text
  ).join('\n');
  const msg = '🦀 我在按按摩咨询：\n\n' + context;
  window.open(`https://t.me/${tg}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ============================================
//  键盘事件
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // 快捷按钮
  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sendMessage(btn.dataset.msg);
    });
  });

  // 初始化欢迎消息
  const siteName = SITE_CONFIG ? SITE_CONFIG.siteName : '按按摩';
  addDateDivider(getCurrentDate());

  setTimeout(() => {
    addMessage(`🦀 欢迎！这里是 ${siteName} 在线客服。\n\n有什么需要帮忙的吗？你可以：\n\n💬 直接输入问题\n📋 点击上方快捷按钮\n📞 直接联系 WhatsApp / Telegram`, 'incoming');
    addSystemMessage('💡 工作时间：每天 09:00 - 凌晨 02:00');
  }, 300);

  // 更新页面标题
  document.title = '在线咨询 - ' + (SITE_CONFIG && SITE_CONFIG.siteName) || '按按摩';
});
