import { PageHeader } from "@/components/layout/page-header";
import { ErrorBlock } from "@/components/common/error-block";
import { OrganizationListQuerySchema } from "@/modules/organization/schemas/query.schema";
import { listOrganizations } from "@/modules/organization/services";
import { Metadata } from "next";
import { OrganizationListToolbar } from "@/modules/organization/ui/components/organization-list-toolbar";
import { Suspense } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { OrganizationListItem } from "@/modules/organization/types";
import { organizationColumns } from "@/modules/organization/ui/components/organization-columns";

export const metadata: Metadata = {
  title: "组织管理",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const rawParams = await searchParams;

  const params = OrganizationListQuerySchema.parse(rawParams);

  console.log("parsed params", params);

  const result = await listOrganizations(params);

  if (!result.success) {
    return <ErrorBlock message={result.message} />;
  }

  // console.log("organization listOrganizations", result);
  if (!result.data) {
    return <ErrorBlock message="未查询到数据" />;
  }
  const { items, total, page, pageSize } = result.data;

  return (
    <div className="flex flex-col w-full h-full">
      <PageHeader title="组织管理" />

      <OrganizationListToolbar />

      {/* 表格 */}

      <Suspense key={params.search ?? "" + params.page}>
        <DataTable<OrganizationListItem, any>
          columns={organizationColumns}
          data={items}
          total={total}
          page={page}
          pageSize={pageSize}
          manualPagination
          enableRowSelection
        />
      </Suspense>
    </div>
  );
}
