
import type { Database } from "../supabase/supabase.types";

export type TbmActiveParameterStateRow =
    Database["public"]["Tables"]["tbm_active_parameter_state"]["Row"];

export type TbmActiveParameterStateInsert =
    Database["public"]["Tables"]["tbm_active_parameter_state"]["Insert"];