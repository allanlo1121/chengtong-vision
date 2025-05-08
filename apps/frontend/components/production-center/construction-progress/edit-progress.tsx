"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { useFilteredProgress } from "@/hooks/useFilteredProgress";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import ProgressTable from "./progress-table";
import { ITunnelProgressData } from "@/lib/project/progress/types";

export default function EditProgressForm({
  progressData,
}: {
  progressData: ITunnelProgressData[];
  // progressData: IProgressForm;
}) {
  const yesterday = subDays(new Date(), 1);
  const from = subDays(yesterday, 30);
  const [range, setRange] = useState<DateRange | undefined>({
    from,
    to: yesterday,
  });

  const filtered: ITunnelProgressData[] = useFilteredProgress(
    progressData,
    range
  );
 // console.log("progressData", progressData);
 // console.log("filtered", filtered);

  return (
    <div className="space-y-4">
      <DatePickerWithRange value={range} onChange={setRange} />
      <ProgressTable progressData={filtered} />
    </div>
  );
}
