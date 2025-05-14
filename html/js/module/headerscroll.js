export const HeaderScroll = {
  init() {
    let didScroll;
    let lastScrollTop = 0;
    const delta = 5;
    const $header = $('.site-header');
    const navbarHeight = $header.outerHeight();

    $(window).on('scroll', function () {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);

    const hasScrolled = () => {
      const st = window.scrollY;

      // Skip when at the very top
      if (st <= navbarHeight) {
        $header.removeClass('sticky-up sticky-down');
        lastScrollTop = st;
        return;
      }

      // Skip small scrolls
      if (Math.abs(lastScrollTop - st) <= delta) return;
      if (st > lastScrollTop && st > navbarHeight) {
        $header.removeClass('sticky-down').addClass('sticky-up');
      } else if (st < lastScrollTop && st > navbarHeight) {
        $header.removeClass('sticky-up').addClass('sticky-down');
      }
      lastScrollTop = st;
    };
  },
};
