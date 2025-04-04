import { Metadata } from "next";
import { notoSans } from "@/app/ui/fonts";
import Table from "@/components/hrm/departments/table";
import Pagination from "@/components/hrm/departments/pagination";
import Search from "@/app/ui/search";
import { Suspense } from "react";
import { fetchDepartmentsPages } from "@/lib/hrm/data";
import {CreateDepartment} from "@/components/hrm/departments/buttons";

export const metadata: Metadata = {
  title: "Departments",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {

  const searchParams = await props.searchParams;  
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
console.log("searchParams",searchParams);

  const totalPages = await fetchDepartmentsPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${notoSans.className} text-2xl`}>部门</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search departments..." />
        <CreateDepartment />
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
