import React from "react";
import { notoSans } from "@/app/ui/fonts";
import Search from "@/components/ui/search";
import Pagination from "@/components/ui/pagination";
import { fetchFilteredTbmsPages } from "@/lib/tbm/data";
import Table from "@/components/resource-center/tbm/table";
import { CreateTbm } from "@/components/resource-center/tbm/buttons";
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

  const totalPages = await fetchFilteredTbmsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${notoSans.className} text-2xl`}>盾构机</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="查找盾构机..." />
        <CreateTbm />
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
