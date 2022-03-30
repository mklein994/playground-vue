import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h, Suspense } from "vue";

import ForAwaitList from "@/components/ForAwaitList.vue";

describe("ForAwait", async () => {
  const TestComponent = defineComponent(function TestComponent() {
    return () => h(Suspense, () => h(ForAwaitList));
  });
  const wrapper = mount(TestComponent);

  await flushPromises();

  it.each([
    [1, "1"],
    [2, "2"],
    [3, "Fizz"],
    [4, "4"],
    [5, "Buzz"],
    [6, "Fizz"],
    [7, "7"],
    [8, "8"],
    [9, "Fizz"],
    [10, "Buzz"],
    [11, "11"],
    [12, "Fizz"],
    [13, "13"],
    [14, "14"],
    [15, "FizzBuzz"],
    [16, "16"],
  ])("fizzbuzz: %i -> %s", (index, expected) => {
    expect(wrapper.find(`li:nth-child(${index})`).text()).toBe(expected);
  });
});
