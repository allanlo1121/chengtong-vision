import { SelectOption, MasterOption, CodeOption } from "../types";

export function mapMasterOption(row: MasterOption): SelectOption {
  return {
    value: row.id,
    label: row.name,
  };
}

export function mapCodeOption(row: CodeOption): SelectOption {
  return {
    value: row.code,
    label: row.name,
  };
}
