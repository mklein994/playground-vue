import { ref } from "vue";

const spacingOptions = [
  { id: "none", label: "None" },
  {
    id: "between-units-and-designators",
    label: "Between Units and Designators",
  },
  { id: "between-units", label: "Between Units" },
] as const;

const designatorOptions = [
  { id: "short", label: "Short" },
  { id: "compact", label: "Compact" },
  { id: "verbose", label: "Verbose" },
  { id: "human-time", label: "Human Time compatible" },
] as const;

const fractionalUnitOptions = [
  { id: "", label: "None" },
  { id: "hour", label: "Hour" },
  { id: "minute", label: "Minute" },
  { id: "second", label: "Second" },
  { id: "millisecond", label: "Millisecond" },
  { id: "microsecond", label: "Microsecond" },
] as const;

const zeroUnitOptions = [
  { id: "year", label: "Year" },
  { id: "month", label: "Month" },
  { id: "week", label: "Week" },
  { id: "day", label: "Day" },
  { id: "hour", label: "Hour" },
  { id: "minute", label: "Minute" },
  { id: "second", label: "Second" },
  { id: "millisecond", label: "Millisecond" },
  { id: "microsecond", label: "Microsecond" },
  { id: "nanosecond", label: "Nanosecond" },
] as const;

const directionOptions = [
  { id: "auto", label: "Auto" },
  { id: "sign", label: "Sign" },
  { id: "suffix", label: "Suffix" },
  { id: "force-sign", label: "Force Sign" },
] as const;

export interface DateDiffOptions {
  spacing: typeof spacingOptions;
  designators: typeof designatorOptions;
  fractionalUnits: typeof fractionalUnitOptions;
  zeroUnits: typeof zeroUnitOptions;
  directions: typeof directionOptions;
}

type OptionId<K extends keyof DateDiffOptions> =
  DateDiffOptions[K][number]["id"];
type SpacingId = OptionId<"spacing">;
type DesignatorId = OptionId<"designators">;
type FractionalUnitId = OptionId<"fractionalUnits">;
type ZeroUnitId = OptionId<"zeroUnits">;
type DirectionId = OptionId<"directions">;

export interface DateDiffForm {
  spacing: SpacingId;
  designator: DesignatorId;
  fractionalUnit: FractionalUnitId;
  commaAfterDesignator: boolean;
  hoursMinutesSeconds: boolean;
  padding: number;
  zeroUnit: ZeroUnitId;
  direction: DirectionId;
}

export const useDateDiffOptions = () => {
  const availableOptions: DateDiffOptions = {
    spacing: spacingOptions,
    designators: designatorOptions,
    fractionalUnits: fractionalUnitOptions,
    zeroUnits: zeroUnitOptions,
    directions: directionOptions,
  };

  const optionsForm = ref<DateDiffForm>({
    spacing: "between-units-and-designators",
    designator: "verbose",
    fractionalUnit: "",
    commaAfterDesignator: true,
    hoursMinutesSeconds: false,
    zeroUnit: "second",
    padding: 0,
    direction: "auto",
  });

  return {
    availableOptions,
    optionsForm,
  };
};
