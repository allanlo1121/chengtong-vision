import { format } from "date-fns";

import { DateString } from "./types/date.types";

export function toDateString(date: Date): DateString {
  return format(date, "yyyy-MM-dd") as DateString;
}

export function parseDateString(value: string): DateString {
  return value as DateString;
}
