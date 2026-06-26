// import { TbmInsertRow, TbmListRow, TbmRow } from "./db.types";
// import { Camelize } from "@/lib/utils/case-converter";

import { Camelize } from "@/lib/shared/utils/case-converter";
import { TbmAssignmentListRow } from "./db.types";

// export type Tbm = Camelize<TbmRow>;

// export type TbmListItem = Camelize<TbmListRow>;

// export interface TbmListItem {
//   id: string;
//   code: string | null;
//   diameter: number | null;
//   power: number | null;
//   manageCode: string | null;
//   manufacturerId: string | null;
//   manufacturerName: string | null;
//   model: string | null;
//   name: string | null;
//   serialNo: string | null;
//   sortOrder: number | null;
//   tbmTypeId: string | null;
//   tbmTypeName: string | null;
//   isDisabled: boolean;
// }

// export type TbmInsertItem = Camelize<TbmInsertRow>;

export type TbmAssignmentListItem = Camelize<TbmAssignmentListRow>;

export type TbmAssignment = {
  id: string;
  tunnelId: string;
  tbmId: string;
  startDate: string;
  endDate: string | null;
};
