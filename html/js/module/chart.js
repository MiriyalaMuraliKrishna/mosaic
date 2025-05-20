class Charts {
  constructor() {
    this.chart = document.querySelector('[data-animate*="chart"]');
    this.originalData = []; // Store original y and height values
  }
  init() {
    this.chart?.querySelectorAll('rect:nth-child(even)').forEach((rect, i) => {
      // Save original values
      this.originalData[i] = {
        y: rect.getAttribute('y'),
        height: rect.getAttribute('height'),
      };

      // Set temporary y to 52 for the initial state
      rect.setAttribute('y', 52);
    });
  }

  play() {
    this.chart.querySelectorAll('rect:nth-child(even)').forEach((rect, i) => {
      const { y, height } = this.originalData[i]; // Retrieve original values

      setTimeout(() => {
        rect.style.height = `${height}px`;
        rect.setAttribute('y', y); // Animate back to original position
      }, 1000);
    });
  }
}
export const chart = new Charts();
chart.init();
