import Lenis from 'lenis';

export const mylenis = {
  init() {
    // LENIS SMOOTH SCROLL
    if (typeof Webflow === 'undefined' || Webflow.env('editor') === undefined) {
      const lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 0.7,
        gestureOrientation: 'vertical',
        normalizeWheel: false,
        smoothTouch: false,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      //   document
      //     .querySelector('[data-lenis-start]')
      //     .addEventListener('click', () => {
      //       lenis.start();
      //     });
      //   document
      //     .querySelector('[data-lenis-stop]')
      //     .addEventListener('click', () => {
      //       lenis.stop();
      //     });
      //   document
      //     .querySelector('[data-lenis-toggle]')
      //     .addEventListener('click', function () {
      //       this.classList.toggle('stop-scroll');
      //       if (this.classList.contains('stop-scroll')) {
      //         lenis.stop();
      //       } else {
      //         lenis.start();
      //       }
      //     });
    }
  },
};
