export const featuredIcon = {
  eles: document.querySelectorAll('ul.features-icon-subtitle li a'),
  init() {
    this.eles[0].classList.add('active');
    this.eles.forEach((ele) => {
      ele.addEventListener('click', (e) => {
        e.preventDefault();
        this.eles.forEach((ele) => {
          ele.classList.remove('active');
        });
        ele.classList.add('active');
      });
    });
  },
};
