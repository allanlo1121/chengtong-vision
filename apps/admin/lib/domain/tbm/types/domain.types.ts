import { TbmDetailRow, TbmInsertRow, TbmListRow, TbmRow } from "./db.types";
import { Camelize } from "@/lib/utils/case-converter";

export type Tbm = Camelize<TbmRow>;

export type TbmListItem = Camelize<TbmListRow>;

export type TbmDetail = Camelize<TbmDetailRow>;

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

export type TbmInsertItem = Camelize<TbmInsertRow>;
