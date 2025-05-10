import { mylenis } from './module/lenis';
import { Gsap } from './module/gsap';
import { Animation } from './module/animation';
import { Accordion } from './module/accordion';
import { Menu } from './module/menu';

(() => {
  mylenis.init();
  Animation.init();
  Accordion.init();
  Menu.init();
  Gsap.init();
})();
