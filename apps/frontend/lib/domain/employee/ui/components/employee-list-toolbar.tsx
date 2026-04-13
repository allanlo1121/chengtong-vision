"use client";

import { useMemo } from "react";
import { Search } from "@/components/common/search-input";
import { Button } from "@/components/ui/button";
import { employeeQuery } from "@/lib/domain/employee/queries";
import { useRouter, useSearchParams } from "next/navigation";

export function EmployeeListToolbar() {
  const router = useRouter();

  const searchParams = useSearchParams();

  // 🔥 解析当前 query（关键）
  const query = useMemo(
    () => employeeQuery.parse(Object.fromEntries(searchParams.entries())),
    [searchParams]
  );

  return (
    <div className="flex items-center justify-between w-full">
      <Search placeholder="搜索员工..." />

      <div className="flex gap-2">
        <Button
          onClick={() =>
            router.push(
              employeeQuery.buildUrl("/system/employees/create", {
                parentId: query.parentId,
              })
            )
          }
        >
          新建
        </Button>

        <Button onClick={() => router.push("/system/employees/import")} variant="secondary">
          导入
        </Button>
      </div>
    </div>
  );
}
