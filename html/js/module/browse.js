class browse {
  constructor(flag) {
    this.flag = document.querySelector(flag);
  }
  init() {
    this.flag ? this.flag.addEventListener('click', this.eventHandler) : '';
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
}
export const Browse = new browse('.resources-browse-mobile');
