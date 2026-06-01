import { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { ErrorBlock } from "@/components/common/error-block";
import { employeeQuery } from "@/lib/domain/employee/queries";
import { listEmployees } from "@/lib/domain/employee/services";

import { EmployeeListToolbar } from "@/lib/domain/employee/components/employee-list-toolbar";
import { EmployeeTableClient } from "@/lib/domain/employee/pages/employee-table-client";

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
    <div className="flex-col w-full h-full">
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
  );
}
