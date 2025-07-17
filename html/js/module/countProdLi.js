// export const coountProdLI = {
//   eles: document.querySelectorAll(
//     'ul.main_menu > li.prods-menu-item > ul > li > ul'
//   ),
//   originalProdItems: [],
//   isProdWrapped: false,

//   prodlist() {
//     if (this.eles.length === 0) return;
//     this.eles.forEach((ele) => {
//       const Produl = ele;

//       const media = window.matchMedia('(min-width: 1024px)');
//       const mainWrapperClass = 'prod-main-wrapper flex';
//       const wrapperClass = 'prod-menu-wrapper';

//       // Store original <li> items only once
//       if (this.originalProdItems.length === 0) {
//         this.originalProdItems = Array.from(Produl.children);
//       }

//       const wrapPrdItems = () => {
//         if (this.isProdWrapped) return; // Avoid double wrapping

//         const lists = this.originalProdItems;
//         const tot = lists.length;

//         // Clear everything after the first two
//         while (Produl.children.length > 2) {
//           Produl.removeChild(Produl.lastElementChild);
//         }

//         const mainWrapper = document.createElement('div');
//         mainWrapper.classList.add(...mainWrapperClass.split(' '));
//         const fragment = document.createDocumentFragment();

//         for (let i = 0; i < tot; i += 4) {
//           const div = document.createElement('div');
//           div.classList.add(wrapperClass);

//           lists.slice(i, i + 4).forEach((li) => div.appendChild(li));
//           mainWrapper.appendChild(div);
//         }

//         fragment.appendChild(mainWrapper);
//         Produl.appendChild(fragment);
//         this.isProdWrapped = true;
//       };

//       const unwrapPrdItems = () => {
//         if (!this.isProdWrapped) return;

//         // Remove grouped structure
//         const wrapper = Produl.querySelector('.prod-main-wrapper');
//         if (wrapper) Produl.removeChild(wrapper);

//         // Re-add original items
//         this.originalProdItems.slice(2).forEach((li) => Produl.appendChild(li));
//         this.isProdWrapped = false;
//       };

//       const handleProdChange = () => {
//         if (media.matches) {
//           wrapPrdItems();
//         } else {
//           unwrapPrdItems();
//         }
//       };

//       handleProdChange();
//       media.addEventListener('change', handleProdChange);
//     });
//   },
// };

export const coountProdLI = {
  eles: document.querySelectorAll(
    'ul.main_menu > li.prods-menu-item > ul > li > ul'
  ),
  stateMap: new WeakMap(),

  prodlist() {
    if (this.eles.length === 0) return;

    this.eles.forEach((Produl) => {
      const media = window.matchMedia('(min-width: 1024px)');
      const mainWrapperClass = 'prod-main-wrapper flex';
      const wrapperClass = 'prod-menu-wrapper';

      // Initialize state for this <ul> if not already set
      if (!this.stateMap.has(Produl)) {
        this.stateMap.set(Produl, {
          originalItems: Array.from(Produl.children),
          isWrapped: false,
        });
      }

      const wrapPrdItems = () => {
        const state = this.stateMap.get(Produl);
        if (state.isWrapped) return;

        const lists = state.originalItems; // Ignore first two
        const tot = lists.length;

        while (Produl.children.length > 2) {
          Produl.removeChild(Produl.lastElementChild);
        }

        const mainWrapper = document.createElement('div');
        mainWrapper.classList.add(...mainWrapperClass.split(' '));
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < tot; i += 6) {
          const div = document.createElement('div');
          div.classList.add(wrapperClass);
          lists.slice(i, i + 6).forEach((li) => div.appendChild(li));
          mainWrapper.appendChild(div);
        }

        fragment.appendChild(mainWrapper);
        Produl.appendChild(fragment);
        state.isWrapped = true;
      };

      const unwrapPrdItems = () => {
        const state = this.stateMap.get(Produl);
        if (!state.isWrapped) return;

        const wrapper = Produl.querySelector('.prod-main-wrapper');
        if (wrapper) Produl.removeChild(wrapper);

        state.originalItems.forEach((li) => Produl.appendChild(li));
        state.isWrapped = false;
      };

      const handleProdChange = () => {
        if (media.matches) {
          wrapPrdItems();
        } else {
          unwrapPrdItems();
        }
      };

      handleProdChange();
      media.addEventListener('change', handleProdChange);
    });
  },
};
