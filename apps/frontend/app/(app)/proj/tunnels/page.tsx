import { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { ErrorBlock } from "@/components/common/error-block";
import { tunnelQuery } from "@/lib/domain/tunnel/queries";
import { listTunnels } from "@/lib/domain/tunnel/services";

import { TunnelListToolbar } from "@/lib/domain/tunnel/components/tunnel-list-toolbar";
import { TunnelTableClient } from "@/lib/domain/tunnel/pages/table-client";
import { getErrorMessage } from "@/lib/shared/contracts/error-codes";

export const metadata: Metadata = {
  title: "隧道管理",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const rawParams = await searchParams;

  const raw = tunnelQuery.parse(rawParams);

  const params = {
    ...raw,
    sortBy: raw.sortBy ?? "sortOrder",
  };

  let result;

  try {
    result = await listTunnels(params);
  } catch (error) {
    console.error("Error fetching tunnels:", error);
    return <ErrorBlock message={getErrorMessage(error)} />;
  }

  // if (!result || result.items.length === 0) {
  //   return <ErrorBlock message="未查询到数据" />;
  // }
  const { items, total, page, pageSize } = result;
  const { sortBy, sortDirection } = params;

  return (
    <div className="flex-col w-full h-full">
      <PageHeader title="隧道管理" />

      <TunnelListToolbar />

      {/* 表格 */}

      <Suspense key={params.search ?? "" + params.page}>
        <TunnelTableClient
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
