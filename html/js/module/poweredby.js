function Poweredby(ele) {
  this.ele = document.querySelector(ele);
}

Poweredby.prototype.init = function () {
  this.list = this.ele?.querySelector('ul.powered-by-list');
  this.ellipse = this.ele?.querySelector('.powered-by-ellipse');
  this.left = this.ele?.querySelector('.powered-by-left');

  this.list?.children[0].classList.add('active');

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

    document.querySelectorAll(`.powered-graphs`).forEach((ele) => {
      ele.style.display = 'none';
    });

    document.querySelector(`.powered-graphs[data-by="${id}"]`).style.display =
      'flex';

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
