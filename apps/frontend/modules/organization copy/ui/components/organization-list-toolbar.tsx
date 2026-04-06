"use client";

import { useMemo } from "react";
import { Search } from "@/components/common/search-input";
import { Button } from "@/components/ui/button";
import { organizationQuery } from "@/modules/organization/queries";
import { useRouter, useSearchParams } from "next/navigation";

export function OrganizationListToolbar() {
  const router = useRouter();

  const searchParams = useSearchParams();

  // 🔥 解析当前 query（关键）
  const query = useMemo(
    () => organizationQuery.parse(Object.fromEntries(searchParams.entries())),
    [searchParams]
  );

  return (
    <div className="flex items-center justify-between w-full">
      <Search placeholder="搜索组织..." />

      <div className="flex gap-2">
        <Button
          onClick={() =>
            router.push(
              organizationQuery.buildUrl("/system/organizations/create", {
                parentId: query.parentId,
              })
            )
          }
        >
          新建
        </Button>

        <Button onClick={() => router.push("/system/organizations/import")} variant="secondary">
          导入
        </Button>
      </div>
    </div>
  );
}
