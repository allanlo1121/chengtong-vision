import { Database } from "@/lib/core/database/types";

export type TbmListRow = Database["eqp"]["Views"]["v_tbm_list"]["Row"];
export type TbmDetailRow = Database["eqp"]["Views"]["v_tbm_detail"]["Row"];

export type TbmRow = Database["eqp"]["Tables"]["tbms"]["Row"];
export type TbmInsertRow = Database["eqp"]["Tables"]["tbms"]["Insert"];
export type TbmUpdateRow = Database["eqp"]["Tables"]["tbms"]["Update"];

export type TbmPickerRow = Database["eqp"]["Views"]["v_tbm_picker"]["Row"];

export type tbmTypeCounts = Database["eqp"]["Views"]["v_tbm_type_counts"]["Row"];

export type TbmManufacturerCounts = Database["eqp"]["Views"]["v_tbm_manufacturer_counts"]["Row"];
