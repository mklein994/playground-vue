import type { PlotOptions } from "@observablehq/plot";
import * as Plot from "@observablehq/plot";
import type { FunctionalComponent, PropType } from "vue";
import { h, withDirectives } from "vue";

const PlotGraph: FunctionalComponent<{ options: PlotOptions }> = (props) => {
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
};

PlotGraph.props = {
  options: {
    type: Object as PropType<PlotOptions>,
    required: true,
  },
};

export default PlotGraph;
