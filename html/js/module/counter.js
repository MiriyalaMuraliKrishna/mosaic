import { CountUp } from 'countup.js';

export const counter = {
  $ele: document.querySelectorAll('[data-count-to]'),

  init() {
    const _ = this;
    if (!_.$ele || _.$ele.length === 0) return;

    _.$ele.forEach(($el) => {
      const $target = $el.getAttribute('id');
      if (!$target) return;

      const durationAttr = $el.getAttribute('data-duration');
      const countToAttr = $el.getAttribute('data-count-to');

      if (!durationAttr || !countToAttr) return;

      const duration = parseInt(durationAttr, 10);
      const countTo = parseFloat(countToAttr);

      if (isNaN(duration) || isNaN(countTo)) return;

      // Convert duration to seconds
      const durationSeconds = duration / 1000;

      // Safe decimal places detection
      const countToParts = countTo.toString().split('.');
      const decimalPlaces = countToParts[1]?.length ?? 0;

      $el.counter = new CountUp($target, countTo, {
        startVal: 0,
        duration: durationSeconds,
        decimalPlaces,
      });

      // Start counting if needed
      if (!$el.counter.error) {
        $el.counter.start();
      } else {
        console.error($el.counter.error);
      }
    });
  },
};
