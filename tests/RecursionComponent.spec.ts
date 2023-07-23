import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import RecursionComponent from "@/components/RecursionComponent.vue";

describe("RecursionComponent", () => {
  // This test can't be run concurrently, since it sometimes causes the
  // snapshot to be discarded, marking it as "obsolete". I'm not sure why.
  it("renders correctly (map)", async () => {
    const wrapper = mount(RecursionComponent, {
      props: {
        source: [
          "store.produce.apple",
          "store.produce.banana",
          "store.produce.cherry",
          "person.male.dad",
          "person.male.son",
          "person.female.mom",
          "person.female.daughter",
        ],
        split: (word: string) => word.split("."),
        parseStyle: "map",
      },
    });
    await flushPromises();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders correctly (object)", async () => {
    const wrapper = mount(RecursionComponent, {
      props: {
        source: [
          "store.produce.apple",
          "store.produce.banana",
          "store.produce.cherry",
          "person.male.dad",
          "person.male.son",
          "person.female.mom",
          "person.female.daughter",
        ],
        split: (word: string) => word.split("."),
        parseStyle: "object",
      },
    });
    await flushPromises();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("handles an empty source", async () => {
    const wrapper = mount(RecursionComponent, {
      props: {
        source: [],
        split: (word: string) => word.split("."),
      },
    });
    await flushPromises();

    expect(
      wrapper
        .findAll("output")
        .map((x) => x.text())
        .every((x) => x === "(undefined)"),
      "not every output contains '(undefined)'",
    ).toBe(true);
  });
});
