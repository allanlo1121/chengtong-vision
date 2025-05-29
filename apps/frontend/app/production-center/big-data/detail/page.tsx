'use client'

import React, { useState, useEffect } from 'react'


// 使用动态引入并明确客户端组件
import TbmQueryDetailForm from '@/components/production-center/big-data/TbmQueryDetailForm'
import { fetchTbmParamHistory, fetchTbmParamByRing } from '@/lib/tbm/query-history/data'
import { useTunnelFilter } from "@/contexts/TunnelFilterProvider";
import { MultiParamCharts } from '@/components/production-center/big-data/MultiParamCharts'


const DEFAULT_FIELDS = ['s010102004', 's010109001', 's050001001'];

export default function Page() {
  const { tunnels, filter, setFilter } = useTunnelFilter();
  const tunnelId = filter.tunnelId;
  const currentTunnel = tunnels.find(t => t.id === tunnelId);
  console.log('[BigData] 当前隧道:', currentTunnel);
  console.log('[BigData] 当前隧道Id:', tunnelId);

  const ringToQuery =
    currentTunnel?.currentRing && currentTunnel.currentRing > 0
      ? currentTunnel.currentRing - 1
      : currentTunnel?.currentRing ?? 0;




  useEffect(() => {
    if (!tunnelId && tunnels.length > 0) {
      setFilter({ ...filter, tunnelId: tunnels[0].id });
    }
  }, [tunnels, tunnelId]);

  const [result, setResult] = useState<any>(null);

  const handleQuery = async (params: any) => {
    console.log('查询参数:', params);

    if (params.mode === 'time') {
      const res = await fetchTbmParamHistory({
        tunnelId: params.tunnel_id,
        from: params.from,
        to: params.to,
        fields: params.fields
      });
      setResult(res);
    } else if (params.mode === 'ring') {
      const { ring, fields, tunnel_id } = params;

      if (ring === null || ring === undefined) {
        console.error('环号不能为空');
        return;
      }
      if (fields.length === 0) {
        console.error('至少选择一个参数');
        return;
      }

      const res = await fetchTbmParamByRing({
        tunnelId: tunnel_id,
        ring: ring,
        fields: fields
      });
      console.log('查询结果:', res);
      setResult(res);
    }
  }

  // ✅ 自动触发首次查询
  useEffect(() => {
    if (tunnelId && currentTunnel) {
      handleQuery({
        mode: 'ring',
        tunnel_id: tunnelId,
        ring: ringToQuery,
        fields: DEFAULT_FIELDS
      });
    }
  }, [tunnelId, currentTunnel]);

return (
  <div className="w-full h-full relative  flex">
    {/* 左侧 - 查询栏，固定宽度 */}
    <div className="w-80  ">
      {currentTunnel ? (
        <TbmQueryDetailForm
          onQuery={handleQuery}
          tunnel_id={currentTunnel.id}
          current_ring={ringToQuery}
        />
      ) : (
        <div className="text-red-500 p-4">未选择隧道，请在左侧选择一个隧道。</div>
      )}
    </div>

    {/* 右侧 - 图表展示，自动撑满 */}
    <div className="flex-1 overflow-y-auto p-4 mt-20">
      {Array.isArray(result) && result.length > 0 ? (
        <MultiParamCharts rawData={result} />
      ) : (
        <div className="text-gray-400">尚未查询或无数据结果</div>
      )}
    </div>
  </div>
);
}