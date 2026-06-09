import { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { ErrorBlock } from "@/components/common/error-block";
import { tbmQuery } from "@/lib/domain/tbm/queries";
import { getTbmTypeOptions, listTbms, getTbmManufacturerOptions } from "@/lib/domain/tbm/services";

import { ListToolbar } from "@/lib/domain/tbm/components/list-toolbar";
import { TableClient } from "@/lib/domain/tbm/pages/table-client";

export const metadata: Metadata = {
  title: "TBM管理",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const rawParams = await searchParams;

  const raw = tbmQuery.parse(rawParams);

  const params = {
    ...raw,
    sortBy: raw.sortBy ?? "sortOrder",
  };

  let result;
  let tbmTypesResult;
  let tbmManufacturersResult;

  try {
    result = await listTbms(params);
    tbmTypesResult = await getTbmTypeOptions();
    tbmManufacturersResult = await getTbmManufacturerOptions();
  } catch (error) {
    console.error("Error fetching tbms:", error);
    return <ErrorBlock message={error instanceof Error ? error.message : "查询失败"} />;
  }
  const { items, total, page, pageSize } = result;
  const { sortBy, sortDirection } = params;

  return (
    <div className="flex-col w-full h-full">
      <PageHeader title="TBM管理" />

      <ListToolbar tbmTypes={tbmTypesResult} tbmManufacturers={tbmManufacturersResult} />

      {/* 表格 */}

      <Suspense key={params.search ?? "" + params.page}>
        <TableClient
          items={items}
          total={total}
          page={page}
          pageSize={pageSize}
          sortBy={sortBy}
          sortDirection={sortDirection}
        />
      </Suspense>
    </div>
  );
}
