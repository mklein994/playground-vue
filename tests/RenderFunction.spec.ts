import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import CustomRenderFunction from "@/components/CustomRenderFunction.vue";
import CustomRenderFunctionSetup from "@/components/CustomRenderFunctionSetup.vue";
import RenderFunction from "@/views/RenderFunction.vue";

describe("RenderFunction", () => {
  it("renders <script setup> and hand-crafted h() components the same", async () => {
    const wrapper = mount(RenderFunction);
    await flushPromises();
    expect(wrapper.exists()).toBe(true);

    const fn = wrapper.getComponent(CustomRenderFunction);
    const setup = wrapper.getComponent(CustomRenderFunctionSetup);
    expect(fn.html()).toStrictEqual(setup.html());
  });

  describe("CustomRenderFunction", () => {
    it("modifies the count", async () => {
      const wrapper = mount(CustomRenderFunction);
      await flushPromises();
      const up = wrapper.get(".increment");
      const down = wrapper.get(".decrement");
      const output = wrapper.get(".render-output");
      expect(output.text()).toBe("5");
      await up.trigger("click");
      await up.trigger("click");
      await up.trigger("click");
      await down.trigger("click");
      expect(output.text()).toBe("7");
    });
  });

  describe("CustomRenderFunctionSetup", () => {
    it("modifies the count", async () => {
      const wrapper = mount(CustomRenderFunctionSetup);
      await flushPromises();
      const up = wrapper.get(".increment");
      const down = wrapper.get(".decrement");
      const output = wrapper.get(".render-output");
      expect(output.text()).toBe("5");
      await up.trigger("click");
      await up.trigger("click");
      await up.trigger("click");
      await down.trigger("click");
      expect(output.text()).toBe("7");
    });
  });
});
