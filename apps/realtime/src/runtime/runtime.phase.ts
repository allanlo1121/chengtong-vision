import { pgPool } from "../db/pg.pool";
import { getTbmRuntimeContextByCode } from "./runtime.persistence";
import { TbmRuntimeData } from "./runtime.types";

export async function processRuntimePhaseIfNeeded(data: TbmRuntimeData) {
  const context = await getTbmRuntimeContextByCode(data.tbmCode);

  if (!context?.tbmId) return;

  const tbmId = context.tbmId;

  const recordedAt = new Date(data.recordedAt).toISOString();

  const values = data.values;

  const ringNoRaw = values.ring_no ?? values.ringNo ?? values.s100100008;

  const ringNo = ringNoRaw == null ? null : Number(ringNoRaw);

  if (ringNo == null || !Number.isFinite(ringNo)) {
    return;
  }

  const chainageRaw = values.chainage ?? values.chainageEnd ?? values.s100100005;

  const chainage = chainageRaw == null ? null : Number(chainageRaw);

  if (chainage == null || !Number.isFinite(chainage)) {
    return;
  }

  const isAdvance = values.b000000001 === true || values.b000000001 === 1;
  const isAssembly = values.b000000002 === true || values.b000000002 === 1;

  const isStop = !isAdvance && !isAssembly;

  await handleTbmPhase({
    tbmId,
    ringNo,
    chainage,
    phaseType: "advance",
    isActive: isAdvance,
    recordedAt,
  });

  await handleTbmPhase({
    tbmId,
    ringNo,
    chainage,
    phaseType: "assembly",
    isActive: isAssembly,
    recordedAt,
  });

  await handleTbmPhase({
    tbmId,
    ringNo,
    chainage,
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
  ringNo: number | null;
  chainage: number | null;
  phaseType: PhaseType;
  isActive: boolean;
  recordedAt: string;
}

export async function handleTbmPhase(input: HandlePhaseInput) {
  const { tbmId, ringNo, chainage, phaseType, isActive, recordedAt } = input;

  if (isActive) {
    await openPhase({
      tbmId,
      ringNo,
      chainage,
      phaseType,
      startAt: recordedAt,
    });
  } else {
    await closePhase({
      tbmId,
      ringNo,
      chainage,
      phaseType,
      endAt: recordedAt,
    });
  }
}

async function openPhase(input: {
  tbmId: string;
  ringNo: number | null;
  chainage: number | null;
  phaseType: PhaseType;
  startAt: string;
}) {
  await pgPool.query(
    `
    insert into tbm.tbm_phase_active (
      tbm_id,
      ring_no,
      chainage,
      phase_type,
      start_at,
      source
    )
    values ($1, $2, $3, $4, $5, 'auto')
    on conflict (tbm_id, phase_type)
    do update set
      ring_no = excluded.ring_no,
      chainage = excluded.chainage,
      start_at = excluded.start_at
    `,
    [input.tbmId, input.ringNo, input.chainage, input.phaseType, input.startAt]
  );
}

async function closePhase(input: {
  tbmId: string;
  phaseType: PhaseType;
  ringNo: number | null;
  chainage: number | null;
  endAt: string;
}) {
  await pgPool.query(
    `
    with active as (
      delete from tbm.tbm_phase_active
      where tbm_id = $1
        and phase_type = $2
      returning *
    )
    insert into tbm.tbm_phase_records (
      tbm_id,
      ring_no,
      chainage,
      phase_type,
      start_at,
      end_at,
      source,
      remark
    )
    select
      tbm_id,
      ring_no,
      chainage,
      phase_type,
      start_at,
      $3::timestamptz,
      source,
      remark
    from active
    `,
    [input.tbmId, input.phaseType, input.endAt]
  );
}
