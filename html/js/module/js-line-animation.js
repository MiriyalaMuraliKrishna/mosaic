import gsap from 'gsap';
import SplitType from 'split-type';

export const jslineanimation = {
  init() {
    window.addEventListener('load', (event) => {
      if (window.innerWidth > 991) {
        jQuery('[js-line-animation-onload]').each(function (index) {
          const delay =
            parseInt($(this).attr('js-line-animation-onload')) || 200;

          setTimeout(() => {
            gsap.set($(this), { autoAlpha: 1 });
            let textEl = $(this);
            let textContent = $(this).text();

            new SplitType(textEl, { types: 'lines', tagName: 'span' });
            textEl.find('.line').each(function (index) {
              let lineContent = $(this).html();
              $(this).html('');
              $(this).append(
                `<span class="line-inner" style="display: block;">${lineContent}</span>`
              );
            });

            gsap.fromTo(
              textEl.find('.line-inner'),
              { yPercent: 110 },
              {
                yPercent: 0,
                duration: 1.25,
                ease: 'expo.out',
                stagger: { amount: 0.2, ease: 'expo.out' },
              }
            );
          }, delay);
        });

        $('[js-line-animation]').each(function (index) {
          const delay = parseInt($(this).attr('js-line-animation')) || 0;

          setTimeout(() => {
            gsap.set($(this), { autoAlpha: 1 });
            let textEl = $(this);
            let textContent = $(this).text();
            let tl;

            function splitText() {
              new SplitType(textEl, { types: 'lines', tagName: 'span' });
              textEl.find('.line').each(function (index) {
                let lineContent = $(this).html();
                $(this).html('');
                $(this).append(
                  `<span class="line-inner" style="display: block;">${lineContent}</span>`
                );
              });

              tl = gsap.timeline({
                scrollTrigger: {
                  trigger: textEl,
                  start: 'top bottom',
                  end: 'bottom bottom',
                  toggleActions: 'none play none reset',
                },
              });

              tl.fromTo(
                textEl.find('.line-inner'),
                { yPercent: 110 },
                {
                  yPercent: 0,
                  duration: 1.25,
                  ease: 'expo.out',
                  stagger: { amount: 0.2, ease: 'expo.out' },
                }
              );
            }

            splitText();

            let windowWidth = window.innerWidth;
            window.addEventListener('resize', function () {
              if (windowWidth !== window.innerWidth) {
                windowWidth = window.innerWidth;
                tl.kill();
                textEl.text(textContent);
                splitText();
              }
            });
          }, delay);
        });
      }
    });
    function runCodeForLargeScreens() {
      if (window.innerWidth > 991) {
        let splitText;
        function runSplit() {
          splitText = new SplitType('[stagger-link]', {
            types: 'words, chars',
          });
        }
        runSplit();

        // ————— Update on window resize
        let windowWidth = $(window).innerWidth();
        window.addEventListener('resize', function () {
          if (windowWidth !== $(window).innerWidth()) {
            windowWidth = $(window).innerWidth();
            splitText.revert();
            runSplit();
          }
        });

        const staggerLinks = document.querySelectorAll('[stagger-link]');
        staggerLinks.forEach((link) => {
          const letters = link.querySelectorAll('[stagger-link-text] .char');
          link.addEventListener('mouseenter', function () {
            gsap.to(letters, {
              yPercent: -110,
              duration: 0.4,
              ease: 'power4.inOut',
              stagger: { each: 0.02, from: 'start' },
              overwrite: true,
            });
          });
          link.addEventListener('mouseleave', function () {
            gsap.to(letters, {
              yPercent: 0,
              duration: 0.4,
              ease: 'power4.inOut',
              stagger: { each: 0.02, from: 'end' },
            });
          });
        });
        console.log('Running code for screens larger than 991px');
      }
    }

    runCodeForLargeScreens();

    window.addEventListener('resize', runCodeForLargeScreens);
  },
};
