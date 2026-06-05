import { fetchTbmAssignmentByTunnelId } from "@/lib/domain/tbm-assignment/services";
import { fetchTbmRuntimeSeriesPoints } from "@/lib/domain/tbm-runtime/services";
import {
  RuntimeSeriesValue,
  RuntimeSeriesQueryParams,
  RuntimeWorkMode,
} from "@/lib/domain/tbm-runtime/types";
import { DEFAULT_RUNTIME_FIELDS } from "./_constants/runtime";
import { RuntimeSeriesPoint } from "@/components/domain/tbm-runtime/types";
import { TbmParamTimeChartGroup } from "@/components/domain/tbm-runtime/charts/TbmParamTimeChartGroup";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Record<string, string | undefined>;
}) {
  const { id } = await params;

  const paramsWithDefaults = await params;

  console.log("Tunnel ID:", id);

  console.log("paramsWithDefaults", paramsWithDefaults);

  console.log("Search Params:", searchParams);

  let tbmAssignment;
  let runtimeSeriesValue: RuntimeSeriesValue[] = [];
  let chartData: Record<string, RuntimeSeriesPoint[]> = {};
  const fields = searchParams.fields?.split(",").filter(Boolean) ?? DEFAULT_RUNTIME_FIELDS;

  const mode = searchParams.mode === "ring" ? "ring" : "time";
  const workMode = (searchParams.workMode as RuntimeWorkMode) ?? "all";
  // 当前时间
  const now = new Date();

  // 少 12 小时
  const from12h = new Date(now.getTime() - 12 * 60 * 60 * 1000);

  // 少 24 小时
  const from24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // 转成 ISO 字符串
  const from12hISO = from12h.toISOString();
  const from24hISO = from24h.toISOString();

  try {
    tbmAssignment = await fetchTbmAssignmentByTunnelId(id);

    let runtimeQueryParams: RuntimeSeriesQueryParams;

    if (mode === "ring") {
      runtimeQueryParams = {
        mode: "ring",
        tbmId: tbmAssignment.tbmId,
        workMode,
        fields,
        from: Number(searchParams.fromRing),
        to: Number(searchParams.toRing),
      };
    } else {
      runtimeQueryParams = {
        mode: "time",
        tbmId: tbmAssignment.tbmId,
        workMode,
        fields,
        from: searchParams.from ?? from12hISO,
        to: searchParams.to ?? now.toISOString(),
      };
    }
    if (runtimeQueryParams) {
      runtimeSeriesValue = await fetchTbmRuntimeSeriesPoints(runtimeQueryParams);
      console.log("Fetched runtime series points:", runtimeSeriesValue);
      chartData = transformTimeDataToChartGroups(runtimeSeriesValue, fields);
    }
  } catch (error) {
    console.error("Error fetching parameter bindings:", error);
    return <div>加载参数绑定数据失败</div>;
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
