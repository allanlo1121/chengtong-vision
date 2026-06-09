import { OrganizationPickerRow } from "./db.types";

export type OrganizationPickerItem = {
  id: string;
  name: string;
  cityName: string | null;
  orgTypeName: string | null;
  parentId: string | null;
  parentOrgName: string | null;
  provinceName: string | null;
  sortOrder: number | null;
};

export type OrganizationPickerResult = {
  data: OrganizationPickerRow[];

  count: number;
};

import { PickerQuery } from "@/lib/shared/picker/types";

export interface OrganizationPickerQuery extends PickerQuery {
  parentId?: string;

  orgTypeName?: string;
}
