import { flushPromises, mount } from "@vue/test-utils";
import { expect, it } from "vitest";

import RecursionExperiment from "@/views/RecursionExperiment.vue";

it.concurrent("RecursionExperiment", async () => {
  const wrapper = mount(RecursionExperiment);
  await flushPromises();

  expect(wrapper.html()).toMatchSnapshot();
});
