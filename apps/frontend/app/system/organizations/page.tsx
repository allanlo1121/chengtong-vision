import { PageHeader } from "@/components/layout/page-header";
import { ErrorBlock } from "@/components/common/error-block";
import { OrganizationListQuerySchema } from "@/modules/organization/schemas/query.schema";
import { listOrganizations, getOrganizationTree } from "@/modules/organization/services";
import { Metadata } from "next";
import { OrganizationListToolbar } from "./_components/organization-list-toolbar";
import { Suspense } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { OrganizationListItem } from "@/lib/domain/organization";
import { organizationColumns } from "./_components/organization-columns";

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

  // console.log("parsed params", params);

  const data = await getOrganizationTree();
  if (!data.success) {
    return <ErrorBlock message={data.message} />;
  }

  const tree = data.data ?? [];
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
      {/* <OrganizationListClient ... /> */}
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
