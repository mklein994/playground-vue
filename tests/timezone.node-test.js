import test from "node:test";

import { strict as assert } from "node:assert";

test("Manitoba Standard Time", (ctx) => {
  ctx.test("Temporal", (t) => {
    const date = Temporal.ZonedDateTime.from(
      "2026-12-15T13:00:00[America/Winnipeg]",
    );
    t.test("offset", () => {
      assert.deepEqual(date.offset, "-05:00");
    });
    t.test("timeZoneName: short", () => {
      assert.deepEqual(
        new Intl.DateTimeFormat("en-CA", {
          timeZone: "America/Winnipeg",
          timeZoneName: "short",
        })
          .formatToParts(date.toInstant())
          .find((part) => part.type === "timeZoneName").value,
        "CDT",
      );
    });
    t.test("timeZoneName: shortOffset", () => {
      assert.deepEqual(
        new Intl.DateTimeFormat("en-CA", {
          timeZone: "America/Winnipeg",
          timeZoneName: "shortOffset",
        })
          .formatToParts(date.toInstant())
          .find((part) => part.type === "timeZoneName").value,
        "GMT-5",
      );
    });
    t.test("timeZoneName: long", () => {
      assert.deepEqual(
        new Intl.DateTimeFormat("en-CA", {
          timeZone: "America/Winnipeg",
          timeZoneName: "long",
        })
          .formatToParts(date.toInstant())
          .find((part) => part.type === "timeZoneName").value,
        "Central Daylight Time",
      );
    });
    t.test("timeZoneName: longOffset", () => {
      assert.deepEqual(
        new Intl.DateTimeFormat("en-CA", {
          timeZone: "America/Winnipeg",
          timeZoneName: "longOffset",
        })
          .formatToParts(date.toInstant())
          .find((part) => part.type === "timeZoneName").value,
        "GMT-05:00",
      );
    });
  });
});
