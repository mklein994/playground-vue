export type RecursiveMap = Map<string, RecursiveMap | string>;
type DataGetReturn = string | RecursiveMap | undefined;

const dataSet = (
  source: RecursiveMap = new Map(),
  path: string[],
  value: string
) => {
  const head = path.shift();
  if (head === undefined) {
    throw new Error("(dataSet) head is undefined, should be unreachable");
  }

  if (path.length === 0) {
    source.set(head, value);
    return source;
  }

  let newSource: string | RecursiveMap = source.get(head) ?? new Map();
  if (typeof newSource === "string") {
    newSource = new Map([[newSource, new Map()]]);
  }

  source.set(head, dataSet(newSource, path, value));

  return source;
};

const dataGet = (source: RecursiveMap, path: string[]): DataGetReturn => {
  const head = path.shift();
  if (head === undefined) {
    return source;
  }

  const newSource = source.get(head);
  if (newSource === undefined) {
    return newSource;
  } else if (typeof newSource === "string") {
    return path.length > 0 ? undefined : newSource;
  } else {
    return dataGet(newSource, path);
  }
};

const dataSetObject = (
  source: Record<string, unknown>,
  path: string[],
  value: string
) => {
  const head = path.shift();
  if (head === undefined) {
    throw new Error("(dataSetObject) head is undefined, should be unreachable");
  }

  if (path.length === 0) {
    source[head] = value;
    return source;
  }

  let newSource =
    (source[head] as string | Record<string, unknown> | undefined) ?? {};
  if (typeof newSource === "string") {
    newSource = { [newSource]: {} };
  }

  source[head] = dataSetObject(newSource, path, value);

  return source;
};

const dataGetObject = (
  source: Record<string, unknown>,
  path: string[]
): unknown => {
  const head = path.shift();
  if (head === undefined) {
    return source;
  }

  const newSource = source[head];
  if (newSource === undefined) {
    return newSource;
  } else if (typeof newSource === "string") {
    return path.length > 0 ? undefined : newSource;
  } else {
    return dataGetObject(newSource as Record<string, unknown>, path);
  }
};

export const useDataSet = () => {
  return {
    dataSet,
    dataGet,
    dataSetObject,
    dataGetObject,
  };
};

/* c8 ignore start */
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe.concurrent("dataSet", () => {
    const { dataSet } = useDataSet();
    it.each([
      ["top-level", ["foo"], "bar", new Map(), new Map([["foo", "bar"]])],
      [
        "replace top-level value",
        ["foo"],
        "baz",
        new Map([["foo", "bar"]]),
        new Map([["foo", "baz"]]),
      ],
      [
        "add top-level key",
        ["qux"],
        "quux",
        new Map([["foo", "bar"]]),
        new Map([
          ["foo", "bar"],
          ["qux", "quux"],
        ]),
      ],
      [
        "add nested value",
        ["foo", "bar", "baz"],
        "boz",
        new Map([["foo", "bar"]]),
        new Map([["foo", new Map([["bar", new Map([["baz", "boz"]])]])]]),
      ],
    ])(
      "%s",
      (
        _name: string,
        path: string[],
        value: string,
        source: RecursiveMap,
        expected: RecursiveMap
      ) => {
        const actual = dataSet(source, path, value);
        expect(actual).toStrictEqual(expected);
      }
    );

    it("throws when path is empty", () => {
      expect(() => dataSet(new Map(), [], "")).toThrow(
        /head is undefined\b.*\bunreachable/
      );
    });
  });

  describe.concurrent("dataGet", () => {
    const { dataGet } = useDataSet();

    it("gets a simple value", () => {
      expect(dataGet(new Map([["foo", "bar"]]), ["foo"])).toBe("bar");
    });

    it("gets a complex value", () => {
      expect(
        dataGet(
          new Map([["foo", new Map([["bar", new Map([["baz", "boz"]])]])]]),
          ["foo"]
        )
      ).toStrictEqual(new Map([["bar", new Map([["baz", "boz"]])]]));
    });

    it("gets a nested value", () => {
      expect(
        dataGet(new Map([["foo", new Map([["bar", "baz"]]) as RecursiveMap]]), [
          "foo",
          "bar",
        ])
      ).toBe("baz");
    });

    it("returns undefined if top-level path doesn't exist", () => {
      expect(dataGet(new Map([["foo", "bar"]]), ["baz"])).toBe(undefined);
    });

    it("returns undefined if sub-path doesn't exist", () => {
      expect(dataGet(new Map([["foo", "bar"]]), ["foo", "bar", "baz"])).toBe(
        undefined
      );
    });
  });

  describe.concurrent("dataSetObject", () => {
    const { dataSetObject } = useDataSet();

    it.each([
      ["top-level", ["foo"], "bar", {}, { foo: "bar" }],
      [
        "replace top-level value",
        ["foo"],
        "baz",
        { foo: "bar" },
        { foo: "baz" },
      ],
      [
        "add top-level key",
        ["qux"],
        "quux",
        { foo: "bar" },
        { foo: "bar", qux: "quux" },
      ],
      [
        "add nested value",
        ["foo", "bar", "baz"],
        "boz",
        { foo: "bar" },
        {
          foo: {
            bar: {
              baz: "boz",
            },
          },
        },
      ],
    ])(
      "%s",
      (_name: string, path: string[], value: string, source, expected) => {
        const actual = dataSetObject(source, path, value);
        expect(actual).toStrictEqual(expected);
      }
    );

    it("throws when path is empty", () => {
      expect(() => dataSetObject({}, [], "")).toThrow(
        /head is undefined\b.*\bunreachable/
      );
    });
  });

  describe.concurrent("dataGetObject", () => {
    const { dataGetObject } = useDataSet();

    it("returns undefined if top-level path doesn't exist", () => {
      expect(dataGetObject({ foo: "bar" }, ["baz"])).toBe(undefined);
    });

    it("returns undefined value at sub-path doesn't exist", () => {
      expect(dataGetObject({ foo: "bar" }, ["foo", "bar", "baz"])).toBe(
        undefined
      );
    });

    it("simple case", () => {
      expect(dataGetObject({ foo: "bar" }, ["foo"])).toBe("bar");
    });

    it("gets complex value", () => {
      expect(
        dataGetObject(
          {
            foo: {
              bar: {
                baz: "boz",
              },
            },
          },
          ["foo"]
        )
      ).toStrictEqual({
        bar: {
          baz: "boz",
        },
      });
    });
  });
}
