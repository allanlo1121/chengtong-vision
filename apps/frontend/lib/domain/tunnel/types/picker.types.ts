import { Camelize } from "@/lib/utils/case-converter";
import { TunnelPickerRow } from "./db.types";
import { OptionalNullable, SelectiveRemoveNull } from "@/lib/utils/remove-nullable";

export type TunnelPickerItem = SelectiveRemoveNull<
  OptionalNullable<Camelize<TunnelPickerRow>>,
  "id" | "name"
>;

export type TunnelPickerQuery = {
  tunnelId?: string;
  search?: string;

  page?: number;
  pageSize?: number;
};

export type TunnelPickerResult = {
  data: TunnelPickerRow[];

  count: number;
};
