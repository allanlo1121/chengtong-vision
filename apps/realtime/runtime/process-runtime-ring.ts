import { pgPool } from "../db/pg.pool";
import { toDateString } from "../utils/date";
import type { TbmRuntimeData } from "./runtime.types";
import { createSystemAlarm } from "./alarm/create-system-alarm";
import { getTunnelProgressCache, setTunnelProgressCache } from "./tunnel-progress-cache";
import { getWorkDate } from "./stat-period";

interface ProcessRuntimeRingInput {
  data: TbmRuntimeData;
  tbmId: string;
  tunnelId: string;
}

export async function processRuntimeRingIfNeeded(input: ProcessRuntimeRingInput) {
  const { data, tbmId, tunnelId } = input;

  const recordedAt = new Date(data.recordedAt).toISOString();

  const ringNo = Number(data.values.s100100008 ?? data.values.ring_no ?? data.values.ringNo);

  if (!Number.isInteger(ringNo) || ringNo < 0) {
    return;
  }

  const chainageRaw = data.values.s100100005 ?? data.values.chainage ?? data.values.chainageEnd;

  const chainage = chainageRaw == null || chainageRaw === "" ? null : Number(chainageRaw);

  await processRingProgress({
    tbmId,
    tunnelId,
    ringNo,
    chainage: Number.isFinite(chainage) ? chainage : null,
    recordedAt,
  });
}

async function processRingProgress(input: {
  tbmId: string;
  tunnelId: string;
  ringNo: number;
  chainage: number | null;
  recordedAt: string;
}) {
  const previous = getTunnelProgressCache(input.tunnelId);

  console.log("Processing ring progress", {
    tunnelId: input.tunnelId,
    ringNo: input.ringNo,
    chainage: input.chainage,
    recordedAt: input.recordedAt,
    previous,
  });

  const workDate = toDateString(getWorkDate(input.recordedAt));

  console.log("Determined work date", {
    workDate,
  });

  if (!previous) {
    await upsertTunnelDailyProgress({
      tunnelId: input.tunnelId,
      tbmId: input.tbmId,
      workDate,
      ringEnd: input.ringNo,
      chainageEnd: input.chainage,
    });

    setTunnelProgressCache(input.tunnelId, {
      ringEnd: input.ringNo,
      chainageEnd: input.chainage,
      workDate,
    });

    return;
  }

  const deltaRing = input.ringNo - previous.ringEnd;

  if (deltaRing < 0) {
    await createSystemAlarm(pgPool, {
      tbmId: input.tbmId,
      tunnelId: input.tunnelId,
      alarmType: "ring_decrease",
      level: "critical",
      title: "环号异常减少",
      message: `环号从 ${previous.ringEnd} 减少到 ${input.ringNo}`,
      oldValue: previous.ringEnd,
      newValue: input.ringNo,
      deltaValue: deltaRing,
      occurredAt: input.recordedAt,
      metadata: {
        previousWorkDate: previous.workDate,
        currentWorkDate: workDate,
      },
    });
  }

  if (deltaRing > 5) {
    await createSystemAlarm(pgPool, {
      tbmId: input.tbmId,
      tunnelId: input.tunnelId,
      alarmType: "ring_jump",
      level: "warning",
      title: "环号跳变异常",
      message: `环号从 ${previous.ringEnd} 跳变到 ${input.ringNo}，一次增加 ${deltaRing} 环`,
      oldValue: previous.ringEnd,
      newValue: input.ringNo,
      deltaValue: deltaRing,
      occurredAt: input.recordedAt,
      metadata: {
        previousWorkDate: previous.workDate,
        currentWorkDate: workDate,
      },
    });
  }

  if (deltaRing > 0 || input.chainage !== previous.chainageEnd) {
    await upsertTunnelDailyProgress({
      tunnelId: input.tunnelId,
      tbmId: input.tbmId,
      workDate,
      ringEnd: input.ringNo,
      chainageEnd: input.chainage,
    });

    setTunnelProgressCache(input.tunnelId, {
      ringEnd: input.ringNo,
      chainageEnd: input.chainage,
      workDate,
    });
  }
}

async function upsertTunnelDailyProgress(input: {
  tunnelId: string;
  tbmId: string;
  workDate: string;
  ringEnd: number;
  chainageEnd: number | null;
}) {
  await pgPool.query(
    `
    insert into public.tunnel_daily_progress (
      tunnel_id,
      tbm_id,
      work_date,
      ring_end,
      chainage_end,
      updated_at
    )
    values ($1, $2, $3, $4, $5, now())
    on conflict (tunnel_id, work_date)
    do update set
      tbm_id = excluded.tbm_id,
      ring_end = greatest(
        public.tunnel_daily_progress.ring_end,
        excluded.ring_end
      ),
      chainage_end = coalesce(
        excluded.chainage_end,
        public.tunnel_daily_progress.chainage_end
      ),
      updated_at = now()
    `,
    [input.tunnelId, input.tbmId, input.workDate, input.ringEnd, input.chainageEnd]
  );
}
