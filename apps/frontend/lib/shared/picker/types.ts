import { DataTableRow } from "./data-table";

export interface PickerQuery {
  search?: string;

  page?: number;

  pageSize?: number;
}

export interface PickerItem extends DataTableRow {
  name: string;
}
