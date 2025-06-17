import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const anime = {
  eles: document.querySelectorAll('.scroll-content-text'),
  scrolltextblack: document.querySelectorAll('.scroll-conten-blk-text'),
  h1: document.querySelectorAll('[data-anim*="title"]'),
  h2: document.querySelectorAll('[data-anim*="subtitle"]'),
  init() {
    this.scrollcontent();
    this.scrollcontentblack();
    this.title();
    this.subtitle();
  },
  scrollcontent() {
    this.eles.forEach((el) => {
      // Skip if this element already contains a title or subtitle anim element
      if (
        el.querySelector('[data-anim*="title"]') ||
        el.querySelector('[data-anim*="subtitle"]')
      ) {
        return;
      }

      const target = el.querySelector('p') || el.querySelector('h2');

      if (!target) return;

      document.fonts.ready.then(() => {
        const wordSplit = new SplitText(target, { type: 'words' });
        const charSplit = new SplitText(wordSplit.words, {
          type: 'chars',
          charsClass: 'chars',
        });

        gsap.set(el, { opacity: 1 });
        gsap.set(charSplit.chars, {
          opacity: 0.4,
          color: 'rgba(255, 255, 255, 0.5)',
        });

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
  },
  scrollcontentblack() {
    this.scrolltextblack.forEach((el) => {
      // Skip if this element already contains a title or subtitle anim element
      if (
        el.querySelector('[data-anim*="title"]') ||
        el.querySelector('[data-anim*="subtitle"]')
      ) {
        return;
      }

      const target = el.querySelector('p') || el.querySelector('h2');

      if (!target) return;

      document.fonts.ready.then(() => {
        const wordSplit = new SplitText(target, { type: 'words' });
        const charSplit = new SplitText(wordSplit.words, {
          type: 'chars',
          charsClass: 'chars',
        });

        gsap.set(el, { opacity: 1 });
        gsap.set(charSplit.chars, {
          opacity: 0.4,
          color: 'rgba(0, 0, 0, 0.4)',
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end: 'bottom 50%',
            scrub: 0.75,
          },
        });

        tl.to(charSplit.chars, {
          color: '#000000',
          opacity: 1,
          stagger: 0.1,
          ease: 'power2.out',
        });
      });
    });
  },
  title() {
    this.h1.forEach((ele) => {
      if (ele.dataset.anim !== 'title') return;
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

        const rect = ele.getBoundingClientRect();
        const isVisible =
          rect.top < window.innerHeight * 0.75 &&
          rect.bottom > window.innerHeight * 0.5;
        if (isVisible) tl.play();
      });
    });
  },
  subtitle() {
    this.h2.forEach((subele) => {
      if (subele.dataset.anim !== 'subtitle') return;
      document.fonts.ready.then(() => {
        const $duration = +subele.dataset.duration / 1000 || 1.5;

        gsap.set(subele, { opacity: 1 });

        const split = new SplitText(subele, {
          type: 'lines',
          linesClass: 'line',
        });

        gsap.set(split.lines, {
          yPercent: 100,
          opacity: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: subele,
            start: 'top 75%',
            end: 'bottom 50%',
            toggleActions: 'play none none none',
          },
        });

        tl.to(split.lines, {
          duration: $duration,
          yPercent: 0,
          opacity: 1,
          stagger: 0.2,
          ease: 'expo.out',
        });

        // Manually play if already in view
        const rect = subele.getBoundingClientRect();
        const isVisible =
          rect.top < window.innerHeight * 0.75 &&
          rect.bottom > window.innerHeight * 0.5;
        if (isVisible) tl.play();
      });
    });
  },
};
