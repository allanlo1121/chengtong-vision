import { PickerItem, PickerQuery } from "@/lib/shared/picker/types";
import { TunnelPickerRow } from "./db.types";

export interface TunnelPickerItem extends PickerItem {
  organizationName: string | null;
  projectName: string | null;
  tunnelStatusName: string | null;
}

export interface TunnelPickerQuery extends PickerQuery {}

export type TunnelPickerResult = {
  data: TunnelPickerRow[];

  count: number;
};
