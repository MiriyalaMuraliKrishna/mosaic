class Progress {
  constructor() {
    this.circle = document.querySelector('[data-animate*="progress"]');
    this.circlePath = this.circle.querySelector('.progress-circle svg circle');
    this.radius = +this.circlePath.getAttribute('r');
    this.circumference = 2 * Math.PI * this.radius;
  }

  init() {
    this.circlePath.style.strokeDasharray = this.circumference;
    this.circlePath.style.strokeDashoffset = this.circumference;
  }

  play() {
    const number = this.circle.querySelector(
      '.all-meterials-count'
    ).textContent;
    const progress = parseFloat(number);
    const offset = this.circumference * (1 - progress / 100);

    // Animate
    requestAnimationFrame(() => {
      this.circlePath.style.transition = 'stroke-dashoffset 2s ease';
      this.circlePath.style.strokeDashoffset = offset;
    });
  }
}

export const circle = new Progress();
circle.init();
