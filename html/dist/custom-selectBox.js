jQuery(document).ready(function ($) {
  function initializeSelectBox() {
    jQuery('select').selectBox({
      keepInViewport: false,
      menuSpeed: 'slow',
      menuTransition: 'fade',
      mobile: true,
      hideOnWindowScroll: true,
    });
    jQuery('.selectBox, .selectBox-dropdown .selectBox-label').removeAttr(
      'style'
    );
  }
  initializeSelectBox();
  const observer = new MutationObserver(function (mutationList) {
    for (let mutation of mutationList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        initializeSelectBox();
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
