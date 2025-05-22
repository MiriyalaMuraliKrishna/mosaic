class Progress {
  constructor(selector) {
    this.circles = document.querySelectorAll(selector);
  }

  init() {
    this.circles.forEach((ele) => {
      const circle = ele.querySelector('.progress-circle svg circle');
      if (!circle) return;

      const radius = +circle.getAttribute('r');
      const circumference = 2 * Math.PI * radius;

      circle.style.strokeDasharray = `${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;

      // Store for later use
      ele._circle = circle;
      ele._circumference = circumference;
    });
  }

  play() {
    this.circles.forEach((ele) => {
      const countEl = ele.querySelector('.all-meterials-count');
      const circle = ele._circle;
      const circumference = ele._circumference;

      if (!countEl || !circle || !circumference) return;

      const text = countEl.textContent.trim();
      let progress;

      if (text.includes('/')) {
        const [start, end] = text.split('/').map(Number);
        if (!isNaN(start) && !isNaN(end) && end !== 0) {
          progress = (start / end) * 100;
        } else {
          progress = 0;
        }
      } else {
        progress = parseFloat(text);
      }

      const offset = circumference * (1 - progress / 100);

      requestAnimationFrame(() => {
        circle.style.transition = 'stroke-dashoffset 2s ease';
        circle.style.strokeDashoffset = offset;
      });
    });
  }
}
export const circle = new Progress('[data-animate*="progress"]');
circle.init();
