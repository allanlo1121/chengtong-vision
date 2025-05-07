import { useMemo } from "react";
import { isWithinInterval } from "date-fns";
import { DateRange } from "react-day-picker";
import { ITunnelProgressData } from "@/lib/project/progress/types";

export function useFilteredProgress(
  data: ITunnelProgressData[] | undefined,
  range: DateRange | undefined
): ITunnelProgressData[] {
  return useMemo(() => {
    if (!data || !range?.from || !range?.to) return [];

    const { from, to } = range;

    return data.filter((item) => {
      const progressDate = new Date(item.progress_at);
      return isWithinInterval(progressDate, { start: from, end: to });
    });
  }, [data, range]);
}
