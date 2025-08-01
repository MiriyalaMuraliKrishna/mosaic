import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

var DrawSVGPlugin = DrawSVGPlugin || window.DrawSVGPlugin;
var CountUp = CountUp || window.CountUp;

gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(ScrollTrigger);

export const Gsap = {
  eles: document.querySelectorAll('[data-animate*="icon"]'),

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

    // gsap.to('.unlock-cta-section', {
    //   y: -50,
    //   scrollTrigger: {
    //     trigger: '.site-footer',
    //     start: 'top bottom',
    //     end: 'bottom bottom',
    //     scrub: true,
    //   },
    // });
    ScrollTrigger.matchMedia({
      // Desktop
      '(min-width: 768px)': function () {
        gsap.to('.unlock-cta-section', {
          y: -50,
          scrollTrigger: {
            trigger: '.site-footer',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      },
      '(max-width: 767px)': function () {
        gsap.to('.unlock-cta-section', {
          y: -20,
          scrollTrigger: {
            trigger: '.site-footer',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      },
    });
  },
};
