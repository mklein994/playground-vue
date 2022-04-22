export type RecursiveMap = Map<string, RecursiveMap | string>;

const dataSet = (
  source: RecursiveMap = new Map(),
  path: string[],
  value: string
) => {
  const head = path.shift();
  if (head === undefined) {
    throw new Error("head is undefined, should be unreachable");
  }

  if (path.length === 0) {
    source.set(head, value);
    return source;
  }

  let newSource: string | RecursiveMap = source.get(head) ?? new Map();
  if (typeof newSource === "string") {
    const newValue = newSource;
    newSource = new Map([["", newValue]]);
  }

  source.set(head, dataSet(newSource, path, value));

  return source;
};

const dataGet = (
  source: RecursiveMap,
  path: string[]
): string | RecursiveMap | undefined => {
  const head = path.shift();
  if (head === undefined) {
    throw new Error("head is undefined, should be unreachable");
  }

  if (path.length === 0) {
    const candidate = source.get(head);
    return typeof candidate === "string" ? candidate : candidate?.get("");
  }

  const newSource = source.get(head);
  return newSource === undefined || typeof newSource === "string"
    ? newSource
    : dataGet(newSource, path);
};

const dataSetObject = (
  source: Record<string, unknown>,
  path: string[],
  value: string
) => {
  const head = path.shift();
  if (head === undefined) {
    throw new Error("head is undefined, should be unreachable");
  }

  if (path.length === 0) {
    source[head] = value;
    return source;
  }

  let newSource =
    (source[head] as string | Record<string, unknown> | undefined) ?? {};
  if (typeof newSource === "string") {
    const newValue = newSource;
    newSource = { "": newValue };
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
    throw new Error("head is undefined, should be unreachable");
  }

  if (path.length === 0) {
    const candidate = source[head];
    return typeof candidate === "string"
      ? candidate
      : (candidate as Record<string, unknown> | undefined)?.[""];
  }

  const newSource = source[head];
  return newSource === undefined || typeof newSource === "string"
    ? newSource
    : dataGetObject(newSource as Record<string, unknown>, path);
};

export const useDataSet = () => {
  return {
    dataSet,
    dataGet,
    dataSetObject,
    dataGetObject,
  };
};

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe.concurrent("dataSet", () => {
    const { dataSet } = useDataSet();
    it.each([
      ["top-level", "foo", "bar", new Map(), new Map([["foo", "bar"]])],
      [
        "replace top-level value",
        "foo",
        "baz",
        new Map([["foo", "bar"]]),
        new Map([["foo", "baz"]]),
      ],
      [
        "add top-level key",
        "qux",
        "quux",
        new Map([["foo", "bar"]]),
        new Map([
          ["foo", "bar"],
          ["qux", "quux"],
        ]),
      ],
      [
        "add nested value",
        "foo.bar.baz",
        "boz",
        new Map([["foo", "bar"]]),
        new Map([
          [
            "foo",
            new Map([
              ["", "bar" as string | RecursiveMap],
              ["bar", new Map([["baz", "boz"]])],
            ]),
          ],
        ]),
      ],
    ])(
      "%s",
      (
        _name: string,
        path: string,
        value: string,
        source: RecursiveMap,
        expected: RecursiveMap
      ) => {
        const actual = dataSet(source, path.split("."), value);
        expect(actual).toStrictEqual(expected);
      }
    );

    it("throws when path is empty", () => {
      expect(() => dataSet(new Map(), [], "")).toThrow(
        /head is undefined\b.*\bunreachable/
      );
    });
  });

  describe.concurrent.todo("dataGet");
  describe.concurrent.todo("dataGetObject");
  describe.concurrent.todo("dataSetObject");
}
