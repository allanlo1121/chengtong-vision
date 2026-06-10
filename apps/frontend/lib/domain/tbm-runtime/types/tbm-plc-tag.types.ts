import { Database } from "@/lib/core/database/types";

export type TbmPlcTagRow = Database["eqp"]["Tables"]["tbm_plc_tags"]["Row"];

export type TbmPlcTagInsertRow = Database["eqp"]["Tables"]["tbm_plc_tags"]["Insert"];

export type TbmPlcTagUpdateRow = Database["eqp"]["Tables"]["tbm_plc_tags"]["Update"];

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
