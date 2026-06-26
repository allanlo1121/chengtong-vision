import { PageHeader } from "@/components/layout/page-header";
import { ErrorBlock } from "@/components/common/error-block";
import { organizationQuery } from "@/lib/domain/organization/queries";
import { listOrganizations } from "@/lib/domain/organization/services";

import { Metadata } from "next";
import { OrganizationListToolbar } from "@/lib/domain/organization/components/list-toolbar";
import { Suspense } from "react";
import { OrganizationTableClient } from "@/lib/domain/organization/pages/organization-table-client";
import { OrganizationListItem } from "@/lib/domain/organization/types/domain.types";
import { PaginatedResult } from "@/lib/shared/contracts/paginated-result";

export const metadata: Metadata = {
  title: "组织管理",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const rawParams = await searchParams;

  const raw = organizationQuery.parse(rawParams);

  const params = {
    ...raw,
    sortBy: raw.sortBy ?? "sortOrder",
  };
  let result: PaginatedResult<OrganizationListItem>;

  try {
    result = await listOrganizations(params);
  } catch (error) {
    return <ErrorBlock message={error instanceof Error ? error.message : "查询失败"} />;
  }

  const { items, total, page, pageSize } = result;
  const { sortBy, sortDirection } = params;

  return (
    <div className="flex-col w-full h-full">
      <PageHeader title="组织管理" />

      <OrganizationListToolbar />

      {/* 表格 */}

      <Suspense key={params.search ?? "" + params.page}>
        <OrganizationTableClient
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
