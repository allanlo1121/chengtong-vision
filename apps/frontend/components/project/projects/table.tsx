import React from "react";
import {
  UpdateProject,
  DeleteProject,
} from "@/components/project/projects/buttons";
import { fetchFilteredProjects } from "@/lib/project/data";
import { IProject, ISubProjectBasic } from "@/lib/project/types";

export default async function projectsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const projects: IProject[] = await fetchFilteredProjects(query, currentPage);

  console.log("projectsTable", projects); // 打印总记录数

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium sm:pl-6">
                  序号
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  工程简称
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  所在片区
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  工程地址
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  子工程
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  合约造价
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  合约开工日期
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  合约竣工日期
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  项目负责人
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  项目状态
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {projects?.map((project, index) => (
                <tr
                  key={project.id}
                  className="w-full border-b py-3 text-lg last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">{index + 1}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {project.shortName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {project.regionName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {project.addressName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {project.subProjects.map((sp: ISubProjectBasic) => (
                      <div key={sp.id} className="flex items-center gap-3">
                        {sp.shortName} /{sp.status}
                      </div>
                    ))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {project.constructionCosts}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {project.contractStartDate}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {project.contractEndDate}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {project.leader}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {project.status}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateProject id={project.id} />
                      <DeleteProject id={project.id} />
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
