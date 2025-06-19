function Poweredby(ele) {
  this.ele = document.querySelector(ele);
}
Poweredby.prototype.init = function () {
  this.list = this.ele?.querySelector('ul.powered-by-list');
  this.list.addEventListener('click', function (e) {
    let myli = e.target.closest('li');
    if (e.target.closest('li').tagName === 'LI') {
      e.preventDefault();
      e.currentTarget.querySelectorAll('li').forEach((ele) => {
        ele.classList.remove('active');
      });
      myli.classList.toggle('active');
    }
  });
};
export const poweredobj = new Poweredby('.powered-by-main');
