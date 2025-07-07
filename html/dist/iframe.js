jQuery(document).ready(function () {
  if (jQuery('[data-vbg]')) {
    jQuery('[data-vbg]').youtube_background({
      lazyloading: true,
    });
    jQuery('[data-vbg]').addClass('open');
  }
});
