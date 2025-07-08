jQuery(document).ready(function () {
  if (jQuery('[data-vbg]')) {
    jQuery('[data-vbg]').youtube_background({
      // lazyloading: true, // some console reason i commented here
    });
    jQuery('[data-vbg]').addClass('open');
  }
});
