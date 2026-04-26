import { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { ErrorBlock } from "@/components/common/error-block";
import { employeeQuery } from "@/lib/domain/employee/queries";
import { listEmployees } from "@/lib/domain/employee/services";
import { getTreeNodes } from "@/lib/core/tree/tree.service";

import { EmployeeTreePanel } from "@/lib/domain/employee/ui/employee-tree-panel";
import { OrganizationTreeToolbar } from "@/lib/domain/organization/ui/components/organization-tree-toolbar";

import { EmployeeListToolbar } from "@/lib/domain/employee/ui/components/employee-list-toolbar";
import { EmployeeTableClient } from "@/lib/domain/employee/ui/pages/employee-table-client";

export const metadata: Metadata = {
  title: "员工管理",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const rawParams = await searchParams;

  const raw = employeeQuery.parse(rawParams);

  const params = {
    ...raw,
    sortBy: raw.sortBy ?? "sortOrder",
  };

  // console.log("employees page  params", params);

  const result = await listEmployees(params);
  const tree = await getTreeNodes(params.organizationId, "organization");

  if (!tree.success) {
    return <ErrorBlock message={tree.message} />;
  }

  const nodes = tree.data ?? [];

  if (!result.success) {
    return <ErrorBlock message={result.message} />;
  }

  // console.log("employees listEmployees", result);
  // console.log("employees treeEmployees", nodes);
  if (!result.data) {
    return <ErrorBlock message="未查询到数据" />;
  }
  const { items, total, page, pageSize } = result.data;
  const { sortBy, sortDirection } = params;

  return (
    <div className="flex w-full h-full">
      <div className="w-64 border-r">
        <OrganizationTreeToolbar />
        <EmployeeTreePanel data={nodes} selectedId={params.organizationId} />
      </div>
      <div className="flex-1 flex flex-col">
        <PageHeader title="员工管理" />

        <EmployeeListToolbar />

        {/* 表格 */}

        <Suspense key={params.search ?? "" + params.page}>
          <EmployeeTableClient
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
