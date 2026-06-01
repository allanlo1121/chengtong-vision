import { SelectOption, MasterOption, CodeOption } from "../types";

export function mapMasterOption(row: MasterOption): SelectOption {
  return {
    value: String(row.id),
    label: row.name,
  };
}

export function mapCodeOption(row: CodeOption): SelectOption {
  return {
    value: row.code,
    label: row.name,
  };
}

export function toSelectOptions(rows: MasterOption[]): SelectOption[] {
  return rows.map((row) => ({
    value: String(row.id),
    label: row.name,
  }));
}

// export function mapMasterOption(row: MasterOption): SelectOption {
//   return {
//     value: String(row.id),
//     label: row.name,
//   };
// }
