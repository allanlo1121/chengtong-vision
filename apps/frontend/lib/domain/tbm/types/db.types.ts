import { Database } from "@/lib/core/database/types";

export type TbmListRow = Database["tbm"]["Views"]["v_tbm_list"]["Row"];
export type TbmDetailRow = Database["tbm"]["Views"]["v_tbm_detail"]["Row"];

export type TbmRow = Database["tbm"]["Tables"]["tbms"]["Row"];
export type TbmInsertRow = Database["tbm"]["Tables"]["tbms"]["Insert"];
export type TbmUpdateRow = Database["tbm"]["Tables"]["tbms"]["Update"];

export type TbmPickerRow = Database["tbm"]["Views"]["v_tbm_picker"]["Row"];

export type tbmTypeCounts = Database["tbm"]["Views"]["v_tbm_type_counts"]["Row"];

export type TbmManufacturerCounts = Database["tbm"]["Views"]["v_tbm_manufacturer_counts"]["Row"];
