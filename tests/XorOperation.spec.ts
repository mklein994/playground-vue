import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import XorOperation from "@/views/XorOperation.vue";

describe("XorOperation", () => {
  it("loads", async () => {
    const wrapper = mount(XorOperation);
    await flushPromises();
    expect(wrapper.exists()).toBe(true);
  });
});
