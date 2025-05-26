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
    const left = this.customele.querySelector('.our-customer-for');
    const right = this.customele.querySelector('.our-customer-right');
    // console.log(left);
    new Swiper(left, {
      slidesPerView: 1,
      speed: 400,
      spaceBetween: 100,
    });
    new Swiper(right, {
      slidesPerView: 1,
      speed: 400,
      spaceBetween: 100,
    });
  }
}
export const slider = new Slider('.our-customer-main');
