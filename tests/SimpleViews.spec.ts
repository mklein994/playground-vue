import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import NotFound from "@/NotFound.vue";
import FooExperiment from "@/views/FooExperiment.vue";

describe("FooExperiment", () => {
  it("renders correctly", () => {
    const wrapper = mount(FooExperiment);
    expect(wrapper.text()).toContain("Foo");
  });
});

describe("NotFound", () => {
  it("renders correctly", () => {
    const wrapper = mount(NotFound);
    expect(wrapper.html()).toContain(`<h1>404 Not Found</h1>`);
  });
});
