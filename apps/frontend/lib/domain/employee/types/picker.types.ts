import { Camelize } from "@/lib/utils/case-converter";
import { EmployeePickerRow } from "./db.types";
import { OptionalNullable, SelectiveRemoveNull } from "@/lib/utils/remove-nullable";

export type EmployeePickerItem = SelectiveRemoveNull<
  OptionalNullable<Camelize<EmployeePickerRow>>,
  "id" | "name"
>;

export type EmployeePickerQuery = {
  search?: string;

  organizationId?: string;

  organizationName?: string;

  postId?: string;
  postName?: string;

  page?: number;

  pageSize?: number;
};

export type EmployeePickerResult = {
  data: EmployeePickerRow[];

  count: number;
};
