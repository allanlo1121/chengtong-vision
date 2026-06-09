import { fetchTbmAssignmentByTunnelId } from "@/lib/domain/tbm-assignment/services/query.service";
import { RuntimePageClient } from "./RuntimePageClient";
import { fetchRuntimeQueryLimits } from "@/lib/domain/tbm-runtime/services/realdata.service";
import { findTbmBoundParameterGroups } from "@/lib/domain/tbm-runtime/services/tbm-parameter-config.service";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    // 先拿 tunnel 对应的 TBM
    const tbmAssignment = await fetchTbmAssignmentByTunnelId(id);

    // 并行获取参数分组和 limits
    const [groups, limits] = await Promise.all([
      findTbmBoundParameterGroups(tbmAssignment.tbmId),
      fetchRuntimeQueryLimits(tbmAssignment.tbmId),
    ]);

    return <RuntimePageClient tbmId={tbmAssignment.tbmId} groups={groups} limits={limits} />;
  } catch (err) {
    console.error("Template fetch error:", err);
    return (
      <div className="flex h-full items-center justify-center text-destructive text-sm">
        加载运行参数或 TBM 数据失败
      </div>
    );
  }
}
