import { ErrorBlock } from "@/components/common/error-block";
import { OrganizationListQuerySchema } from "@/modules/organization/schemas/query.schema";
import { listOrganizations, getOrganizationTree } from "@/modules/organization/services";
import { OrganizationTree } from "@/modules/organization/pages/organization-tree";
import { OrganizationListClient } from "@/modules/organization/pages/organization-list-client";
import { Metadata } from "next";
import { OrganizationListToolbar } from "@/modules/organization/components/organization-list-toolbar";
import { Suspense } from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { useCrudSelection } from "@/lib/crud/hooks";
import { OrganizationListItem } from "@/lib/domain/organization";
import { organizationColumns } from "@/modules/organization/components/organization-columns";

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

  const data = await getOrganizationTree();
  if (!data.success) {
    return <ErrorBlock message={data.error} />;
  }

  const tree = data.data;
  const result = await listOrganizations(params);

  if (!result.success) {
    return <ErrorBlock message={result.error} />;
  }

  console.log("organization listOrganizations", result);

  const { items, total, page, pageSize } = result.data;

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl mb-4">组织管理</h1>

      <div className="flex flex-1 w-full">
        {/* 左侧树 */}
        <OrganizationTree tree={tree} />

        {/* 右侧 */}
        <div className="flex flex-1 flex-col ml-4">
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
      </div>
    </div>
  );
}
