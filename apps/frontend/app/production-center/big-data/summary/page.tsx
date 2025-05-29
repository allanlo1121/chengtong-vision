'use client'

import React, { useState, useEffect } from 'react'


// 使用动态引入并明确客户端组件
import TbmQuerySummaryForm from '@/components/production-center/big-data/TbmQuerySummaryForm'
import { fetchTbmParamSummaryAvgMaxByRings } from '@/lib/tbm/query-history/data'
import { useTunnelFilter } from "@/contexts/TunnelFilterProvider";
import { TbmParamRingChartGroup } from '@/components/production-center/big-data/TbmParamRingChartGroup'

export function transformRingSummaryData(
  raw: { ring: number; data: Record<string, number> }[]
): Record<string, { ring: number; avg: number; max: number }[]> {
  const result: Record<string, { ring: number; avg: number; max: number }[]> = {};

  for (const row of raw) {
    const ring = row.ring;
    const data = row.data;

    for (const key of Object.keys(data)) {
      const match = key.match(/^(avg|max)_(.+)$/);
      if (!match) continue;

      const [, agg, field] = match;
      if (!result[field]) result[field] = [];

      let existing = result[field].find(item => item.ring === ring);
      if (!existing) {
        existing = { ring, avg: NaN, max: NaN };
        result[field].push(existing);
      }

      existing[agg as 'avg' | 'max'] = data[key];
    }
  }

  // 可选：排序每个字段的 ring 顺序
  for (const field of Object.keys(result)) {
    result[field].sort((a, b) => a.ring - b.ring);
  }

  return result;
}


const DEFAULT_FIELDS = ['s010102004', 's010109001', 's050001001'];

export default function Page() {
  const { tunnels, filter, setFilter } = useTunnelFilter();
  const tunnelId = filter.tunnelId;
  const currentTunnel = tunnels.find(t => t.id === tunnelId);
  // console.log('[BigData] 当前隧道:', currentTunnel);
  // console.log('[BigData] 当前隧道Id:', tunnelId);

  const ringToQuery =
    currentTunnel?.currentRing && currentTunnel.currentRing > 0
      ? currentTunnel.currentRing - 1
      : currentTunnel?.currentRing ?? 0;
  const defaultStart = ringToQuery != null ? Math.max(ringToQuery - 10, 0) : null;
  useEffect(() => {
    if (!tunnelId && tunnels.length > 0) {
      setFilter({ ...filter, tunnelId: tunnels[0].id });
    }
  }, [tunnels, tunnelId]);

  const [result, setResult] = useState<any>(null);

  const handleQuery = async (params: any) => {
    console.log('查询参数:', params);

    if (tunnelId === null || tunnelId === undefined) {
      console.error('隧道ID不能为空');
      return;
    }

    const { ringStart, ringEnd, fields } = params;

    if (ringStart === null || ringStart === undefined || ringEnd === null || ringEnd === undefined) {
      console.error('环号不能为空');
      return;
    }
    if (fields.length === 0) {
      console.error('至少选择一个参数');
      return;
    }

    const res = await fetchTbmParamSummaryAvgMaxByRings({
      tunnelId: tunnelId,
      ringStart: ringStart,
      ringEnd: ringEnd,
      fields: fields
    });
    console.log('查询结果:', res);

    const transformed = transformRingSummaryData(res);
    setResult(transformed);
  }


  // ✅ 自动触发首次查询
  useEffect(() => {
    if (tunnelId && currentTunnel) {
      handleQuery({
        tunnelId: tunnelId,
        ringStart: defaultStart,
        ringEnd: ringToQuery,
        fields: DEFAULT_FIELDS
      });
    }
  }, [tunnelId, currentTunnel]);

  return (
    <div className="w-full h-full relative  flex">
      {/* 左侧 - 查询栏，固定宽度 */}
      <div className="w-80  ">
        {currentTunnel ? (
          <TbmQuerySummaryForm
            onQuery={handleQuery}
            tunnelId={currentTunnel.id}
            currentRing={ringToQuery}
          />
        ) : (
          <div className="text-red-500 p-4">未选择隧道，请在左侧选择一个隧道。</div>
        )}
      </div>

      {/* 右侧 - 图表展示，自动撑满 */}
      <div className="flex-1 overflow-y-auto p-4 mt-20">
              {result && typeof result === 'object' && !Array.isArray(result) && Object.keys(result).length > 0 ? (
                <TbmParamRingChartGroup data={result} />
              ) : (
                <div className="text-gray-400">尚未查询或无数据结果</div>
              )}
            </div>
    </div>
  );
}