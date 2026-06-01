import { fetchTbmAssignmentByTunnelId } from "@/lib/domain/tbm-runtime/services";

import {
  findTbmBoundParameterGroups,
  fetchRuntimeQueryLimits,
} from "@/lib/domain/tbm-runtime/services";
import { RuntimePageClient } from "../../_components/RuntimePageClient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  console.log("Tunnel ID:", id);

  let groups;
  let runtimeLimits;
  try {
    const tbmAssignment = await fetchTbmAssignmentByTunnelId(id);

    [groups, runtimeLimits] = await Promise.all([
      findTbmBoundParameterGroups(tbmAssignment.tbmId),
      fetchRuntimeQueryLimits(id),
    ]);

    console.log("Fetched parameter groups:", groups);
    console.log("Fetched runtime query limits:", runtimeLimits);
  } catch (error) {
    console.error("Error fetching parameter bindings:", error);
    return <div>加载参数绑定数据失败</div>;
  }
  return <RuntimePageClient tunnelId={id} groups={groups} limits={runtimeLimits} />;
}
