export const coountSolLI = {
  eles: document.querySelectorAll('ul.main_menu > li.solutions-menu-item > ul'),
  originalItems: [],
  isWrapped: false,

  list() {
    if (this.eles.length === 0) return;
    const ul = this.eles[0];
    const media = window.matchMedia('(min-width: 1024px)');
    const mainWrapperClass = 'sol-main-wrapper flex';
    const wrapperClass = 'sol-menu-wrapper';

    // Store original <li> items only once
    if (this.originalItems.length === 0) {
      this.originalItems = Array.from(ul.children);
    }

    const wrapItems = () => {
      if (this.isWrapped) return; // Avoid double wrapping

      const lists = this.originalItems.slice(2); // Ignore first two
      const tot = lists.length;

      // Clear everything after the first two
      while (ul.children.length > 2) {
        ul.removeChild(ul.lastElementChild);
      }

      const mainWrapper = document.createElement('div');
      mainWrapper.classList.add(...mainWrapperClass.split(' '));
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < tot; i += 5) {
        const div = document.createElement('div');
        div.classList.add(wrapperClass);

        lists.slice(i, i + 5).forEach((li) => div.appendChild(li));
        mainWrapper.appendChild(div);
      }

      fragment.appendChild(mainWrapper);
      ul.appendChild(fragment);
      this.isWrapped = true;
    };

    const unwrapItems = () => {
      if (!this.isWrapped) return;

      // Remove grouped structure
      const wrapper = ul.querySelector('.sol-main-wrapper');
      if (wrapper) ul.removeChild(wrapper);

      // Re-add original items
      this.originalItems.slice(2).forEach((li) => ul.appendChild(li));
      this.isWrapped = false;
    };

    const handleChange = () => {
      if (media.matches) {
        wrapItems();
      } else {
        unwrapItems();
      }
    };

    // Initial check
    handleChange();

    // Listen for media query changes
    media.addEventListener('change', handleChange);
  },
};
