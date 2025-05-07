export class UIAccordion {
  constructor(listSelector, headerSelector, contentSelector) {
    this.listSelector = listSelector;
    this.headerSelector = headerSelector;
    this.contentSelector = contentSelector;
    this.items = document.querySelectorAll(this.listSelector);
  }

  init() {
    if (!this.items.length) return;

    this.items.forEach((el) => {
      const header = el.querySelector(this.headerSelector);
      const content = el.querySelector(this.contentSelector);
      const line = el.querySelector('.accordion-line.is-second');

      if (!header || !content) return;

      header.addEventListener('click', () => {
        const isOpen = el.dataset.open === 'true';

        // Close all
        this.items.forEach((item) => {
          item.dataset.open = 'false';

          const itemHeader = item.querySelector(this.headerSelector);
          const itemContent = item.querySelector(this.contentSelector);
          const itemLine = item.querySelector('.accordion-line.is-second');

          itemHeader?.parentElement.classList.remove('open');
          itemHeader?.classList.remove('open');
          if (itemContent) itemContent.style.maxHeight = '';
          if (itemLine) itemLine.style.transform = 'rotate(90deg)';
        });

        // Open if it wasn't already
        if (!isOpen) {
          el.dataset.open = 'true';
          header.parentElement.classList.add('open');
          header.classList.add('open');
          content.style.maxHeight = `${content.scrollHeight}px`;
          if (line) line.style.transform = 'rotate(0deg)';
        }
      });

      // Update height on window resize if open
      const onResize = () => {
        if (el.dataset.open === 'true') {
          content.style.maxHeight = `${content.scrollHeight}px`;
        }
      };
      window.addEventListener('resize', onResize);
    });
  }
}

export const Accordion = new UIAccordion(
  '.accordion-list',
  '.accordion-header',
  '.accordion-content'
);
