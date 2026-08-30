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

  /* ---------- Testimonials slider ---------- */
  const testimonials = [
    {
      quote: '«Donec nibh magna, interdum quis massa sed, rhoncus laoreet quam. Mauris accumsan felis fermentum euismod egestas. Mauris ante augue, cursus sit amet arcu a, maximus suscipit nibh.»',
      name: 'Michelle Anna',
      role: 'CEO, Co-Founder, XYZ Inc.',
      initials: 'MA',
      color: '#e39ec4'
    },
    {
      quote: '«Donec nibh magna, interdum quis massa sed, rhoncus laoreet quam. Mauris accumsan felis fermentum euismod egestas. Mauris ante augue, cursus sit amet arcu a, maximus suscipit nibh.»',
      name: 'David Kern',
      role: 'Product Designer, Nova Studio',
      initials: 'DK',
      color: '#7fa88f'
    },
    {
      quote: '«Donec nibh magna, interdum quis massa sed, rhoncus laoreet quam. Mauris accumsan felis fermentum euismod egestas. Mauris ante augue, cursus sit amet arcu a, maximus suscipit nibh.»',
      name: 'Sara Lopez',
      role: 'Marketing Lead, Bright Co.',
      initials: 'SL',
      color: '#d9a441'
    },
    {
      quote: '«Donec nibh magna, interdum quis massa sed, rhoncus laoreet quam. Mauris accumsan felis fermentum euismod egestas. Mauris ante augue, cursus sit amet arcu a, maximus suscipit nibh.»',
      name: 'James Whitfield',
      role: 'Founder, Whitfield & Co.',
      initials: 'JW',
      color: '#5b7fa6'
    },
    {
      quote: '«Donec nibh magna, interdum quis massa sed, rhoncus laoreet quam. Mauris accumsan felis fermentum euismod egestas. Mauris ante augue, cursus sit amet arcu a, maximus suscipit nibh.»',
      name: 'Elena Novak',
      role: 'Interior Architect, Studio EN',
      initials: 'EN',
      color: '#a97cb3'
    },
    {
      quote: '«Donec nibh magna, interdum quis massa sed, rhoncus laoreet quam. Mauris accumsan felis fermentum euismod egestas. Mauris ante augue, cursus sit amet arcu a, maximus suscipit nibh.»',
      name: 'Marco Rossi',
      role: 'Homeowner',
      initials: 'MR',
      color: '#c9784f'
    },
    {
      quote: '«Donec nibh magna, interdum quis massa sed, rhoncus laoreet quam. Mauris accumsan felis fermentum euismod egestas. Mauris ante augue, cursus sit amet arcu a, maximus suscipit nibh.»',
      name: 'Priya Nair',
      role: 'Real Estate Developer, Nair Group',
      initials: 'PN',
      color: '#4f9d8a'
    },
    {
      quote: '«Donec nibh magna, interdum quis massa sed, rhoncus laoreet quam. Mauris accumsan felis fermentum euismod egestas. Mauris ante augue, cursus sit amet arcu a, maximus suscipit nibh.»',
      name: 'Tom Becker',
      role: 'Co-Founder, Becker Living',
      initials: 'TB',
      color: '#b3a34f'
    }
  ];

  const quoteEl = document.getElementById('testimonialQuote');
  const authorWrap = document.querySelector('.testimonial-author');
  const avatarEl = document.getElementById('testimonialAvatar');
  const nameEl = document.getElementById('testimonialName');
  const roleEl = document.getElementById('testimonialRole');
  const dotsWrap = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  if (quoteEl && dotsWrap && prevBtn && nextBtn) {
    let current = 0;
    let autoTimer;

    testimonials.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot';
      dot.setAttribute('aria-label', `Отзыв ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dotEls = Array.from(dotsWrap.children);

    function render(i) {
      const t = testimonials[i];
      quoteEl.textContent = t.quote;
      avatarEl.textContent = t.initials;
      avatarEl.style.background = t.color;
      nameEl.textContent = t.name;
      roleEl.textContent = t.role;
      dotEls.forEach((d, idx) => d.classList.toggle('active', idx === i));
    }

    function goTo(i) {
      current = (i + testimonials.length) % testimonials.length;
      quoteEl.classList.add('fade');
      authorWrap.classList.add('fade');
      setTimeout(() => {
        render(current);
        quoteEl.classList.remove('fade');
        authorWrap.classList.remove('fade');
      }, 200);
    }

    function restartAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(current + 1), 6000);
    }

    prevBtn.addEventListener('click', () => { goTo(current - 1); restartAuto(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); restartAuto(); });

    render(current);
    restartAuto();
  }

});