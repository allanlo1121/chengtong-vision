import {
  CreateTunnelFullInput,
  CreateTunnelInput,
  CreateTunnelScheduleVersionInput,
  CreateTunnelStatusTimelineInput,
} from "../schemas";
import {
  Tunnel,
  TunnelInsertRow,
  TunnelListItem,
  TunnelListRow,
  TunnelRow,
  TunnelScheduleVersionInsertRow,
  TunnelStatusTimelineInsertRow,
} from "../types";

export function mapTunnelList(row: TunnelListRow): TunnelListItem {
  return {
    id: row.id!,
    name: row.name!,
    fullName: row.full_name,

    projectId: row.project_id,
    projectName: row.project_name,
    organizationId: row.organization_id,
    organizationName: row.organization_name,

    prefix: row.prefix,
    startChainage: row.start_chainage,
    endChainage: row.end_chainage,
    startRing: row.start_ring,
    endRing: row.end_ring,

    actualEndDate: row.actual_end_date,
    actualStartDate: row.actual_start_date,

    geology: row.geology,
    latitude: row.latitude,
    longitude: row.longitude,

    sortOrder: row.sort_order,
    remark: row.remark,

    scheduleEndDate: row.schedule_end_date,
    scheduleStartDate: row.schedule_start_date,

    tunnelStatusId: row.tunnel_status_id,
    tunnelStatusName: row.tunnel_status_name,
  };
}

// export function mapTunnelRow(row: TunnelInsertItem): TunnelInsertRow {
//   return {
//     name: row.name,
//     full_name: row.fullName,

//     project_id: row.projectId,
//     prefix: row.prefix,
//     start_stake: row.startStake,
//     end_stake: row.endStake,
//     start_ring: row.startRing,
//     end_ring: row.endRing,
//     start_chainage: row.startChainage,
//     end_chainage: row.endChainage,

//     actual_end_date: row.actualEndDate,
//     actual_start_date: row.actualStartDate,

//     geology: row.geology,
//     latitude: row.latitude,
//     longitude: row.longitude,

//     sort_order: row.sortOrder,
//     remark: row.remark
//   };
// }

export function mapTunnel(row: TunnelRow): Tunnel {
  return {
    id: row.id,
    name: row.name,
    fullName: row.full_name,

    projectId: row.project_id,
    prefix: row.prefix,
    startRing: row.start_ring,
    endRing: row.end_ring,
    startChainage: row.start_chainage,
    endChainage: row.end_chainage,

    actualEndDate: row.actual_end_date,
    actualStartDate: row.actual_start_date,

    geology: row.geology,
    latitude: row.latitude,
    longitude: row.longitude,

    sortOrder: row.sort_order,
    isDisabled: row.is_disabled,
    remark: row.remark,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,

    createdBy: row.created_by,
    updatedBy: row.updated_by,
    deletedBy: row.deleted_by,
  };
}

export function mapTunnelRowFromTunnelInput(input: CreateTunnelInput): TunnelInsertRow {
  return {
    name: input.name,
    full_name: input.fullName,

    project_id: input.projectId,
    prefix: input.prefix,
    start_ring: input.startRing,
    end_ring: input.endRing,
    start_chainage: input.startChainage,
    end_chainage: input.endChainage,

    actual_end_date: input.actualEndDate,
    actual_start_date: input.actualStartDate,

    geology: input.geology,
    latitude: input.latitude,
    longitude: input.longitude,

    sort_order: input.sortOrder,
    is_disabled: input.isDisabled,
    remark: input.remark,
  };
}

export function mapTunnelInsertRowFromInput(input: CreateTunnelInput): TunnelInsertRow {
  return {
    name: input.name,
    full_name: input.fullName,

    project_id: input.projectId,
    prefix: input.prefix,
    start_ring: input.startRing,
    end_ring: input.endRing,
    start_chainage: input.startChainage,
    end_chainage: input.endChainage,

    actual_end_date: input.actualEndDate,
    actual_start_date: input.actualStartDate,

    geology: input.geology,
    latitude: input.latitude,
    longitude: input.longitude,

    sort_order: input.sortOrder,
    is_disabled: input.isDisabled,
    remark: input.remark,
  };
}

export function mapCreateTunnelInputFromTunnelFullInput(
  input: CreateTunnelFullInput
): CreateTunnelInput {
  return {
    name: input.name,
    fullName: input.fullName,

    projectId: input.projectId,
    prefix: input.prefix,
    startRing: input.startRing,
    endRing: input.endRing,
    startChainage: input.startChainage,
    endChainage: input.endChainage,

    actualEndDate: input.actualEndDate,
    actualStartDate: input.actualStartDate,

    geology: input.geology,
    latitude: input.latitude,
    longitude: input.longitude,

    sortOrder: input.sortOrder,
    isDisabled: input.isDisabled,
    remark: input.remark,
  };
}

export function mapCreateTunnelStatusInputFromTunnelFullInput(
  input: CreateTunnelFullInput
): CreateTunnelStatusTimelineInput {
  return {
    tunnelStatusId: input.tunnelStatusId ?? undefined,
    validFrom: input.validFrom ?? new Date().toISOString(), // 如果前端没有传入 validFrom，就使用当前时间
    validTo: input.validTo ?? null,
    changeType: input.changeType ?? "manual", // 变更类型默认为 "manual"
    remark: input.remark ?? null, // 变更备注
  };
}

export function mapCreateTunnelScheduleVersionInputFromTunnelFullInput(
  input: CreateTunnelFullInput
): CreateTunnelScheduleVersionInput {
  return {
    versionNo: 1, // 新增时版本号默认为1
    scheduleStartDate: input.scheduleStartDate ?? null,
    scheduleEndDate: input.scheduleEndDate ?? null,
    changeReason: input.changeReason ?? null, // 变更原因
    source: input.source ?? null, // 数据来源
    remark: input.remark ?? null, // 变更备注
  };
}

export function mapTunnelStatusInsertRowFromInput(
  input: CreateTunnelStatusTimelineInput,
  tunnelId: string
): TunnelStatusTimelineInsertRow {
  return {
    tunnel_id: tunnelId,
    tunnel_status_id: input.tunnelStatusId ?? undefined,
    valid_from: input.validFrom ?? new Date().toISOString(),
    valid_to: input.validTo ?? null,
    change_type: input.changeType ?? "manual",
    remark: input.remark ?? null, // 变更备注
  };
}

export function mapTunnelScheduleVersionRowFromInput(
  input: CreateTunnelScheduleVersionInput,
  tunnelId: string
): TunnelScheduleVersionInsertRow {
  return {
    tunnel_id: tunnelId,
    version_no: 1, // 新增时版本号默认为1，后续可以根据实际情况进行调整
    schedule_start_date: input.scheduleStartDate ?? null,
    schedule_end_date: input.scheduleEndDate ?? null,
    change_reason: input.changeReason ?? null, // 变更原因
    source: input.source ?? null, // 数据来源
    remark: input.remark ?? null, // 变更备注
  };
}
