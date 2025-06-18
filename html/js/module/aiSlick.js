import $ from 'jquery';
import 'slick-carousel';
export const aislick = {
  init() {
    const __ = this;
    const $aifor = $('.ai-slider-for');
    const $ainav = $('.ai-slider-nav');

    const $aiprogressBar = $('.slick-progress');
    const $aiprogressBarLabel = $aiprogressBar.find('span');

    let firstslidecalc = (1 / $ainav.children().length) * 100;
    $aiprogressBarLabel.css({
      width: `${firstslidecalc}%`,
    });

    $(window).on('resize load', function () {
      $aiprogressBarLabel.css({ width: `${firstslidecalc}%` });
    });

    $ainav.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      let calc = (nextSlide / (slick.slideCount - 1)) * 100;
      $aiprogressBarLabel.css({
        width: `${calc}%`,
      });
    });

    $aifor.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      centerMode: true,
      centerPadding: 0,

      infinite: false,
      speed: 1000,
      arrows: false,
      prevArrow:
        '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"> <circle cx="20" cy="20" r="20" transform="matrix(-1 0 0 1 40 0)" fill="#1AD1B1"></circle> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7482 18.295L22.0411 12.0021L20.6269 10.5879L12.6269 18.5879L11.9198 19.295L12.6269 20.0021L20.6269 28.0021L22.0411 26.5879L15.7482 20.295L29.334 20.295V18.295L15.7482 18.295Z" fill="black"></path> </svg></button>',
      nextArrow:
        '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"> <circle cx="20" cy="20" r="20" fill="#1AD1B1"></circle> <path fill-rule="evenodd" clip-rule="evenodd" d="M24.2518 18.295L17.9589 12.0021L19.3731 10.5879L27.3731 18.5879L28.0802 19.295L27.3731 20.0021L19.3731 28.0021L17.9589 26.5879L24.2518 20.295L10.666 20.295V18.295L24.2518 18.295Z" fill="black"></path> </svg> </button>',
      asNavFor: $ainav,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            arrows: false,
          },
        },
      ],
    });
    $ainav.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      //   variableWidth: true,
      centerMode: true,
      centerPadding: 0,
      speed: 1000,

      infinite: false,
      asNavFor: $aifor,
      arrows: false,
      dots: false,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            arrows: false,
            prevArrow:
              '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-prev flex flex-center radius-50"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"> <circle cx="20" cy="20" r="20" transform="matrix(-1 0 0 1 40 0)" fill="#1AD1B1"></circle> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7482 18.295L22.0411 12.0021L20.6269 10.5879L12.6269 18.5879L11.9198 19.295L12.6269 20.0021L20.6269 28.0021L22.0411 26.5879L15.7482 20.295L29.334 20.295V18.295L15.7482 18.295Z" fill="black"></path> </svg></button>',
            nextArrow:
              '<button type="button" aria-label="previous" aria-disabled="false" tabindex="0" class="slick-arrow slick-next flex flex-center radius-50"> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"> <circle cx="20" cy="20" r="20" fill="#1AD1B1"></circle> <path fill-rule="evenodd" clip-rule="evenodd" d="M24.2518 18.295L17.9589 12.0021L19.3731 10.5879L27.3731 18.5879L28.0802 19.295L27.3731 20.0021L19.3731 28.0021L17.9589 26.5879L24.2518 20.295L10.666 20.295V18.295L24.2518 18.295Z" fill="black"></path> </svg> </button>',
            variableWidth: false,
          },
        },
      ],
    });
  },
};
