import { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { ErrorBlock } from "@/components/common/error-block";
import { projectQuery } from "@/lib/domain/project/queries";
import { listProjects } from "@/lib/domain/project/services";

import { ProjectListToolbar } from "@/lib/domain/project/components/project-list-toolbar";
import { ProjectTableClient } from "@/lib/domain/project/pages/project-table-client";

export const metadata: Metadata = {
  title: "工程管理",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const rawParams = await searchParams;

  const raw = projectQuery.parse(rawParams);

  const params = {
    ...raw,
    sortBy: raw.sortBy ?? "sortOrder",
  };

  // console.log("employees page  params", params);

  const result = await listProjects(params);

  if (!result.success) {
    return <ErrorBlock message={result.message} />;
  }

  // console.log("projects listProjects", result);
  // console.log("projects treeProjects", nodes);
  if (!result.data) {
    return <ErrorBlock message="未查询到数据" />;
  }
  const { items, total, page, pageSize } = result.data;
  const { sortBy, sortDirection } = params;

  return (
    <div className="flex-col w-full h-full">
      <PageHeader title="工程管理" />

      <ProjectListToolbar />

      {/* 表格 */}

      <Suspense key={params.search ?? "" + params.page}>
        <ProjectTableClient
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
