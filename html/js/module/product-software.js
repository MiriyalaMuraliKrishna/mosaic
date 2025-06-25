class Sw {
  constructor(selector) {
    this.circles = document.querySelectorAll(selector);
  }

  init() {
    this.circles.forEach((ele) => {
      const circle = ele.querySelector('svg.ai-pie circle');
      if (!circle) return;

      const radius = +circle.getAttribute('r');
      const $dasharray = 2 * Math.PI * radius;

      circle.style.strokeDasharray = `${$dasharray}`;
      circle.style.strokeDashoffset = `${$dasharray}`;

      ele._circle = circle;
      ele._dasharray = $dasharray;
    });
  }

  play() {
    this.circles.forEach((ele) => {
      const countEl = ele.querySelector('[data-count-to]');
      const circle = ele._circle;
      const $dasharray = ele._dasharray;
      if (!countEl || !circle || !$dasharray) return;
      let progress = parseFloat(countEl.dataset.countTo) * 10;

      if (isNaN(progress)) progress = 0;

      if (progress > 100) progress = 100;
      const visibleHalf = $dasharray / 1;
      const offset = $dasharray - visibleHalf * (progress / 100);
      requestAnimationFrame(() => {
        circle.style.transition = 'stroke-dashoffset 2s ease';
        circle.style.strokeDashoffset = offset;
      });
    });
  }
}
export const software = new Sw('[data-animate*="ai-software-circle"]');
software.init();
