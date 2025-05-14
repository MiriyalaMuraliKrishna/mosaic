import { mylenis } from './module/lenis';
import { Gsap } from './module/gsap';
import { Scroll } from './module/scroll';
import { Animation } from './module/animation';
import { Effects } from './module/effects';
import { Accordion } from './module/accordion';
import { Menu } from './module/menu';
import { HeaderScroll } from './module/headerscroll';
import { Stripe } from './module/stripeline';
(() => {
  mylenis.init();
  Gsap.init();
  Animation.init();
  Effects.init();
  Accordion.init();
  Menu.init();
  HeaderScroll.init();
  Stripe.init();
})();
let scrolled = window.scrollY;
window.addEventListener('scroll', function () {
  scrolled = window.scrollY;
  Scroll.handle(scrolled);
  Animation.handle(scrolled, Scroll.direction);
});
