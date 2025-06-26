import 'sticksy';

export const sticky = {
  header: document.querySelector('header.site-header'),
  stickeles: document.querySelectorAll('.sticky-widget'),
  init() {
    const _ = this;
    let height = _.header.getBoundingClientRect().height;
    _.stickeles.forEach((stickele) => {
      if (!stickele) return;
      new Sticksy.initializeAll(
        stickele,
        {
          topSpacing: height,
          listen: true,
        },
        true
      );
    });
    // above code only for desktop
    // later i can use media
  },
};
