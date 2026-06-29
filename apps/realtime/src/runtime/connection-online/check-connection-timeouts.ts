import { pgPool } from "../../db/pg.pool";
import { markConnectionOffline } from "./mark-connection";
import type { ConnectionType } from "./types";

const HEARTBEAT_TIMEOUT_MS = 60_000;
const REALDATA_TIMEOUT_MS = 5 * 60_000;

const CONNECTION_TIMEOUTS: Record<ConnectionType, number> = {
  heartbeat: HEARTBEAT_TIMEOUT_MS,
  realdata: REALDATA_TIMEOUT_MS,
};

export async function checkConnectionTimeouts() {
  for (const [type, timeoutMs] of Object.entries(CONNECTION_TIMEOUTS)) {
    await checkTimeoutByType(type as ConnectionType, timeoutMs);
  }
}

async function checkTimeoutByType(type: ConnectionType, timeoutMs: number) {
  const result = await pgPool.query(
    `
    select tbm_id
    from tbm.tbm_connection_status
    where type = $1
      and is_online = true
      and last_seen_at < now() - ($2::text)::interval
    `,
    [type, `${timeoutMs} milliseconds`]
  );

  const offlineAt = new Date().toISOString();

  for (const row of result.rows) {
    await markConnectionOffline({
      type,
      tbmId: row.tbm_id,
      offlineAt,
    });
  }
}
