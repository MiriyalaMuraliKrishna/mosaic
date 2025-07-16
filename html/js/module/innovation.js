class Innovation {
  constructor(selector) {
    this.ele = document.querySelector(selector);
    this.line = this.ele?.querySelector('.innovation-line');
    this.items = this.ele
      ? Array.from(this.ele.querySelectorAll('.innovation-list'))
      : '';
    this.activeItem = null;
  }

  init() {
    if (!this.ele || !this.line || this.items.length === 0) return;
    this.items.forEach((item) => {
      item.style.opacity = 0.6;
      item.style.transition = 'opacity 1s ease';
      this.line.style.transition = 'height 1s ease';
      this.observer.observe(item);
    });
  }

  updateActiveItem(entry) {
    const target = entry.target;

    // Determine scroll direction
    const currentIndex = this.items.indexOf(target);
    const previousIndex = this.activeItem
      ? this.items.indexOf(this.activeItem)
      : -1;
    const scrollingDown = currentIndex > previousIndex;

    // Update previous item opacity only if scrolling up
    if (this.activeItem && !scrollingDown) {
      this.activeItem.style.opacity = 0.6;
    }

    // Set new active
    this.activeItem = target;
    this.activeItem.style.opacity = 1;

    // Update line height
    const offsetTop = this.activeItem.offsetTop;
    const height = this.activeItem.offsetHeight;
    this.line.style.height = `${offsetTop + height}px`;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.updateActiveItem(entry);
        }
      });
    },
    {
      rootMargin: '0px',
      threshold: 0.75,
    }
  );
}

export const innovation = new Innovation('.innovation-lists');
