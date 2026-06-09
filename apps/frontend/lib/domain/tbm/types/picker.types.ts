import { TbmPickerRow } from "./db.types";
import { PickerQuery } from "@/lib/shared/picker/types";

export type TbmPickerItem = {
  id: string;
  name: string;
  diameter?: number;

  manageCode?: string;
  manufacturerName?: string;

  tbmTypeName: string;
};

export interface TbmPickerQuery extends PickerQuery {
  tbmTypeName?: string;
  manufacturerName?: string;
}

export type TbmPickerResult = {
  data: TbmPickerRow[];

  count: number;
};
