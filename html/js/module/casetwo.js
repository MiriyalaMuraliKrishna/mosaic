class UsecaseTwo {
  constructor(selector) {
    this.main = document.querySelector(selector);
  }
  init() {
    if (!this.main) return;
    this.link = this.main.querySelector('ul.cases-two-links');
    this.link.children[0].querySelector('a').classList.add('active');
    this.link.addEventListener('click', this.eventHandler.bind(this));
  }
  eventHandler(e) {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      this.link.querySelectorAll('a').forEach((ele) => {
        ele.classList.remove('active');
      });
      e.target.classList.add('active');
      let list = this.main.querySelectorAll('.cases-two-list');
      list.forEach((list) => {
        list.style.display = 'none';
      });
      const id = e.target.getAttribute('href').trim().slice(1);
      document.getElementById(id).style.display = 'block';
    }
  }
}
export const usecase = new UsecaseTwo('.cases-two-main');
