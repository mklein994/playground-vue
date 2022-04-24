/* c8 ignore start */
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe.concurrent("smokeTest", () => {
    it("checks that tests are working", () => {
      expect(1 + 2).toBe(3);
    });
  });
}
