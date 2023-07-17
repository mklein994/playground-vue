import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { throttle } from "@/use/throttle";

describe("throttle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("runs after 1 invocation", () => {
    const doStuff = vi.fn();

    const wait = 500; // 0.5s

    const throttleStuff = throttle(doStuff, wait);

    expect(doStuff).not.toHaveBeenCalled();

    throttleStuff();
    expect(doStuff).toHaveBeenCalledOnce();

    vi.advanceTimersByTime(wait);
    expect(doStuff).toHaveBeenCalledOnce();
  });

  it("runs once when when called repeatedly", () => {
    const doStuff = vi.fn();

    const throttleStuff = throttle(doStuff, 500);

    expect(doStuff).not.toHaveBeenCalled();

    throttleStuff();
    expect(doStuff).toHaveBeenCalledOnce();

    throttleStuff();
    expect(doStuff).toHaveBeenCalledOnce();
    vi.advanceTimersByTime(10);
    throttleStuff();
    vi.advanceTimersByTime(10);
    expect(doStuff).toHaveBeenCalledOnce();
    throttleStuff();
    vi.advanceTimersByTime(500 - 20);
    throttleStuff();
    expect(doStuff).toHaveBeenCalledTimes(2);
  });
});
