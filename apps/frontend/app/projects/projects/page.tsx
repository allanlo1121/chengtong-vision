import React from "react";
import Search from "@/components/ui/search";
import { fetchProjectsPages, fetchProjects } from "@/lib/project/project-data";

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
  const projects = await fetchProjects(query, currentPage);

  console.log("query", query);
  console.log("currentPage", currentPage);
  console.log("totalPages", totalPages);
  console.log("projects", projects); // 打印查询结果
  
  return (
    <div className="bg-gray-300">
      <Search placeholder="Search projects..." />
    </div>
  );
}
