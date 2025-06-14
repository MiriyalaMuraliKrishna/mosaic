class UsecaseTwo {
  constructor(selector) {
    this.main = document.querySelector(selector);
  }
  init() {
    if (!this.main) return;
    let link = this.main.querySelector('ul.cases-two-links');
    // event delegation starts now
    console.log(link);
  }
}
export const usecase = new UsecaseTwo('.cases-two-main');
