import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const anime = {
  eles: document.querySelectorAll('.scroll-content-text'),
  h1: document.querySelectorAll('[data-anim*="title"]'),
  init() {
    this.eles.forEach((el) => {
      const target = el.querySelector('p') || el.querySelector('h2');

      document.fonts.ready.then(() => {
        // Split words first, then characters
        const wordSplit = new SplitText(target, { type: 'words' });
        const charSplit = new SplitText(wordSplit.words, {
          type: 'chars',
          charsClass: 'chars',
        });

        // Set initial styles
        gsap.set(el, { opacity: 1 });
        gsap.set(charSplit.chars, {
          opacity: 0.4,
          color: 'rgba(255, 255, 255, 0.5)',
        });

        // Create a scroll-triggered timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end: 'bottom 50%',
            scrub: 0.75,
          },
        });

        tl.to(charSplit.chars, {
          color: '#ffffff',
          opacity: 1,
          stagger: 0.1,
          ease: 'power2.out',
        });
      });
    });
    this.title();
  },
  title() {
    this.h1.forEach((ele) => {
      document.fonts.ready.then(() => {
        let $duration = +ele.dataset.duration / 1000 || 1.5;
        const charSplit = new SplitText(ele, {
          type: 'chars',
          charsClass: 'chars',
        });

        gsap.set(ele, { opacity: 1 });
        gsap.set(charSplit.chars, {
          opacity: 0,
          y: 50,
          rotateX: -90,
          transformOrigin: '50% 100%',
        });

        var tl = gsap.timeline({
          paused: true,
          scrollTrigger: {
            trigger: ele,
            start: 'top 75%',
            end: 'bottom 50%',
            toggleActions: 'play none none none', // ✅ only play once
            // scrub: 0.75,
            // once: true,
          },
        });

        tl.to(charSplit.chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          ease: 'power4.out',
          stagger: 0.05,
          duration: $duration,
        });

        // ✅ Manually play if already in view
        const rect = ele.getBoundingClientRect();
        const isVisible =
          rect.top < window.innerHeight * 0.75 &&
          rect.bottom > window.innerHeight * 0.5;
        isVisible ? tl.play() : '';
      });
    });
  },
};
