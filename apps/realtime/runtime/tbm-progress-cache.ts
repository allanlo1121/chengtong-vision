import { pgPool } from "../db/pg.pool";

interface TbmProgressCacheValue {
  ringEnd: number;
  chainageEnd: number | null;
  workDate: string;
}

const tbmProgressCache = new Map<string, TbmProgressCacheValue>();

export function getTbmProgressCache(tbmId: string) {
  return tbmProgressCache.get(tbmId);
}

export function setTbmProgressCache(tbmId: string, value: TbmProgressCacheValue) {
  tbmProgressCache.set(tbmId, value);
}

export async function loadTbmProgressCache() {
  const result = await pgPool.query(`
    select distinct on (tbm_id)
      tbm_id,
      work_date,
      ring_end,
      chainage_end
    from tbm.tbm_daily_progress
    where ring_end is not null
    order by tbm_id, work_date desc
  `);

  tbmProgressCache.clear();

  for (const row of result.rows) {
    tbmProgressCache.set(row.tbm_id, {
      ringEnd: Number(row.ring_end),
      chainageEnd: row.chainage_end == null ? null : Number(row.chainage_end),
      workDate: row.work_date,
    });
  }

  console.log("TBM progress cache loaded", {
    size: tbmProgressCache.size,
  });
}
