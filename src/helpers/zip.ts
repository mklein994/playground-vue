// Helper type to extract the element type from an array
type ArrayElement<T> = T extends (infer U)[] ? U : never;

// Helper type to create a tuple type from array types
type ZippedTuple<T extends unknown[][]> = {
  [K in keyof T]: ArrayElement<T[K]>;
};

export const zip = <T extends unknown[][]>(
  ...arrays: [...T]
): ZippedTuple<T>[] => {
  const length = Math.max(...arrays.map((x) => x.length));
  const result: ZippedTuple<T>[] = [];

  for (let i = 0; i < length; i++) {
    const current = [] as unknown as ZippedTuple<T>;
    for (const array of arrays) {
      current.push(array[i]);
    }
    result.push(current);
  }

  return result;
};

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("zip", () => {
    it("handles 2 arrays", () => {
      const expected = [
        ["a", { name: "Bob" }],
        ["b", { name: "Jane" }],
        ["c", { name: "Johnny" }],
      ];

      const letters = ["a", "b", "c"];
      const names = [{ name: "Bob" }, { name: "Jane" }, { name: "Johnny" }];

      const actual = zip(letters, names);

      expect(actual).toStrictEqual(expected);
    });

    it("handles 3 arrays", () => {
      const expected = [
        [1, "a", { id: 1 }],
        [2, "b", { id: 2 }],
        [3, "c", { id: 3 }],
      ];

      const numbers = [1, 2, 3];
      const letters = ["a", "b", "c"];
      const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];

      const actual = zip(numbers, letters, objects);

      expect(actual).toStrictEqual(expected);
    });

    it("handles ragged arrays", () => {
      const expected = [
        [1, "a", { id: 1 }],
        [2, undefined, { id: 2 }],
        [undefined, undefined, { id: 3 }],
      ];

      const numbers = [1, 2];
      const letters = ["a"];
      const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];

      const actual = zip(numbers, letters, objects);

      expect(actual).toStrictEqual(expected);
    });
  });
}
