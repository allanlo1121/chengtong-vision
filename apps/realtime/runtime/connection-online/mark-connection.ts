import { pgPool } from "../../db/pg.pool";
import { MarkOfflineInput, MarkOnlineInput } from "./types";

export async function markConnectionOnline(input: MarkOnlineInput) {
  const client = await pgPool.connect();

  try {
    await client.query("begin");

    const currentResult = await client.query(
      `
      select is_online
      from eqp.tbm_connection_status
      where tbm_id = $1
        and type = $2
      for update
      `,
      [input.tbmId, input.type]
    );

    const existed = currentResult.rows.length > 0;
    const wasOnline = currentResult.rows[0]?.is_online === true;

    await client.query(
      `
      insert into eqp.tbm_connection_status (
        tbm_id,
        tunnel_id,
        type,
        last_seen_at,
        is_online,
        updated_at
      )
      values ($1, $2, $3, $4, true, now())
      on conflict (tbm_id, type)
      do update set
        tunnel_id = excluded.tunnel_id,
        last_seen_at = excluded.last_seen_at,
        is_online = true,
        updated_at = now()
      `,
      [input.tbmId, input.tunnelId ?? null, input.type, input.seenAt]
    );

    if (!existed || !wasOnline) {
      await client.query(
        `
        update eqp.tbm_connection_status_history
        set end_at = $3
        where tbm_id = $1
          and type = $2
          and end_at is null
        `,
        [input.tbmId, input.type, input.seenAt]
      );

      await client.query(
        `
        insert into eqp.tbm_connection_status_history (
          tbm_id,
          tunnel_id,
          type,
          status,
          start_at,
          source
        )
        values ($1, $2, $3, 'online', $4, 'auto')
        `,
        [input.tbmId, input.tunnelId ?? null, input.type, input.seenAt]
      );
    }

    await client.query("commit");
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}

export async function markConnectionOffline(input: MarkOfflineInput) {
  const client = await pgPool.connect();

  try {
    await client.query("begin");

    const currentResult = await client.query(
      `
      select tunnel_id, is_online
      from eqp.tbm_connection_status
      where tbm_id = $1
        and type = $2
      for update
      `,
      [input.tbmId, input.type]
    );

    const current = currentResult.rows[0];

    if (!current || current.is_online === false) {
      await client.query("commit");
      return;
    }

    await client.query(
      `
      update eqp.tbm_connection_status
      set
        is_online = false,
        updated_at = now()
      where tbm_id = $1
        and type = $2
      `,
      [input.tbmId, input.type]
    );

    await client.query(
      `
      update eqp.tbm_connection_status_history
      set end_at = $3
      where tbm_id = $1
        and type = $2
        and end_at is null
      `,
      [input.tbmId, input.type, input.offlineAt]
    );

    await client.query(
      `
      insert into eqp.tbm_connection_status_history (
        tbm_id,
        tunnel_id,
        type,
        status,
        start_at,
        source
      )
      values ($1, $2, $3, 'offline', $4, 'auto')
      `,
      [input.tbmId, current.tunnel_id ?? null, input.type, input.offlineAt]
    );

    await client.query("commit");
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}
