import { Camelize } from "@/lib/utils/case-converter";
import { ProjectPickerRow } from "./db.types";
import { OptionalNullable, SelectiveRemoveNull } from "@/lib/utils/remove-nullable";

export type ProjectPickerItem = SelectiveRemoveNull<
  OptionalNullable<Camelize<ProjectPickerRow>>,
  "id" | "name"
>;

export type ProjectPickerQuery = {
  search?: string;

  organizationId?: string;

  page?: number;

  pageSize?: number;
};

export type ProjectPickerResult = {
  data: ProjectPickerRow[];

  count: number;
};
