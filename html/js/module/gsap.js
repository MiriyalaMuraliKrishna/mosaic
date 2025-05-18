import { gsap } from 'gsap';

var DrawSVGPlugin = DrawSVGPlugin || window.DrawSVGPlugin;
var CountUp = CountUp || window.CountUp;

gsap.registerPlugin(DrawSVGPlugin);

export const Gsap = {
  eles: document.querySelectorAll('[data-animate*="icon"]'),
  textslideup: document.querySelectorAll('[data-animate*="txt-slide-up"]'),

  init() {
    const _ = this;

    _.eles.forEach((ele) => {
      const $paths = ele.querySelectorAll('path');
      const $duration = +ele.dataset.duration / 2000 || 1.5;
      var tl = gsap.timeline({
        paused: true,
      });

      $paths.forEach(function ($path) {
        tl.fromTo(
          $path,
          { drawSVG: '0%' },
          {
            drawSVG: '100%',
            duration: $duration,
            ease: 'power2.out',
          }
        );
      });
      ele.tl = tl;
    });

    // _.textslideup.forEach((ele) => {
    //   var tl = gsap.timeline({
    //     paused: true,
    //   });
    //   tl.fromTo(
    //     ele,
    //     { yPercent: 110 },
    //     {
    //       yPercent: 0,
    //       duration: 1.25,
    //       ease: 'expo.out',
    //       stagger: { amount: 0.2, ease: 'expo.out' },
    //     }
    //   );
    //   ele.tl = tl;
    // });
  },
};
