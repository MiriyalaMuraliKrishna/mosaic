class Charts {
  constructor() {
    this.chart = document.querySelector('.all-meterials-chart-main svg');
  }
  play() {
    this.chart.querySelectorAll('rect:nth-child(even)').forEach((rect) => {
      const rectHeight = rect.getAttribute('height');
      const rectY = rect.getAttribute('y');
      rect.setAttribute('y', 52); // this is pbm
      setTimeout(() => {
        rect.style.height = `${rectHeight}px`;
        rect.setAttribute('y', rectY);
      }, 1000);
    });
  }
}
export const chart = new Charts();
