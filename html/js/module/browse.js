class Browses {
  constructor(flag, ellipse, links) {
    this.flag = document.querySelector(flag);
    this.browsellipse = document.querySelector(ellipse);
    this.links = document.querySelectorAll(links);

    // Bind methods to preserve `this`
    this.eventHandler = this.eventHandler.bind(this);
    this.browseHandler = this.browseHandler.bind(this);
  }
  init() {
    this.flag ? this.flag.addEventListener('click', this.eventHandler) : '';
    console.log(this.links);
    this.links.forEach((ele) => {
      ele.addEventListener('mouseover', this.browseHandler);
    });
  }
  // main logic here
  eventHandler(e) {
    e.preventDefault();
    e.target.classList.toggle('open');
    let $ul = e.target
      .closest('.resources-browse-text')
      .querySelector('ul.browse-links');
    if ($ul.style.maxHeight) {
      $ul.style.maxHeight = null;
    } else {
      $ul.style.maxHeight = `${$ul.scrollHeight}px`;
    }
  }
  browseHandler(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const top = rect.top + window.scrollY - 533;
    const left = rect.left + window.scrollX - 533;
    console.log(top);
    this.browsellipse.style.top = `${top}px`;
    this.browsellipse.style.left = `${left}px`;
  }
}
export const Browse = new Browses(
  '.resources-browse-mobile',
  '.resources-browse-ellipse',
  'ul.browse-links > li > a'
);
