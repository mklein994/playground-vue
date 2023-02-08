import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import RecursionExperiment from "@/views/RecursionExperiment.vue";

describe("RecursionExperiment", () => {
  // This test can't be run concurrently, since it sometimes causes the
  // snapshot to be discarded, marking it as "obsolete". I'm not sure why.
  it("renders correctly", async () => {
    const wrapper = mount(RecursionExperiment, {
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
        search: "store.produce.apple",
      },
    });
    await flushPromises();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("handles an empty source", async () => {
    const wrapper = mount(RecursionExperiment, {
      props: {
        source: ["foo.bar"],
        search: "baz",
        split: (word: string) => word.split("."),
      },
    });
    await flushPromises();

    expect(
      wrapper
        .findAll("output")
        .map((x) => x.text())
        .every((x) => x === "(undefined)"),
      "not every output contains '(undefined)'"
    ).toBe(true);
  });
});
