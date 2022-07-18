import { describe, expect, it } from "vitest";

import { CustomSet } from "@/helpers/setOperations";

describe("import setOperations", () => {
  it("works", () => {
    const set = new CustomSet(["apple", "banana"]);
    expect(set.isSuperset(new CustomSet(["apple"]))).toBeTruthy();
  });
});
