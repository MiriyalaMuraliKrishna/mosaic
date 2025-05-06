class Accordions {
  constructor(ele) {
    this.ele = document.querySelectorAll(ele);
  }

  init() {
    this.ele.forEach((ele) => {
      ele.addEventListener('click', (e) => {
        e.preventDefault();

        // Close all
        this.ele.forEach((el) => {
          const lines = el.querySelectorAll('.accordion-line.is-second');
          lines.forEach((line) => {
            if (line) {
              line.style.transform = 'rotate(90deg)';
            }
          });
          const isContent = el.querySelectorAll('.accordion-content');
          isContent.forEach((ele) => {
            if (ele) {
              ele.style.maxHeight = `0px`;
            }
          });
        });

        const eleclosest = e.target.closest('.accordion-list');
        if (!eleclosest) return;

        const line = eleclosest.querySelector('.accordion-line.is-second');
        if (!line) return;

        const isOpen = line.style.transform === 'rotate(0deg)';
        line.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0deg)';

        const isContent = eleclosest.querySelector('.accordion-content');
        if (isContent) {
          isContent.style.maxHeight = `${isContent.scrollHeight}px`;
        }
      });
    });
  }
}

export const Accordion = new Accordions('.accordion-main');
