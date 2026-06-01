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

  // console.log("employees page  params", params);

  const result = await listTbms(params);
  const tbmTypesResult = await getTbmTypeOptions();
  const tbmManufacturersResult = await getTbmManufacturerOptions();

  if (!result.success) {
    return <ErrorBlock message={result.message} />;
  }

  // console.log("tbms listTbms", result);
  // console.log("tbms treeTbms", nodes);
  if (!result.data) {
    return <ErrorBlock message="未查询到数据" />;
  }
  const { items, total, page, pageSize } = result.data;
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
