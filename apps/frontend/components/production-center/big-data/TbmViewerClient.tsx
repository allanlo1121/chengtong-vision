'use client';

import { useEffect, useState } from 'react';
import TbmQueryForm from './TbmQueryDetailForm';
import { useTunnelFilter } from '@/contexts/TunnelFilterProvider';
import { fetchTbmParamByRing, fetchTbmParamHistory } from '@/lib/tbm/query-history/data';

export default function TbmViewerClient() {
    const { tunnels, filter, setFilter } = useTunnelFilter();
    const tunnelId = filter.tunnelId;
    const currentTunnel = tunnels.find((t) => t.id === tunnelId);

    useEffect(() => {
        if (!tunnelId && tunnels.length > 0) {
            setFilter({ ...filter, tunnelId: tunnels[0].id });
        }
    }, [tunnels, tunnelId]);

    const [result, setResult] = useState<any>(null);

    const handleQuery = async (params: any) => {
        if (params.mode === 'time') {
            const res = await fetchTbmParamHistory(params);
            setResult(res);
        } else if (params.mode === 'ring') {
            const res = await fetchTbmParamByRing(params);
            setResult(res);
        }
    };

    return (
        <div className="w-full h-full p-0">
            <TbmQueryForm onQuery={handleQuery} tunnel={currentTunnel} />
        </div>
    );
}
