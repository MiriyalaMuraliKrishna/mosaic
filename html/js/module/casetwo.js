import $ from 'jquery';

class UsecaseTwo {
  constructor(selector) {
    this.main = document.querySelector(selector);
    this.media = window.matchMedia('(max-width: 767px)');
    this.handleChange = this.handleChange.bind(this); // bind the method
  }

  init() {
    if (!this.main) return;

    this.link = this.main.querySelector('ul.cases-two-links');
    this.link.children[0].querySelector('a').classList.add('active');
    this.link.addEventListener('click', this.eventHandler.bind(this));

    this.mobile = this.main.querySelector('.cases-two-mobile');
    this.mobile.addEventListener('click', this.eventHandlerMobile.bind(this));

    // Listen to media query changes
    this.media.addEventListener('change', this.handleChange);
    this.handleChange(); // Trigger on load
  }

  eventHandler(e) {
    if (e.target.tagName === 'A') {
      e.preventDefault();

      this.link.querySelectorAll('a').forEach((ele) => {
        ele.classList.remove('active');
      });
      e.target.classList.add('active');

      let list = this.main.querySelectorAll('.cases-two-list');
      list.forEach((item) => {
        item.style.display = 'none';
      });

      const id = e.target.getAttribute('href').trim().slice(1);
      const selected = document.getElementById(id);
      if (selected) selected.style.display = 'block';

      document.querySelectorAll('[data-cases-bg]').forEach((ele) => {
        $(ele).hide();
      });

      const showele = document.querySelector(`[data-cases-bg="${id}"]`);
      if (showele) $(showele).fadeIn(800);
    }
  }

  handleChange() {
    if (this.media.matches) {
      this.uiMobile();
    } else {
      this.unwrapMobile();
    }
  }

  uiMobile() {
    if (this.link) {
      this.link.style.maxHeight = '0px';
    }
  }

  unwrapMobile() {
    if (this.link) {
      this.link.style.maxHeight = 'inherit';
    }
  }

  eventHandlerMobile(e) {
    e.preventDefault();

    const el = e.currentTarget;
    el.classList.toggle('open');

    if (el.dataset.mobile !== 'true') {
      this.link.style.maxHeight = `${this.link.scrollHeight}px`;
      el.dataset.mobile = 'true';
    } else {
      this.link.style.maxHeight = `0px`;
      el.dataset.mobile = 'false';
    }

    // Add a one-time handler to update text and close list
    const onClick = (event) => {
      if (event.target.tagName === 'A') {
        event.preventDefault();

        el.classList.remove('open');
        const textSpan = el.querySelector('span.cases-two-mobile-txt');
        if (textSpan) textSpan.textContent = event.target.textContent;

        this.link.style.maxHeight = '0px';
        el.dataset.mobile = 'false';

        // Remove this listener after use
        this.link.removeEventListener('click', onClick);
      }
    };

    this.link.addEventListener('click', onClick);
  }
}

export const usecase = new UsecaseTwo('.cases-two-main');
