/**
 * Wrapper class around Set to provide some basic operations.
 */
export class CustomSet<T> extends Set<T> {
  /**
   * A \\ B
   *
   * a.k.a (A - B)
   *
   * Example:
   *
   * ```
   * { 1, 2 } \ { 2, 3 } = { 1 }
   * ```
   */
  difference(other: CustomSet<T>): CustomSet<T> {
    return new CustomSet([...this].filter((x) => !other.has(x)));
  }

  /**
   * A ∪ B
   *
   * Example:
   *
   * ```
   * { 1, 2 } ∪ { 2, 3 } = { 1, 2, 3 }
   * ```
   */
  union(other: CustomSet<T>): CustomSet<T> {
    return new CustomSet([...this, ...other]);
  }

  /**
   * A ∩ B
   *
   * Example:
   *
   * ```
   * { 1, 2 } ∩ { 2, 3 } = { 2 }
   * ```
   */
  intersection(other: CustomSet<T>): CustomSet<T> {
    return new CustomSet([...this].filter((x) => other.has(x)));
  }

  /**
   * (A - B) ∪ (B - A)
   *
   * Example:
   *
   * ```
   * P = { 1, 2 }
   * Q = { 2, 3 }
   * (P \ Q) ∪ (Q \ P) = R
   * R = { 1, 3 }
   * ```
   */
  symmetricDifference(other: CustomSet<T>): CustomSet<T> {
    return this.difference(other).union(other.difference(this));
  }

  /**
   * A ∩ B = ∅
   *
   * Example:
   *
   * ```
   * { 1, 2 } ∩ { 3, 4 } = { } = true
   * ```
   */
  isDisjoint(other: CustomSet<T>): boolean {
    if (this.size <= other.size) {
      return [...this].every((x) => !other.has(x));
    } else {
      return [...other].every((x) => !this.has(x));
    }
  }

  /**
   * A ⊆ B
   *
   * Example:
   *
   * ```
   * { 1, 2 } ⊆ { 1, 2, 3 } = true
   * ```
   */
  isSubset(other: CustomSet<T>): boolean {
    if (this.size <= other.size) {
      return [...this].every((x) => other.has(x));
    } else {
      return false;
    }
  }

  /**
   * A ⊇ B
   *
   * Example:
   *
   * ```
   * { 1, 2, 3 } ⊇ { 1, 2 } = true
   * ```
   */
  isSuperset(other: CustomSet<T>): boolean {
    return other.isSubset(this);
  }
}

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("set operations", () => {
    const a = new CustomSet(["apple", "banana"]);
    const b = new CustomSet(["banana", "cherry"]);

    it("computes the difference of A and B (A \\ B)", () => {
      expect(a.difference(b)).toStrictEqual(new CustomSet(["apple"]));
    });

    it("computes the union of A and B (A \u222a B)", () => {
      expect(a.union(b)).toStrictEqual(
        new CustomSet(["apple", "banana", "cherry"])
      );
    });

    it("computes the intersection of A and B (A ∩ B)", () => {
      expect(a.intersection(b)).toStrictEqual(new CustomSet(["banana"]));
    });

    it("computes the symmetric difference of A and B ((A \\ B) \u222a (B \\ A))", () => {
      expect(a.symmetricDifference(b)).toStrictEqual(
        new CustomSet(["apple", "cherry"])
      );
    });
  });

  describe("set properties", () => {
    it("checks if A is disjoint from B", () => {
      const a = new CustomSet([1, 2]);
      const b = new CustomSet([3, 4]);
      expect(a.isDisjoint(b)).toBe(true);
    });

    it("checks if A is not disjoint from B", () => {
      const a = new CustomSet([1, 2, 3]);
      const b = new CustomSet([3, 4]);
      expect(a.isDisjoint(b)).toBe(false);
    });

    it("checks if A ⊆ B", () => {
      const a = new CustomSet([1, 2]);
      const b = new CustomSet([1, 2, 3]);
      expect(a.isSubset(b)).toBe(true);
    });

    it("checks if A ⊆ B is false", () => {
      const a = new CustomSet([1, 2, 3]);
      const b = new CustomSet([1, 2]);
      expect(a.isSubset(b)).toBe(false);
    });

    it("checks if A ⊇ B", () => {
      const a = new CustomSet([1, 2, 3]);
      const b = new CustomSet([1, 2]);
      expect(a.isSuperset(b)).toBe(true);
    });

    it("checks if A ⊇ B is false", () => {
      const a = new CustomSet([1, 2]);
      const b = new CustomSet([1, 2, 3]);
      expect(a.isSuperset(b)).toBe(false);
    });
  });
}
