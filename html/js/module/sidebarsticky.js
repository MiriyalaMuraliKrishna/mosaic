import 'css-element-queries/src/ResizeSensor';
import StickySidebar from 'sticky-sidebar';

function Sidebar(selector) {
  this.header = document.querySelector('header.site-header');
  this.ele = document.querySelectorAll(selector);
  this.instances = []; // store sidebar instances
}

Sidebar.prototype.init = function () {
  const media = window.matchMedia('(min-width: 1024px)');

  const checkAndInit = (matches) => {
    if (matches) {
      this.initSticky();
    } else {
      this.destroySticky();
    }
  };

  checkAndInit(media.matches);

  media.addEventListener('change', (e) => {
    checkAndInit(e.matches);
  });
};

Sidebar.prototype.initSticky = function () {
  if (!this.header) return;
  const height = this.header.getBoundingClientRect().height;

  this.ele.forEach((ele) => {
    if (!ele || ele.classList.contains('sticky-initialized')) return;

    const instance = new StickySidebar(ele, {
      topSpacing: height,
      bottomSpacing: 20,
      containerSelector: '.alt-stick-section',
      innerWrapperSelector: '.alt-stick-text',
      resizeSensor: true,
    });

    ele.classList.add('sticky-initialized');
    this.instances.push(instance);
  });
};

Sidebar.prototype.destroySticky = function () {
  this.instances.forEach((instance) => {
    instance.destroy();
  });

  this.ele.forEach((ele) => {
    ele.classList.remove('sticky-initialized');
  });

  this.instances = [];
};

export const sidebar = new Sidebar('.alt-stick-left');
