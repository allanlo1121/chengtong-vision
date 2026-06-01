"use client";

import { useMemo } from "react";
import { Search } from "@/components/common/search-input";
import { Button } from "@/components/ui/button";
import { tbmQuery } from "@/lib/domain/tbm/queries";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/lib/core/router/router";

export function ListToolbar() {
  const router = useRouter();

  const searchParams = useSearchParams();

  // 🔥 解析当前 query（关键）
  const query = useMemo(
    () => tbmQuery.parse(Object.fromEntries(searchParams.entries())),
    [searchParams]
  );

  return (
    <div className="flex items-center justify-between w-full">
      <Search placeholder="搜索TBM..." />

      <div className="flex gap-2">
        <Button
          onClick={() =>
            router.push(
              tbmQuery.buildUrl("/tbms/create", {
                organizationId: query.organizationId,
              })
            )
          }
        >
          新建
        </Button>

        <Button onClick={() => router.push(routes.tbms.import)} variant="secondary">
          导入
        </Button>
      </div>
    </div>
  );
}
