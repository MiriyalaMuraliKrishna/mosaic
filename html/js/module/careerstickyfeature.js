import 'sticksy';

class Stickyfeatures {
  constructor(linksSelector, sections) {
    this.links = document.querySelectorAll(linksSelector);
    this.sections = document.querySelectorAll(sections);
  }

  init() {
    if (!this.links.length) return;
    this.initSticksy();
    this.observeSections();
  }

  initSticksy() {
    const headerHeight =
      document.querySelector('header')?.getBoundingClientRect().height || 0;

    this.links.forEach((ele) => {
      const link = ele.querySelector('a');
      if (link) link.classList.add('open');

      new Sticksy(ele, {
        topSpacing: headerHeight,
        listen: true,
      });
    });
  }

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
  }
}

export const Stickyfeature = new Stickyfeatures(
  'ul.sticky-feature-links',
  '.sticky-feature-scroll[id]'
);
export const featuredIcon = new Stickyfeatures(
  'ul.features-icon-subtitle',
  '.features-icon-list[id]'
);
