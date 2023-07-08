import * as d3 from "d3";

export const toColor = ([r, g, b, opacity]: number[]) => {
  return `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${opacity})`;
};

export const useColorMap = () => {
  const scale = d3.scaleLinear().domain([0, 255]).range([0, 1]);
  const colors: number[][] = [];
  for (let i = 0; i < 256; i++) {
    const { r, g, b, opacity } = d3.rgb(d3.interpolateMagma(scale(i)));
    colors.push([...[r, g, b].map((x) => Number(x) / 255), opacity]);
  }
  return {
    colors,
  };
};
