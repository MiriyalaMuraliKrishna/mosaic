export const Stripe = {
  lines: document.querySelectorAll('.stripe-btn-line'),
  animationFrames: new WeakMap(), // track animations per element

  init() {
    const _ = this;
    _.lines.forEach((line) => {
      line.addEventListener('mouseenter', _.eventHandlerOn.bind(_));
      line.addEventListener('mouseleave', _.eventHandlerOff.bind(_));
    });
  },

  eventHandlerOn(e) {
    const target = e.currentTarget;
    const span = target.querySelector('span');
    if (!span) return;

    target.classList.add('stripe-open');
    span.style.transformStyle = 'preserve-3d';

    let progress = 1;

    const animateForward = () => {
      if (progress <= 100) {
        span.style.transform = `translate3d(${progress}%, 0, 0) scale3d(1, 1, 1)`;
        progress += 1;
        const id = requestAnimationFrame(animateForward);
        this.animationFrames.set(target, id);
      } else {
        animateReverse(-99);
      }
    };

    const animateReverse = (reverseProgress) => {
      if (reverseProgress <= 0) {
        span.style.transform = `translate3d(${reverseProgress}%, 0, 0) scale3d(1, 1, 1)`;
        const id = requestAnimationFrame(() =>
          animateReverse(reverseProgress + 1)
        );
        this.animationFrames.set(target, id);
      }
    };

    animateForward();
  },

  eventHandlerOff(e) {
    const target = e.currentTarget;
    target.classList.remove('stripe-open');
    const span = target.querySelector('span');
    if (span) {
      span.style.transform = 'translate3d(0%, 0, 0) scale3d(1, 1, 1)';
    }

    // Cancel any ongoing animation
    const frameId = this.animationFrames.get(target);
    if (frameId) {
      cancelAnimationFrame(frameId);
      this.animationFrames.delete(target);
    }
  },
};
