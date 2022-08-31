export const extractNameAndPath = (
  path: string,
  options?: { splitNumbers?: boolean; stripSuffix?: string | RegExp }
) => {
  const re = options?.splitNumbers ? /\B([A-Z0-9])/g : /\B([A-Z])/g;
  const suffix = options?.stripSuffix ?? "";

  const basename =
    // import.meta.glob and import.meta.globEager will always show paths that
    // contain a slash, since they are "absolute", i.e. relative to the project
    // root (location of vite.config.js).
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    path.split("/").pop()!.slice(0, -".vue".length);
  const kebabCase = basename
    .replace(re, "-$1")
    .toLowerCase()
    .replace(suffix, "");
  const wordCase = kebabCase.replace(/-/g, " ");

  return { wordCase, kebabCase };
};
