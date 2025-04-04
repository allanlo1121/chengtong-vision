import React from "react";
import { UpdateDepartment,DeleteDepartment } from "@/components/hrm/departments/buttons";
import { DepartmentsTableType } from "@/lib/hrm/definitions";
import { fetchFilteredDepartments } from "@/lib/hrm/data";

export default async function DepartmentsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const departments= await fetchFilteredDepartments(query, currentPage);

  return (
    <div className="mt-6 flow-root">
    <div className="inline-block min-w-full align-middle">
      <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
        {/* <div className="md:hidden">
          {departments?.map((department) => (
            <div
              key={department.id}
              className="mb-2 w-full rounded-md bg-white p-4"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <div className="mb-2 flex items-center">
                    <Image
                      src={department.image_url}
                      className="mr-2 rounded-full"
                      width={28}
                      height={28}
                      alt={`${department.name}'s profile picture`}
                    />
                    <p>{department.name}</p>
                  </div>
                  <p className="text-sm text-gray-500">{department.email}</p>
                </div>
                <departmentStatus status={department.status} />
              </div>
              <div className="flex w-full items-center justify-between pt-4">
                <div>
                  <p className="text-xl font-medium">
                    {formatCurrency(department.amount)}
                  </p>
                  <p>{formatDateToLocal(department.date)}</p>
                </div>
                <div className="flex justify-end gap-2">
                  <Updatedepartment id={department.id} />
                  <DeleteDepartment id={department.id} />
                </div>
              </div>
            </div>
          ))}
        </div> */}
        <table className="hidden min-w-full text-gray-900 md:table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                部门ID
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                部门名称
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                部门负责人
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                部门人数
              </th>
              <th scope="col" className="relative py-3 pl-6 pr-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {departments?.map((department) => (
              <tr
                key={department.id}
                className="w-full border-b py-3 text-lg last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <p>{department.id}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {department.departmentName}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {department.managerName}
                </td>
                {/* <td className="whitespace-nowrap px-3 py-3">
                  {department.employees}
                </td> */}
        
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
                     <UpdateDepartment id={department.id} />
                    <DeleteDepartment id={department.id} /> 
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
