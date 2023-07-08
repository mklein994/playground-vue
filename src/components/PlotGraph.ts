import type { PlotOptions } from "@observablehq/plot";
import * as Plot from "@observablehq/plot";
import { h, type PropType, withDirectives } from "vue";

function PlotGraph(props: { options: PlotOptions }) {
  const replace = (el: HTMLDivElement) => {
    const plot = Plot.plot(props.options);
    return el.firstChild ? el.firstChild.replaceWith(plot) : el.append(plot);
  };
  return withDirectives(h("div"), [
    [
      {
        mounted: replace,
        updated: replace,
      },
    ],
  ]);
}

PlotGraph.props = {
  options: {
    type: Object as PropType<PlotOptions>,
    required: true,
  },
};

export default PlotGraph;
