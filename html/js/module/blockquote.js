class Blockquotes {
  constructor(selector) {
    this.quotes = document.querySelectorAll(selector);
  }

  init() {
    this.quotes.forEach((ele) => {
      if (!ele) return;
      const text = ele.textContent;
      ele.innerHTML = ''; // Clear existing content

      const temp = document.createElement('span');
      temp.style.visibility = 'hidden';
      temp.style.whiteSpace = 'pre-wrap';
      temp.style.position = 'absolute';
      temp.style.width = ele.clientWidth + 'px';
      temp.textContent = text;
      document.body.appendChild(temp);

      const ranges = [];
      const range = document.createRange();
      let start = 0;

      for (let i = 1; i <= text.length; i++) {
        range.setStart(temp.firstChild, start);
        range.setEnd(temp.firstChild, i);
        const rects = range.getClientRects();
        if (rects.length > 1 || i === text.length) {
          // New line detected
          ranges.push([start, i]);
          start = i;
        }
      }

      document.body.removeChild(temp);

      ranges.forEach(([start, end]) => {
        const span = document.createElement('span');
        span.className = 'quote-line';
        span.textContent = text.slice(start, end);
        ele.appendChild(span);
      });
    });
  }
}

// Usage
export const Blockquote = new Blockquotes('blockquote p');
window.addEventListener('resize', () => Blockquote.init());
