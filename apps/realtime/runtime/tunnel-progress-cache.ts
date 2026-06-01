import { pgPool } from "../db/pg.pool";

interface TunnelProgressCacheValue {
  ringEnd: number;
  chainageEnd: number | null;
  workDate: string;
}

const tunnelProgressCache = new Map<string, TunnelProgressCacheValue>();

export function getTunnelProgressCache(tunnelId: string) {
  return tunnelProgressCache.get(tunnelId);
}

export function setTunnelProgressCache(tunnelId: string, value: TunnelProgressCacheValue) {
  tunnelProgressCache.set(tunnelId, value);
}

export async function loadTunnelProgressCache() {
  const result = await pgPool.query(`
    select distinct on (tunnel_id)
      tunnel_id,
      work_date,
      ring_end,
      chainage_end
    from public.tunnel_daily_progress
    where ring_end is not null
    order by tunnel_id, work_date desc
  `);

  tunnelProgressCache.clear();

  for (const row of result.rows) {
    tunnelProgressCache.set(row.tunnel_id, {
      ringEnd: Number(row.ring_end),
      chainageEnd: row.chainage_end == null ? null : Number(row.chainage_end),
      workDate: row.work_date,
    });
  }

  console.log("Tunnel progress cache loaded", {
    size: tunnelProgressCache.size,
  });
}
