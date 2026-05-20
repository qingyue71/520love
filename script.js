// ===== Config =====
const CONFIG = {
    loveStartDate: new Date('2025-01-25T00:00:00'),
    sitePassword: 'ZYQzqy02240730',
    admins: [
        { username: '云栖清雅', password: '0224', role: '男主人' },
        { username: '雅韵云悠', password: '0730', role: '女主人' }
    ],
    quotes: [
        '你是我见过最美的风景。',
        '想把世界上最好的都给你。',
        '今天的风好甜，因为想你了。',
        '你笑起来真好看，像春天的花一样。',
        '余生很长，我只想和你走。',
        '你是我最想留住的幸运。',
        '每天醒来看到你，就是最大的幸福。',
        '你的名字是我见过最短的情诗。',
        '世界那么大，我的眼里只有你。',
        '想和你一起慢慢变老。',
        '你是我所有的心事和欢喜。',
        '遇见你之后，生活变得好甜。',
        '你是我藏在心底的秘密。',
        '喜欢你是一件很幸福的事。',
        '你是我今生最美的相遇。',
        '愿往后余生，冷暖有相知。',
        '你是我温暖的手套，冰冷的啤酒。',
        '我看过很多风景，唯独你最入眼。',
        '你是我的今天，也是我的每一天。',
        '想牵你的手，从心动到白头。'
    ]
};

// ===== Storage Helper =====
const Storage = {
    get(key, defaultVal = null) {
        try {
            const val = localStorage.getItem(key);
            return val ? JSON.parse(val) : defaultVal;
        } catch {
            return defaultVal;
        }
    },
    set(key, val) {
        try {
            localStorage.setItem(key, JSON.stringify(val));
        } catch {
            console.warn('Storage unavailable');
        }
    }
};

// ===== Initialize on Load =====
document.addEventListener('DOMContentLoaded', () => {
    initPasswordScreen();
    if (document.getElementById('mainContent')) {
        initMainPage();
    }
    if (document.querySelector('.message-page')) {
        initMessagePage();
    }
    if (document.querySelector('.admin-page')) {
        initAdminPage();
    }
});

// ===== Password Screen =====
function initPasswordScreen() {
    const screen = document.getElementById('passwordScreen');
    if (!screen) return;

    // Check if already authenticated
    if (sessionStorage.getItem('love_auth') === 'true') {
        screen.style.display = 'none';
        document.getElementById('mainContent').classList.add('active');
        return;
    }

    // Create floating hearts
    createFloatingHearts();

    const input = document.getElementById('passwordInput');
    const btn = document.getElementById('passwordBtn');
    const error = document.getElementById('passwordError');

    btn.addEventListener('click', checkPassword);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });

    function checkPassword() {
        const val = input.value.trim();
        const currentPassword = Storage.get('site_password', CONFIG.sitePassword);
        if (val === currentPassword) {
            sessionStorage.setItem('love_auth', 'true');
            screen.style.transition = 'opacity 0.5s ease';
            screen.style.opacity = '0';
            setTimeout(() => {
                screen.style.display = 'none';
                document.getElementById('mainContent').classList.add('active');
                initMainPage();
            }, 500);
        } else {
            error.textContent = '密码不对哦，再试试~';
            input.value = '';
            input.style.animation = 'shake 0.5s ease';
            setTimeout(() => input.style.animation = '', 500);
        }
    }
}

function createFloatingHearts() {
    const container = document.getElementById('passwordHearts');
    if (!container) return;

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('span');
        heart.className = 'float-heart';
        heart.innerHTML = '♥';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (12 + Math.random() * 20) + 'px';
        heart.style.animationDuration = (6 + Math.random() * 8) + 's';
        heart.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(heart);
    }
}

// ===== Main Page =====
function initMainPage() {
    // Check admin settings for section visibility
    applySectionVisibility();

    startLoveTimer();
    initEasterEgg();
    initQuotes();
    createPetals();
    createGardenias();
}

// ===== Section Visibility =====
function applySectionVisibility() {
    const visibility = Storage.get('section_visibility', {
        timer: true,
        easterEgg: true,
        birthday: true,
        quotes: true
    });

    const sections = {
        timer: document.querySelector('.love-timer-section'),
        easterEgg: document.querySelector('.easter-egg-section'),
        birthday: document.querySelector('.birthday-section'),
        quotes: document.querySelector('.quotes-section')
    };

    for (const [key, el] of Object.entries(sections)) {
        if (el) {
            el.style.display = visibility[key] === false ? 'none' : '';
        }
    }
}

// ===== Love Timer =====
function startLoveTimer() {
    function update() {
        const now = new Date();
        const diff = now - CONFIG.loveStartDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

// ===== Easter Egg =====
function initEasterEgg() {
    const heart = document.getElementById('centerHeart');
    const modal = document.getElementById('confessionModal');
    const close = document.getElementById('confessionClose');

    if (!heart || !modal) return;

    heart.addEventListener('click', () => {
        modal.classList.add('show');
    });

    close.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

// ===== Quotes =====
function initQuotes() {
    const textEl = document.getElementById('quoteText');
    const dotsEl = document.getElementById('quoteDots');
    if (!textEl || !dotsEl) return;

    let currentQuote = 0;
    const quotes = Storage.get('custom_quotes', CONFIG.quotes);

    // Create dots
    const dotCount = Math.min(quotes.length, 8);
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('span');
        dot.className = 'quote-dot' + (i === 0 ? ' active' : '');
        dotsEl.appendChild(dot);
    }

    const dots = dotsEl.querySelectorAll('.quote-dot');

    function showQuote(index) {
        textEl.classList.add('fade');
        setTimeout(() => {
            textEl.textContent = quotes[index % quotes.length];
            textEl.classList.remove('fade');
        }, 300);

        dots.forEach((d, i) => {
            d.classList.toggle('active', i === index % dotCount);
        });
    }

    setInterval(() => {
        currentQuote++;
        showQuote(currentQuote);
    }, 4000);
}

// ===== Petals =====
function createPetals() {
    const container = document.getElementById('petalsContainer');
    if (!container) return;

    for (let i = 0; i < 12; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.width = (8 + Math.random() * 10) + 'px';
        petal.style.height = (8 + Math.random() * 10) + 'px';
        petal.style.animationDuration = (8 + Math.random() * 12) + 's';
        petal.style.animationDelay = Math.random() * 15 + 's';
        petal.style.opacity = 0.3 + Math.random() * 0.4;

        const hue = Math.random() > 0.5 ? '340, 80%, 85%' : '270, 50%, 85%';
        petal.style.background = `radial-gradient(ellipse, hsla(${hue}, 0.8) 0%, transparent 70%)`;

        container.appendChild(petal);
    }
}

// ===== Gardenia Flowers =====
function createGardenias() {
    const container = document.getElementById('gardeniaContainer');
    if (!container) return;

    const gardeniaSVG = (id) => `
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <g opacity="0.8">
                <ellipse cx="30" cy="20" rx="8" ry="15" fill="url(#gGrad${id})" transform="rotate(0 30 30)"/>
                <ellipse cx="30" cy="20" rx="8" ry="15" fill="url(#gGrad${id})" transform="rotate(72 30 30)"/>
                <ellipse cx="30" cy="20" rx="8" ry="15" fill="url(#gGrad${id})" transform="rotate(144 30 30)"/>
                <ellipse cx="30" cy="20" rx="8" ry="15" fill="url(#gGrad${id})" transform="rotate(216 30 30)"/>
                <ellipse cx="30" cy="20" rx="8" ry="15" fill="url(#gGrad${id})" transform="rotate(288 30 30)"/>
                <circle cx="30" cy="30" r="5" fill="#E8D0F0"/>
            </g>
            <defs>
                <radialGradient id="gGrad${id}">
                    <stop offset="0%" stop-color="#D8B4FE"/>
                    <stop offset="100%" stop-color="#A78BFA" stop-opacity="0.6"/>
                </radialGradient>
            </defs>
        </svg>
    `;

    for (let i = 0; i < 6; i++) {
        const g = document.createElement('div');
        g.className = 'gardenia';
        g.innerHTML = gardeniaSVG(i);
        g.style.left = (10 + Math.random() * 80) + '%';
        g.style.top = (10 + Math.random() * 80) + '%';
        g.style.transform = `scale(${0.5 + Math.random() * 0.8})`;
        g.style.animationDuration = (6 + Math.random() * 8) + 's';
        g.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(g);
    }
}

// ===== Message Page =====
function initMessagePage() {
    const sendBtn = document.getElementById('msgSendBtn');
    const textarea = document.getElementById('msgTextarea');
    const senderSelect = document.getElementById('msgSenderSelect');

    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    if (textarea) {
        textarea.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    renderMessages();

    function sendMessage() {
        const text = textarea.value.trim();
        if (!text) return;

        const sender = senderSelect.value;
        const messages = Storage.get('love_messages', []);
        messages.unshift({
            id: Date.now(),
            text: text,
            sender: sender,
            time: new Date().toLocaleString('zh-CN')
        });

        // Keep last 100 messages
        if (messages.length > 100) messages.length = 100;
        Storage.set('love_messages', messages);

        textarea.value = '';
        renderMessages();
    }
}

function renderMessages() {
    const list = document.getElementById('msgList');
    if (!list) return;

    const messages = Storage.get('love_messages', []);

    if (messages.length === 0) {
        list.innerHTML = '<div class="msg-empty">还没有留言哦，写下第一句暖心话吧~</div>';
        return;
    }

    list.innerHTML = messages.map(msg => `
        <div class="msg-item" data-id="${msg.id}">
            <div class="msg-item-header">
                <span class="msg-sender-name ${msg.sender === '青云' ? 'boy' : ''}">${msg.sender}</span>
                <span class="msg-time">${msg.time}</span>
            </div>
            <div class="msg-content">${escapeHtml(msg.text)}</div>
            <button class="msg-delete" onclick="deleteMessage(${msg.id})">&times;</button>
        </div>
    `).join('');
}

function deleteMessage(id) {
    let messages = Storage.get('love_messages', []);
    messages = messages.filter(m => m.id !== id);
    Storage.set('love_messages', messages);
    renderMessages();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== Admin Page =====
function initAdminPage() {
    const loginBtn = document.getElementById('adminLoginBtn');
    const loginSection = document.getElementById('adminLogin');
    const panelSection = document.getElementById('adminPanel');

    // Check if already logged in
    const adminSession = sessionStorage.getItem('admin_role');
    if (adminSession) {
        loginSection.style.display = 'none';
        panelSection.classList.add('show');
        showAdminPanel(adminSession);
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', adminLogin);
    }

    document.getElementById('adminUsername').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') document.getElementById('adminPassword').focus();
    });

    document.getElementById('adminPassword').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') adminLogin();
    });
}

function adminLogin() {
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value.trim();
    const error = document.getElementById('adminError');

    const admin = CONFIG.admins.find(a => a.username === username && a.password === password);

    if (admin) {
        sessionStorage.setItem('admin_role', admin.role);
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminPanel').classList.add('show');
        showAdminPanel(admin.role);
    } else {
        error.textContent = '用户名或密码错误';
        document.getElementById('adminPassword').value = '';
    }
}

function showAdminPanel(role) {
    document.getElementById('adminRole').textContent = role + ' 管理模式';

    // Init logout
    document.getElementById('adminLogout').addEventListener('click', () => {
        sessionStorage.removeItem('admin_role');
        location.reload();
    });

    // Init section toggles
    initSectionToggles();

    // Init password change
    initPasswordChange();

    // Init message management
    initMessageManagement();

    // Init quote management
    initQuoteManagement();
}

function initSectionToggles() {
    const visibility = Storage.get('section_visibility', {
        timer: true,
        easterEgg: true,
        birthday: true,
        quotes: true
    });

    const toggles = {
        toggleTimer: 'timer',
        toggleEasterEgg: 'easterEgg',
        toggleBirthday: 'birthday',
        toggleQuotes: 'quotes'
    };

    for (const [inputId, key] of Object.entries(toggles)) {
        const input = document.getElementById(inputId);
        if (input) {
            input.checked = visibility[key] !== false;
            input.addEventListener('change', () => {
                visibility[key] = input.checked;
                Storage.set('section_visibility', visibility);
            });
        }
    }
}

function initPasswordChange() {
    const btn = document.getElementById('changePwdBtn');
    const msg = document.getElementById('pwdChangeMsg');

    if (!btn) return;

    btn.addEventListener('click', () => {
        const newPwd = document.getElementById('newSitePassword').value.trim();
        if (!newPwd) {
            msg.textContent = '新密码不能为空';
            return;
        }
        if (newPwd.length < 4) {
            msg.textContent = '密码至少4位';
            return;
        }
        Storage.set('site_password', newPwd);
        msg.textContent = '密码修改成功！';
        document.getElementById('newSitePassword').value = '';
        setTimeout(() => msg.textContent = '', 3000);
    });
}

function initMessageManagement() {
    renderAdminMessages();
}

function renderAdminMessages() {
    const list = document.getElementById('adminMsgList');
    if (!list) return;

    const messages = Storage.get('love_messages', []);

    if (messages.length === 0) {
        list.innerHTML = '<div class="msg-empty">暂无留言</div>';
        return;
    }

    list.innerHTML = messages.map(msg => `
        <div class="admin-msg-item">
            <span class="admin-msg-text">${msg.sender}: ${escapeHtml(msg.text)}</span>
            <button class="admin-msg-del" onclick="adminDeleteMessage(${msg.id})">删除</button>
        </div>
    `).join('');
}

function adminDeleteMessage(id) {
    let messages = Storage.get('love_messages', []);
    messages = messages.filter(m => m.id !== id);
    Storage.set('love_messages', messages);
    renderAdminMessages();
    renderMessages();
}

function initQuoteManagement() {
    const addBtn = document.getElementById('addQuoteBtn');
    const input = document.getElementById('newQuoteInput');
    const msg = document.getElementById('quoteMsg');

    if (!addBtn) return;

    renderQuoteList();

    addBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (!text) return;

        const quotes = Storage.get('custom_quotes', [...CONFIG.quotes]);
        quotes.push(text);
        Storage.set('custom_quotes', quotes);
        input.value = '';
        msg.textContent = '语录添加成功！';
        renderQuoteList();
        setTimeout(() => msg.textContent = '', 3000);
    });
}

function renderQuoteList() {
    const list = document.getElementById('quoteList');
    if (!list) return;

    const quotes = Storage.get('custom_quotes', CONFIG.quotes);

    list.innerHTML = quotes.map((q, i) => `
        <div class="admin-msg-item">
            <span class="admin-msg-text">${escapeHtml(q)}</span>
            <button class="admin-msg-del" onclick="deleteQuote(${i})">删除</button>
        </div>
    `).join('');
}

function deleteQuote(index) {
    let quotes = Storage.get('custom_quotes', [...CONFIG.quotes]);
    quotes.splice(index, 1);
    if (quotes.length === 0) quotes = [...CONFIG.quotes];
    Storage.set('custom_quotes', quotes);
    renderQuoteList();
}

// ===== Shake Animation (for wrong password) =====
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
}`;
document.head.appendChild(style);
