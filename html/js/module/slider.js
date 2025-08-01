import Swiper from 'swiper/bundle';
import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

export const slider = {
  usecaselink: document.querySelector('ul.use-cases-links'),
  usecaseele: document.querySelectorAll('.use-cases-slider'),
  serviceele: document.querySelectorAll('.services-carousel-slider'),
  logos: document.querySelectorAll('.trust-by-logos'),
  featuredeles: document.querySelector('.featured-articles-slider'),
  featureitemsEle: document.querySelector('.feature-item-slider'),
  poweredByEle: document.querySelector('.powered-by-slider'),

  init() {
    this.usecaseSlider();
    this.serviceSlider();
    this.trustlogoSlider();
    this.mobileSlider();
    this.featureItemSlider();
    this.poweredBySlider();
  },
  usecaseSlider() {
    this.usecaselink?.children[0].querySelector('a').classList.add('active');

    this.usecaselink?.addEventListener('click', (e) => {
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
      if (targetEle) {
        $(targetEle).fadeIn(900, () => {
          const swiper = targetEle.swiper;
          if (swiper) {
            updateSlideOpacity(swiper);
            swiper.update();
          }
        });
      }
    });

    this.usecaseele.forEach((usecaseele) => {
      new Swiper(usecaseele, {
        slidesPerView: 'auto',
        speed: 800,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1300: {
            slidesPerView: 3,
            spaceBetween: 77,
          },
        },
        on: {
          slideChange: function () {
            updateSlideOpacity(this);
          },
          init: function () {
            updateSlideOpacity(this);
          },
        },
      });
    });
    function updateSlideOpacity(swiper) {
      swiper.slides.forEach((slide, index) => {
        slide.style.opacity =
          index < swiper.activeIndex + swiper.params.slidesPerView
            ? '1'
            : '0.15';
      });
    }
  },

  serviceSlider() {
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
  },

  trustlogoSlider() {
    this.logos.forEach((trustlogo) => {
      const autoScrollSpeedme = trustlogo.dataset.speed
        ? parseFloat(trustlogo.dataset.speed)
        : 0.5;

      const directionme = trustlogo.dataset.direction === 'reversed' ? -1 : 1;
      new Splide(trustlogo, {
        pagination: false,
        arrows: false,
        direction: 'ltr',
        type: 'loop',
        autoWidth: true,
        autoScroll: {
          speed: autoScrollSpeedme,
          pauseOnHover: false,
        },
        extensions: { AutoScroll },
      }).mount({ AutoScroll });
    });
  },

  mobileSlider() {
    new Swiper(this.featuredeles, {
      slidesPerView: 1,
      speed: 800,
      spaceBetween: 26,
      autoHeight: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  },
  featureItemSlider() {
    if (!this.featureitemsEle) return;

    const slides = this.featureitemsEle.querySelectorAll('.swiper-slide');
    if (slides.length === 2) {
      const container = this.featureitemsEle.querySelector('.swiper-wrapper');
      slides.forEach((slide) => {
        const clone = slide.cloneNode(true);
        container.appendChild(clone);
      });
    }
    const myscreen = new Swiper(document.querySelector('.fullscreen-section'), {
      slidesPerView: 1,
      effect: 'fade',
      loop: true,
      speed: 500,
      autoHeight: false,
    });
    new Swiper(this.featureitemsEle, {
      slidesPerView: 1,
      loop: true,
      speed: 500,
      spaceBetween: 30,
      autoHeight: false,
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: myscreen,
      },
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 40 },
        1024: { slidesPerView: 'auto', spaceBetween: 64 },
        1440: { slidesPerView: 'auto', spaceBetween: 0 },
      },
    });
  },
  poweredBySlider() {
    if (!this.poweredBySlider) return;
    new Swiper(this.poweredByEle, {
      slidesPerView: 1,
      speed: 800,
      spaceBetween: 30,
      autoHeight: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 40 },
        1024: { slidesPerView: 'auto' },
        1440: { slidesPerView: 'auto', spaceBetween: 0 },
      },
    });
  },
};
