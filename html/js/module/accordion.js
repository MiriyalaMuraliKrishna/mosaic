class Accordions {
  constructor(ele) {
    this.ele = document.querySelectorAll(ele);
  }

  init() {
    this.ele.forEach((ele) => {
      ele.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.closest('.accordion-list')) {
          const line = e.target.querySelector('.accordion-line.is-second');
          line.style.transform = 'rotate(0deg)';
          console.log(line);
        }
      });
    });
  }
}

export const Accordion = new Accordions('.accordion-main');
