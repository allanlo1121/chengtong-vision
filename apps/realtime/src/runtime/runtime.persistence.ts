import { pgPool } from "../db/pg.pool";
import { TbmRuntimeContext, TbmRuntimeData } from "./runtime.types";

const persistIntervalMs = Number(process.env.RUNTIME_PERSIST_INTERVAL_MS ?? 30_000);

const lastPersistAt = new Map<string, number>();

function normalizeTbmCode(tbmCode: string) {
  return tbmCode.toLowerCase().replace(/[^a-z0-9_]/g, "_");
}

function quoteIdent(name: string) {
  return `"${name.replace(/"/g, '""')}"`;
}

function getShieldTableName(tbmCode: string) {
  return `shield_${normalizeTbmCode(tbmCode)}`;
}

export async function getTbmRuntimeContextByCode(tbmCode: string): Promise<TbmRuntimeContext> {
  const { rows } = await pgPool.query<TbmRuntimeContext>(
    `
    select
      t.id as "tbmId",
      t.code as "tbmCode",
      a.id as "assignmentId"
    from tbm.tbms t
    left join tbm.tbm_assignments a
      on a.tbm_id = t.id
     and a.end_date is null
    where lower(t.code) = lower($1)
    order by a.start_date desc nulls last
    limit 1
    `,
    [tbmCode]
  );

  const row = rows[0];

  if (!row) {
    throw new Error(`TBM not found: ${tbmCode}`);
  }

  return row;
}

async function getAllowedParameterCodes(tbmId: string): Promise<Set<string>> {
  const { rows } = await pgPool.query<{ code: string }>(
    `
    select p.code
    from tbm.tbm_parameter_configs b
    join tbm.tbm_runtime_parameters p
      on p.id = b.parameter_id
    where b.tbm_id = $1
      and coalesce(b.is_disabled, false) = false
      and coalesce(p.is_disabled, false) = false
    `,
    [tbmId]
  );

  return new Set(rows.map((row) => row.code));
}

export async function persistRuntimeIfNeeded(data: TbmRuntimeData) {
  const last = lastPersistAt.get(data.tbmCode) ?? 0;

  if (data.recordedAt - last < persistIntervalMs) {
    return;
  }

  lastPersistAt.set(data.tbmCode, data.recordedAt);

  await insertShieldRealdata(data);
}

async function insertShieldRealdata(data: TbmRuntimeData) {
  console.log("Persisting runtime data to database", {
    tbmCode: data.tbmCode,
    recordedAt: data.recordedAt,
    dataValues: data.values,
  });
  const tableName = getShieldTableName(data.tbmCode);
  const fullTableName = `realdata.${quoteIdent(tableName)}`;

  const context = await getTbmRuntimeContextByCode(data.tbmCode);

  const tbmId = context.tbmId;

  const allowedCodes = await getAllowedParameterCodes(tbmId);

  const entries = Object.entries(data.values)
    .filter(([code]) => allowedCodes.has(code))
    .filter(([, value]) => value !== undefined);

  const columns = ["tbm_id", "recorded_at", ...entries.map(([code]) => quoteIdent(code))];

  const placeholders = columns.map((_, index) => `$${index + 1}`);

  const sql = `
    insert into ${fullTableName} (
      ${columns.join(", ")}
    )
    values (
      ${placeholders.join(", ")}
    )
  `;

  const params = [tbmId, new Date(data.recordedAt), ...entries.map(([, value]) => value)];

  await pgPool.query(sql, params);
}
