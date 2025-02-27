import { assertType, describe, expectTypeOf, it } from "vitest";

import type { TupleListItems } from "@/helpers/combos";
import { combos } from "@/helpers/combos";

describe("TupleListItems", () => {
  it("handles empty lists", () => {
    expectTypeOf<TupleListItems<[]>>().toEqualTypeOf<[]>();
  });

  it("handles the simple case", () => {
    expectTypeOf<TupleListItems<[string[], number[]]>>().toEqualTypeOf<
      [string, number]
    >();
  });

  it("handles when the first item is an empty list", () => {
    expectTypeOf<
      TupleListItems<[[], [Record<string, unknown>]]>
      // >().toEqualTypeOf<[never, Record<string, unknown>]>();
    >().toEqualTypeOf<[]>();
  });

  it("handles when the last item is an empty list", () => {
    expectTypeOf<TupleListItems<[string[], []]>>().toEqualTypeOf<
      // [string, never]
      []
    >();
  });

  it("handles when a middle item is an empty list", () => {
    expectTypeOf<TupleListItems<[string[], [], string[]]>>().toEqualTypeOf<
      // [string, never, string]
      []
    >();
  });

  it("handles when multiple items are empty lists", () => {
    // expectTypeOf<TupleListItems<[[], []]>>().toEqualTypeOf<[never, never]>();
    expectTypeOf<TupleListItems<[[], []]>>().toEqualTypeOf<[]>();
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
