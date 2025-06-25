export const Menu = {
  $ele: document.querySelector('header.site-header'),
  $nav: document.querySelector('.header_right'),
  $btn: document.querySelector('.humburger-btn'),
  $blackheader: document.querySelector('body.page-template-product-software'),
  $footerlinks: document.querySelectorAll('ul.foter-nav-links > li > a'),
  $mainsolutions: document.querySelector(
    'ul.main_menu > li.solutions-menu-item:not(.current-page-ancestor) > a'
  ),
  $solutions: document.querySelectorAll(
    'ul.main_menu > li.solutions-menu-item > ul > li > a'
  ),
  $solutionsLi: document.querySelectorAll(
    'ul.main_menu > li.solutions-menu-item > ul > li > ul > li.current_page_item'
  ),
  $mainproducts: document.querySelector(
    'ul.main_menu > li.products-menu-item:not(.current-page-ancestor) > a'
  ),
  $products: document.querySelectorAll(
    'ul.main_menu > li.products-menu-item > ul > li > a'
  ),
  $productsLi: document.querySelectorAll(
    'ul.main_menu > li.products-menu-item > ul > li > ul > li.current_page_item'
  ),
  $mainmaterials: document.querySelector(
    'ul.main_menu > li.materials-menu-item:not(.current-page-ancestor) > a'
  ),
  $materials: document.querySelectorAll(
    'ul.main_menu > li.materials-menu-item > ul > li > a'
  ),
  $materialsLi: document.querySelectorAll(
    'ul.main_menu > li.materials-menu-item > ul > li > ul > li.current_page_item'
  ),
  init() {
    const _ = this;

    if (_.$blackheader) {
      _.$blackheader
        .querySelector('.site-header')
        .classList.add('black-header');
    }

    // solutions hover
    _.$mainsolutions && !_.$solutionsLi.length > 0
      ? _.$solutions[0].parentElement.classList.add('open-menu')
      : '';

    _.$solutions.forEach((ele) => {
      ele.addEventListener('mouseenter', function (e) {
        _.$solutionsLi.forEach((li) =>
          li.classList.remove('current_page_item')
        );
        _.$solutions.forEach((ele) =>
          ele.parentElement.classList.remove('open-menu')
        );
        e.target.parentElement.classList.add('open-menu');
      });
    });
    // solutions hover

    // products hover
    _.$mainproducts && !_.$productsLi.length > 0
      ? _.$products[0].parentElement.classList.add('open-menu')
      : '';

    _.$products.forEach((ele) => {
      ele.addEventListener('mouseenter', function (e) {
        _.$productsLi.forEach((li) => li.classList.remove('current_page_item'));
        _.$products.forEach((ele) =>
          ele.parentElement.classList.remove('open-menu')
        );
        e.target.parentElement.classList.add('open-menu');
      });
    });
    // products hover

    // materials hover
    _.$mainmaterials && !_.$materialsLi.length > 0
      ? _.$materials[0].parentElement.classList.add('open-menu')
      : '';

    _.$materials.forEach((ele) => {
      ele.addEventListener('mouseenter', function (e) {
        _.$materialsLi.forEach((li) =>
          li.classList.remove('current_page_item')
        );
        _.$materials.forEach((ele) =>
          ele.parentElement.classList.remove('open-menu')
        );
        e.target.parentElement.classList.add('open-menu');
      });
    });
    // materials hover

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
