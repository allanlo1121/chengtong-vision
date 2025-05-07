import React from "react";
import { notoSans } from "@/app/ui/fonts";
import Search from "@/components/ui/search";
import Pagination from "@/components/ui/pagination";
import { fetchFilteredTunnelsPages } from "@/lib/resource-center/tunnel/data";
import Table from "@/components/resource-center/setting/table";
import { CreateTunnel } from "@/components/resource-center/tunnel/buttons";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${notoSans.className} text-2xl`}>区间隧道</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="查找区间信息..." />
        <CreateTunnel />
      </div>
      <Suspense key={query}>
        <Table query={query} />
      </Suspense>
    </div>
  );
}
