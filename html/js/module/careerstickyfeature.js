import 'sticksy';

export const Stickyfeatures = {
  links: document.querySelectorAll('ul.sticky-feature-links'),
  sections: document.querySelectorAll('.sticky-feature-scroll[id]'),
  init() {
    if (this.links.length === 0) return;
    this.initSticksy();
    this.observeSections();
  },

  initSticksy() {
    const headerHeight =
      document.querySelector('header')?.getBoundingClientRect().height || 0;

    this.links.forEach((ele) => {
      if (!ele) return;
      const link = ele.querySelector('a');
      if (link) link.classList.add('open');

      if (ele) {
        new Sticksy(ele, {
          topSpacing: headerHeight,
          listen: true,
        });
      }
    });
  },

  observeSections() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          this.links.forEach((ele) => {
            const anchor = ele.querySelector(`a[href="#${id}"]`);
            if (!anchor) return;
            anchor.classList.toggle('open', entry.isIntersecting);
          });
        });
      },
      { threshold: 0.5 } // adjust as needed
    );

    this.sections.forEach((section) => observer.observe(section));
  },
};
