export const Animation = {
  eles: document.querySelectorAll('[data-animate]'),
  init() {
    const _ = this;
    _.eles.forEach((ele) => {
      const data = ele.dataset.animate;
      const duration = ele.dataset.duration;
      console.log(duration);
    });
  },
};
