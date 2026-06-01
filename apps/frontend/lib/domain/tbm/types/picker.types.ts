import { Camelize } from "@/lib/utils/case-converter";
import { TbmPickerRow } from "./db.types";
import { OptionalNullable, SelectiveRemoveNull } from "@/lib/utils/remove-nullable";

export type TbmPickerItem = SelectiveRemoveNull<
  OptionalNullable<Camelize<TbmPickerRow>>,
  "id" | "name"
>;

export type TbmPickerQuery = {
  tbmId?: string;
  search?: string;

  tbmTypeName?: string;
  manufacturerName?: string;
  diameterRange?: [number, number];
  page?: number;
  pageSize?: number;
};

export type TbmPickerResult = {
  data: TbmPickerRow[];

  count: number;
};
