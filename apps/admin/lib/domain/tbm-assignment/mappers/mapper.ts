import { toPgDate } from "@/lib/utils/time";
import { CreateTbmAssignmentInput, UpdateTbmAssignmentInput } from "../schemas";
import {
  TbmAssignmentRow,
  TbmAssignment,
  TbmAssignmentInsertRow,
  TbmAssignmentListRow,
  TbmAssignmentListItem,
} from "../types";

export function mapTbmAssignment(row: TbmAssignmentRow): TbmAssignment {
  return {
    id: row.id,
    tbmId: row.tbm_id,
    tunnelId: row.tunnel_id,
    startDate: row.start_date,
    endDate: row.end_date,
  };
}

export function mapTbmAssignmentInsert(input: CreateTbmAssignmentInput): TbmAssignmentInsertRow {
  return {
    tbm_id: input.tbmId,
    tunnel_id: input.tunnelId,
    start_date: toPgDate(input.startDate) ?? new Date().toISOString().split("T")[0],
    end_date: toPgDate(input.endDate),
  };
}

export function mapTbmAssignmentUpdate(
  input: UpdateTbmAssignmentInput
): Partial<TbmAssignmentInsertRow> {
  return {
    id: input.id,
    tbm_id: input.tbmId,
    tunnel_id: input.tunnelId,
    start_date: toPgDate(input.startDate) ?? new Date().toISOString().split("T")[0],
    end_date: toPgDate(input.endDate),
  };
}

export function mapTbmAssignmentListItem(row: TbmAssignmentListRow): TbmAssignmentListItem {
  return {
    id: row.id,
    tbmId: row.tbm_id,
    tbmName: row.tbm_name,
    tbmCode: row.tbm_code,
    tunnelId: row.tunnel_id,
    tunnelName: row.tunnel_name,
    projectId: row.project_id,
    projectName: row.project_name,
    startDate: row.start_date,
    endDate: row.end_date,
    remark: row.remark,
  };
}
