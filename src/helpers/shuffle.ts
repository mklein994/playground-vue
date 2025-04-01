export const shuffle = <T>(values: T[]): T[] => {
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values;
};

if (import.meta.vitest) {
  const { assert, describe, it } = import.meta.vitest;

  describe("shuffle", () => {
    it("shuffles a list of numbers", () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const backup = structuredClone(input);
      shuffle(input);
      assert.notSameOrderedMembers(input, backup);
    });
  });
}
