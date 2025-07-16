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
    this.customSlider();
    this.usecaseSlider();
    this.serviceSlider();
    this.trustlogoSlider();
    this.mobileSlider();
    this.featureItemSlider();
    this.poweredBySlider();
  },
  customSlider() {
    const customerBlocks = document.querySelectorAll('.our-customer-main');

    customerBlocks.forEach((customele) => {
      const left = customele.querySelector('.our-customer-left');
      const right = customele.querySelector('.our-customer-nav');
      const nextBtnMbl = customele.querySelector('.swiper-button-next');
      const prevBtnMbl = customele.querySelector('.swiper-button-prev');
      const nextBtnDesktop = customele
        .querySelector('.our-customer-nav')
        .querySelector('.swiper-button-next');
      const prevBtnDesktop = customele
        .querySelector('.our-customer-nav')
        .querySelector('.swiper-button-prev');

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
        navigation: {
          nextEl: nextBtnMbl,
          prevEl: prevBtnMbl,
        },
        breakpoints: {
          768: {
            navigation: {
              nextEl: nextBtnDesktop,
              prevEl: prevBtnDesktop,
            },
          },
        },
      });

      new Swiper(right, {
        slidesPerView: 1,
        speed: 800,
        spaceBetween: 0,
        thumbs: {
          swiper: leftswiper,
        },
        navigation: {
          nextEl: nextBtnMbl,
          prevEl: prevBtnMbl,
        },
        breakpoints: {
          768: {
            navigation: {
              nextEl: nextBtnDesktop,
              prevEl: prevBtnDesktop,
            },
          },
        },
      });
    });
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
    const myscreen = new Swiper(document.querySelector('.fullscreen-section'), {
      slidesPerView: 1,
      effect: 'fade',
      speed: 1000,
    });
    new Swiper(this.featureitemsEle, {
      slidesPerView: 1,
      loop: true,
      speed: 800,
      spaceBetween: 30,
      autoHeight: true,
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
        1440: { slidesPerView: 'auto', spaceBetween: 169 },
      },
    });
  },
};
