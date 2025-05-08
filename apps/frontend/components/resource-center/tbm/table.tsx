import React from "react";
import { UpdateTbm, DeleteTbm } from "./buttons";
import { fetchFilteredTbms } from "@/lib/tbm/data";

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const tbms = await fetchFilteredTbms(query, currentPage);
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
                  盾构机
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  盾构类型
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  直径
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  管片外径
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  生产日期
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  拥有者
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  适应地质
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  备注
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
                    {tbm.diameter}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {tbm.segmentOuter}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {tbm.productionDate}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">{tbm.owner}</td>
                  <td className="whitespace-nowrap px-3 py-1">{tbm.geo}</td>
                  <td className="whitespace-nowrap px-3 py-1">{tbm.remark}</td>

                  <td className="whitespace-nowrap py-1 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateTbm id={tbm.id} />
                      <DeleteTbm id={tbm.id} />
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
