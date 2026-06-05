import {
  CreateTunnelFullInput,
  CreateTunnelScheduleVersionInput,
  TunnelScheduleVersionFormInput,
  TunnelStatusTimelineFormInput,
  UpdateTunnelScheduleVersionInput,
  UpdateTunnelStatusTimelineInput,
} from "../schemas";
import {
  TunnelScheduleVersion,
  TunnelScheduleVersionInsertRow,
  TunnelStatusTimeline,
  TunnelStatusTimelineInsertRow,
} from "../types";

export function mapTunnelStatusTimelineInsert(
  input: TunnelStatusTimelineFormInput
): TunnelStatusTimelineInsertRow {
  return {
    tunnel_id: input.tunnelId,
    tunnel_status_id: input.tunnelStatusId ?? undefined,
    valid_from: input.validFrom ?? new Date().toISOString(), // 如果前端没有传入 validFrom，就使用当前时间
    valid_to: input.validTo ?? null,
    change_type: input.changeType ?? "manual", // 变更类型默认为 "manual"
    remark: input.remark ?? null, // 变更备注
  };
}

export function mapTunnelStatusTimelineUpdate(
  input: UpdateTunnelStatusTimelineInput
): TunnelStatusTimelineInsertRow {
  return {
    id: input.id,
    tunnel_id: input.tunnelId,
    tunnel_status_id: input.tunnelStatusId ?? undefined,
    valid_from: input.validFrom ?? new Date().toISOString(), // 如果前端没有传入 validFrom，就使用当前时间
    valid_to: input.validTo ?? null,
    change_type: input.changeType ?? "manual", // 变更类型默认为 "manual"
    remark: input.remark ?? null, // 变更备注
  };
}

export function mapTunnelStatusTimeline(
  input: TunnelStatusTimelineInsertRow
): TunnelStatusTimeline {
  return {
    id: input.id!,
    tunnelId: input.tunnel_id,
    tunnelStatusId: input.tunnel_status_id!,
    validFrom: input.valid_from,
    validTo: input.valid_to ?? null,
    changeType: input.change_type ?? "manual",
    remark: input.remark ?? null,
    createdAt: input.created_at ?? new Date().toISOString(),
    updatedAt: input.updated_at ?? new Date().toISOString(),
    createdBy: input.created_by ?? "system",
    updatedBy: input.updated_by ?? "system",
  };
}

// export function mapTunnelScheduleVersionInputFromTunnelFullInput(
//     input: CreateTunnelFullInput
// ): Omit<CreateTunnelScheduleVersionInput, "tunnelId"> {
//     return {
//         versionNo: 1, // 新增时版本号默认为1
//         scheduleStartDate: input.scheduleStartDate ?? null,
//         scheduleEndDate: input.scheduleEndDate ?? null,
//         changeReason: input.changeReason ?? null, // 变更原因
//         source: input.source ?? null, // 数据来源
//         remark: input.remark ?? null, // 变更备注
//     };
// }

// export function mapTunnelStatusInsertRowFromInput(
//     input: TunnelStatusTimelineFormInput,
// ): TunnelStatusTimelineInsertRow {
//     return {
//         tunnel_id: input.tunnelId,
//         tunnel_status_id: input.tunnelStatusId ?? undefined,
//         valid_from: input.validFrom ?? new Date().toISOString(),
//         valid_to: input.validTo ?? null,
//         change_type: input.changeType ?? "manual",
//         remark: input.remark ?? null, // 变更备注
//     };
// }

export function mapTunnelScheduleVersionInsert(
  input: TunnelScheduleVersionFormInput
): TunnelScheduleVersionInsertRow {
  return {
    tunnel_id: input.tunnelId,
    version_no: input.versionNo ?? 1, // 新增时版本号默认为1，后续可以根据实际情况进行调整
    schedule_start_date: input.scheduleStartDate ?? null,
    schedule_end_date: input.scheduleEndDate ?? null,
    change_reason: input.changeReason ?? null, // 变更原因
    source: input.source ?? null, // 数据来源
    remark: input.remark ?? null, // 变更备注
  };
}

export function mapTunnelScheduleVersionUpdate(
  input: UpdateTunnelScheduleVersionInput
): TunnelScheduleVersionInsertRow {
  return {
    id: input.id,
    tunnel_id: input.tunnelId,
    version_no: input.versionNo ?? 1, // 新增时版本号默认为1，后续可以根据实际情况进行调整
    schedule_start_date: input.scheduleStartDate ?? null,
    schedule_end_date: input.scheduleEndDate ?? null,
    change_reason: input.changeReason ?? null, // 变更原因
    source: input.source ?? null, // 数据来源
    remark: input.remark ?? null, // 变更备注
  };
}

export function mapTunnelScheduleVersion(
  input: TunnelScheduleVersionInsertRow
): TunnelScheduleVersion {
  return {
    id: input.id!,
    tunnelId: input.tunnel_id,
    versionNo: input.version_no,
    scheduleStartDate: input.schedule_start_date ?? null,
    scheduleEndDate: input.schedule_end_date ?? null,
    changeReason: input.change_reason ?? null,
    source: input.source ?? null,
    remark: input.remark ?? null,
    createdAt: input.created_at ?? null,
    updatedAt: input.updated_at ?? null,
    deletedAt: input.deleted_at ?? null,
    createdBy: input.created_by ?? null,
    updatedBy: input.updated_by ?? null,
    deletedBy: input.deleted_by ?? null,
  };
}
