import { useMemo } from "react";

import { useTunnelRuntime } from "./use-tunnel-runtime";
import { useTbmRuntimeState } from "./use-tbm-runtime-state";

type TunnelDashboardSummary = {
  projectCount: number;
  tunnelCount: number;
  tbmCount: number;

  advancing: number;
  assembly: number;
  stopped: number;
  fault: number;
  offline: number;
};

export function useTunnelDashboard() {
  const base = useTunnelRuntime();
  const phase = useTbmRuntimeState();
  //   const progress = useTbmProgress();
  //   const connection = useTbmConnectionStatus();
  //   const alerts = useTunnelAlerts();
  const data = useMemo(() => {
    if (!base.data) return [];

    const phaseMap = new Map(phase.data?.map((x) => [x.tbmId, x]) ?? []);
    // const progressMap = new Map(progress.data?.map((x) => [x.tunnelId, x]) ?? []);
    // const connectionMap = new Map(connection.data?.map((x) => [x.tunnelId, x]) ?? []);
    // const alertMap = new Map(alerts.data?.map((x) => [x.tunnelId, x]) ?? []);

    return base.data.map((t) => {
      const p = t.tbmId ? phaseMap.get(t.tbmId) : null;

      //   const g = progressMap.get(t.tunnelId);
      //   const c = connectionMap.get(t.tunnelId);
      //   const a = alertMap.get(t.tunnelId);

      return {
        ...t,
        hasTbm: !!t.tbmId,
        phaseType: p?.phaseType ?? null,

        ringNo: p?.ringNo ?? null,
        chainage: p?.chainage ?? null,

        heartbeatIsOnline: p?.heartbeatIsOnline ?? false,
        realdataIsOnline: p?.realdataIsOnline ?? false,

        // faultCount: a?.faultCount ?? 0,
        // warningCount: a?.warningCount ?? 0,
      };
    });
  }, [base.data, phase.data]);

  const summary = useMemo<TunnelDashboardSummary>(() => {
    const projectIds = new Set<string>();
    const tunnelIds = new Set<string>();
    const tbmIds = new Set<string>();

    const result: TunnelDashboardSummary = {
      projectCount: 0,
      tunnelCount: 0,
      tbmCount: 0,

      advancing: 0,
      assembly: 0,
      stopped: 0,
      fault: 0,
      offline: 0,
    };

    for (const item of data) {
      projectIds.add(item.projectId);
      tunnelIds.add(item.tunnelId);

      if (item.tbmId) {
        tbmIds.add(item.tbmId);
      }

      if (!item.hasTbm) continue;

      if (item.heartbeatIsOnline === false) {
        result.offline += 1;
        continue;
      }

      switch (item.phaseType) {
        case "advance":
          result.advancing += 1;
          break;
        case "assembly":
          result.assembly += 1;
          break;
        case "stopped":
          result.stopped += 1;
          break;
        case "fault":
          result.fault += 1;
          break;
      }
    }

    result.projectCount = projectIds.size;
    result.tunnelCount = tunnelIds.size;
    result.tbmCount = tbmIds.size;

    return result;
  }, [data]);

  const tunnelProgressData = useMemo(() => {
    return data.map((item) => {
      const totalRing = Math.max(item.endRing - item.startRing, 0);

      const completed = Math.max((item.ringNo ?? item.startRing) - item.startRing, 0);

      const remaining = Math.max(totalRing - completed, 0);

      return {
        id: item.tunnelId,
        name: item.tunnelName,

        completed,
        remaining,

        totalRing,
        progress: totalRing > 0 ? Math.round((completed / totalRing) * 100) : 0,
      };
    });
  }, [data]);

  return {
    data,
    summary,
    tunnelProgressData,
    loading: base.isLoading || phase.isLoading,

    error: base.error || phase.error,
  };
}
