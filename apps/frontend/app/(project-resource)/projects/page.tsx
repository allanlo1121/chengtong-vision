import { columns } from "@frontend/components/projects/ProjectTable/columns";
import { DataTable } from "@frontend/components/projects/ProjectTable/ProjectTable";
import { fetchProjects } from "@frontend/services/projects/queries.server";
import React from "react";

export default async function page() {
  const data = await fetchProjects({});
  //console.log("project data", data);

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
