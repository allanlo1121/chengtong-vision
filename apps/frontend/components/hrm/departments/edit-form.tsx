"use client";

import { ManagerField, DepartmentForm } from "@/lib/hrm/definitions";
import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { updateDepartment, State } from "@/lib/hrm/dep-actions";
import { useActionState } from "react";

export default function EditDepartmentForm({
  department,
  managers,
}: {
  department: DepartmentForm;
  managers: ManagerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateDepartmentWithId = updateDepartment.bind(null, department.id);
  const [state, formAction] = useActionState(
    updateDepartmentWithId,
    initialState
  );
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={department.id} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Department Name */}
        <div className="mb-4">
          <label
            htmlFor="departmentName"
            className="mb-2 block text-sm font-medium"
          >
            部门名称
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="departmentName"
                name="departmentName"
                type="text"
                defaultValue={department.departmentName}
                placeholder="输入部门名称"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="departmentName-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="departmentName-error" aria-live="polite" aria-atomic="true">
            {state.errors?.departmentName &&
              state.errors?.departmentName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Manager Name */}
        <div className="mb-4">
          <label htmlFor="manager" className="mb-2 block text-sm font-medium">
            选择部门负责人
          </label>
          <div className="relative">
            <select
              id="manager"
              name="managerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={String(department.managerId)}
              aria-describedby="manager-error"
            >
              <option value="" disabled>
                选择一部部门负责人
              </option>
              {managers.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.fullName}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="managerId-error" aria-live="polite" aria-atomic="true">
            {state.errors?.managerId &&
              state.errors?.managerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/departments"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          取消
        </Link>
        <Button type="submit">提交</Button>
      </div>
    </form>
  );
}
