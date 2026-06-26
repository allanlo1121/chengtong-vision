import { PickerItem, PickerQuery } from "@/lib/shared/picker/types";
import { ProjectPickerRow } from "./db.types";

export interface ProjectPickerItem extends PickerItem {
  fullName?: string;
  organizationName?: string;
  regionName?: string;
  statusName?: string;
}

export interface ProjectPickerQuery extends PickerQuery {
  search?: string;
}

export type ProjectPickerResult = {
  data: ProjectPickerRow[];

  count: number;
};
