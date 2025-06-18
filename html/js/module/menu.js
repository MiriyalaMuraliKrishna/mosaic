export const Menu = {
  $ele: document.querySelector('header.site-header'),
  $nav: document.querySelector('.header_right'),
  $btn: document.querySelector('.humburger-btn'),
  $footerlinks: document.querySelectorAll('ul.foter-nav-links > li > a'),
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
          'ul.main_menu > li.menu-item-has-children > ul > li.menu-item-has-children > a'
        )
        .forEach((level2) => {
          level2.addEventListener('click', (e) => {
            e.preventDefault();
            e.target
              .closest('ul')
              .closest('li')
              .children[0].classList.toggle('hide-link');

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
    // footer fun starts here
    _.$footerlinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        _.$footerlinks.forEach((item) => {
          if (item !== link) {
            item.classList.remove('open');
            $(item.parentElement.querySelector('ul')).slideUp(800);
          }
        });
        e.currentTarget.classList.toggle('open');
        $(e.currentTarget.closest('li').children[1]).slideToggle(800);
      });
    });
    // footer fun ends here
  },
};
