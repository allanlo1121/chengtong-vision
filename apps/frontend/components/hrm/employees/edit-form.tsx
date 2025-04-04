"use client";

import {
  ManagerField,
  Department,
  Employee,
  Gender,
  EducationLevel,
  PoliticalStatus,
  EmploymentType,
  Employer,
  IEmployee,
  IEmployeeForm,
} from "@/lib/hrm/definitions";
import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/hrm/ui/form-input";
import { useActionState, useState } from "react";
import FormSelect from "@/components/hrm/ui/form-select";
import { updateEmployee, State } from "@/lib/hrm/emp-actions";

export default function EditEmployeeForm({
  employee,
  departments,
  employmentTypes,
  employers,
}: {
  employee: IEmployeeForm;
  departments: Department[];
  employmentTypes: EmploymentType[];
  employers: Employer[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateEmployeeWithId = updateEmployee.bind(null, employee.id);
  const [state, formAction] = useActionState(
    updateEmployeeWithId,
    initialState
  );
  console.log("state", state);


  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <input type="hidden" name="id" value={employee.id} />
        {/* employee Name */}
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="lastName"
            name="lastName"
            label="姓氏"
            type="text"
            placeholder="输入姓氏"
            defaultValue={employee.lastName}
            errors={state.errors?.lastName || []}
            IconComponent={UserCircleIcon}
          />
          <FormInput
            id="firstName"
            name="firstName"
            label="名字"
            type="text"
            placeholder="输入名字"
            defaultValue={employee.firstName}
            errors={state.errors?.firstName || []}
            IconComponent={UserCircleIcon}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* 身份信息*/}
          <FormInput
            id="idCardNumber"
            name="idCardNumber"
            label="身份证号码"
            type="text"
            placeholder="输入身份证号码"
            defaultValue={employee.idCardNumber}
            IconComponent={CurrencyDollarIcon}
          />

          <FormSelect
            id="gender"
            name="gender"
            label="性别"
            options={[
              ...Object.entries(Gender).map(([key, value]) => ({
                value: value,
                label: value,
              })),
            ]}
            defaultValue={employee.gender}
            showPlaceholder={false}
            IconComponent={CurrencyDollarIcon}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {/* 出生日期 */}
          <FormInput
            id="birthdate"
            name="birthdate"
            label="出生日期"
            type="date"
            defaultValue={employee.birthdate}
            placeholder="输入出生日期"
            IconComponent={CurrencyDollarIcon}
          />
          {/* 出生地 */}
          <FormInput
            id="birthplace"
            name="birthplace"
            label="出生地"
            type="text"
            defaultValue={employee.birthplace}
            placeholder="输入出生地"
            IconComponent={CurrencyDollarIcon}
          />
          {/*ethnicity */}
          <FormInput
            id="ethnicity"
            name="ethnicity"
            label="民族"
            type="text"
            defaultValue={employee.ethnicity}
            placeholder="输入民族"
            IconComponent={CurrencyDollarIcon}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Phone Number */}
          <FormInput
            id="phoneNumber"
            name="phoneNumber"
            label="电话号码"
            type="text"
            placeholder="输入电话号码"
            defaultValue={employee.phoneNumber}
            errors={state.errors?.phoneNumber || []}
            IconComponent={CurrencyDollarIcon}
          />

          {/* Email */}
          <FormInput
            id="email"
            name="email"
            label="电子邮件"
            type="email"
            defaultValue={employee.email}
            placeholder="输入电子邮件"
            errors={state.errors?.email || []}
            IconComponent={CurrencyDollarIcon}
          />
        </div>

        {/* Department */}
        <FormSelect
          id="departmentId"
          name="departmentId"
          label="部门"
          options={departments.map((dep) => ({
            value: dep.id.toString(),
            label: dep.departmentName,
          }))}
          defaultValue={employee.departmentId?.toString()}
          IconComponent={CurrencyDollarIcon}
        />
        <div className="grid grid-cols-2 gap-4">
          {/* Position */}
          <FormInput
            id="position"
            name="position"
            label="职位"
            type="text"
            defaultValue={employee.position}
            placeholder="输入职位"
            IconComponent={CurrencyDollarIcon}
          />
          {/* Position Level */}
          <FormInput
            id="positionLevel"
            name="positionLevel"
            label="职级"
            type="text"
            placeholder="输入职级"
            defaultValue={employee.positionLevel}
            IconComponent={CurrencyDollarIcon}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Professional Title */}
          <FormInput
            id="professionalTitle"
            name="professionalTitle"
            label="职称"
            type="text"
            defaultValue={employee.professionalTitle}
            placeholder="输入职称"
            IconComponent={CurrencyDollarIcon}
          />
          {/* Technical Title */}
          <FormInput
            id="technicalTitle"
            name="technicalTitle"
            label="技术职称"
            type="text"
            defaultValue={employee.technicalTitle}
            placeholder="输入技术职称"
            IconComponent={CurrencyDollarIcon}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {/* Start Work Date */}
          <FormInput
            id="startWorkDate"
            name="startWorkDate"
            label="入职日期"
            type="date"
            defaultValue={employee.startWorkDate}
            placeholder="输入入职日期"
            IconComponent={CurrencyDollarIcon}
          />

          {/* Transfer In Date */}
          <FormInput
            id="transferInDate"
            name="transferInDate"
            label="调入日期"
            type="date"
            defaultValue={employee.transferInDate}
            placeholder="输入调入日期"
            IconComponent={CurrencyDollarIcon}
          />

          {/* Transfer Out Date */}
          <FormInput
            id="transferOutDate"
            name="transferOutDate"
            label="调出日期"
            type="date"
            defaultValue={employee.transferOutDate}
            placeholder="输入调出日期"
            IconComponent={CurrencyDollarIcon}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Education Level */}
          <FormSelect
            id="educationLevel"
            name="educationLevel"
            label="学历"
            options={[
              ...Object.entries(EducationLevel).map(([key, value]) => ({
                value,
                label: value,
              })),
            ]}
            showPlaceholder={false}
            defaultValue={employee.educationLevel}
          />

          {/* Political Status */}
          <FormSelect
            id="politicalStatus"
            name="politicalStatus"
            label="政治面貌"
            options={[
              ...Object.entries(PoliticalStatus).map(([key, value]) => ({
                value,
                label: value,
              })),
            ]}
            defaultValue={employee.politicalStatus}
            showPlaceholder={false}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* 用工形式选择 */}
          <FormSelect
            id="employmentType"
            name="employmentTypeId"
            label="用工形式"
            options={employmentTypes.map((type) => ({
              value: type.id.toString(),
              label: type.employmentTypeName|| "",
            }))}
            defaultValue={employee.employmentTypeId?.toString()}
            showPlaceholder={false}
            IconComponent={CurrencyDollarIcon}
          />

          {/* 雇佣公司选择 */}        
            <FormSelect
              id="employerId"
              name="employerId"
              label="合同公司"
              options={employers.map((employer) => ({
                value: employer.id.toString(),
                label: employer.shortName || "",
              }))}
              showPlaceholder={false}
              defaultValue={employee.employerId?.toString()}
              IconComponent={CurrencyDollarIcon}
            />
         
        </div>
        {/* Notes */}
        <FormInput
          id="notes"
          name="notes"
          label="备注"
          type="text"
          defaultValue={employee.notes}
          placeholder="输入备注"
          IconComponent={CurrencyDollarIcon}
        />
        {/* Image_url */}
        <FormInput
          id="avatar"
          name="avatar"
          label="头像"
          type="text"
          defaultValue={employee.avatar}
          placeholder="输入头像"
          IconComponent={CurrencyDollarIcon}
        />

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/hrm/employees"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            取消
          </Link>
          <Button type="submit">提交</Button>
        </div>
      </div>
    </form>
  );
}
