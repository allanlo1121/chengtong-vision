import { Database } from "@/lib/core/database/types";

export type TbmAssignmentRow = Database["eqp"]["Tables"]["tbm_assignments"]["Row"];
export type TbmAssignmentInsertRow = Database["eqp"]["Tables"]["tbm_assignments"]["Insert"];
export type TbmAssignmentUpdateRow = Database["eqp"]["Tables"]["tbm_assignments"]["Update"];

export type TbmAssignmentListRow = Database["eqp"]["Views"]["v_tbm_assignment_list"]["Row"];
