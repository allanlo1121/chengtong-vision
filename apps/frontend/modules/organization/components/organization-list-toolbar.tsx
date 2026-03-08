"use client";

import { SearchInput } from "@/components/common/search-input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function OrganizationListToolbar() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between w-full">
      <SearchInput placeholder="搜索组织..." />

      <div className="flex gap-2">
        <Button onClick={() => router.push("/system/organizations/create")}>新建</Button>

        <Button variant="secondary">导入</Button>
      </div>
    </div>
  );
}
