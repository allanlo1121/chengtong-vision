import { Camelize } from "@/lib/utils/case-converter";
import { OrganizationPickerRow } from "./db.types";
import { OptionalNullable, SelectiveRemoveNull } from "@/lib/utils/remove-nullable";

export type OrganizationPickerItem = SelectiveRemoveNull<
  OptionalNullable<Camelize<OrganizationPickerRow>>,
  "id" | "name"
>;

export type OrganizationPickerQuery = {
  search?: string;

  parentId?: string;

  orgTypeName?: string;

  parentOrgName?: string;

  provinceName?: string;

  cityName?: string;

  page?: number;

  pageSize?: number;
};

export type OrganizationPickerResult = {
  data: OrganizationPickerRow[];

  count: number;
};
