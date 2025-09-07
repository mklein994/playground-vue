import tailwindColors from "../vendor/tailwind.ts";

export default Object.fromEntries(
  Object.entries(tailwindColors)
    .filter(([_, group]) => typeof group !== "string")
    .map(([name, colors]) => [
      name,
      Object.fromEntries(
        Object.entries(colors).map(([k, v]) => [k, { $value: v }]),
      ),
    ]),
);
