// From esbuild: https://github.com/evanw/esbuild/blob/18e13bdfdca5cd3c7a2fae1a8bd739f8f891572c/internal/css_parser/css_decls_color.go#L218

// 0xAABBCCDD => 0xABCD
export function compactHex(v: number): number {
  return ((v & 0x0ff00000) >> 12) | ((v & 0x00000ff0) >> 4);
}

// 0xABCD => 0xAABBCCDD
export function expandHex(v: number): number {
  return (
    ((v & 0xf000) << 16)
    | ((v & 0xff00) << 12)
    | ((v & 0x0ff0) << 8)
    | ((v & 0x00ff) << 4)
    | (v & 0x000f)
  );
}

// These names are shorter than their hex codes
const shortNameMap = new Map([
  [0x000080, "navy"],
  [0x008000, "green"],
  [0x008080, "teal"],
  [0x4b0082, "indigo"],
  [0x800000, "maroon"],
  [0x800080, "purple"],
  [0x808000, "olive"],
  [0x808080, "gray"],
  [0xa0522d, "sienna"],
  [0xa52a2a, "brown"],
  [0xc0c0c0, "silver"],
  [0xcd853f, "peru"],
  [0xd2b48c, "tan"],
  [0xda70d6, "orchid"],
  [0xdda0dd, "plum"],
  [0xee82ee, "violet"],
  [0xf0e68c, "khaki"],
  [0xf0ffff, "azure"],
  [0xf5deb3, "wheat"],
  [0xf5f5dc, "beige"],
  [0xfa8072, "salmon"],
  [0xfaf0e6, "linen"],
  [0xff0000, "red"],
  [0xff6347, "tomato"],
  [0xff7f50, "coral"],
  [0xffa500, "orange"],
  [0xffc0cb, "pink"],
  [0xffd700, "gold"],
  [0xffe4c4, "bisque"],
  [0xfffafa, "snow"],
  [0xfffff0, "ivory"],
]);

export function shortColorName(v: number): string | undefined {
  return shortNameMap.get(v);
}

export type RecursiveObject = {
  [k: string]: string | RecursiveObject;
};

/**
 * Get a new object where {@link transform} was called on all children with the
 * key {@link keyName}.
 */
export function recursiveTransform(
  source: RecursiveObject,
  keyName: string,
  transform: (value: string) => string,
): RecursiveObject {
  const results: RecursiveObject = {};
  for (const key in source) {
    const value = source[key];
    if (key === keyName && typeof value === "string") {
      results[key] = transform(value);
    } else if (typeof value === "object" && value != null) {
      results[key] = recursiveTransform(value, keyName, transform);
    } else {
      results[key] = value;
    }
  }

  return results;
}
