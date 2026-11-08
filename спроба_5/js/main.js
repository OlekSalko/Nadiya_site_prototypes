/* ПП «Надія» — спроба 4. Minimal progressive enhancements. */
(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* Header shadow + back-to-top button */
  const header = $('.site-header');
  const toTop = $('[data-to-top]');
  const onScroll = () => {
    const y = window.scrollY;
    header && header.classList.toggle('is-scrolled', y > 8);
    toTop && toTop.classList.toggle('is-visible', y > 700);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop && toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* Mobile menu */
  const toggle = $('.menu-toggle');
  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
  };
  if (toggle) {
    toggle.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
    $$('#main-nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', () => setMenu(false));
  }

  /* Toggle-button groups: project filter (single choice) and map legend (multi choice) */
  const filterBtns = $$('[data-filter]');
  filterBtns.forEach((btn) => btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    const f = btn.dataset.filter;
    $$('.project-grid .project-card').forEach((card) => {
      card.hidden = f !== 'all' && card.dataset.status !== f;
    });
  }));

  $$('[data-map-filter]').forEach((btn) => btn.addEventListener('click', () => {
    const on = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', String(on));
    const type = btn.dataset.mapFilter;
    $$(`.map [data-type="${type}"]`).forEach((pin) => { pin.hidden = !on; });
  }));

  /* Horizontal scrollers (awards, related projects) */
  $$('[data-scroll]').forEach((btn) => btn.addEventListener('click', () => {
    const list = document.getElementById(btn.dataset.scroll);
    if (!list) return;
    const item = list.firstElementChild;
    const step = item ? item.getBoundingClientRect().width + 16 : list.clientWidth;
    list.scrollBy({ left: step * Number(btn.dataset.dir), behavior: 'smooth' });
  }));

  /* Gallery slider */
  $$('[data-gallery]').forEach((gallery) => {
    const track = $('.gallery__track', gallery);
    const slides = $$('.gallery__slide', gallery);
    const thumbs = $$('.gallery__thumbs button', gallery);
    const counter = $('.gallery__counter', gallery);
    let index = 0;
    const go = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      slides.forEach((s, n) => s.setAttribute('aria-hidden', String(n !== index)));
      thumbs.forEach((t, n) => t.setAttribute('aria-current', String(n === index)));
      if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
    };
    $('.gallery__btn--prev', gallery).addEventListener('click', () => go(index - 1));
    $('.gallery__btn--next', gallery).addEventListener('click', () => go(index + 1));
    thumbs.forEach((t, n) => t.addEventListener('click', () => go(n)));

    let startX = null;
    track.addEventListener('pointerdown', (e) => { startX = e.clientX; });
    track.addEventListener('pointerup', (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      startX = null;
    });
    go(0);
  });

  /* Hero background video: loaded only on large screens (the poster image is used on mobile) */
  const heroVideo = $('[data-hero-video]');
  if (heroVideo
      && window.matchMedia('(min-width: 900px)').matches
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroVideo.src = heroVideo.dataset.src;
    heroVideo.addEventListener('playing', () => heroVideo.classList.add('is-playing'), { once: true });
    heroVideo.play().catch(() => {});
  }

  /* Demo forms: no real submission in the prototype */
  $$('[data-demo-form]').forEach((form) => {
    const fileInput = $('input[type="file"]', form);
    const fileLabel = $('[data-file-label]', form);
    fileInput && fileInput.addEventListener('change', () => {
      fileLabel.textContent = fileInput.files.length ? fileInput.files[0].name : 'Вкласти файл';
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if ($('.form-success', form)) return;
      const msg = document.createElement('p');
      msg.className = 'form-success';
      msg.setAttribute('role', 'status');
      msg.textContent = 'Дякуємо! Це демонстраційна форма — у робочій версії заявка надійде менеджеру.';
      form.appendChild(msg);
    });
  });

  /* Current year in footer */
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
