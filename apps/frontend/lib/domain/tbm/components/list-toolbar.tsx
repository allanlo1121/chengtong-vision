"use client";

import { useMemo } from "react";
import { X } from "lucide-react";
import { Search } from "@/components/common/search-input";
import { Button } from "@/components/ui/button";
import { tbmQuery } from "@/lib/domain/tbm/queries";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/lib/core/router/router";

import { SelectOption } from "@/lib/shared/options/types";
import { OptionSelect } from "@/lib/shared/options/components/OptionSelect";

export function ListToolbar({
  tbmTypes,
  tbmManufacturers,
}: {
  tbmTypes: SelectOption[];
  tbmManufacturers: SelectOption[];
}) {
  const router = useRouter();

  const searchParams = useSearchParams();

  // 🔥 解析当前 query（关键）
  const query = useMemo(
    () => tbmQuery.parse(Object.fromEntries(searchParams.entries())),
    [searchParams]
  );

  const handleTbmTypeChange = (tbmTypeId: string | undefined) => {
    const nextQuery = {
      ...query,
      page: 1, // 切换筛选条件时建议回到第一页
      tbmTypeId,
    };

    router.push(tbmQuery.buildUrl(routes.tbms.list, nextQuery));
  };

  const handleTbmManufacturerChange = (tbmManufacturerId: string | undefined) => {
    const nextQuery = {
      ...query,
      page: 1, // 切换筛选条件时建议回到第一页
      tbmManufacturerId,
    };

    router.push(tbmQuery.buildUrl(routes.tbms.list, nextQuery));
  };

  const hasFilter = !!query.search || !!query.tbmTypeId || !!query.tbmManufacturerId;

  return (
    <div className="flex items-center justify-between w-full gap-4">
      <Search placeholder="搜索TBM..." />

      <OptionSelect
        value={query.tbmTypeId}
        options={tbmTypes}
        placeholder="选择盾构机类型"
        allLabel="全部类型"
        onChange={handleTbmTypeChange}
      />
      <OptionSelect
        value={query.tbmManufacturerId}
        options={tbmManufacturers}
        placeholder="选择盾构机制造商"
        allLabel="全部制造商"
        onChange={handleTbmManufacturerChange}
      />
      {hasFilter && (
        <Button variant="destructive" size="lg" onClick={() => router.push(routes.tbms.list)}>
          <X />
          重置
        </Button>
      )}

      <div className="flex gap-2 px-8">
        <Button
          onClick={() =>
            router.push(
              tbmQuery.buildUrl(routes.tbms.create, {
                // 这里可以预设一些创建时的 query 参数，例如：
                // type: "EPB", // 预设盾构机类型为 EPB
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
