function Automated(selector) {
  this.main = document.querySelector(selector);
}

Automated.prototype.init = function () {
  if (!this.main) return;

  this.ellipse = this.main.querySelector('.automated-grid-ellipse');
  if (!this.ellipse) return;

  this.main.addEventListener('mousemove', this.bounce.bind(this));
};

Automated.prototype.bounce = function (e) {
  const ellipse = this.ellipse;
  const rect = this.main.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const ellipseW = ellipse.offsetWidth;
  const ellipseH = ellipse.offsetHeight;

  // Move the ellipse so it's centered at the cursor
  ellipse.style.left = `${x - ellipseW / 2}px`;
  ellipse.style.top = `${y - ellipseH / 2}px`;
};

export let automated = new Automated('.automated-grid-main');
