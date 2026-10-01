/**
 * ORKA Landing Page — main.js
 * ============================
 * Interações, animações e comportamentos da página.
 * Vanilla JS puro, sem dependências externas.
 */

'use strict';

// ═══════════════════════════════════════════
// 1. HEADER — scroll behavior
// ═══════════════════════════════════════════
(function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let lastScroll = 0;

  const onScroll = () => {
    const y = window.scrollY;
    if (y > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = y;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on init
})();


// ═══════════════════════════════════════════
// 2. MOBILE MENU
// ═══════════════════════════════════════════
(function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('mobile-nav');
  if (!toggle || !nav) return;

  const links = nav.querySelectorAll('.mobile-nav-link, .btn-mobile');

  const open = () => {
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
    nav.classList.add('open');
    nav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    nav.classList.remove('open');
    nav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.contains('open');
    isOpen ? close() : open();
  });

  links.forEach(link => link.addEventListener('click', close));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) close();
  });
})();


// ═══════════════════════════════════════════
// 3. SCROLL ANIMATIONS — IntersectionObserver
// ═══════════════════════════════════════════
(function initScrollAnimations() {
  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const elements = document.querySelectorAll(
    '.animate-fade-up, .animate-slide-left, .animate-slide-right'
  );

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);

        setTimeout(() => {
          el.classList.add('visible');
        }, delay);

        observer.unobserve(el);
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
})();


// ═══════════════════════════════════════════
// 4. ANIMATED NUMBERS
// ═══════════════════════════════════════════
(function initCounters() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const items = document.querySelectorAll('.number-value[data-target]');
  if (!items.length) return;

  const formatNumber = (n) => {
    return n.toLocaleString('pt-BR');
  };

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;

    const duration = 1800;
    const start = performance.now();
    const startVal = 0;

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (target - startVal) * eased);

      el.textContent = formatNumber(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = formatNumber(target);
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  items.forEach(el => observer.observe(el));
})();


// ═══════════════════════════════════════════
// 5. PARAMETERS TABS
// ═══════════════════════════════════════════
(function initParamTabs() {
  const tabs = document.querySelectorAll('.param-tab');
  const panels = document.querySelectorAll('.param-panel');

  if (!tabs.length || !panels.length) return;

  const activate = (tab) => {
    const targetId = tab.getAttribute('aria-controls');

    // Update tabs
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    // Update panels
    panels.forEach(panel => {
      const isTarget = panel.id === targetId;
      panel.classList.toggle('active', isTarget);
      panel.hidden = !isTarget;
    });
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activate(tab));

    // Keyboard navigation
    tab.addEventListener('keydown', (e) => {
      const tabsArr = Array.from(tabs);
      const idx = tabsArr.indexOf(tab);
      let next;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        next = tabsArr[(idx + 1) % tabsArr.length];
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        next = tabsArr[(idx - 1 + tabsArr.length) % tabsArr.length];
      } else if (e.key === 'Home') {
        e.preventDefault();
        next = tabsArr[0];
      } else if (e.key === 'End') {
        e.preventDefault();
        next = tabsArr[tabsArr.length - 1];
      }

      if (next) {
        activate(next);
        next.focus();
      }
    });
  });
})();


// ═══════════════════════════════════════════
// 6. SMOOTH SCROLL for anchor links
// ═══════════════════════════════════════════
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const header = document.getElementById('site-header');
      const headerH = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


// ═══════════════════════════════════════════
// 7. HERO — subtle parallax on scroll
// ═══════════════════════════════════════════
(function initHeroParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return; // skip on mobile

  const heroImg = document.querySelector('.hero-img');
  if (!heroImg) return;

  const onScroll = () => {
    const scrolled = window.scrollY;
    const rate = scrolled * 0.25;
    heroImg.style.transform = `translateY(${rate}px)`;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();


// ═══════════════════════════════════════════
// 8. ACTIVE NAV LINK on scroll (highlight current section)
// ═══════════════════════════════════════════
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          const isActive = href === `#${id}`;
          link.style.color = isActive
            ? 'var(--white-pure)'
            : '';
        });
      });
    },
    {
      threshold: 0.4,
      rootMargin: '-72px 0px 0px 0px'
    }
  );

  sections.forEach(s => observer.observe(s));
})();


// ═══════════════════════════════════════════
// 9. GALLERY — lightbox effect (simple overlay)
// ═══════════════════════════════════════════
(function initGalleryLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  // Create lightbox elements
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Imagem ampliada');
  lb.innerHTML = `
    <div class="lb-backdrop"></div>
    <button class="lb-close" aria-label="Fechar">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
    <img class="lb-img" src="" alt="" />
    <p class="lb-caption"></p>
  `;
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('.lb-img');
  const lbCaption = lb.querySelector('.lb-caption');
  const lbClose = lb.querySelector('.lb-close');
  const lbBackdrop = lb.querySelector('.lb-backdrop');

  const openLb = (src, alt) => {
    lbImg.src = src;
    lbImg.alt = alt;
    lbCaption.textContent = alt;
    lb.style.display = 'flex';
    setTimeout(() => lb.classList.add('open'), 10);
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  };

  const closeLb = () => {
    lb.classList.remove('open');
    setTimeout(() => {
      lb.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  };

  items.forEach(item => {
    const img = item.querySelector('img');
    if (!img) return;

    item.addEventListener('click', () => openLb(img.src, img.alt));
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLb(img.src, img.alt);
      }
    });
  });

  lbClose.addEventListener('click', closeLb);
  lbBackdrop.addEventListener('click', closeLb);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lb.classList.contains('open')) closeLb();
  });

  // Lightbox styles (injected to keep HTML clean)
  const style = document.createElement('style');
  style.textContent = `
    #lightbox {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;
      padding: 2rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    #lightbox.open { opacity: 1; }
    .lb-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(5, 7, 10, 0.96);
      backdrop-filter: blur(8px);
    }
    .lb-close {
      position: absolute;
      top: 1.5rem; right: 1.5rem;
      width: 44px; height: 44px;
      display: flex; align-items: center; justify-content: center;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 50%;
      color: #fff;
      cursor: pointer;
      z-index: 2;
      transition: background 0.2s;
    }
    .lb-close:hover { background: rgba(255,255,255,0.16); }
    .lb-close:focus-visible { outline: 2px solid var(--blue-water); }
    .lb-img {
      position: relative;
      z-index: 2;
      max-width: 90vw;
      max-height: 82vh;
      object-fit: contain;
      border-radius: 2px;
      box-shadow: 0 40px 100px rgba(0,0,0,0.8);
    }
    .lb-caption {
      position: relative;
      z-index: 2;
      font-size: 0.8rem;
      color: rgba(255,255,255,0.5);
      letter-spacing: 0.04em;
      text-align: center;
    }
  `;
  document.head.appendChild(style);
})();
