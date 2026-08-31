document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Toast helper ---------- */
  const toastEl = document.getElementById('toast');
  let toastTimer;
  function showToast(msg) {
    if (!toastEl) return;
    clearTimeout(toastTimer);
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  /* ---------- Smooth scroll for nav links + buttons ---------- */
  const header = document.getElementById('siteHeader');
  const headerHeight = () => (header ? header.offsetHeight : 0);

  function scrollToTarget(hash) {
    const target = document.querySelector(hash);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight() + 1;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  /* ---------- Mobile burger menu (defined early so nav clicks can call it) ---------- */
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');
  function closeMobileNav() {
    if (!burger || !nav) return;
    burger.classList.remove('open');
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTarget(link.getAttribute('href'));
      closeMobileNav();
    });
  });

  function pulseProductGrid() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.querySelectorAll('.product-card').forEach((card, i) => {
      setTimeout(() => {
        card.classList.add('pulse');
        setTimeout(() => card.classList.remove('pulse'), 700);
      }, i * 90);
    });
  }

  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const hash = btn.getAttribute('data-scroll-to');
      scrollToTarget(hash);
      if (hash === '#productGrid') pulseProductGrid();
    });
  });

  /* ---------- "Read more" on featured product cards ---------- */
  document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTarget('#productGrid');
      pulseProductGrid();
    });
  });

  /* ---------- Active nav link on scroll (scrollspy) ---------- */
  const sections = ['home', 'about', 'services', 'blog', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));

  function setActive(id) {
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + id);
    });
  }

  if (sections.length) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(sec => spyObserver.observe(sec));
  }

  /* ---------- Header hide on scroll down / show on scroll up ---------- */
  if (header) {
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
  }

  /* ---------- Testimonials carousel (8 slides) ---------- */
  const testimonials = [
    { initials: 'MA', color: '#B56576', quote: 'Donec nibh magna, interdum quis massa sed, rhoncus laoreet quam. Mauris accumsan felis fermentum euismod egestas. Mauris ante augue, cursus sit amet arcu a, maximus suscipit nibh.', name: 'Michelle Anna', role: 'CEO, Co-Founder, XYZ Inc.' },
    { initials: 'DK', color: '#4C7A6E', quote: 'Integer vel nibh tellus. Pellentesque in risus non dui venenatis sollicitudin sed vitae diam. Fusce tincidunt nisl mi, at molestie odio accumsan non consequat.', name: 'David Khost', role: 'Interior Designer' },
    { initials: 'SM', color: '#C08552', quote: 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus, ideal for our new apartment.', name: 'Sofia Martins', role: 'Product Manager, Loft&Co' },
    { initials: 'JT', color: '#5A7684', quote: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla porttitor accumsan tincidunt. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.', name: 'James Turner', role: 'Homeowner' },
    { initials: 'AP', color: '#E38B75', quote: 'Proin eget tortor risus. Cras ultricies ligula sed magna dictum porta. Donec sollicitudin molestie malesuada, the delivery was fast and the quality exceeded every expectation.', name: 'Ana Petrova', role: 'Architect, Studio AP' },
    { initials: 'MR', color: '#7C6A9B', quote: "Nulla quis lorem ut libero malesuada feugiat. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere blandit, exactly what our office needed.", name: 'Marco Rossi', role: 'Office Manager, Nova' },
    { initials: 'EC', color: '#6B8F71', quote: 'Pellentesque in ipsum id orci porta dapibus. Donec rutrum congue leo eget malesuada. Cras ultricies ligula sed magna dictum porta, the sofa fits perfectly in our living room.', name: 'Emily Chen', role: 'Blogger, Home & Style' },
    { initials: 'DW', color: '#3B5D50', quote: "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus, best furniture shop we've used.", name: 'Daniel Wolfe', role: 'Founder, Wolfe Studio' }
  ];

  const testiQuote = document.getElementById('testimonialQuote');
  const testiAvatar = document.getElementById('testimonialAvatar');
  const testiName = document.getElementById('testimonialName');
  const testiRole = document.getElementById('testimonialRole');
  const testiDotsWrap = document.getElementById('testimonialDots');
  const testiPrevBtn = document.getElementById('prevTestimonial');
  const testiNextBtn = document.getElementById('nextTestimonial');
  const testiAuthorEl = document.querySelector('.testimonial-author');

  if (testiQuote && testiDotsWrap && testiAvatar) {
    let testiIndex = 0;

    testimonials.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Отзыв ' + (i + 1));
      dot.addEventListener('click', () => renderTesti(i));
      testiDotsWrap.appendChild(dot);
    });
    const testiDotEls = Array.from(testiDotsWrap.children);

    function renderTesti(i) {
      testiIndex = (i + testimonials.length) % testimonials.length;
      const t = testimonials[testiIndex];

      testiQuote.classList.add('fade');
      if (testiAuthorEl) testiAuthorEl.classList.add('fade');

      setTimeout(() => {
        testiQuote.textContent = '\u201C' + t.quote + '\u201D';
        testiAvatar.textContent = t.initials;
        testiAvatar.style.background = t.color;
        testiName.textContent = t.name;
        testiRole.textContent = t.role;
        testiQuote.classList.remove('fade');
        if (testiAuthorEl) testiAuthorEl.classList.remove('fade');
      }, 220);

      testiDotEls.forEach((d, idx) => d.classList.toggle('active', idx === testiIndex));
    }

    if (testiPrevBtn) testiPrevBtn.addEventListener('click', () => renderTesti(testiIndex - 1));
    if (testiNextBtn) testiNextBtn.addEventListener('click', () => renderTesti(testiIndex + 1));

    renderTesti(0);
  }

  /* ---------- Newsletter form (footer) ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('subName');
      const emailInput = document.getElementById('subEmail');
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
      if (!nameInput.value.trim() || !emailOk) {
        showToast('Проверьте имя и email');
        return;
      }
      showToast('Спасибо за подписку, ' + nameInput.value.trim() + '!');
      newsletterForm.reset();
    });
  }

  /* ---------- Social links (no real accounts yet) ---------- */
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Скоро подключим соцсети');
    });
  });

  /* ---------- Any remaining placeholder "#" links (Support, Jobs, Terms, etc.) ---------- */
  document.querySelectorAll('a[href="#"]:not([data-nav]):not([data-scroll-to]):not(.social-link):not(.read-more)')
    .forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Этот раздел скоро появится');
      });
    });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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