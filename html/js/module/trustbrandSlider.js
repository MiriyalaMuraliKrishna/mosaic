import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

export const trustbrandSlider = {
  brands: document.querySelectorAll('.trusted-by-logos'),
  init() {
    if (this.brands.length === 0) return;

    const setupSlider = () => {
      const isLargeScreen = window.matchMedia('(min-width: 1360px)').matches;

      this.brands.forEach((trustlogo) => {
        const logoItems = trustlogo.querySelectorAll('.splide__slide');

        if (trustlogo.classList.contains('is-splide')) {
          const existing = trustlogo.splide;
          if (existing && existing.destroy) {
            existing.destroy(true);
          }
        }

        if (isLargeScreen && logoItems.length <= 6) return;

        const autoScrollSpeed = trustlogo.dataset.speed
          ? parseFloat(trustlogo.dataset.speed)
          : 0.5;

        const direction = trustlogo.dataset.direction === 'reversed' ? -1 : 1;

        const splide = new Splide(trustlogo, {
          pagination: false,
          arrows: false,
          direction: 'ltr',
          type: 'loop',
          autoWidth: true,
          autoScroll: {
            speed: autoScrollSpeed * direction,
            pauseOnHover: false,
          },
          extensions: { AutoScroll },
        });

        splide.mount({ AutoScroll });
      });
    };

    setupSlider();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setupSlider, 10);
    });
  },
};
