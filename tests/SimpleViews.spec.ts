import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import HomeView from "@/HomeView.vue";
import NotFound from "@/NotFound.vue";
import FooExperiment from "@/views/FooExperiment.vue";

describe.each([
  ["FooExperiment", FooExperiment, "Foo"],
  ["NotFound", NotFound, "404 Not Found"],
  ["HomeView", HomeView, "Welcome"],
])("%s", (_name, component, text) => {
  it("renders correctly", () => {
    expect(component).toBeTruthy();
    const wrapper = mount(component);
    expect(wrapper.text()).toContain(text);
  });
});
