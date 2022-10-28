import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import CustomRenderFunction from "@/components/CustomRenderFunction.vue";
import CustomRenderFunctionSetup from "@/components/CustomRenderFunctionSetup.vue";
import RenderFunction from "@/views/RenderFunction.vue";

describe("CustomRenderFunction", () => {
  it("works", async () => {
    const wrapper = mount(RenderFunction);
    await flushPromises();
    expect(wrapper.exists()).toBe(true);

    const fn = wrapper.getComponent(CustomRenderFunction);
    const setup = wrapper.getComponent(CustomRenderFunctionSetup);
    expect(fn.html()).toStrictEqual(setup.html());
  });
});
