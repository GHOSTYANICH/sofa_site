document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Toast helper ---------- */
  const toastEl = document.getElementById('toast');
  let toastTimer;
  function showToast(msg) {
    clearTimeout(toastTimer);
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  /* ---------- Smooth scroll for nav links + buttons ---------- */
  const header = document.getElementById('siteHeader');
  const headerHeight = () => header.offsetHeight;

  function scrollToTarget(hash) {
    const target = document.querySelector(hash);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight() + 1;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTarget(link.getAttribute('href'));
      closeMobileNav();
    });
  });

  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', () => {
      const hash = btn.getAttribute('data-scroll-to');
      scrollToTarget(hash);

      // small visual confirmation the button actually did something
      const target = document.querySelector(hash);
      if (target && target.classList.contains('product-grid')) {
        target.classList.remove('pulse');
        // pulse each card briefly to draw the eye
        void target.offsetWidth;
        target.querySelectorAll('.product-card').forEach((card, i) => {
          setTimeout(() => {
            card.classList.add('pulse');
            setTimeout(() => card.classList.remove('pulse'), 700);
          }, i * 90);
        });
      }
    });
  });

  /* ---------- Active nav link on scroll (scrollspy) ---------- */
  const sections = ['home', 'about', 'services']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));

  function setActive(id) {
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + id);
    });
  }

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(sec => spyObserver.observe(sec));

  /* ---------- Header hide on scroll down / show on scroll up ---------- */
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 10);
    if (y > lastY && y > 140) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }
    lastY = y;
  }, { passive: true });

  /* ---------- Mobile burger menu ---------- */
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');
  function closeMobileNav() {
    burger.classList.remove('open');
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

});