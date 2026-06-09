import { EmployeePickerRow } from "./db.types";
import { PickerQuery } from "@/lib/shared/picker/types";

export type EmployeePickerItem = {
  id: string;
  name: string;
  code: string;

  organizationId?: string;
  organizationName?: string;
  postId?: string;
  postName?: string;
  sortOrder?: number;
};
export interface EmployeePickerQuery extends PickerQuery {
  organizationName?: string;
  postName?: string;
}

export type EmployeePickerResult = {
  data: EmployeePickerRow[];

  count: number;
};
