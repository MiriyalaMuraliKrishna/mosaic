export const usecases = {
  eles: document.querySelectorAll('.use-cases-slide'),
  init() {
    if (!this.eles) return;

    this.eles.forEach((ele) => {
      ele.addEventListener('mouseenter', (e) => {
        const myele = e.currentTarget;
        const myDesc = myele.querySelector('.use-cases-desc');

        this.eles.forEach((el) => {
          const desc = el.querySelector('.use-cases-desc');
          const span = el.querySelector('.text-link span');
          if (myele !== el) {
            desc.style.maxHeight = `0px`;
          }
        });

        // Toggle active element
        const isOpen =
          myDesc.style.maxHeight && myDesc.style.maxHeight !== '0px';

        if (isOpen) {
          myDesc.style.maxHeight = '0px';
        } else {
          myDesc.style.maxHeight = `${myDesc.scrollHeight}px`;
        }
      });
      ele.addEventListener('mouseleave', (e) => {
        const myele = e.currentTarget;
        const myDesc = myele.querySelector('.use-cases-desc');
        myDesc.style.maxHeight = '0px';
      });
    });
  },
};
