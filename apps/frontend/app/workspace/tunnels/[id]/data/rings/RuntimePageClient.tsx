"use client";

import { useEffect, useMemo, useState } from "react";
import { format, subHours } from "date-fns";
import {
  ParameterGroup,
  RuntimeQueryDraft,
  RuntimeQueryLimits,
  RuntimeQueryMode,
  RuntimeSeriesQueryParams,
  RuntimeSeriesValue,
} from "@/lib/domain/tbm-runtime/types";

import { RuntimeParameterSidebar } from "./_components/RuntimeParameterSidebar";
import { RuntimeQueryToolbar } from "./_components/RuntimeQueryToolbar";

import { DEFAULT_RUNTIME_FIELDS } from "./_constants/runtime";
import { RuntimeSeriesPoint } from "@/components/domain/tbm-runtime/types";

import { fetchTbmRuntimeSeriesPoints } from "@/lib/domain/tbm-runtime/services/client";
import { TbmParamTimeChartGroup } from "@/components/domain/tbm-runtime/charts/TbmParamTimeChartGroup";

export function RuntimePageClient({
  tbmId,
  groups,
  limits,
}: {
  tbmId: string;
  groups: ParameterGroup[];
  limits: RuntimeQueryLimits;
}) {
  const initialFields = DEFAULT_RUNTIME_FIELDS;
  const currentRing = limits.maxRing ?? 0;
  const initialQuery: RuntimeQueryDraft = {
    mode: "ring",
    workMode: "all",
    from: currentRing, // 默认从12小时前开始
    to: currentRing, // 默认到当前时间
  };
  const [selectedCodes, setSelectedCodes] = useState<string[]>(initialFields);
  const [queryDraft, setQueryDraft] = useState<RuntimeQueryDraft>(initialQuery);
  const [chartData, setChartData] = useState<Record<string, RuntimeSeriesPoint[]>>({});
  const codeNameMap = useMemo(() => {
    return new Map(
      groups.flatMap((group) =>
        group.parameters.map((param) => [param.parameterCode, param.parameterName])
      )
    );
  }, [groups]);

  const selectedParameterNames = useMemo(
    () => selectedCodes.map((code) => codeNameMap.get(code) ?? code),
    [selectedCodes, codeNameMap]
  );

  function handleModeChange(newMode: RuntimeQueryMode) {
    const now = new Date();

    switch (newMode) {
      case "time":
        setQueryDraft({
          mode: "time",
          workMode: queryDraft.workMode,
          from: format(subHours(now, 12), "yyyy-MM-dd'T'HH:mm"),
          to: format(now, "yyyy-MM-dd'T'HH:mm"),
        });
        break;

      case "ring":
        setQueryDraft({
          mode: "ring",
          workMode: queryDraft.workMode,
          from: Math.max(0, (limits.maxRing ?? 0) - 10),
          to: limits.maxRing ?? 0,
        });
        break;
    }
  }

  async function handleSearch() {
    const queryParams = buildRuntimeQueryParams(tbmId, queryDraft, selectedCodes);

    const runtimeSeriesValue = await fetchTbmRuntimeSeriesPoints(queryParams);

    setChartData(transformTimeDataToChartGroups(runtimeSeriesValue, selectedCodes));
  }
  useEffect(() => {
    void handleSearch();
  }, []);
  return (
    <div className="flex h-full">
      <RuntimeParameterSidebar groups={groups} value={selectedCodes} onChange={setSelectedCodes} />

      <div className="flex flex-1 flex-col">
        <RuntimeQueryToolbar
          limits={limits}
          selectedParameterNames={selectedParameterNames}
          queryDraft={queryDraft}
          onQueryChange={(params) => {
            setQueryDraft(params);
          }}
          onModeChange={handleModeChange}
          onSearch={() => {
            handleSearch();
          }}
        />
        <TbmParamTimeChartGroup data={chartData} />
      </div>
    </div>
  );
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

export function buildRuntimeQueryParams(
  tbmId: string,
  queryDraft: RuntimeQueryDraft,
  selectedCodes: string[]
): RuntimeSeriesQueryParams {
  if (queryDraft.mode === "time") {
    return {
      mode: "time",
      tbmId,
      workMode: queryDraft.workMode,
      fields: selectedCodes,
      from: String(queryDraft.from),
      to: String(queryDraft.to),
    };
  } else {
    return {
      mode: "ring",
      tbmId,
      workMode: queryDraft.workMode,
      fields: selectedCodes,
      from: Number(queryDraft.from),
      to: Number(queryDraft.to),
    };
  }
}
