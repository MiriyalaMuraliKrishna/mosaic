import Swiper from 'swiper/bundle';

class Slider {
  constructor(ourCustomSlider) {
    this.customele = document.querySelector(ourCustomSlider);
  }
  init() {
    if (!this.customele) return;
    this.customSlider();
  }
  customSlider() {
    const left = this.customele.querySelector('.our-customer-left');
    const right = this.customele.querySelector('.our-customer-nav');
    // console.log(left);
    const leftswiper = new Swiper(left, {
      effect: 'coverflow',
      slidesPerView: 1,
      speed: 800,
      spaceBetween: 0,
      coverflowEffect: {
        rotate: 100,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      },
      watchSlidesProgress: true,
    });

    const rightswiper = new Swiper(right, {
      slidesPerView: 1,
      speed: 800,
      spaceBetween: 0,
      thumbs: {
        swiper: leftswiper,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
export const slider = new Slider('.our-customer-main');
