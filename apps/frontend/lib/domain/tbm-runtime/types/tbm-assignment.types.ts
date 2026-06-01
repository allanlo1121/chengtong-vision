import { Database } from "@/lib/core/database/types";
import { TbmRuntimeParameterListItem } from "./parameter.types";

export type TbmAssignmentRow = Database["eqp"]["Tables"]["tbm_assignments"]["Row"];
export type TbmAssignmentInsertRow = Database["eqp"]["Tables"]["tbm_assignments"]["Insert"];
export type TbmAssignmentUpdateRow = Database["eqp"]["Tables"]["tbm_assignments"]["Update"];

// export type TbmAssignmentListRow = Database["eqp"]["Views"]["v_tbm_assignments_list"]["Row"];
// export type TbmAssignmentPickerRow = Database["eqp"]["Views"]["v_tbm_assignments_picker"]["Row"];

export type TbmAssignment = {
  id: string;
  tunnelId: string;
  tbmId: string;
  startDate: string;
  endDate: string | null;
};
