export class Sw {
  constructor(selector) {
    this.circles = document.querySelectorAll(selector);
  }

  init() {
    this.initCircle(1, 0.465);
    this.initCircle(2, 0.475);
    this.initCircle(3, 0.44);
  }

  play() {
    this.playCircle(1);
    this.playCircle(2);
    this.playCircle(3);
  }

  initCircle(index, correctionFactor) {
    this.circles.forEach((ele) => {
      const circle = ele.querySelector(`.ai-grid-circle${index}`);
      const path = ele.querySelector(`.ai-grid-path${index}`);
      if (!circle || !path) return;

      const radius = +circle.getAttribute('r');
      const circleLength = 2 * Math.PI * radius;
      const pathLength = path.getTotalLength();
      const offset = circleLength - pathLength * correctionFactor;

      ele[`_circle${index}`] = circle;
      ele[`_offset${index}`] = offset;

      circle.style.strokeDasharray = `${circleLength}`;
      circle.style.strokeDashoffset = `${circleLength}`;
    });
  }

  playCircle(index) {
    this.circles.forEach((ele) => {
      const circle = ele[`_circle${index}`];
      const offset = ele[`_offset${index}`];
      const span = ele.querySelector(`[data-ai-end="ai-circle${index}"]`);
      const fill = parseFloat(span?.getAttribute('data-ai-fill')) || 100;

      if (!circle || offset == null) return;

      const clamped = Math.max(0, Math.min(100, fill));
      const radius = +circle.getAttribute('r');
      const circleLength = 2 * Math.PI * radius;
      const drawLength = circleLength - offset;
      const finalOffset = circleLength - (drawLength * clamped) / 100;

      requestAnimationFrame(() => {
        circle.style.transition = 'stroke-dashoffset 2s ease';
        circle.style.strokeDashoffset = finalOffset;
      });
    });
  }
}
export const software = new Sw('[data-animate*="ai-software-circle"]');
