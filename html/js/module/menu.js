export const Menu = {
  $ele: document.querySelector('header.site-header'),
  $nav: document.querySelector('.header_right'),
  $btn: document.querySelector('.humburger-btn'),
  init() {
    const _ = this;
    if (!_.$ele || !_.$btn) return;
    // scrolly with
    _.$btn.addEventListener('click', (e) => {
      const __ = e.currentTarget;
      __.classList.toggle('open');
      _.$nav.classList.toggle('open');
    });

    let mediadesktop = window.matchMedia('(min-width: 1024px)');
    let mediamobile = window.matchMedia('(max-width: 1023px)');

    // scroll fun //
    const myscroll = 0;
    const elescroll = () => {
      const scroll = window.scrollY || myscroll;
      scroll > 138
        ? _.$ele.classList.remove('sticky')
        : _.$ele.classList.add('sticky');
    };
    window.addEventListener('scroll', elescroll);
    // scroll fun //

    // mobile menu //
    const mobilemenu = () => {
      document
        .querySelectorAll('ul.main_menu > li.menu-item-has-children > a')
        .forEach((level1) => {
          level1.addEventListener('click', (e) => {
            e.preventDefault();
            const $li = e.target.parentElement;
            $li.classList.toggle('open');

            $($li.querySelector('ul')).slideToggle(800);
            const siblings = Array.from($li.parentElement.children);

            siblings.forEach(($item) => {
              if ($item !== $li) {
                $item.classList.toggle('sib');
                $item.classList.remove('open');
                const $itemul = $item.querySelector('ul');
                $($itemul).slideUp(800);
              }
            });
          });
        });
      document
        .querySelectorAll(
          'ul.menu > li.menu-item-has-children > ul > li.menu-item-has-children > a'
        )
        .forEach((level2) => {
          level2.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.currentTarget.tagName === 'A') {
              e.currentTarget.classList.toggle('open');
              const $li = e.currentTarget.parentElement;
              $($li.querySelector('ul')).slideToggle(800);
              const siblings = Array.from($li.parentElement.children);
              siblings.forEach(($item) => {
                if ($item !== $li) {
                  $item.querySelector('a').classList.remove('open');
                  const $itemul = $item.querySelector('ul');
                  $($itemul).slideUp(800);
                }
              });
            }
          });
        });
    };

    if (mediamobile.matches) {
      mobilemenu();
    }
    mediadesktop.addEventListener('change', (event) => {
      if (event.matches) {
        mobilemenu();
      } else {
      }
    });
  },
};
