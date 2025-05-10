import imagesLoaded from 'imagesloaded';
import 'is-in-viewport';
import 'jquery.appear';

imagesLoaded.makeJQueryPlugin($);
const $body = $('body');

export const Animation = {
  init() {
    const _ = this;
    const dy = -$(window).height() / 4;

    $('[data-animation]:not(img), [data-animate]').each(function () {
      const $self = $(this);

      const animation = $self.data('animation');
      const animateType = $self.data('animate');
      const delay = Number($self.data('animation-delay') || 0);
      const timeline = $self[0].tl; // Timeline associated with the element

      if ($self.is(':in-viewport')) {
        setTimeout(() => {
          if (animateType) _.animateRun($self, animateType);
          else $self.addClass('visible ' + animation);
        }, delay);
        if (timeline) {
          timeline.restart().play(); // Restart timeline on load
        }
      } else {
        // Reset timeline if element is not in the viewport
        if (timeline) {
          timeline.progress(0).pause(); // Reset and pause timeline
        }
      }
    });
    $body.imagesLoaded().progress(function (instance, image) {
      var $img = $(image.img);
      if ($img.data('animation')) {
        $img.appear(
          function () {
            var delay = $img.data('animation-delay');
            setTimeout(function () {
              $img.addClass($img.data('animation')).addClass('visible');
            }, delay);
          },
          { accY: dy }
        );
      }
    });
  },
  animateRun($el, type) {
    $el.addClass('visible');
    if (timeline) {
      timeline.restart().play(); // Restart and play timeline when visible
    }
    if (type === 'counter') {
      const $counter = $el[0];
      if ($counter.counter && $counter.counter.paused) $counter.counter.start();
    }
  },
  animateReset($el, type) {
    $el.removeClass('visible');
    if (type === 'counter') {
      const $counter = $el[0];
      $counter.counter.reset();
    }
    if (timeline) {
      timeline.pause(0); // Pause and reset timeline when not visible
    }
  },
  handle(scrolled, direction) {
    const _ = this;

    $('[data-animation]:not(img), [data-animate]').each(function () {
      const $self = $(this);
      const selfOffset = $self.offset().top;
      const animation = $self.data('animation');
      const animateType = $self.data('animate');
      const delay = Number($self.data('animation-delay') || 0);
      const offset = $(window).height() * 0.95;
      const timeline = $self[0].tl;
      if (
        direction === 'DOWN' &&
        scrolled >= selfOffset - offset &&
        !$self.hasClass('visible')
      ) {
        setTimeout(() => {
          if (animateType) _.animateRun($self, animateType);
          else $self.addClass('visible ' + animation);
          if (timeline) {
            timeline.restart().play(); // Restart and play timeline when visible
          }
        }, delay);
      } else if (
        direction === 'UP' &&
        $self.is(`:in-viewport(${-offset})`) &&
        !$self.hasClass('visible')
      ) {
        setTimeout(() => {
          if (animateType) _.animateRun($self, animateType);
          else $self.addClass('visible ' + animation);
          if (timeline) {
            timeline.restart().play(); // Restart and play timeline when visible
          }
        }, delay);
      } else if (
        direction === 'UP' &&
        !$self.is(':in-viewport') &&
        $self.offset().top > scrolled &&
        $self.hasClass('visible')
      ) {
        if (animateType) _.animateReset($self, animateType);
        else $self.removeClass('visible ' + animation);
        if (timeline) {
          timeline.pause(0); // Pause and reset timeline when out of view
        }
      }
    });
  },
};
