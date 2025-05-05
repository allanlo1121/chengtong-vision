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
} from "@/lib/hrm/definitions";
import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/hrm/ui/form-input";
import { useActionState } from "react";
import FormSelect from "@/components/hrm/ui/form-select";
import { createEmployee, State } from "@/lib/hrm/emp-actions";

export default function Form({
  departments,
  employmentTypes,
  employers,
}: {
  departments: Department[];
  employmentTypes: EmploymentType[];
  employers: Employer[];
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createEmployee, initialState);
  console.log("state:", state);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* employee Name */}
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="lastName"
            name="lastName"
            label="姓氏"
            type="text"
            placeholder="输入姓氏"
            errors={state.errors?.lastName || []}
            IconComponent={UserCircleIcon}
          />
          <FormInput
            id="firstName"
            name="firstName"
            label="名字"
            type="text"
            placeholder="输入名字"
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
            defaultValue=""
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
            defaultValue={new Date("1990-01-01").toISOString().split("T")[0]}
            placeholder="输入出生日期"
            IconComponent={CurrencyDollarIcon}
          />
          {/* 出生地 */}
          <FormInput
            id="birthplace"
            name="birthplace"
            label="出生地"
            type="text"
            defaultValue="四川成都"
            placeholder="输入出生地"
            IconComponent={CurrencyDollarIcon}
          />
          {/*ethnicity */}
          <FormInput
            id="ethnicity"
            name="ethnicity"
            label="民族"
            type="text"
            defaultValue="汉"
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
            errors={state.errors?.phoneNumber|| []}
            IconComponent={CurrencyDollarIcon}
          />

          {/* Email */}
          <FormInput
            id="email"
            name="email"
            label="电子邮件"
            type="email"
            defaultValue="123@xxx.com"
            placeholder="输入电子邮件"
            IconComponent={CurrencyDollarIcon}
          />
        </div>

        {/* Department */}
        <FormSelect
          id="department"
          name="department"
          label="部门"
          options={departments.map((dep) => ({
            value: dep.id.toString(),
            label: dep.departmentName,
          }))}
          IconComponent={CurrencyDollarIcon}
        />
        <div className="grid grid-cols-2 gap-4">
          {/* Position */}
          <FormInput
            id="position"
            name="position"
            label="职位"
            type="text"
            defaultValue="职员"
            placeholder="输入职位"
            IconComponent={CurrencyDollarIcon}
          />
          {/* Position Level */}
          <FormInput
            id="positionLevel"
            name="positionLevel"
            label="职级"
            type="number"
            placeholder="输入职级"
            defaultValue="0"
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
            defaultValue="工程师"
            placeholder="输入职称"
            IconComponent={CurrencyDollarIcon}
          />
          {/* Technical Title */}
          <FormInput
            id="technicalTitle"
            name="technicalTitle"
            label="技术职称"
            type="text"
            defaultValue="技师"
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
            defaultValue={new Date("1990-1-1").toISOString().split("T")[0]}
            placeholder="输入入职日期"
            IconComponent={CurrencyDollarIcon}
          />

          {/* Transfer In Date */}
          <FormInput
            id="transferInDate"
            name="transferInDate"
            label="调入日期"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            placeholder="输入调入日期"
            IconComponent={CurrencyDollarIcon}
          />

          {/* Transfer Out Date */}
          <FormInput
            id="transferOutDate"
            name="transferOutDate"
            label="调出日期"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
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
            defaultValue={EducationLevel.Other}
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
            defaultValue={PoliticalStatus.Other}
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
              label: type.employmentTypeName || "",
            }))}
            showPlaceholder={false}
            IconComponent={CurrencyDollarIcon}
          />

          {/* 雇佣公司 */}

          <FormSelect
            id="employerId"
            name="employerId"
            label="雇佣公司"
            options={employers.map((employer) => ({
              value: employer.id.toString(),
              label: employer.shortName || "",
            }))}
            showPlaceholder={false}
            IconComponent={CurrencyDollarIcon}
          />
        </div>
        {/* Notes */}
        <FormInput
          id="notes"
          name="notes"
          label="备注"
          type="text"
          defaultValue=""
          placeholder="输入备注"
          IconComponent={CurrencyDollarIcon}
        />
        {/* Image_url */}
        <FormInput
          id="avatar"
          name="avatar"
          label="头像"
          type="text"
          defaultValue=""
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
