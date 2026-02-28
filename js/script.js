console.log("Website geladen!");

/* Slider */
(function () {
  const items = document.querySelectorAll('.tq-item');
  const prev = document.querySelector('.tq-prev');
  const next = document.querySelector('.tq-next');
  let i = 0;

  function show(idx) {
    items.forEach((el, j) => el.classList.toggle('active', j === idx));
  }
  prev.addEventListener('click', () => { i = (i - 1 + items.length) % items.length; show(i); });
  next.addEventListener('click', () => { i = (i + 1) % items.length; show(i); });

  // Auto-Rotation:
  setInterval(() => next.click(), 7000);
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