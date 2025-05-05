import React from "react";
import { notoSans } from "@/app/ui/fonts";
import Search from "@/components/ui/search";
import Pagination from "@/components/ui/pagination";
import { fetchProjectsPages } from "@/lib/project/data";
import Table from "@/components/project/projects/table";
import { CreateProject } from "@/components/project/projects/buttons";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchProjectsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${notoSans.className} text-2xl`}>工程项目部</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="查找项目信息..." />
        <CreateProject />
      </div>
      <Suspense key={query + currentPage}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
