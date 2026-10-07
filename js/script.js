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
  setInterval(() => next.click(), 8500);
})();

/* Testimonial-Texte am Handy kürzen */
(() => {
  const mobile = window.matchMedia('(max-width: 700px)');
  const bubbles = document.querySelectorAll('.tq-bubble');

  function getExpandedHeight(item, text) {
    const originalDisplay = item.style.display;
    const originalPosition = item.style.position;
    const originalVisibility = item.style.visibility;
    const originalPointerEvents = item.style.pointerEvents;

    item.style.display = 'block';
    item.style.position = 'absolute';
    item.style.visibility = 'hidden';
    item.style.pointerEvents = 'none';

    const height = text.scrollHeight;

    item.style.display = originalDisplay;
    item.style.position = originalPosition;
    item.style.visibility = originalVisibility;
    item.style.pointerEvents = originalPointerEvents;

    return height;
  }

  function setup() {
    bubbles.forEach((bubble) => {
      const item = bubble.closest('.tq-item');
      if (!item) return;

      let text = bubble.querySelector('.tq-text');
      if (!text) {
        text = document.createElement('span');
        text.className = 'tq-text';

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
        bubble.appendChild(more);

        more.addEventListener('click', () => {
          const collapsed = bubble.classList.toggle('is-collapsed');
          more.textContent = collapsed ? 'Mehr anzeigen' : 'Weniger anzeigen';
          more.setAttribute('aria-expanded', String(!collapsed));
        });
      }

      bubble.classList.remove('is-collapsed');
      more.hidden = true;

      if (!mobile.matches) return;

      const lineHeight = parseFloat(getComputedStyle(text).lineHeight);
      const maxTextHeight = lineHeight * 10;

      if (getExpandedHeight(item, text) > maxTextHeight + 2) {
        bubble.classList.add('is-collapsed');
        more.hidden = false;
        more.textContent = 'Mehr anzeigen';
        more.setAttribute('aria-expanded', 'false');
      }
    });
  }

  setup();
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
