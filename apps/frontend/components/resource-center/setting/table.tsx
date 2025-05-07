import React from "react";
import {
  UpdateTunnel,
  DeleteTunnel,
} from "@/components/resource-center/tunnel/buttons";
import { EditTunnel } from "./buttons";
import { fetchFilteredAllTunnels } from "@/lib/project/tunnel/data";
import { formatDecimal } from "@/utils/utils";
import dayjs from "dayjs";
import { ITunnelBasic } from "@/lib/project/tunnel/types";
import { ProjectStatusLabels } from "@/lib/resource-center/types";
export default async function Table({ query }: { query: string }) {
  const tunnels: ITunnelBasic[] = await fetchFilteredAllTunnels(query);
  console.log("tunnels", tunnels);

  return (
    <div className="w-full  grid grid-cols-4 grid-rows-16 mt-4 gap-y-4">
      {tunnels?.map((tunnel, index) => (
        <EditTunnel key={tunnel.id} tunnel={tunnel} index={index} />
      ))}
    </div>
  );
}
