type Entry<T> = Record<string, T[]>;

type RowColumn<T> = {
  [K in keyof T]: T[K] extends (infer U)[] ? U : never;
};

export const toRowColumn = <T extends Entry<U>, U>(
  source: T,
): RowColumn<T>[] => {
  const data: RowColumn<T>[] = [];
  const keyLength = Math.max(...Object.values(source).map((x) => x.length));

  for (let i = 0; i < keyLength; i++) {
    const entry = {} as Record<string, U>;
    for (const [key, value] of Object.entries(source)) {
      entry[key] = value[i];
    }
    data.push(entry as RowColumn<T>);
  }
  return data;
};

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("toRowColumn", () => {
    it("handles 3 arrays", () => {
      const input = {
        id: [1, 2, 3],
        name: ["Bob", "Jane", "Johnny"],
        likesFruit: [false, true, false],
      };

      const expected = [
        { id: 1, name: "Bob", likesFruit: false },
        { id: 2, name: "Jane", likesFruit: true },
        { id: 3, name: "Johnny", likesFruit: false },
      ];

      const actual = toRowColumn(input);

      expect(actual).toStrictEqual(expected);
    });
  });
}
