import { flushPromises, mount } from "@vue/test-utils";
import { expect, it } from "vitest";

import RecursionExperiment from "@/views/RecursionExperiment.vue";

it.concurrent("RecursionExperiment", async () => {
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
