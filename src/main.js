import './style.css';
import { copy } from './i18n.js';

const STORAGE_KEY = 'has-lang';

function getLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === 'en' || saved === 'zh' ? saved : 'zh';
}

function setLang(lang) {
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  render(lang);
}

function iconFor(id) {
  const icons = {
    content: `<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="7" y="9" width="26" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 27h16M15 14h10M15 18h8M15 22h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    education: `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 17l12-6 12 6-12 6-12-6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 19.5v6.2c0 1.8 3.6 3.3 8 3.3s8-1.5 8-3.3v-6.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M32 17v8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    materials: `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M11 10h10.5c2.2 0 4 1.8 4 4v16H15c-2.2 0-4-1.8-4-4V10z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M25.5 10H29c2.2 0 4 1.8 4 4v12c0 2.2-1.8 4-4 4h-7.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M15 16h7M15 20h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    business: `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M10 30V16l6-4 4 3 10-5v20H10z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M16 30v-8h4v8M24 18v2M24 23v2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  };
  return icons[id] || '';
}

function productMark(code) {
  return `<span class="product-mark" aria-hidden="true">${code}</span>`;
}

function render(lang) {
  const t = copy[lang];
  const app = document.querySelector('#app');

  app.innerHTML = `
    <div class="atmosphere" aria-hidden="true">
      <div class="orb orb-a"></div>
      <div class="orb orb-b"></div>
      <div class="grain"></div>
    </div>

    <header class="site-header">
      <a class="logo" href="#top">
        <span class="logo-mark">人</span>
        <span class="logo-text">
          <strong>${lang === 'zh' ? t.hero.brandZh : t.hero.brandEn}</strong>
          <small>${lang === 'zh' ? t.hero.brandEn : t.hero.brandZh}</small>
        </span>
      </a>
      <nav class="nav" aria-label="Primary">
        <a href="#directions">${t.nav.directions}</a>
        <a href="#content">${t.nav.content}</a>
        <a href="#education">${t.nav.education}</a>
        <a href="#contact">${t.nav.contact}</a>
      </nav>
      <div class="header-actions">
        <div class="lang-toggle" role="group" aria-label="Language">
          <button type="button" data-lang="zh" class="${lang === 'zh' ? 'active' : ''}" aria-pressed="${lang === 'zh'}">中文</button>
          <button type="button" data-lang="en" class="${lang === 'en' ? 'active' : ''}" aria-pressed="${lang === 'en'}">EN</button>
        </div>
        <a class="btn btn-small header-cta" href="#contact">${t.nav.cta}</a>
      </div>
      <button class="menu-btn" type="button" aria-label="Menu" aria-expanded="false">
        <span></span><span></span>
      </button>
    </header>

    <div class="mobile-nav" hidden>
      <a href="#directions">${t.nav.directions}</a>
      <a href="#content">${t.nav.content}</a>
      <a href="#education">${t.nav.education}</a>
      <a href="#contact">${t.nav.contact}</a>
      <div class="lang-toggle mobile-lang" role="group" aria-label="Language">
        <button type="button" data-lang="zh" class="${lang === 'zh' ? 'active' : ''}">中文</button>
        <button type="button" data-lang="en" class="${lang === 'en' ? 'active' : ''}">EN</button>
      </div>
    </div>

    <main id="top">
      <section class="hero">
        <div class="hero-inner reveal">
          <p class="brand-zh">${t.hero.brandZh}</p>
          <h1 class="brand-en">${t.hero.brandEn}</h1>
          <p class="hero-tagline">${t.hero.tagline}</p>
          <p class="hero-support">${t.hero.support}</p>
          <div class="hero-ctas">
            <a class="btn" href="#contact">${t.hero.ctaPrimary}</a>
            <a class="btn btn-ghost" href="#directions">${t.hero.ctaSecondary}</a>
          </div>
        </div>
        <div class="hero-plane" aria-hidden="true">
          <div class="hero-band"></div>
        </div>
      </section>

      <section class="section directions" id="directions">
        <div class="section-head reveal">
          <p class="eyebrow">${t.directions.eyebrow}</p>
          <h2>${t.directions.title}</h2>
          <p class="lede">${t.directions.subtitle}</p>
        </div>
        <div class="direction-grid">
          ${t.directions.items
            .map(
              (item, i) => `
            <a class="direction-link reveal delay-${i}" href="${item.href}">
              <span class="direction-icon">${iconFor(item.id)}</span>
              <span class="direction-titles">
                <strong>${lang === 'zh' ? item.titleZh : item.title}</strong>
                <em>${lang === 'zh' ? item.title : item.titleZh}</em>
              </span>
              <span class="direction-desc">${item.desc}</span>
              <span class="direction-arrow" aria-hidden="true">→</span>
            </a>`
            )
            .join('')}
        </div>
        <div class="vision reveal">
          <p class="eyebrow">${t.vision.label}</p>
          <p class="vision-line">${t.vision.line}</p>
        </div>
      </section>

      <section class="section content-section" id="content">
        <div class="section-head reveal">
          <p class="eyebrow">${t.content.eyebrow}</p>
          <h2>${t.content.title}</h2>
          <p class="highlight">${t.content.highlight}</p>
          <p class="lede">${t.content.desc}</p>
        </div>
        <div class="product-list">
          ${t.content.products
            .map(
              (p, i) => `
            <article class="product reveal delay-${i % 4}">
              ${productMark(p.code)}
              <div class="product-body">
                <h3>${lang === 'zh' ? `${p.nameZh}` : p.name}<span>${lang === 'zh' ? p.name : p.nameZh}</span></h3>
                <ul>${p.features.map((f) => `<li>${f}</li>`).join('')}</ul>
                <p class="price"><span>${t.content.priceLabel}</span> ${p.price}</p>
              </div>
            </article>`
            )
            .join('')}
        </div>
      </section>

      <section class="section education-section" id="education">
        <div class="section-head reveal">
          <p class="eyebrow">${t.education.eyebrow}</p>
          <h2>${t.education.title}</h2>
          <p class="highlight alt">${t.education.highlight}</p>
          <p class="lede">${t.education.desc}</p>
        </div>
        <div class="course-panel reveal">
          <div class="course-head">
            <h3>${t.education.courseTitle}</h3>
            <p>${t.education.courseMeta}</p>
          </div>
          <div class="module-grid">
            ${t.education.modules
              .map(
                (m) => `
              <article class="module">
                <span class="module-num">${m.num}</span>
                <h4>${m.title}</h4>
                <p>${m.desc}</p>
              </article>`
              )
              .join('')}
          </div>
        </div>
      </section>

      <section class="section twin" id="materials">
        <div class="twin-block reveal">
          <p class="eyebrow">${t.materials.eyebrow}</p>
          <h2>${t.materials.title}</h2>
          <p class="lede">${t.materials.desc}</p>
          <ul class="point-list">${t.materials.points.map((p) => `<li>${p}</li>`).join('')}</ul>
        </div>
        <div class="twin-block reveal delay-1" id="business">
          <p class="eyebrow">${t.business.eyebrow}</p>
          <h2>${t.business.title}</h2>
          <p class="lede">${t.business.desc}</p>
          <ul class="point-list">${t.business.points.map((p) => `<li>${p}</li>`).join('')}</ul>
        </div>
      </section>

      <section class="section contact-section" id="contact">
        <div class="contact-layout">
          <div class="contact-copy reveal">
            <p class="eyebrow">${t.contact.eyebrow}</p>
            <h2>${t.contact.title}</h2>
            <p class="lede">${t.contact.desc}</p>
            <div class="emails">
              <p class="email-label">${t.contact.email}</p>
              <a href="mailto:2644252432@qq.com">2644252432@qq.com</a>
              <a href="mailto:mr.fuhaizhou@gmail.com">mr.fuhaizhou@gmail.com</a>
            </div>
            <a class="btn" href="#contact">${t.contact.cta}</a>
          </div>
          <figure class="qr-panel reveal delay-1">
            <img src="/wechat-qr.jpg" alt="${t.contact.wechat}" width="280" height="280" />
            <figcaption>${t.contact.scan}</figcaption>
          </figure>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div>
        <strong>${t.footer.brand}</strong>
        <p>${t.footer.tagline}</p>
      </div>
      <p>${t.footer.rights}</p>
    </footer>
  `;

  bindEvents();
  observeReveals();
}

function bindEvents() {
  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  menuBtn?.addEventListener('click', () => {
    const open = mobileNav.hasAttribute('hidden') === false;
    if (open) {
      mobileNav.setAttribute('hidden', '');
      menuBtn.setAttribute('aria-expanded', 'false');
    } else {
      mobileNav.removeAttribute('hidden');
      menuBtn.setAttribute('aria-expanded', 'true');
    }
  });

  mobileNav?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileNav.setAttribute('hidden', '');
      menuBtn?.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelector('#app').addEventListener('click', (event) => {
  const langBtn = event.target.closest('[data-lang]');
  if (!langBtn) return;
  event.preventDefault();
  const next = langBtn.getAttribute('data-lang');
  if (next === 'zh' || next === 'en') setLang(next);
});

function observeReveals() {
  const nodes = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    nodes.forEach((n) => n.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  nodes.forEach((n) => io.observe(n));
}

render(getLang());
