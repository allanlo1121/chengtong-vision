import { toPgDate } from "@/lib/utils/time";
import { CreateTbmAssignmentFormInput } from "../schemas/tbm-assignment.schema";
import { TbmAssignmentRow, TbmAssignment, TbmAssignmentInsertRow } from "../types";

export function mapTbmAssignmentRowToEntity(row: TbmAssignmentRow): TbmAssignment {
  return {
    id: row.id,
    tbmId: row.tbm_id,
    tunnelId: row.tunnel_id,
    startDate: row.start_date,
    endDate: row.end_date,
  };
}

export function mapCreateTbmAssignmentInputToRow(
  input: CreateTbmAssignmentFormInput
): TbmAssignmentInsertRow {
  return {
    tbm_id: input.tbmId,
    tunnel_id: input.tunnelId,
    start_date: toPgDate(input.startDate) ?? new Date().toISOString().split("T")[0],
    end_date: toPgDate(input.endDate),
  };
}
