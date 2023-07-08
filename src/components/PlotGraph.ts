import type { PlotOptions } from "@observablehq/plot";
import * as Plot from "@observablehq/plot";
import type { AllowedComponentProps, FunctionalComponent, PropType } from "vue";
import { h, withDirectives } from "vue";

// HACK: <PlotGraph class="foo" /> throws an error, so add
// "AllowedComponentProps" to the list to work around
// that.
const PlotGraph: FunctionalComponent<
  AllowedComponentProps & { options: PlotOptions }
> = (props) => {
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
