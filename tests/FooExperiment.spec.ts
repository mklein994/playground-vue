import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import FooExperiment from "@/views/FooExperiment.vue";

describe("FooExperiment", () => {
  it("renders correctly", () => {
    const wrapper = mount(FooExperiment);
    expect(wrapper.text()).toContain("Foo");
  });
});
