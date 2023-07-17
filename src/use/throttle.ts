export const throttle = <T extends unknown[]>(
  func: (...args: T) => unknown,
  duration: number,
) => {
  let shouldWait = false;

  return function (this: unknown, ...args: T) {
    if (!shouldWait) {
      func.apply(this, args);

      shouldWait = true;

      setTimeout(() => {
        shouldWait = false;
      }, duration);
    }
  };
};
