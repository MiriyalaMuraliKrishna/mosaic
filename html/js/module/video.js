class Videos {
  constructor(fluidvideo) {
    this.fluidvideo = document.querySelector(fluidvideo);
  }
  init() {
    if (this.fluidvideo) {
      // console.log(this.fluidvideo);
      this.fluidvideo.style.opacity = 1;
      this.fluidvideo.style.visibility = 'visible';
    }
  }
}
export const Video = new Videos('.fluid-video video');
