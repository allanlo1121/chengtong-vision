"use client";

import { useMemo } from "react";
import { Search } from "@/components/common/search-input";
import { Button } from "@/components/ui/button";
import { tunnelQuery } from "@/lib/domain/tunnel/queries";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/lib/core/router/router";

export function TunnelListToolbar() {
  const router = useRouter();

  const searchParams = useSearchParams();

  // 🔥 解析当前 query（关键）
  const query = useMemo(
    () => tunnelQuery.parse(Object.fromEntries(searchParams.entries())),
    [searchParams]
  );

  return (
    <div className="flex items-center justify-between w-full">
      <Search placeholder="搜索隧道..." />

      <div className="flex gap-2">
        <Button
          onClick={() =>
            router.push(
              tunnelQuery.buildUrl(routes.tunnels.create, {
                organizationId: query.organizationId,
              })
            )
          }
        >
          新建
        </Button>

        <Button onClick={() => router.push(routes.tunnels.import)} variant="secondary">
          导入
        </Button>
      </div>
    </div>
  );
}
