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
    manageCode: row.manage_code,
    tbmTypeName: row.tbm_type_name,
    manufacturerName: row.manufacturer_name,
    diameter: row.diameter,
  };
}
