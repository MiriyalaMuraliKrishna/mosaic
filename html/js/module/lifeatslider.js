import Swiper from 'swiper/bundle';

export const lifeatslider = {
  lifeateele: document.querySelector('.life-at-slider'),
  init() {
    if (!this.lifeateele) return;

    const thumb = document.querySelectorAll('[data-animate*="life-at-anime"]');
    thumb.forEach(function (image, index) {
      const delay = index * 100;
      image.style.animationDelay = delay + 'ms';
    });

    const slideCount = document.querySelectorAll(
      '.life-at-slider .slick-slide'
    ).length;

    new Swiper(this.lifeateele, {
      slidesPerView: 'auto',
      spaceBetween: 0,
      direction: 'horizontal',
      loop: true,
      //   mousewheel: true,
      speed: 5000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      allowTouchMove: false,
      grabCursor: false,
      centeredSlides: false,
      freeMode: false,
      loopedSlides: slideCount,
    });
  },
};
