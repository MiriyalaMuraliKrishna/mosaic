jQuery(window).on('load', function () {
  const $vbg = jQuery('[data-vbg]');
  if ($vbg.length > 0) {
    $vbg.youtube_background({
      // lazyload: true, // optional but may help
      // mute: true // try this to avoid autoplay issues
    });
    $vbg.addClass('open');
  }
});
