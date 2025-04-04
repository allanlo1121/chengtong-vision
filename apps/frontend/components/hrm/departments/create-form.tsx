"use client";

import { useActionState } from "react";
import { ManagerField } from "@/lib/hrm/definitions";
import Link from "next/link";
import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/hrm/ui/form-input";
import { createDepartment, State } from "@/lib/hrm/dep-actions";
import FormSelect from "@/components/hrm/ui/form-select";

export default function Form({ managers }: { managers: ManagerField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createDepartment, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* departmentName */}
        <FormInput
          id="departmentName"
          name="departmentName"
          label="部门名称"
          placeholder="输入部门名称"
          errors={state.errors?.departmentName || []}
          IconComponent={CurrencyDollarIcon}
        />

        {/* Manager Name */}
        <FormSelect
          id="manager"
          name="managerId"
          label="选择部门负责人"
          options={managers.map((manager) => ({
            value: manager.id,
            label: manager.fullName,
          }))}
          errors={state.errors?.managerId || []}
          IconComponent={UserCircleIcon}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/hrm/departments"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          取消
        </Link>
        <Button type="submit">提交</Button>
      </div>
    </form>
  );
}
