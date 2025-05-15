import { mylenis } from './module/lenis';
import { Gsap } from './module/gsap';
import { Scroll } from './module/scroll';
import { Animation } from './module/animation';
import { Effects } from './module/effects';
import { Accordion } from './module/accordion';
import { Menu } from './module/menu';
import { HeaderScroll } from './module/headerscroll';
import { Stripe } from './module/stripeline';
import { Browse } from './module/browse';
import { sticky } from './module/stickmeterial';

(() => {
  mylenis.init();
  Gsap.init();
  Animation.init();
  Effects.init();
  Accordion.init();
  Menu.init();
  HeaderScroll.init();
  Stripe.init();
  Browse.init();
  sticky.init();
})();
let scrolled = window.scrollY;
window.addEventListener('scroll', function () {
  scrolled = window.scrollY;
  Scroll.handle(scrolled);
  Animation.handle(scrolled, Scroll.direction);
});
