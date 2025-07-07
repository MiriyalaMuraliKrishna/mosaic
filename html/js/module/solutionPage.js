export const solstatsgraphs = {
  eles: document.querySelectorAll('.sol-stats-item'),
  init() {
    if (this.eles.length === 0) return;
    const list = Array.from(this.eles);
    if (list.length % 2 === 0) {
      list.slice(-2).forEach((el) => el.classList.add('highlight-last', 'two'));
    } else {
      list.slice(-1).forEach((el) => el.classList.add('highlight-last', 'one'));
    }
  },
};
