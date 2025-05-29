import 'youtube-background';

export const iframe = {
  ele: document.querySelectorAll('[data-vbg]'),
  init() {
    this.ele.forEach((iframe) => {
      if (jQuery(iframe)) {
        jQuery(iframe).youtube_background();
        setTimeout(() => {
          iframe.classList.add('open');
        }, 0);
      }
    });
  },
};
