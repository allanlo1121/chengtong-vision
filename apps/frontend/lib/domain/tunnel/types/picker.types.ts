import { PickerQuery } from "@/lib/shared/picker/types";
import { TunnelPickerRow } from "./db.types";

export type TunnelPickerItem = {
  id: string;
  name: string;
  organizationName: string | null;
  projectName: string | null;
  tunnelStatusName: string | null;
};

export interface TunnelPickerQuery extends PickerQuery {
  search?: string;
}

export type TunnelPickerResult = {
  data: TunnelPickerRow[];

  count: number;
};
