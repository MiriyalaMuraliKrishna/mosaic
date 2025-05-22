class Progress {
  constructor(selector) {
    this.circles = document.querySelectorAll(selector);
    this.halfinit();
    this.halfcircleplay();
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
    this.halfcircleplay();
  }
  halfinit() {
    this.circles.forEach((ele) => {
      const circle = ele.querySelector('.all-meterials-half-circle svg circle');
      if (!circle) return;

      const radius = +circle.getAttribute('r');
      const circumference = 2 * Math.PI * radius;

      circle.style.strokeDasharray = `${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`; // fully hidden at start

      ele._circle = circle;
      ele._circumference = circumference;
    });
  }

  halfcircleplay() {
    this.circles.forEach((ele) => {
      const countEl = ele.querySelector('.half-circle-count');
      const circle = ele._circle;
      const circumference = ele._circumference;

      if (!countEl || !circle || !circumference) return;

      let progress = parseFloat(countEl.textContent.trim()); // e.g., "10%"

      if (isNaN(progress)) progress = 0;
      if (progress > 100) progress = 100;

      const visibleHalf = circumference / 2;
      const offset = circumference - visibleHalf * (progress / 100);

      requestAnimationFrame(() => {
        circle.style.transition = 'stroke-dashoffset 2s ease';
        circle.style.strokeDashoffset = offset;
      });
    });
  }
}
export const circle = new Progress('[data-animate*="progress"]');
circle.init();
export const halfcircle = new Progress('[data-animate*="half-circle"]');
halfcircle.halfinit();
