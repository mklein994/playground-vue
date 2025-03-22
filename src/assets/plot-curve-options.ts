import type { CurveName } from "@observablehq/plot";

export interface CurveOption {
  id: CurveName | "auto";
  description: string;
  version?: string;
  hasTension?: true;
}

// See also: https://observablehq.com/plot/features/curves
export const curves: CurveOption[] = [
  {
    id: "auto",
    description:
      "like linear, but use the (possibly spherical) projection, if any",
    version: "^0.6.1",
  },
  {
    id: "basis",
    description: "a cubic basis spline (repeating the end points)",
  },
  { id: "basis-closed", description: "a closed cubic basis spline" },
  { id: "basis-open", description: "an open cubic basis spline" },
  { id: "bump-x", description: "a Bézier curve with horizontal tangents" },
  { id: "bump-y", description: "a Bézier curve with vertical tangents" },
  {
    id: "bundle",
    description:
      "a straightened cubic basis spline (suitable for lines only, not areas)",
    hasTension: true,
  },
  {
    id: "cardinal",
    description:
      "a cubic cardinal spline (with one-sided differences at the ends)",
    hasTension: true,
  },
  {
    id: "cardinal-closed",
    description: "an closed cubic cardinal spline",
    hasTension: true,
  },
  {
    id: "cardinal-open",
    description: "an open cubic cardinal spline",
    hasTension: true,
  },
  {
    id: "catmull-rom",
    description:
      "a cubic Catmull–Rom spline (with one-sided differences at the ends)",
    hasTension: true,
  },
  {
    id: "catmull-rom-closed",
    description: "a closed cubic Catmull–Rom spline",
    hasTension: true,
  },
  {
    id: "catmull-rom-open",
    description: "an open cubic Catmull–Rom spline",
    hasTension: true,
  },
  {
    id: "linear",
    description: "a piecewise linear curve (i.e., straight line segments)",
  },
  {
    id: "linear-closed",
    description:
      "a closed piecewise linear curve (i.e., straight line segments)",
  },
  {
    id: "monotone-x",
    description: "a cubic spline that preserves monotonicity in x",
  },
  {
    id: "monotone-y",
    description: "a cubic spline that preserves monotonicity in y",
  },
  { id: "natural", description: "a natural cubic spline" },
  {
    id: "step",
    description:
      "a piecewise constant function where y changes at the midpoint of x",
  },
  {
    id: "step-after",
    description: "a piecewise constant function where y changes after x",
  },
  {
    id: "step-before",
    description: "a piecewise constant function where x changes after y",
  },
];
