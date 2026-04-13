import { MasterOptionItem, MasterOptionRow } from "../types";

export function mapMasterOptionRowToItem(row: MasterOptionRow): MasterOptionItem {
  return {
    id: row.id,
    name: row.name,
    code: row.code,
    description: row.description,
    definitionCode: row.definition_code,
    definitionName: row.definition_name,
  };
}
