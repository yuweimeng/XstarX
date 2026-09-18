(() => {
  const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = document.querySelector('[data-registration-stage]');
  const paper = document.querySelector('[data-paper]');
  const ghost = document.querySelector('[data-plate-ghost]');
  const interlude = document.querySelector('[data-screen-interlude]');
  const screenWindow = document.querySelector('.screen-window');
  let raf = 0;

  let coverProgress = 0;
  let interludeProgress = 0;

  function update() {
    raf = 0;
    if (!reduced && stage && paper && ghost) {
      const r = stage.getBoundingClientRect();
      const travel = Math.max(1, stage.offsetHeight - innerHeight);
      const p = clamp(-r.top / travel);
      coverProgress = p;
      const misX = (1 - p) * Math.min(innerWidth * .016, 24);
      const misY = (1 - p) * -Math.min(innerWidth * .007, 10);
      ghost.style.transform = `translate(${misX}px, ${misY}px)`;
      ghost.style.opacity = String(.18 + (1 - p) * .62);
      paper.style.transform = `scale(${1 - Math.sin(p * Math.PI) * .018}) rotate(${(p - .5) * .12}deg)`;
      stage.style.setProperty('--register-p', String(Math.max(.02, p)));
    }
    if (!reduced && interlude && screenWindow) {
      const r = interlude.getBoundingClientRect();
      const travel = Math.max(1, interlude.offsetHeight - innerHeight);
      const p = clamp(-r.top / travel);
      interludeProgress = p;
      interlude.style.setProperty('--screen-rot', `${-4 + p * 6}deg`);
      interlude.style.setProperty('--screen-scale', String(.82 + p * .19));
    }
  }
  function requestUpdate(){ if (!raf) raf = requestAnimationFrame(update); }
  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate, { passive: true });
  update();

  window.__journalProbe = {
    read() {
      return { coverProgress, interludeProgress, reducedMotion: reduced };
    },
    seekCover(p) {
      if (!stage) return false;
      const travel = Math.max(1, stage.offsetHeight - innerHeight);
      scrollTo(0, stage.offsetTop + clamp(p) * travel);
      requestUpdate();
      return true;
    },
    seekInterlude(p) {
      if (!interlude) return false;
      const travel = Math.max(1, interlude.offsetHeight - innerHeight);
      scrollTo(0, interlude.offsetTop + clamp(p) * travel);
      requestUpdate();
      return true;
    }
  };

  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (toggle && menu) {
    const close = () => { toggle.setAttribute('aria-expanded','false'); menu.hidden = true; document.body.style.overflow=''; };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open)); menu.hidden = !open; document.body.style.overflow = open ? 'hidden' : '';
      if (open) menu.querySelector('a')?.focus();
    });
    menu.addEventListener('click', e => { if (e.target.closest('a')) close(); });
    addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  const filters = [...document.querySelectorAll('[data-filter]')];
  const items = [...document.querySelectorAll('[data-archive-list] > [data-category]')];
  const empty = document.querySelector('[data-archive-empty]');
  if (filters.length && items.length) {
    const setFilter = (value) => {
      let visible = 0;
      filters.forEach(b => b.classList.toggle('is-active', b.dataset.filter === value));
      items.forEach(item => { const show = value === 'all' || item.dataset.category === value; item.hidden = !show; if(show) visible++; });
      if (empty) empty.hidden = visible !== 0;
      const url = new URL(location.href); value === 'all' ? url.searchParams.delete('type') : url.searchParams.set('type', value); history.replaceState({},'',url);
    };
    filters.forEach(b => b.addEventListener('click', () => setFilter(b.dataset.filter)));
    const initial = new URL(location.href).searchParams.get('type');
    if (initial && filters.some(b => b.dataset.filter === initial)) setFilter(initial);
  }
})();
