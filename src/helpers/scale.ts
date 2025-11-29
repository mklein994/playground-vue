export const scale = (
  n: number,
  min_i: number,
  max_i: number,
  min_f: number,
  max_f: number,
) => ((n - min_i) / (max_i - min_i)) * (max_f - min_f) + min_f;
