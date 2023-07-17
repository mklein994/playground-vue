export const debounce = <T extends unknown[]>(
  fn: (...args: T) => unknown,
  duration: number,
) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function <U>(this: U, ...args: T): void {
    const effect = () => {
      timeout = undefined;

      return fn.apply(this, args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(effect, duration);
  };
};
