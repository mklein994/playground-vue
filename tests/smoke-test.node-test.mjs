import { strict as assert } from "assert";
import test from "node:test";

test("node v18 tests", async (t) => {
  await t.test("subtest 1", () => {
    assert.strictEqual(3, 1 + 2);
  });

  await t.test("subtest 2", () => {
    const before = { name: "Bob", age: 24 };
    const after = { name: "Bob", age: 25 };
    assert.deepEqual(before, after);
  });
});
