import { pgPool } from "../db/pg.pool";
import { getTbmRuntimeContextByCode } from "./runtime.persistence";
import { TbmRuntimeData } from "./runtime.types";

export async function processRuntimePhaseIfNeeded(data: TbmRuntimeData) {
  const context = await getTbmRuntimeContextByCode(data.tbmCode);

  if (!context?.tbmId) return;

  const tunnelId = context.tunnelId;
  const tbmId = context.tbmId;

  const recordedAt = new Date(data.recordedAt).toISOString();

  const values = data.values;

  const ringNo = Number(values.ring_no ?? values.ringNo ?? values.s100100008 ?? 0);

  if (!Number.isFinite(ringNo)) {
    return;
  }

  const isAdvance = values.b000000001 === true || values.b000000001 === 1;
  const isAssembly = values.b000000002 === true || values.b000000002 === 1;

  const isStop = !isAdvance && !isAssembly;

  await handleTbmPhase({
    tbmId,
    tunnelId,
    ringNo,
    phaseType: "advance",
    isActive: isAdvance,
    recordedAt,
  });

  await handleTbmPhase({
    tbmId,
    tunnelId,
    ringNo,
    phaseType: "assembly",
    isActive: isAssembly,
    recordedAt,
  });

  await handleTbmPhase({
    tbmId,
    tunnelId,
    ringNo,
    phaseType: "stop",
    isActive: isStop,
    recordedAt,
  });

  // await handleTbmPhase({
  //     tunnelId,
  //     tbmId,
  //     ringNo,
  //     phaseType: "fault",
  //     isActive: values.b000000003 === true || values.b000000003 === 1,
  //     recordedAt,
  // });
}

type PhaseType = "advance" | "assembly" | "stop" | "fault";

interface HandlePhaseInput {
  tbmId: string;
  tunnelId?: string | null;
  ringNo: number;
  phaseType: PhaseType;
  isActive: boolean;
  recordedAt: string;
}

export async function handleTbmPhase(input: HandlePhaseInput) {
  const { tbmId, tunnelId, ringNo, phaseType, isActive, recordedAt } = input;

  if (isActive) {
    await openPhase({
      tbmId,
      tunnelId,
      ringNo,
      phaseType,
      startAt: recordedAt,
    });
  } else {
    await closePhase({
      tbmId,
      phaseType,
      endAt: recordedAt,
    });
  }
}

async function openPhase(input: {
  tbmId: string;
  tunnelId?: string | null;
  ringNo: number;
  phaseType: PhaseType;
  startAt: string;
}) {
  await pgPool.query(
    `
    insert into eqp.tbm_phase_active (
      tbm_id,
      tunnel_id,      
      ring_no,
      phase_type,
      start_at,
      source
    )
    values ($1, $2, $3, $4, $5, 'auto')
    on conflict (tbm_id, phase_type)
    do nothing
    `,
    [input.tbmId, input.tunnelId ?? null, input.ringNo, input.phaseType, input.startAt]
  );
}

async function closePhase(input: { tbmId: string; phaseType: PhaseType; endAt: string }) {
  await pgPool.query(
    `
    with active as (
      delete from eqp.tbm_phase_active
      where tbm_id = $1
        and phase_type = $2
      returning *
    )
    insert into eqp.tbm_phase_records (
      tbm_id,
      tunnel_id,      
      ring_no,
      phase_type,
      start_at,
      end_at,
      source,
      remark
    )
    select
      tbm_id,
      tunnel_id,      
      ring_no,
      phase_type,
      start_at,
      $3::timestamptz,
      source,
      remark
    from active
    where $3::timestamptz > start_at
    `,
    [input.tbmId, input.phaseType, input.endAt]
  );
}
