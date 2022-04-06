import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import HelloWorld from "../WelcomeKitchenSink.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(HelloWorld, { props: {} });
    expect(wrapper.text()).toContain("Azure Cognitive Services");
  });
});
