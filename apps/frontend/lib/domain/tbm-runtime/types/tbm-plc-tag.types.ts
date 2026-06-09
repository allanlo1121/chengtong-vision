import { Database } from "@/lib/core/database/types";
import { Camelize } from "@/lib/utils/case-converter";

export type TbmPlcTagRow = Database["eqp"]["Tables"]["tbm_plc_tags"]["Row"];

export type TbmPlcTagInsertRow = Database["eqp"]["Tables"]["tbm_plc_tags"]["Insert"];

export type TbmPlcTagUpdateRow = Database["eqp"]["Tables"]["tbm_plc_tags"]["Update"];

export interface TbmPlcTagWithTbmRow {
  id: number;

  tbm: {
    id: string;
    name: string;
  };

  tag_name: string;

  data_type: string;

  unit?: string | null;

  internal: string | null;

  bit: number | null;

  comment: string | null;

  archive: boolean;

  sort_order: number;
}

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

export interface TbmPlcTagFormModel {
  id: number;

  tbm: {
    id: string;
    name: string;
  };

  tagName: string;

  dataType: string;

  unit?: string;

  internal?: string;

  bit?: number;

  comment?: string;

  archive: boolean;

  sortOrder: number;
}
