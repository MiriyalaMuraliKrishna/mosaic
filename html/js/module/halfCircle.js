class HalfCircle {
  constructor(selector) {
    this.circles = document.querySelectorAll(selector);
  }

  init() {
    this.circles.forEach((ele) => {
      const circle = ele.querySelector('.all-meterials-half-circle svg circle');
      if (!circle) return;

      const radius = +circle.getAttribute('r');
      const $dasharray = 2 * Math.PI * radius;

      circle.style.strokeDasharray = `${$dasharray}`;
      circle.style.strokeDashoffset = `${$dasharray}`; // fully hidden at start

      ele._circle = circle;
      ele._dasharray = $dasharray;
    });
  }
  play() {
    this.circles.forEach((ele) => {
      const countEl = ele.querySelector('.half-circle-count');
      const circle = ele._circle;
      const $dasharray = ele._dasharray;

      if (!countEl || !circle || !$dasharray) return;

      let progress = parseFloat(countEl.textContent.trim());

      if (isNaN(progress)) progress = 0;
      if (progress > 100) progress = 100;

      const visibleHalf = $dasharray / 2;
      const offset = $dasharray - visibleHalf * (progress / 100);

      requestAnimationFrame(() => {
        circle.style.transition = 'stroke-dashoffset 2s ease';
        circle.style.strokeDashoffset = offset;
      });
    });
  }
}
export const halfCircle = new HalfCircle('[data-animate*="half-circle"]');
halfCircle.init();
