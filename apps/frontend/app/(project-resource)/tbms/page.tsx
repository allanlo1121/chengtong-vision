import { columns } from "@frontend/components/tbms/TbmTable/columns";
import { DataTable } from "@frontend/components/tbms/TbmTable/TbmTable";
import { fetchTbms } from "@frontend/lib/repositories/tbm.repository";

import React from "react";

export default async function page() {
  const data = await fetchTbms();
  console.log("project data", data);

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
