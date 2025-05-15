import 'sticksy';

export const sticky = {
  header: document.querySelector('.site-header'),
  stickeles: document.querySelectorAll('.sticky-widget'),
  init() {
    const _ = this;
    let height = _.header.getBoundingClientRect().height;
    _.stickeles.forEach((stickele) => {
      new Sticksy.initializeAll(
        stickele,
        {
          topSpacing: height,
          listen: true,
        },
        true
      );
    });
  },
};
