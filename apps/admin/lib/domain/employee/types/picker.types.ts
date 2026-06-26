import { EmployeePickerRow } from "./db.types";

import { PickerItem, PickerQuery } from "@/lib/shared/picker/types";

export interface EmployeePickerItem extends PickerItem {
  code: string;
  organizationId?: string;
  organizationName?: string;
  postId?: string;
  postName?: string;
  sortOrder?: number;
}
export interface EmployeePickerQuery extends PickerQuery {}

export type EmployeePickerResult = {
  data: EmployeePickerRow[];

  count: number;
};
