import React from "react";
import {
  UpdateSubproject,
  DeleteSubproject,
} from "@/components/project/subprojects/buttons";
import { fetchFilteredSubprojects } from "@/lib/project/subproject/data";
import { formatDecimal } from "@/utils/utils";

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const subprojects = await fetchFilteredSubprojects(query, currentPage);
  // console.log("subprojects", subprojects);

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
                  所在片区
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  区间简称
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  所在项目
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  总长度
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  总环数
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  盾构机名称
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  始发日期
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  贯通日期
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  施工状态
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {subprojects?.map((subproject, index) => (
                <tr
                  key={subproject.id}
                  className="w-full border-b py-1 text-lg last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-1 pl-6 pr-3">
                    <div className="flex items-center gap-3">{index + 1}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {subproject.regionName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {subproject.shortName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {subproject.projectShortName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {formatDecimal(
                      Math.abs(subproject.opNumEnd - subproject.opNumStart),
                      2
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {subproject.ringEnd}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {subproject.tbmName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {subproject.startDate}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {subproject.endDate}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {subproject.status}
                  </td>
                  <td className="whitespace-nowrap py-1 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateSubproject id={subproject.id} />
                      <DeleteSubproject id={subproject.id} />
                    </div>
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
