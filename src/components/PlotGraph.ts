import type { PlotOptions } from "@observablehq/plot";
import * as Plot from "@observablehq/plot";
import { h, type PropType, withDirectives } from "vue";

function PlotGraph(props: { options: PlotOptions }) {
  return withDirectives(h("div"), [
    [
      {
        mounted(el: HTMLDivElement) {
          el.append(Plot.plot(props.options));
        },
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
