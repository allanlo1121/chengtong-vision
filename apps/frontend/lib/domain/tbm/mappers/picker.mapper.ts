import { TbmPickerItem, TbmPickerRow } from "../types";

export function mapTbmPicker(row: TbmPickerRow): TbmPickerItem {
  if (!row.id) {
    throw new Error("TbmPickerRow.id is null");
  }

  if (!row.name) {
    throw new Error("TbmPickerRow.name is null");
  }

  return {
    id: row.id,
    name: row.name,
    manageCode: row.manage_code ?? undefined,
    tbmTypeName: row.tbm_type_name ?? "未知类型",
    manufacturerName: row.manufacturer_name ?? undefined,
    diameter: row.diameter ?? undefined,
  };
}
