"use client";
// components/projects/ProjectTable/columns-config.ts
import type { ColumnConfig } from "./column-types";

export const columnConfigs: ColumnConfig[] = [
  {
    id: "name",
    title: "隧道名称",
    enableSorting: true,
    enableHiding: false,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "projectName",
    title: "工程名称",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "regionName",
    title: "所在区域",
    enableSorting: true,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "workPointName",
    title: "工点简称",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "workPointFullName",
    title: "工点全称",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "status",
    title: "施工状态",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "tunnelLength",
    title: "隧道长度（米）",
    enableSorting: true,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "segmentCount",
    title: "管片环数",
    enableSorting: true,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "tbmName",
    title: "盾构机名称",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
];

export function getColumnConfig(id: string) {
  return (
    columnConfigs.find((c) => c.id === id) ?? {
      id,
      title: id,
      enableSorting: false,
      enableHiding: true,
      defaultVisible: true,
      fixed: false,
    }
  );
}
