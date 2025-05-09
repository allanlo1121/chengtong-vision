import React from "react";
import {
  UpdateTunnel,
  DeleteTunnel,
} from "@/components/resource-center/tunnel/buttons";
import { fetchFilteredTunnels } from "@/lib/project/tunnel/data";
import { formatDecimal } from "@/utils/utils";
import dayjs from "dayjs";
import { ITunnelBasic } from "@/lib/project/tunnel/types";
import {ProjectStatusLabels} from "@/lib/project/types";
export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const tunnels:ITunnelBasic[] = await fetchFilteredTunnels(query, currentPage);
  // console.log("tunnels", tunnels);

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
                  区间简称
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  所在片区
                </th>                
                <th scope="col" className="px-3 py-1 font-medium">
                  所在项目
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  盾构机
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  工况
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  起始环号
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  结束环号
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  起始桩号
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  结束桩号
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  计划始发日期
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  计划贯通日期
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  实际始发日期
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  实际贯通日期
                </th>
                <th scope="col" className="px-3 py-1 font-medium">
                  施工状态
                </th>
                <th className="px-3 py-1 text-center font-medium">
                  操作
                  </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tunnels?.map((tunnel, index) => (
                <tr
                  key={tunnel.id}
                  className="w-full border-b py-1 text-lg last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-1 pl-6 pr-3">
                    <div className="flex items-center gap-3">{index + 1}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {tunnel.shortName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {tunnel.regionName}
                  </td>                 
                  <td className="whitespace-nowrap px-3 py-1">
                    {tunnel.projectShortName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    { tunnel.tbmName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    { tunnel.wtype}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {tunnel.ringStart}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {tunnel.ringEnd}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1 text-right">
                    {formatDecimal(tunnel.opNumStart)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1 text-right">
                    {formatDecimal(tunnel.opNumEnd)}
                  </td>                 
                  <td className="whitespace-nowrap px-3 py-1">
                    {dayjs(tunnel.planLaunchDate).format("YYYY年MM月DD日")}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {dayjs(tunnel.planBreakthroughDate).format("YYYY年MM月DD日")}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {dayjs(tunnel.actualLaunchDate).format("YYYY年MM月DD日")}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {dayjs(tunnel.actualBreakthroughDate).format("YYYY年MM月DD日")}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1">
                    {ProjectStatusLabels[tunnel.status]}
                  </td>
                  <td className="whitespace-nowrap py-1 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateTunnel id={tunnel.id} />
                      <DeleteTunnel id={tunnel.id} />
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
