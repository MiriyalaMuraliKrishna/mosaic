import $ from 'jquery';

function Poweredby(ele) {
  this.ele = document.querySelector(ele);
}

Poweredby.prototype.init = function () {
  if (!this.ele) return;
  this.list = this.ele?.querySelector('ul.powered-by-list');
  this.ellipse = this.ele?.querySelector('.powered-by-ellipse');
  this.left = this.ele?.querySelector('.powered-by-left');

  this.list?.children[0].classList.add('active');
  this.ele
    ?.querySelector('.powered-graphs-row')
    .querySelector('.powered-graph-ellipse')
    .classList.add('open');

  // Initial positioning on the first active li
  this.setEllipseToActive();

  this.list?.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    this.list
      .querySelectorAll('li')
      .forEach((el) => el.classList.remove('active'));
    li.classList.add('active');

    let id = li.dataset.to.trim();

    document.querySelectorAll(`.powered-graphs-row`).forEach((ele) => {
      ele.querySelector('.powered-graph-ellipse').classList.remove('open');
      $(ele).hide();
    });

    document
      .querySelector(`.powered-graphs-row[data-by="${id}"]`)
      .querySelector('.powered-graph-ellipse')
      .classList.add('open');

    $(document.querySelector(`.powered-graphs-row[data-by="${id}"]`)).fadeIn(
      900
    );

    this.moveEllipseTo(li);
  });
};

Poweredby.prototype.moveEllipseTo = function (li) {
  const parentRect = this.left.getBoundingClientRect();
  const liRect = li.getBoundingClientRect();
  const centerY = liRect.top + liRect.height / 2 - parentRect.top;
  const centerX = liRect.left + liRect.width / 2 - parentRect.left;

  const ellipseW = this.ellipse.offsetWidth;
  const ellipseH = this.ellipse.offsetHeight;
  const totleft = 2 * (centerX - ellipseW / 2);

  this.ellipse.style.top = `${centerY - ellipseH / 2}px`;
  this.ellipse.style.left = `${totleft}px`;
};

Poweredby.prototype.setEllipseToActive = function () {
  const active = this.list?.querySelector('li.active');
  if (active) this.moveEllipseTo(active);
};

export const poweredobj = new Poweredby('.powered-by-main');
