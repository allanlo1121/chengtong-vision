import { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { ErrorBlock } from "@/components/common/error-block";

import { getErrorMessage } from "@/lib/shared/contracts/error-codes";
import { tbmAssignmentQuery } from "@/lib/domain/tbm-assignment/queries/";
import { listTbmAssignments } from "@/lib/domain/tbm-assignment/services/";
import { TableClient } from "@/lib/domain/tbm-assignment/pages/table-client";
import { fetchTbmById } from "@/lib/domain/tbm/services";
import { ListToolbar } from "@/lib/domain/tbm-assignment/components/list-toolbar";

export const metadata: Metadata = {
  title: "盾构-隧道绑定管理",
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const rawParams = await searchParams;
  const { id: tbmId } = await params;
  console.log("===tbm assignment page params tbmId===", tbmId);

  console.log("===tbm assignment page search params===", rawParams);

  const raw = tbmAssignmentQuery.parse({
    ...rawParams,
    tbmId,
  });

  let result;
  let tbm;

  try {
    tbm = await fetchTbmById(tbmId);
    result = await listTbmAssignments(raw);
  } catch (error) {
    console.error("Error fetching TBM assignments:", error);
    return <ErrorBlock message={getErrorMessage(error)} />;
  }

  // if (!result || result.items.length === 0) {
  //   return <ErrorBlock message="未查询到数据" />;
  // }
  const { items, total, page, pageSize } = result;
  const { sortBy, sortDirection } = raw;

  return (
    <div className="flex-col w-full h-full">
      <PageHeader title="盾构-隧道绑定管理" />

      <ListToolbar tbm={tbm} />

      {/* 表格 */}

      <Suspense key={raw.search ?? "" + raw.page}>
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
