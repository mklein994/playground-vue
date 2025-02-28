import { assertType, describe, expectTypeOf, it } from "vitest";

import type { TupleListItem } from "@/helpers/combos";
import { combos } from "@/helpers/combos";

describe("TupleListItem", () => {
  it("handles empty lists", () => {
    expectTypeOf<TupleListItem<[]>>().toEqualTypeOf<[]>();
  });

  it("handles the simple case", () => {
    expectTypeOf<TupleListItem<[string[], number[]]>>().toEqualTypeOf<
      [string, number]
    >();
  });

  it("handles when the first item is an empty list", () => {
    expectTypeOf<
      TupleListItem<[[], [Record<string, unknown>]]>
    >().toEqualTypeOf<[]>();
  });

  it("handles when the last item is an empty list", () => {
    expectTypeOf<TupleListItem<[string[], []]>>().toEqualTypeOf<[]>();
  });

  it("handles when a middle item is an empty list", () => {
    expectTypeOf<TupleListItem<[string[], [], string[]]>>().toEqualTypeOf<[]>();
  });

  it("handles when multiple items are empty lists", () => {
    expectTypeOf<TupleListItem<[[], []]>>().toEqualTypeOf<[]>();
  });
});

describe("combos types", () => {
  it("handles the simple case", () => {
    const input: [string[], number[]] = [
      ["a", "b", "c"],
      [1, 2],
    ];
    const actual = combos(input);
    assertType<[string, number][]>(actual);
  });

  it("handles empty lists", () => {
    const input: [] = [];
    const actual = combos(input);
    assertType<[][]>(actual);
  });

  it("handles lists with empty lists", () => {
    const input: [[], []] = [[], []];
    const actual = combos(input);
    assertType<[][]>(actual);
  });
});
