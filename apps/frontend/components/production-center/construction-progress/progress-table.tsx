import React from "react";
// import {
//   Updateprogress,
//   Deleteprogress,
// } from "@/components/project/progressData/buttons";
// import { fetchFilteredprogressData } from "@/lib/project/progress/data";
import { formatDecimal } from "@/utils/utils";
import { useFilteredProgress, ProgressData } from "@/hooks/useFilteredProgress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {ProgressEditDialog}  from "./progress-edit-row";
import { ITunnelProgressData } from "@/lib/project/progress/types";

export default function ProgressTable({
  progressData,
}: {
  progressData: ITunnelProgressData[] | undefined;
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-1 font-medium sm:pl-6">
                  序号
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  日期
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  开始桩号
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  结束桩号
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  掘进里程
                </th>
               
                <th scope="col" className="px-3 py-1 font-medium">
                  开始环号
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  结束环号
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  计划环数
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  掘进环数
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {progressData?.map((progress, index) => (
                <tr
                  key={progress.id}
                  className="w-full border-b py-1 text-lg last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-1 pl-6 pr-3">
                    <div className="flex items-center gap-3">{index + 1}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {progress.progress_at}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {progress.op_num_start}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {progress.op_num_end}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {formatDecimal(
                      Math.abs(progress.op_num_end - progress.op_num_start),
                      2
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {progress.ring_start}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {progress.ring_end}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {progress.plan_ring_count}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {progress.ring_end - progress.ring_start}
                  </td>
                  {/* <ProgressEditRow progress={progress} /> */}
                  <ProgressEditDialog progress={progress} />

                  {/* <td className="whitespace-nowrap py-1 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <Updateprogress id={progress.id} />
                      <Deleteprogress id={progress.id} />
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
