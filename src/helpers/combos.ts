// Recursively convert a tuple of arrays into a tuple of those array elements
export type TupleListItems<T> = T extends [(infer First)[], ...infer Rest]
  ? [First, ...TupleListItems<Rest>]
  : [];

/**
 * Generate combinations from the inputs given
 *
 * Note that if the list is empty, or any item is an empty array, this will
 * return an empty array.
 *
 * @param items The list of items to get combinations for
 * @returns An array with all possible combinations for the items
 */
export const combos = <T extends [...unknown[][]]>(
  items: [...T],
): TupleListItems<T>[] => {
  if (items.length === 0 || items.some((x) => x.length === 0)) {
    return [] as TupleListItems<T>[];
  }

  const [firstItem, ...remainingItems] = items;

  const remainingCombos = combos(remainingItems);

  if (remainingCombos.length === 0) {
    return firstItem.map((item) => [item]) as TupleListItems<T>[];
  }

  const newCombos = Array<TupleListItems<T>>(
    firstItem.length * remainingCombos.length,
  );
  let index = 0;
  for (const item of firstItem) {
    for (const combo of remainingCombos) {
      const newItem = [item, ...combo] as TupleListItems<T>;
      newCombos[index++] = newItem;
    }
  }

  return newCombos;
};

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("combos", () => {
    it("works with uneven combos ([a,b], [1,2,3])", () => {
      const input: [string[], number[]] = [
        ["a", "b"],
        [1, 2, 3],
      ];

      const expected: [string, number][] = [
        ["a", 1],
        ["a", 2],
        ["a", 3],
        ["b", 1],
        ["b", 2],
        ["b", 3],
      ];

      const actual = combos(input);

      expect(actual).toStrictEqual(expected);
    });

    it("works with uneven combos ([a,b,c], [1,2])", () => {
      const input: [string[], number[]] = [
        ["a", "b", "c"],
        [1, 2],
      ];

      const expected: [string, number][] = [
        ["a", 1],
        ["a", 2],
        ["b", 1],
        ["b", 2],
        ["c", 1],
        ["c", 2],
      ];

      const actual = combos(input);

      expect(actual).toStrictEqual(expected);
    });

    it("works with functions", () => {
      const input: [string[], (() => boolean)[]] = [
        ["a", "b", "c"],
        [() => true, () => false],
      ];

      const expected: [string, () => boolean][] = [
        ["a", () => true],
        ["a", () => false],
        ["b", () => true],
        ["b", () => false],
        ["c", () => true],
        ["c", () => false],
      ];

      const actual = combos(input);

      const actualEvaluated = actual.map((x) => [x[0], x[1]()]);
      const expectedEvaluated = expected.map((x) => [x[0], x[1]()]);

      expect(actualEvaluated).toStrictEqual(expectedEvaluated);
    });

    it("handles an empty array", () => {
      const input: [] = [];
      const expected: [] = [];
      const actual = combos(input);
      expect(actual).toStrictEqual(expected);
    });

    it("handles an a single empty array", () => {
      const input: [unknown[]] = [[]];
      const expected: [unknown][] = [];
      const actual = combos(input);
      expect(actual).toStrictEqual(expected);
    });

    it("handles many where a later one is an empty array", () => {
      const input: [string[], unknown[]] = [["a", "b", "c"], []];
      const expected: [string, unknown][] = [];
      const actual = combos(input);
      expect(actual).toStrictEqual(expected);
    });

    it("handles many where the first one is an empty array", () => {
      const input: [unknown[], string[]] = [[], ["a", "b", "c"]];
      const expected: [unknown, string][] = [];
      const actual = combos(input);

      expect(actual).toStrictEqual(expected);
    });

    it("handles many where one in the middle is an empty array", () => {
      const input: [number[], unknown[], string[]] = [
        [1, 2],
        [],
        ["a", "b", "c"],
      ];
      const expected: [number, unknown, string][] = [];
      const actual = combos(input);
      expect(actual).toStrictEqual(expected);
    });

    it("handles null and undefined", () => {
      const input: [(number | null)[], (string | undefined)[]] = [
        [1, 2, 3, null],
        ["a", undefined, "c"],
      ];

      const expected: [number | null, string | undefined][] = [
        [1, "a"],
        [1, undefined],
        [1, "c"],
        [2, "a"],
        [2, undefined],
        [2, "c"],
        [3, "a"],
        [3, undefined],
        [3, "c"],
        [null, "a"],
        [null, undefined],
        [null, "c"],
      ];

      const actual = combos(input);
      expect(actual).toStrictEqual(expected);
    });

    it("handles lists with duplicate items", () => {
      const input: [string[], number[]] = [
        ["a", "a", "b"],
        [1, 2, 2],
      ];

      const expected: [string, number][] = [
        ["a", 1],
        ["a", 2],
        ["a", 2],
        ["a", 1],
        ["a", 2],
        ["a", 2],
        ["b", 1],
        ["b", 2],
        ["b", 2],
      ];

      const actual = combos(input);
      expect(actual).toStrictEqual(expected);
    });

    it("handles multiple empty lists", () => {
      const input: [unknown[], unknown[], unknown[]] = [[], [], []];
      const expected: [unknown, unknown, unknown][] = [];
      const actual = combos(input);
      expect(actual).toStrictEqual(expected);
    });

    it("handles multiple lists with empty arrays", () => {
      const input: [unknown[], unknown[]] = [[[]], [[]]];
      const expected: [unknown[], unknown[]][] = [[[], []]];
      const actual = combos(input);
      expect(actual).toStrictEqual(expected);
    });

    it("handles a single combo", () => {
      const input: [string[]] = [["a"]];
      const expected: [string][] = [["a"]];
      const actual = combos(input);
      expect(actual).toStrictEqual(expected);
    });
  });
}
