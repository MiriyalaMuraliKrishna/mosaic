import 'is-in-viewport';
import 'jquery.appear';
import imagesLoaded from 'imagesloaded';
import { chart } from './chart';
import { circle } from './circle-progress';
import { halfCircle } from './halfCircle';
import { software } from './product-software';

imagesLoaded.makeJQueryPlugin($);
const $body = $('body');

export const Animation = {
  init() {
    const _ = this;
    const dy = -$(window).height() / 4;

    // Iterate through all elements with data-animate attributes
    $('[data-animate]').each(function () {
      const $self = $(this);
      const animation = $self.data('animation');
      const animateType = $self.data('animate');
      const delay = Number($self.data('animation-delay') || 0);
      const timeline = $self[0].tl; // Timeline associated with the element

      // If element is already in the viewport on page load
      if ($self.is(':in-viewport')) {
        setTimeout(() => {
          if (animateType) {
            _.animateRun($self, animateType, timeline);
          } else {
            $self.addClass('visible ' + (animation ? animation : ''));
            if (timeline) {
              timeline.restart().play(); // Restart timeline on load
            }
          }
        }, delay);
      } else {
        // Reset timeline if element is not in the viewport
        if (timeline) {
          timeline.progress(0).pause(); // Reset and pause timeline
        }
      }
    });

    // Handle animations when images are loaded
    $body.imagesLoaded().progress(function (instance, image) {
      const $img = $(image.img);
      if ($img.data('animate')) {
        $img.appear(
          function () {
            const delay = $img.data('animation-delay');
            setTimeout(function () {
              $img.addClass($img.data('animation')).addClass('visible');
            }, delay);
          },
          { accY: dy }
        );
      }
    });
  },

  // Run animation and timeline when the element is visible
  animateRun($el, type, timeline) {
    $el.addClass('visible ' + $el.attr('data-animate'));
    if (timeline) {
      timeline.restart().play(); // Restart and play timeline when visible
    }
    if (type === 'counter') {
      const $counter = $el[0];
      if ($counter.counter && $counter.counter.paused) {
        $counter.counter.start();
      }
    }

    type === 'chart' ? chart.play() : null;
    type === 'progress' ? circle.play() : null;
    type === 'half-circle' ? halfCircle.play($el[0]) : null;
    type === 'ai-software-circle' ? software.play() : null;
  },

  // Reset animation and timeline when the element leaves the viewport
  animateReset($el, type, timeline) {
    $el.removeClass('visible ' + $el.attr('data-animate'));
    if (timeline) {
      timeline.pause(0); // Pause and reset timeline when not visible
    }
  },

  // Handle scroll events to trigger animations
  handle(scrolled, direction) {
    const _ = this;

    $('[data-animate]').each(function () {
      const $self = $(this);
      const selfOffset = $self.offset().top;
      const animation = $self.data('animation');
      const animateType = $self.data('animate');
      const delay = Number($self.data('animation-delay') || 0);
      const offset = $(window).height() * 0.95; // Adjust threshold to control animation start point
      const timeline = $self[0].tl;

      if (
        direction === 'DOWN' &&
        scrolled >= selfOffset - offset &&
        !$self.hasClass('visible')
      ) {
        // Animate element when scrolling down into viewport
        setTimeout(() => {
          if (animateType) {
            _.animateRun($self, animateType, timeline);
          } else {
            $self.addClass('visible ' + (animation ? animation : ''));
            if (timeline) {
              timeline.restart().play(); // Restart and play timeline when visible
            }
          }
        }, delay);
      } else if (
        direction === 'UP' &&
        $self.is(`:in-viewport(${-offset})`) &&
        !$self.hasClass('visible')
      ) {
        // Animate element when scrolling up into viewport
        setTimeout(() => {
          if (animateType) {
            _.animateRun($self, animateType, timeline);
          } else {
            $self.addClass('visible ' + (animation ? animation : ''));
            if (timeline) {
              timeline.restart().play(); // Restart and play timeline when visible
            }
          }
        }, delay);
      } else if (
        direction === 'UP' &&
        !$self.is(':in-viewport') &&
        $self.offset().top > scrolled &&
        $self.hasClass('visible')
      ) {
        // Reset animation when element leaves the viewport
        if (animateType) {
          _.animateReset($self, animateType, timeline);
        } else {
          $self.removeClass('visible ' + (animation ? animation : ''));
          if (timeline) {
            timeline.pause(0); // Pause and reset timeline when out of view
          }
        }
      }
    });
  },
};
