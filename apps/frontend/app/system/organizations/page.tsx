import { PageHeader } from "@/components/layout/page-header";
import { ErrorBlock } from "@/components/common/error-block";
import { organizationQuery } from "@/modules/organization/queries";
import { listOrganizations } from "@/modules/organization/services";
import { getTreeNodes } from "@/lib/core/tree/tree.service";
import { Metadata } from "next";
import { OrganizationListToolbar } from "@/modules/organization/ui/components/organization-list-toolbar";
import { Suspense } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { OrganizationListItem } from "@/modules/organization/types";
import { organizationColumns } from "@/modules/organization/ui/components/organization-columns";
import { OrganizationTreePanel } from "@/modules/organization/ui/organization-tree-panel";
import { OrganizationTreeToolbar } from "@/modules/organization/ui/components/organization-tree-toolbar";
import { OrganizationTableClient } from "@/modules/organization/ui/pages/organization-table-client";

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
  const tree = await getTreeNodes(params.parentId, "organization");

  if (!tree.success) {
    return <ErrorBlock message={tree.message} />;
  }

  const nodes = tree.data ?? [];

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
    <div className="flex w-full h-full">
      <div className="w-64 border-r">
        <OrganizationTreeToolbar />
        <OrganizationTreePanel data={nodes} selectedId={params.parentId} />
      </div>
      <div className="flex-1 flex flex-col">
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
    </div>
  );
}
