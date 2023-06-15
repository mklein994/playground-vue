export interface KeyItem {
  display: string;
  class: "false" | "true";
  value: boolean;
}

export interface KeyItemWithNulls {
  display: string;
  class: "null" | "false" | "true";
  value: true | false | null;
}
