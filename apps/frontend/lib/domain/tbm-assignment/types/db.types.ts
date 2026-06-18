import { Database } from "@/lib/core/database/types";

export type TbmAssignmentRow = Database["tbm"]["Tables"]["tbm_assignments"]["Row"];
export type TbmAssignmentInsertRow = Database["tbm"]["Tables"]["tbm_assignments"]["Insert"];
export type TbmAssignmentUpdateRow = Database["tbm"]["Tables"]["tbm_assignments"]["Update"];

export type TbmAssignmentListRow = Database["tbm"]["Views"]["v_tbm_assignment_list"]["Row"];
