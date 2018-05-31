import * as TWEEN from '@tweenjs/tween.js';

export const tweenProps = (options = {}) => {
  const {
    position,
    target,
    onUpdate,
    callback,
    duration = 2000,
    easing = TWEEN.Easing.Linear.None
  } = options;

  const tween = new TWEEN.Tween(position)
    .to(target, duration)
    .easing(easing)
    .onUpdate(d => {
      onUpdate && onUpdate(d);
    })
    .onComplete(() => {
      callback && callback();
    });

  tween.start();
};
