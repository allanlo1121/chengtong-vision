import { MasterOption, MasterOptionRow } from "../types";

export function mapMasterOption(row: MasterOptionRow): MasterOption {
  return {
    id: row.id,
    name: row.name,
    code: row.code,
    description: row.description,
    definitionId: row.definition_id,
    definitionCode: row.definition_code,
    definitionName: row.definition_name,
  };
}
