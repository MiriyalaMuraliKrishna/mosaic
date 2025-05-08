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
    let lastscroll = 0;
    const elescroll = () => {
      const scroll = window.scrollY;
      console.log(scroll, lastscroll);
      let headerHeight = 138;
      if (scroll <= headerHeight) {
        _.$ele.classList.remove('sticky-up', 'sticky-down');
      } else if (scroll > lastscroll) {
        _.$ele.classList.remove('sticky-up');
        _.$ele.classList.add('sticky-down');
      } else if (scroll < lastscroll - 2) {
        _.$ele.classList.add('sticky-up');
        _.$ele.classList.remove('sticky-down');
      }
      lastscroll = scroll;
      console.log(scroll, lastscroll);
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
