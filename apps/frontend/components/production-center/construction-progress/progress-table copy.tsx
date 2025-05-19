import React from "react";
import dayjs from "dayjs";
// import {
//   Updateprogress,
//   Deleteprogress,
// } from "@/components/project/progressData/buttons";
// import { fetchFilteredprogressData } from "@/lib/project/progress/data";
import { formatDecimal } from "@/utils/utils";
import { useFilteredProgress } from "@/hooks/useFilteredProgress";
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
import { ProgressEditDialog } from "./progress-edit-dialog";
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
            <thead className="rounded-lg  text-sm text-center font-extrabold">
              <tr>
                <th scope="col" className="px-4 py-1  sm:pl-6">
                  序号
                </th>
                <th scope="col" className="px-3 py-1 ">
                  日期
                </th>
                <th scope="col" className="px-3 py-1 ">
                  计划环数
                </th>
                <th scope="col" className="px-3 py-1 ">
                  开始桩号
                </th>
                <th scope="col" className="px-3 py-1 ">
                  结束桩号
                </th>
                <th scope="col" className="px-3 py-1 ">
                  掘进里程
                </th>
                <th scope="col" className="px-3 py-1 ">
                  开始环号
                </th>
                <th scope="col" className="px-3 py-1 ">
                  结束环号
                </th>

                <th scope="col" className="px-3 py-1 ">
                  掘进环数
                </th>
                <th scope="col" className="px-3 py-1 ">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white text-center">
              {progressData?.map((progress, index) => (
                <tr
                  key={progress.id}
                  className="w-full border-b py-1 text-lg last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-1 pl-2 pr-3">
                    <div className="">{index + 1}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {dayjs(progress.progress_at).format("YYYY年MM月DD日")}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {progress.plan_ring_count}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {progress.op_num_start ? progress.op_num_start : "-"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {progress.op_num_end ? progress.op_num_end : "-"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {progress.op_num_end != null &&
                    progress.op_num_start != null
                      ? formatDecimal(
                          Math.abs(progress.op_num_end - progress.op_num_start),
                          2
                        )
                      : "-"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {progress.ring_start ? progress.ring_start : "-"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {progress.ring_end ? progress.ring_end : "-"}
                  </td>

                  <td className="whitespace-nowrap px-3 py-1">
                    {progress.ring_end != null && progress.ring_start != null
                      ? formatDecimal(
                          Math.abs(progress.ring_end - progress.ring_start),
                          0
                        )
                      : "-"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    <ProgressEditDialog progress={progress} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
