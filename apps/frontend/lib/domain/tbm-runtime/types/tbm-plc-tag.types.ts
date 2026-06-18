import { Database } from "@/lib/core/database/types";

export type TbmPlcTagRow = Database["tbm"]["Tables"]["plc_tags"]["Row"];

export type TbmPlcTagInsertRow = Database["tbm"]["Tables"]["plc_tags"]["Insert"];

export type TbmPlcTagUpdateRow = Database["tbm"]["Tables"]["plc_tags"]["Update"];

export type TbmPlcTag = {
  id: number;

  tbmId: string;

  tagName: string;

  dataType: string;

  unit?: string;

  internal?: string;

  bit?: number;

  comment?: string;

  archive: boolean;

  sortOrder: number;
};
