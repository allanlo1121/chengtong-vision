import { CreateTunnelFullInput, CreateTunnelInput, UpdateTunnelInput } from "../schemas";
import {
  Tunnel,
  TunnelDetail,
  TunnelDetailRow,
  TunnelInsertRow,
  TunnelListItem,
  TunnelListRow,
  TunnelRow,
  TunnelUpdateRow,
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
    regionId: row.region_id,
    regionName: row.region_name,

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
    validFrom: row.valid_from,
    validTo: row.valid_to,
    versionNo: row.version_no,
  };
}

export function mapTunnelListItem(row: TunnelListRow): TunnelListItem {
  return {
    id: row.id!,
    name: row.name!,
    fullName: row.full_name,
    tunnelStatusId: row.tunnel_status_id,
    tunnelStatusName: row.tunnel_status_name,
    validFrom: row.valid_from,
    validTo: row.valid_to,
    organizationId: row.organization_id,
    organizationName: row.organization_name,
    projectId: row.project_id,
    projectName: row.project_name,
    regionId: row.region_id,
    regionName: row.region_name,
    prefix: row.prefix,
    startRing: row.start_ring,
    endRing: row.end_ring,
    startChainage: row.start_chainage,
    endChainage: row.end_chainage,

    actualEndDate: row.actual_end_date,
    actualStartDate: row.actual_start_date,
    versionNo: row.version_no,
    scheduleEndDate: row.schedule_end_date,
    scheduleStartDate: row.schedule_start_date,

    geology: row.geology,
    latitude: row.latitude,
    longitude: row.longitude,

    sortOrder: row.sort_order,
    remark: row.remark,
  };
}

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

export function mapTunnelUpdate(input: UpdateTunnelInput): TunnelUpdateRow {
  return {
    id: input.id,
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

export function mapTunnelInsert(input: CreateTunnelInput): TunnelInsertRow {
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

export function mapTunnelDetail(row: TunnelDetailRow): TunnelDetail {
  return {
    id: row.id,
    name: row.name,
    tunnelStatusName: row.tunnel_status_name,
    projectName: row.project_name,
    organizationName: row.organization_name,
    prefix: row.prefix,
    startRing: row.start_ring,
    endRing: row.end_ring,
    startChainage: row.start_chainage,
    endChainage: row.end_chainage,

    actualEndDate: row.actual_end_date,
    actualStartDate: row.actual_start_date,
    scheduleEndDate: row.schedule_end_date,
    scheduleStartDate: row.schedule_start_date,

    geology: row.geology,
    latitude: row.latitude,
    longitude: row.longitude,

    sortOrder: row.sort_order,

    remark: row.remark,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
  };
}
