import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { debounce } from "@/use/debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("runs after 1 invocation", () => {
    const doStuff = vi.fn();

    const wait = 500; // 0.5s

    const debounceStuff = debounce(doStuff, wait);

    expect(doStuff).not.toHaveBeenCalled();

    debounceStuff();
    expect(doStuff).not.toHaveBeenCalled();

    vi.advanceTimersByTime(wait);
    expect(doStuff).toHaveBeenCalledOnce();
  });

  it("only gets called once when called repeatedly", () => {
    const doStuff = vi.fn();

    const debounceStuff = debounce(doStuff, 500);

    expect(doStuff).not.toHaveBeenCalled();

    debounceStuff();
    expect(doStuff).not.toHaveBeenCalled();

    vi.advanceTimersByTime(10);
    debounceStuff();
    expect(doStuff).not.toHaveBeenCalled();

    vi.advanceTimersByTime(10);
    expect(doStuff).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500 - 10);
    expect(doStuff).toHaveBeenCalledOnce();
  });
});
