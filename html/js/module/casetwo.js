import $ from 'jquery';

class UsecaseTwo {
  constructor(selector) {
    this.main = document.querySelector(selector);
  }
  init() {
    if (!this.main) return;
    this.link = this.main.querySelector('ul.cases-two-links');
    this.link.children[0].querySelector('a').classList.add('active');
    this.link.addEventListener('click', this.eventHandler.bind(this));
    this.mobile = this.main.querySelector('.cases-two-mobile');
    this.mobile.addEventListener('click', this.eventHandlerMobile.bind(this));
  }
  eventHandler(e) {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      this.link.querySelectorAll('a').forEach((ele) => {
        ele.classList.remove('active');
      });
      e.target.classList.add('active');
      let list = this.main.querySelectorAll('.cases-two-list');
      list.forEach((list) => {
        list.style.display = 'none';
      });
      const id = e.target.getAttribute('href').trim().slice(1);
      document.getElementById(id).style.display = 'block';
      document.querySelectorAll('[data-cases-bg]').forEach((ele) => {
        $(ele).hide();
      });
      let showele = document.querySelector(`[data-cases-bg="${id}"]`);
      if (showele) $(showele).fadeIn(800);
    }
  }
  eventHandlerMobile(e) {
    e.preventDefault();

    let $target = e.currentTarget;
    $target.classList.toggle('open');
    let el = e.currentTarget;
    if (el.dataset.mobile === 'true') {
      this.link.style.maxHeight = `${this.link.scrollHeight}px`;
      el.dataset.mobile = 'false';
    } else {
      this.link.style.maxHeight = `0px`;

      el.dataset.mobile = 'true';
    }

    // h15f
    this.link.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        $target.classList.remove('open');

        $target.querySelector('span.cases-two-mobile-txt').textContent =
          e.target.textContent;
        e.target.closest('ul.cases-two-links').style.maxHeight = '0px';
      }
    });
    // h14f
  }
}
export const usecase = new UsecaseTwo('.cases-two-main');
