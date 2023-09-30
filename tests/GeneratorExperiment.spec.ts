import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h, Suspense } from "vue";

import GeneratorList from "@/components/GeneratorList.vue";

describe.concurrent("GeneratorExperiment", () => {
  const testComponentBuilder = (max?: number) =>
    defineComponent(function TestComponent() {
      return () =>
        h(Suspense, () =>
          h(GeneratorList, max == null ? undefined : { initialMax: max }),
        );
    });

  describe.concurrent("all in order", async () => {
    const wrapper = mount(testComponentBuilder());

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
      expect(wrapper.get(`li:nth-child(${index})`).text()).toBe(expected);
    });
  });

  it("matches snapshot", async () => {
    const wrapper = mount(testComponentBuilder());

    await flushPromises();

    expect(wrapper.html()).toMatchSnapshot();
  });

  describe.concurrent("max", () => {
    it("handles a different initial value", async () => {
      const wrapper = mount(testComponentBuilder(10));

      await flushPromises();

      expect(wrapper.get("li:last-child").text()).toBe("Buzz");
    });

    it("updates when changed", async () => {
      const wrapper = mount(testComponentBuilder(10));

      await flushPromises();

      const last = () => wrapper.get("li:last-child");
      expect(wrapper.findAll("li")).toHaveLength(10);
      expect(last().text()).toBe("Buzz");

      await wrapper.get("#max").setValue(3);

      await flushPromises();

      expect(wrapper.findAll("li")).toHaveLength(3);
      expect(last().text()).toBe("Fizz");
    });
  });
});
