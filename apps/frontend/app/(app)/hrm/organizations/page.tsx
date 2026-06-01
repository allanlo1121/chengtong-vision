import { PageHeader } from "@/components/layout/page-header";
import { ErrorBlock } from "@/components/common/error-block";
import { organizationQuery } from "@/lib/domain/organization/queries";
import { listOrganizations } from "@/lib/domain/organization/services";

import { Metadata } from "next";
import { OrganizationListToolbar } from "@/lib/domain/organization/components/list-toolbar";
import { Suspense } from "react";
import { OrganizationTableClient } from "@/lib/domain/organization/pages/organization-table-client";

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

  // console.log("organizations page  params", params);

  const result = await listOrganizations(params);
  // const tree = await getTreeNodes(params.parentId);

  // if (!tree.success) {
  //   return <ErrorBlock message={tree.message} />;
  // }

  // const nodes = tree.data ?? [];

  if (!result.success) {
    return <ErrorBlock message={result.message} />;
  }

  // console.log("organization listOrganizations", result);
  // console.log("organization treeOrganizations", nodes);
  if (!result.data) {
    return <ErrorBlock message="未查询到数据" />;
  }
  const { items, total, page, pageSize } = result.data;
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
