import { describe, expect, it } from "vitest";

import { routes } from "@/routes";

describe("routes", () => {
  it("exported some routes", () => {
    expect(routes.length).toBeGreaterThan(2);
  });
});
