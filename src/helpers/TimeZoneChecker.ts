export interface TimeZoneChecker {
  hasCorrectOffset(): boolean;

  formatShort(): string;
  formatShortOffset(): string;
  formatLong(): string;
  formatLongOffset(): string;
  toString(): string;
}

export class TemporalTimeZoneChecker implements TimeZoneChecker {
  private date: Temporal.ZonedDateTime;

  constructor() {
    const dateString = "2026-12-15T13:00:00[America/Winnipeg]";
    this.date = Temporal.ZonedDateTime.from(dateString);
  }

  hasCorrectOffset(): boolean {
    return this.date.offset === "-05:00";
  }

  format(timeZoneName: Intl.DateTimeFormatOptions["timeZoneName"]): string {
    return this.date.toLocaleString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName,
    });
  }

  formatShort(): string {
    return this.format("short");
  }

  formatShortOffset(): string {
    return this.format("shortOffset");
  }

  formatLong(): string {
    return this.format("long");
  }

  formatLongOffset(): string {
    return this.format("longOffset");
  }

  toString(): string {
    return this.date.toString();
  }
}

export class DateTimeZoneChecker implements TimeZoneChecker {
  private date: Date;

  constructor() {
    const dateString = "2026-12-15T18:00:00Z";
    this.date = new Date(dateString);
  }

  format(timeZoneName: Intl.DateTimeFormatOptions["timeZoneName"]): string {
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "America/Winnipeg",
      timeZoneName,
    }).format(this.date);
  }

  hasCorrectOffset(): boolean {
    const actualOffset = new Intl.DateTimeFormat("en-CA", {
      timeZoneName: "longOffset",
    })
      .formatToParts(this.date)
      .find((part) => part.type === "timeZoneName")?.value;
    return actualOffset === "GMT-05:00";
  }

  formatShort(): string {
    return this.format("short");
  }

  formatShortOffset(): string {
    return this.format("shortOffset");
  }

  formatLong(): string {
    return this.format("long");
  }

  formatLongOffset(): string {
    return this.format("longOffset");
  }

  toString(): string {
    return this.date.toString();
  }
}
