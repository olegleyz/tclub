(function () {
  const body = document.body;
  const toggle = document.querySelector('[data-nav-toggle]');
  const toc = document.querySelector('[data-toc]');
  const backdrop = document.querySelector('[data-toc-backdrop]');
  if (!toggle || !toc) return;

  function open() {
    body.classList.add('toc-open');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function close() {
    body.classList.remove('toc-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    if (body.classList.contains('toc-open')) close(); else open();
  });

  if (backdrop) backdrop.addEventListener('click', close);

  // Close on link click + smooth scroll
  toc.querySelectorAll('.toc__link').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      close();
      const top = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
      if (history && history.replaceState) {
        history.replaceState(null, '', href);
      }
    });
  });

  // Close drawer on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('toc-open')) close();
  });

  // Active section highlight via IntersectionObserver
  const sections = document.querySelectorAll('main section[id]');
  const linksByHref = new Map();
  toc.querySelectorAll('.toc__link').forEach((a) => {
    linksByHref.set(a.getAttribute('href'), a);
  });

  if (sections.length && 'IntersectionObserver' in window) {
    let activeHref = null;
    const setActive = (href) => {
      if (activeHref === href) return;
      if (activeHref) {
        const prev = linksByHref.get(activeHref);
        if (prev) prev.classList.remove('toc__link--active');
      }
      activeHref = href;
      if (href) {
        const next = linksByHref.get(href);
        if (next) next.classList.add('toc__link--active');
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive('#' + visible[0].target.id);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => io.observe(s));
  }
})();
