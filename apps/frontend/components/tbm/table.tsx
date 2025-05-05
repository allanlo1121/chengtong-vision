import React from "react";

import { ITbmWorkInfo } from "@/lib/tbm/types";
import { fetchActivatedTbms } from "@/lib/tbm/data";

export default async function Table() {
  const tbms: ITbmWorkInfo[] = await fetchActivatedTbms();
  // console.log("tbms", tbms);

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
                  盾构机名称
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  盾构机类型
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
              </tr>
            </thead>
            <tbody className="bg-white">
              {tbms?.map((tbm, index) => (
                <tr
                  key={tbm.id}
                  className="w-full border-b py-1 text-lg last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-1 pl-6 pr-3">
                    <div className="flex items-center gap-3">{index + 1}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">{tbm.name}</td>
                  <td className="whitespace-nowrap px-3 py-1">{tbm.type}</td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {tbm.regionName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {tbm.subprojectShortName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {tbm.projectShortName}
                  </td>
                  <td className="whitespace-nowrap py-1 pl-6 pr-3"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
