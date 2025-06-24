import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

export const lifeatslider = {
  lifeateele: document.querySelector('.life-at-slider'),

  init() {
    const item = this.lifeateele;
    if (!item) return;

    // Animate thumbnails
    const thumb = document.querySelectorAll('[data-animate*="life-at-anime"]');
    thumb.forEach((image, index) => {
      image.style.animationDelay = `${index * 100}ms`;
    });

    setTimeout(() => {
      const autoScrollSpeed = item.dataset.speed
        ? parseFloat(item.dataset.speed)
        : 0.5;

      const direction = item.dataset.direction === 'reversed' ? -1 : 1;

      const splide = new Splide(item, {
        pagination: false,
        arrows: false,
        direction: 'ltr',
        type: 'loop',

        autoWidth: true,
        autoScroll: {
          speed:
            item.hasAttribute('data-direction') &&
            $(this).data('direction') === 'reversed'
              ? autoScrollSpeed * -1
              : autoScrollSpeed,
          pauseOnHover: false,
        },
        extensions: { AutoScroll },
      }).mount({ AutoScroll });
    }, 1000);
  },
};
