import Swiper from 'swiper/bundle';

export const slider = {
  customele: document.querySelector('.our-customer-main'),
  usecaselink: document.querySelector('ul.use-cases-links'),
  usecaseele: document.querySelectorAll('.use-cases-slider'),
  serviceele: document.querySelectorAll('.services-carousel-slider'),
  logos: document.querySelectorAll('.trust-by-logos'),
  brands: document.querySelectorAll('.trusted-by-logos'),
  featuredeles: document.querySelector('.featured-articles-slider'),
  featureitemslider: document.querySelector('.feature-item-slider'),
  poweredByEle: document.querySelector('.powered-by-slider'),

  init() {
    this.customSlider();
    this.usecaseSlider();
    this.serviceSlider();
    this.trustlogoSlider();
    this.trustbrandSlider();
    this.mobileSlider();
    this.featureItemSlider();
    this.poweredBySlider();
  },
  customSlider() {
    const left = this.customele?.querySelector('.our-customer-left');
    const right = this.customele?.querySelector('.our-customer-nav');

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
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
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
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
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
      new Swiper(trustlogo, {
        slidesPerView: 'auto',
        loop: true,
        speed: 5000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        spaceBetween: 40,
        // freeMode: true,
        // freeModeMomentum: false,
        breakpoints: {
          768: {
            spaceBetween: 50,
          },
          1024: {},
          1300: {},
        },
      });
    });
  },
  trustbrandSlider() {
    this.brands.forEach((trustlogo) => {
      new Swiper(trustlogo, {
        slidesPerView: 'auto',
        loop: true,
        speed: 5000,
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
        },
        spaceBetween: 50,
        // freeMode: true,
        // freeModeMomentum: false,
      });
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
    if (!this.featureitemslider) return;
    new Swiper(this.featureitemslider, {
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
        768: {},
        1024: { slidesPerView: 'auto' },
        1440: { slidesPerView: 'auto', spaceBetween: 169 },
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
        768: {},
        1024: { slidesPerView: 'auto' },
        1440: { slidesPerView: 'auto', spaceBetween: 169 },
      },
    });
  },
};
