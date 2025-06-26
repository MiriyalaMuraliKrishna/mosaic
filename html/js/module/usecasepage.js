export const usecasesbr = {
  breaks: document.querySelectorAll('.usecase-banner-text h1 br'),
  init() {
    console.log(this.breaks);
    this.breaks[1].classList.add('hide-above');
  },
};
