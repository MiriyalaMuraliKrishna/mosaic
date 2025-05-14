export const Stripe = {
  lines: document.querySelectorAll('.stripe-btn-line'),

  init() {
    const _ = this;
    _.lines.forEach((line) => {
      line.addEventListener('mouseover', _.eventHandlerOn.bind(_));
      line.addEventListener('mouseleave', _.eventHandlerOff.bind(_));
    });
  },

  eventHandlerOn(e) {
    const span = e.currentTarget.querySelector('span');
    e.currentTarget.classList.add('stripe-open');
    span.style.transformStyle = 'preserve-3d';

    let progress = 1;

    const animateForward = () => {
      if (progress <= 100) {
        span.style.transform = `translate3d(${progress}%, 0, 0) scale3d(1, 1, 1)`;
        progress += 1;
        requestAnimationFrame(animateForward);
      } else {
        // After reaching 100%, start reverse from -99% to -1%
        animateReverse(-99);
      }
    };

    const animateReverse = (reverseProgress) => {
      if (reverseProgress <= 0) {
        span.style.transform = `translate3d(${reverseProgress}%, 0, 0) scale3d(1, 1, 1)`;
        requestAnimationFrame(() => animateReverse(reverseProgress + 1));
      }
    };

    animateForward();
  },

  eventHandlerOff(e) {
    e.currentTarget.classList.remove('stripe-open');
    const span = e.currentTarget.querySelector('span');
    if (span) {
      span.style.transform = 'translate3d(0%, 0px, 0px) scale3d(1, 1, 1)';
    }
  },
};
