import type { MaybeRefOrGetter, Ref } from "vue";
import { customRef, ref, toValue } from "vue";

// Inspired by https://learnersbucket.com/examples/interview/debouncing-with-leading-and-trailing-options/
export const debounce = <T extends unknown[]>(
  fn: (...args: T) => void,
  wait = 250,
  options: { leading?: boolean; trailing?: boolean } = {},
): ((...args: T) => void) => {
  const { leading = false, trailing = true } = options;

  if (!leading && !trailing) {
    throw new Error("At least one of leading or trailing must be set to true");
  }

  let timeout: ReturnType<typeof setTimeout> | undefined;
  let isLeadingInvoked = false;

  return function <V>(this: V, ...args: T) {
    clearTimeout(timeout);

    // leading
    if (leading && !timeout) {
      fn.apply(this, args);
      isLeadingInvoked = true;
    } else {
      isLeadingInvoked = false;
    }

    // trailing
    timeout = setTimeout(() => {
      if (trailing && !isLeadingInvoked) {
        fn.apply(this, args);
      }

      timeout = undefined;
    }, wait);
  };
};

export const debouncedRef = <T>(
  initialValue?: MaybeRefOrGetter<T>,
  wait = 250,
  options: { leading?: boolean; trailing?: boolean } = {},
): Ref<T> => {
  return customRef((track, trigger) => {
    const inner = ref(toValue(initialValue)) as Ref<T>;

    const realUpdate = (newValue: T) => {
      inner.value = newValue;
      trigger();
    };

    const debouncedUpdate = debounce(realUpdate, wait, options);

    const update = wait === 0 ? realUpdate : debouncedUpdate;

    return {
      get() {
        track();
        return inner.value;
      },
      set(newValue) {
        update(newValue);
      },
    };
  });
};

if (import.meta.vitest) {
  const { afterEach, beforeEach, describe, expect, it, vi } = import.meta
    .vitest;

  describe("debouncedRef", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("has an initial value of undefined when not given any", () => {
      const debounced = debouncedRef();
      expect(debounced.value).toBeUndefined();
    });

    it("uses the initial value immediately", () => {
      const debounced = debouncedRef("hello");
      expect(debounced.value).toStrictEqual("hello");
    });

    it("updates the value immediately if a wait duration of 0 was given", () => {
      const debounced = debouncedRef("hello", 0);
      debounced.value = "goodbye";
      expect(debounced.value).toStrictEqual("goodbye");
    });

    it("updates the value after a delay if given a wait duration", () => {
      const debounced = debouncedRef("hello", 250);
      debounced.value = "goodbye";
      expect(debounced.value).toStrictEqual("hello");
      vi.advanceTimersByTime(249);
      expect(debounced.value).toStrictEqual("hello");
      vi.advanceTimersByTime(1);
      expect(debounced.value).toStrictEqual("goodbye");
    });

    it("updates the value immediately if leading is true with a wait duration", () => {
      const debounced = debouncedRef("hello", 250, { leading: true });
      debounced.value = "goodbye";
      expect(debounced.value).toStrictEqual("goodbye");
    });

    it("updates the value after a delay if updated again before the wait duration", () => {
      const debounced = debouncedRef("hello", 250, { leading: true });
      debounced.value = "goodbye";
      vi.advanceTimersByTime(1);
      debounced.value = "farewell";
      vi.advanceTimersByTime(1);
      expect(debounced.value).toStrictEqual("goodbye");
      vi.advanceTimersByTime(249);
      expect(debounced.value).toStrictEqual("farewell");
    });
  });
}
