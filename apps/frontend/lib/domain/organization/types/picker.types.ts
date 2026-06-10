import { OrganizationPickerRow } from "./db.types";
import { PickerItem, PickerQuery } from "@/lib/shared/picker/types";
export interface OrganizationPickerItem extends PickerItem {
  cityName: string | null;
  orgTypeName: string | null;
  parentId: string | null;
  parentOrgName: string | null;
  provinceName: string | null;
  sortOrder: number | null;
}

export type OrganizationPickerResult = {
  data: OrganizationPickerRow[];

  count: number;
};

export interface OrganizationPickerQuery extends PickerQuery {
  parentId?: string;

  orgTypeName?: string;
}
