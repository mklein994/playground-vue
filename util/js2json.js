#!/bin/env node
import { resolve } from "path";

try {
  const validCompactArgs =
    (process.argv.includes("--compact") || process.argv.includes("-c"))
    && process.argv.length === 4;
  const validArgs = process.argv.length === 3;
  if (!(validCompactArgs || validArgs)) {
    console.error(
      `Invalid arg count (${process.argv.length}): ${JSON.stringify(process.argv)}`,
    );
    process.exit(1);
  }

  const compact =
    process.argv.includes("--compact") || process.argv.includes("-c");
  const inputFilePath = process.argv.at(-1);

  if (!inputFilePath) {
    throw new Error("Please provide an input file path");
  }

  const inputFile = resolve(process.cwd(), inputFilePath);

  const mod = await import(inputFile);

  const jsonOutput = JSON.stringify(mod.default, null, compact ? 0 : 2);
  process.stdout.write(jsonOutput + (compact ? "" : "\n"));
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1);
}

// vim:ft=js ts=2 sts=2 sw=2 et
