class Automated {
  constructor(selector) {
    this.main = document.querySelectorAll(selector);
  }
  init() {
    if (this.main.length === 0) return;

    this.ellipse = Array.from(this.main).map((ele) => {
      return ele.querySelector('.automated-grid-ellipse');
    });

    if (this.ellipse.length === 0) return;

    // this.main.addEventListener('mousemove', this.bounce.bind(this));
    this.main.forEach((ele, _i) => {
      ele.addEventListener('mousemove', (e) => this.bounce(e, _i));
    });
  }
  bounce(e, _i) {
    const ellipse = this.ellipse[_i];
    const rect = this.main[_i].getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ellipseW = ellipse.offsetWidth;
    const ellipseH = ellipse.offsetHeight;

    // Move the ellipse so it's centered at the cursor
    ellipse.style.left = `${x - ellipseW / 2}px`;
    ellipse.style.top = `${y - ellipseH / 2}px`;
  }
}
export let automated = new Automated('.automated-grid-main');
