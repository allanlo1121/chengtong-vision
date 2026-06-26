import { TbmPickerRow } from "./db.types";
import { PickerItem, PickerQuery } from "@/lib/shared/picker/types";

export interface TbmPickerItem extends PickerItem {
  diameter?: number;

  manageCode?: string;
  manufacturerName?: string;

  tbmTypeName: string;
}

export interface TbmPickerQuery extends PickerQuery {}

export type TbmPickerResult = {
  data: TbmPickerRow[];

  count: number;
};
