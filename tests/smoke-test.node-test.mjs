import test from "node:test";

import { strict as assert } from "assert";

test("node tests", async (t) => {
  await t.test("subtest 1", () => {
    assert.strictEqual(3, 1 + 2);
  });

  await t.test("subtest 2", { skip: true }, () => {
    const before = { name: "Bob", age: 24 };
    const after = { name: "Bob", age: 25 };
    assert.deepEqual(before, after);
  });
});
