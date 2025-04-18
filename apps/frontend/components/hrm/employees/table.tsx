import React from "react";
import { UpdateEmployee, DeleteEmployee } from "@/components/hrm/employees/buttons";
import { fetchFilteredEmployees } from "@/lib/hrm/data";

export default async function employeesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const employees= await fetchFilteredEmployees(query, currentPage);

  return (
    <div className="mt-6 flow-root">
    <div className="inline-block min-w-full align-middle">
      <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
        <table className="hidden min-w-full text-gray-900 md:table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                工号
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                姓名
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                部门
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                职务
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                电话
              </th>
              {/* <th scope="col" className="px-3 py-5 font-medium">
                邮件
              </th> */}
              <th scope="col" className="px-3 py-5 font-medium">
                性别
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                生日
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                籍贯
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                学历
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                政治面貌
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                用工类型
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                劳务派遣公司
              </th>
              <th scope="col" className="relative py-3 pl-6 pr-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {employees?.map((employee) => (
              <tr
                key={employee.id}
                className="w-full border-b py-3 text-lg last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <p>{employee.id}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {employee.fullName}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {employee.departmentName}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {employee.position}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {employee.phoneNumber}
                </td>
                {/* <td className="whitespace-nowrap px-3 py-3">
                  {employee.email}
                </td> */}
                <td className="whitespace-nowrap px-3 py-3">
                  {employee.gender}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {employee.birthdate}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {employee.birthplace}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {employee.educationLevel}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {employee.politicalStatus}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {employee.employmentType}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {employee.employerName}
                </td>
        
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
                    <UpdateEmployee id={employee.id} />
                     <DeleteEmployee id={employee.id} /> 
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
