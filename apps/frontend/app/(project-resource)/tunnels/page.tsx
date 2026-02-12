import { columns } from "@frontend/components/tunnels/TunnelTable/columns";
import { DataTable } from "@frontend/components/tunnels/TunnelTable/TunnelTable";
import { fetchTunnels } from "@frontend/services/tunnels/queries";
import React from "react";

export default async function page() {
  const data = await fetchTunnels();
  //console.log("project data", data);

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
