import { PickerQuery } from "@/lib/shared/picker/types";
import { ProjectPickerRow } from "./db.types";

export type ProjectPickerItem = {
  id: string;
  name: string;
  fullName?: string;
  organizationName?: string;
  regionName?: string;
  statusName?: string;
};

export interface ProjectPickerQuery extends PickerQuery {
  search?: string;

  organizationName?: string;
}

export type ProjectPickerResult = {
  data: ProjectPickerRow[];

  count: number;
};
