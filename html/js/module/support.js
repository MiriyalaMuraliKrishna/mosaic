export const support = {
  $line: document.querySelector('.support-ellipse-bg'),
  $ele: document.querySelectorAll('.support-list'),

  init() {
    const ___ = this;
    const target = ___.$line;
    const links = ___.$ele;

    if (!target || !links.length) return;

    const deskmedia = window.matchMedia('(min-width: 1024px)');
    const ipadmedia = window.matchMedia('(max-width: 1023px)');
    const mobmedia = window.matchMedia('(max-width: 664px)');

    function deskfun(e) {
      if (!e) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const left = rect.left + window.scrollX;

      e.currentTarget.parentElement.classList.add('hover');
      target.style.left = `${left}px`;

      // Additional desktop logic can go here
    }

    function ipadfun(e) {
      if (!e) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const height = rect.height;

      const top = rect.top + window.screenY - height;
      const left = rect.left + window.scrollX;

      e.currentTarget.parentElement.classList.add('hover');
      target.style.top = `${top}px`;
      target.style.left = `${left}px`;

      // Additional tablet logic can go here
    }

    function mobfun(e) {
      if (!e) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const height = rect.height + 346;
      const top = rect.top + window.scrollY - height;

      e.currentTarget.parentElement.classList.add('hover');
      target.style.top = `${top}px`;

      // Additional mobile logic can go here
    }

    links.forEach((link) => {
      link.addEventListener('mouseover', (e) => {
        if (deskmedia.matches) deskfun(e);
      });

      link.addEventListener('mouseleave', (e) => {
        e.currentTarget.parentElement.classList.remove('hover');
      });

      link.addEventListener('click', (e) => {
        if (mobmedia.matches) {
          mobfun(e);
        } else if (ipadmedia.matches) {
          ipadfun(e);
        }
      });
    });

    // Optional: Media query change listener (not resize)
    deskmedia.addEventListener('change', () => resetStyles());
    ipadmedia.addEventListener('change', () => resetStyles());
    mobmedia.addEventListener('change', () => resetStyles());

    function resetStyles() {
      target.style.left = '';
      target.style.top = '';
      links.forEach((link) => link.parentElement.classList.remove('hover'));
    }
  },
};
