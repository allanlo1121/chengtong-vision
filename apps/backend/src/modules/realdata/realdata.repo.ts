import { supabase } from "../../core/supabase/client.js";

const TABLE_PREFIX = "shield_realdata_";
const REALDATA_COLUMNS = [
  "b000000001",
  "b000000002",
  "s050001001",
  "s050009003",
  "s050109001",
  "s050001019",
  "s050001020",
  "s050001021",
  "s050001022",
  "s050001023",
  "s050001024",
  "s050006005",
  "s050006006",
  "s050006007",
  "s050006008",
  "s050006009",
  "s050006010",
  "s010102004",
  "s010103006",
  "s010109001",
  "s020901001",
  "s020901002",
  "s020901003",
  "s020901004",
  "s020901005",
  "s020901006",
  "s100100001",
  "s100100005",
  "s100100006",
  "s100100007",
  "s100100008",
  "s100111009",
  "s100111010",
  "s100111011",
  "s100111012",
  "s100206003",
  "s100206004",
  "s100206006",
  "s100206007",
  "s100206009",
  "s100206010",
];

function resolveTableName(tbmId: string): string | null {
  if (!tbmId || typeof tbmId !== "string") return null;
  const prefix = tbmId.slice(0, 8).toLowerCase();
  if (!/^[0-9a-f]{8}$/.test(prefix)) return null;
  return `${TABLE_PREFIX}${prefix}`;
}

function buildInsertRow(tbmId: string, cleaned: Record<string, any>, recordedAt: string) {
  const row: Record<string, any> = {
    recorded_at: new Date(recordedAt).toISOString(),
    tunnel_id: cleaned.tunnel_id ?? cleaned.tunnelId ?? null,
  };

  for (const key of REALDATA_COLUMNS) {
    if (key in cleaned) {
      row[key] = cleaned[key];
    }
  }

  return row;
}

export const RealdataRepo = {
  async insert(tbmId: string, cleaned: Record<string, any>, recordedAt: string) {
    const tableName = resolveTableName(tbmId);

    if (!tableName) {
      console.error("RealdataRepo.insert: invalid tbm_id for table routing:", tbmId);
      return;
    }

    const row = buildInsertRow(tbmId, cleaned, recordedAt);
    if (!row.tunnel_id) {
      console.error("RealdataRepo.insert: missing tunnel_id in cleaned payload for tbm:", tbmId);
      return;
    }
    const { error } = await supabase.from(tableName).insert(row);

    if (error) {
      console.error(`RealdataRepo.insert: failed to insert into ${tableName}:`, error);
    }
  },
};
