import Lenis from 'lenis';
import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
var DrawSVGPlugin = DrawSVGPlugin || window.DrawSVGPlugin;
var CountUp = CountUp || window.CountUp;

gsap.registerPlugin(DrawSVGPlugin);

export const Gsap = {
  eles: document.querySelectorAll('[data-animate*="icon"]'),

  init() {
    const _ = this;
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    _.eles.forEach((ele) => {
      const $paths = ele.querySelectorAll('path');
      const $duration = +ele.dataset.duration / 2000 || 1.5;
      var tl = gsap.timeline({
        paused: true,
      });
      console.log('tl', tl);
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
  },
};
