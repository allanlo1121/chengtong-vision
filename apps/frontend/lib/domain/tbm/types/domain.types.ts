// export type EmployeeListItem = {
//   id: string;
//   name: string;
//   code: string | null;
//   organizationId: string | null;
//   organizationName: string | null;
//   statusName: string | null;

import { RemoveNull } from "@/lib/utils/remove-nullable";
import { TbmInsertRow, TbmRow } from "./db.types";
import { Camelize } from "@/lib/utils/case-converter";

//   sortOrder: number;
//   createdAt: string;
// };

export type Tbm = Camelize<TbmRow>;

export interface TbmListItem {
  id: string;
  code: string | null;
  diameter: number | null;
  power: number | null;
  manageCode: string | null;
  manufacturerId: string | null;
  manufacturerName: string | null;
  model: string | null;
  name: string | null;
  serialNo: string | null;
  sortOrder: number | null;
  tbmTypeId: string | null;
  tbmTypeName: string | null;
  isDisabled: boolean;
}

export type TbmInsertItem = Camelize<TbmInsertRow>;
