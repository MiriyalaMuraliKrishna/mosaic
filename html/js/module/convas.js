export const convas = {
  eles: document.querySelectorAll('.intro-text'),
  init() {
    if (!this.eles.length) return;

    this.eles.forEach((ele) => {
      const container = ele.closest('.intro-main');
      const ellipse = container.querySelector('.intro-ellipse');
      if (!ellipse) return;

      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top - 300;

        ellipse.style.left = `${x}px`;
        ellipse.style.top = `${y}px`;
      });

      container.addEventListener('mouseleave', () => {
        ellipse.style.top = '';
        ellipse.style.left = '';
      });
    });
  },
};
