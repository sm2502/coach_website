console.log("Website geladen!");

/* Slider */
(function () {
  const items = document.querySelectorAll('.tq-item');
  const prev = document.querySelector('.tq-prev');
  const next = document.querySelector('.tq-next');
  let i = 0;

  function show(idx) {
    items.forEach((el, j) => {
      el.classList.toggle('active', j === idx);

      const bubble = el.querySelector('.tq-bubble');
      const more = el.querySelector('.tq-more');
      if (bubble && more) {
        bubble.classList.add('is-collapsed');
        more.textContent = 'Mehr anzeigen';
        more.setAttribute('aria-expanded', 'false');
      }
    });
  }
  prev.addEventListener('click', () => { i = (i - 1 + items.length) % items.length; show(i); });
  next.addEventListener('click', () => { i = (i + 1) % items.length; show(i); });

  // Auto-Rotation:
  setInterval(() => {
    const expanded = items[i].querySelector('.tq-more[aria-expanded="true"]');
    if (!expanded) next.click();
  }, 8500);
})();

/* Testimonial-Texte auf sechs Zeilen kürzen */
(() => {
  const bubbles = document.querySelectorAll('.tq-bubble');

  function setup() {
    bubbles.forEach((bubble, index) => {
      const item = bubble.closest('.tq-item');
      if (!item) return;

      let text = bubble.querySelector('.tq-text');
      if (!text) {
        text = document.createElement('span');
        text.className = 'tq-text';
        text.id = `testimonial-text-${index + 1}`;

        while (bubble.firstChild) {
          text.appendChild(bubble.firstChild);
        }

        bubble.appendChild(text);
      }

      let more = item.querySelector('.tq-more');
      if (!more) {
        more = document.createElement('button');
        more.type = 'button';
        more.className = 'tq-more';
        more.textContent = 'Mehr anzeigen';
        more.setAttribute('aria-expanded', 'false');
        more.setAttribute('aria-controls', text.id);
        bubble.appendChild(more);

        more.addEventListener('click', () => {
          const collapsed = bubble.classList.toggle('is-collapsed');
          more.textContent = collapsed ? 'Mehr anzeigen' : 'Weniger anzeigen';
          more.setAttribute('aria-expanded', String(!collapsed));
        });
      }

      bubble.classList.add('is-collapsed');
      more.hidden = true;
      more.textContent = 'Mehr anzeigen';
      more.setAttribute('aria-expanded', 'false');

      // Check the actual six-line box, including the currently loaded font.
      if (text.scrollHeight > text.clientHeight + 1) {
        more.hidden = false;
      }
    });
  }

  setup();
  document.fonts.ready.then(setup);
  window.addEventListener('resize', setup);
})();

/* Handy wischen Slider */
(() => {
  const slider = document.querySelector('.tq-slider');
  const prev = document.querySelector('.tq-prev');
  const next = document.querySelector('.tq-next');
  let x0 = null;

  slider.addEventListener('touchstart', e => x0 = e.touches[0].clientX);
  slider.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) (dx > 0 ? prev : next).click();
    x0 = null;
  });
})();
