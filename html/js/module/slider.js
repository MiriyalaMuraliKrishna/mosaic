import Swiper from 'swiper/bundle';

class Slider {
  constructor() {
    this.customele = document.querySelector('.our-customer-main');
    this.usecaselink = document.querySelector('ul.use-cases-links');
    this.usecaseele = document.querySelectorAll('.use-cases-slider');
    this.serviceele = document.querySelectorAll('.services-carousel-slider');
  }
  init() {
    if (!this.customele || !this.usecaseele) return;
    this.customSlider();
    this.usecaseSlider();
  }
  customSlider() {
    const left = this.customele.querySelector('.our-customer-left');
    const right = this.customele.querySelector('.our-customer-nav');

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
    new Swiper(right, {
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
  usecaseSlider() {
    this.usecaselink.children[0].querySelector('a').classList.add('active');
    this.usecaselink.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-page]');
      if (!link) return;
      const attr = link.dataset.page;
      this.usecaselink
        .querySelectorAll('a')
        .forEach((link) => link.classList.remove('active'));
      link.classList.add('active');

      this.usecaseele.forEach((ele) => {
        ele.style.display = 'none';
      });

      const targetEle = document.querySelector(
        `.use-cases-slider[data-slider="${attr}"]`
      );
      targetEle ? $(targetEle).fadeIn(900) : '';
    });

    this.usecaseele.forEach((usecaseele) => {
      console.log(usecaseele);
      new Swiper(usecaseele, {
        slidesPerView: 3,
        speed: 800,
        spaceBetween: 77,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    });

    this.serviceele.forEach((servicecarousel) => {
      new Swiper(servicecarousel, {
        slidesPerView: 'auto',
        speed: 800,
        spaceBetween: 26,
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    });
  }
}
export const slider = new Slider();
