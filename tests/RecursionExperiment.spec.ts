import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import RecursionExperiment from "@/views/RecursionExperiment.vue";

describe.concurrent("RecursionExperiment", () => {
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
});
