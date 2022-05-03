import { strict as assert } from "assert";
import test from "node:test";

test("node v18 tests", (t) => {
  t.test("subtest 1", () => {
    assert.strictEqual(3, 1 + 2);
  });

  t.test("subtest 2", () => {
    const before = { name: "Bob", age: 24 };
    const after = { name: "Bob", age: 25 };
    try {
      assert.deepEqual(before, after);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      throw err;
    }
  });
});
