"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { TbmParamRingChartGroup } from "@/components/domain/tbm-runtime/charts/TbmParamRingChartGroup";
import {
  fetchTbmRuntimeSeriesPointsByRing,
  fetchTbmRuntimeSeriesPointsByTime,
} from "@/lib/domain/tbm-runtime/services/client/realdata.service";
import { RuntimeWorkMode } from "./RuntimeQueryToolbar";
import { TbmParamTimeChartGroup } from "@/components/domain/tbm-runtime/charts/TbmParamTimeChartGroup";
import { RuntimeSeriesValue } from "@/lib/domain/tbm-runtime/types";
import { RuntimeSeriesPoint } from "@/components/domain/tbm-runtime/types";
// import {
//   fetchTbmParamHistory,
//   fetchTunnelRingParams,
// } from "@/lib/domain/tbm-runtime/services/runtime-query-service";

type RuntimeQueryMode = "time" | "ring";

interface Props {
  tunnelId: string;
}

export function RuntimeChartPanel({ tunnelId }: Props) {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<Record<string, any[]>>({});
  const [error, setError] = useState<string | null>(null);

  const mode = (searchParams.get("mode") ?? "time") as RuntimeQueryMode;

  const fields = searchParams.get("fields")?.split(",").filter(Boolean) ?? [];

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const fromRing = searchParams.get("fromRing");
  const toRing = searchParams.get("toRing");

  const workMode: RuntimeWorkMode = (searchParams.get("workMode") ?? "all") as RuntimeWorkMode;

  useEffect(() => {
    async function load() {
      if (fields.length === 0) {
        setChartData({});
        return;
      }

      setLoading(true);
      setError(null);

      try {
        if (mode === "time") {
          if (!from || !to) return;

          const data = await fetchTbmRuntimeSeriesPointsByTime({
            tunnelId,
            from,
            to,
            fields,
            workMode,
          });

          console.log("Fetched runtime series points:", data);

          setChartData(transformTimeDataToChartGroups(data, fields));
        }

        if (mode === "ring") {
          if (!fromRing || !toRing) return;

          const data = await fetchTbmRuntimeSeriesPointsByRing({
            tunnelId,
            from: Number(fromRing),
            to: Number(toRing),
            fields,
            workMode,
          });

          setChartData(transformTimeDataToChartGroups(data, fields));
        }
      } catch (err) {
        console.error(err);
        setError("查询运行数据失败");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [mode, tunnelId, fields.join(","), from, to, fromRing, toRing, workMode]);

  if (fields.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center rounded-md border text-sm text-muted-foreground">
        请先选择参数并点击查询
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center rounded-md border text-sm text-muted-foreground">
        正在加载运行数据...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-80 items-center justify-center rounded-md border text-sm text-destructive">
        {error}
      </div>
    );
  }

  return <TbmParamTimeChartGroup data={chartData} />;
}

function transformTimeDataToChartGroups(rows: RuntimeSeriesValue[], fields: string[]) {
  const result: Record<string, RuntimeSeriesPoint[]> = {};

  for (const field of fields) {
    result[field] = rows.map((row) => ({
      ts: row.ts,
      ring: row.ring,
      value: row.values[field] ?? null,
    }));
  }

  return result;
}

// function transformRingDataToChartGroups(
//   rows: { ts: string; ring: number | null; values: Record<string, number | null> }[],
//   fields: string[]
// ) {
//   const result: Record<string, { ring: number; avg: number | null; max: number | null }[]> = {};

//   for (const field of fields) {
//     result[field] = rows.map((row, index) => ({
//       ring: index + 1,
//       avg: row.values[field] ?? null,
//       max: row.values[field] ?? null,
//     }));
//   }

//   return result;
// }
