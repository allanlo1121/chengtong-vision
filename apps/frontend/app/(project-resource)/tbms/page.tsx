import { columns } from "@/components/tbms/TbmTable/columns";
import { DataTable } from "@/components/tbms/TbmTable/TbmTable";
import { fetchTbms } from "@/lib/repositories/tbm.repository";

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
