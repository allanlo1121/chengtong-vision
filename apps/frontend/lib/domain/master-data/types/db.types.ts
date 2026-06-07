import { Database } from "@/lib/core/database/types";
import { Camelize } from "@/lib/utils/case-converter";

export type MasterOptionRow = Database["public"]["Views"]["v_master_options"]["Row"];

export type MasterOption = Camelize<MasterOptionRow>;
