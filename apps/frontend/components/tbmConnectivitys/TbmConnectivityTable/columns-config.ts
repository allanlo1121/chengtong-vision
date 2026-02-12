"use client";
// components/projects/ProjectTable/columns-config.ts
import type { ColumnConfig } from "./column-types";

export const columnConfigs: ColumnConfig[] = [
  {
    id: "tbmName",
    title: "盾构机名称",
    enableSorting: true,
    enableHiding: false,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "tbmCode",
    title: "盾构机编号",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "tbmTypeCode",
    title: "盾构机类型",
    enableSorting: true,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "ownerSubjectName",
    title: "盾构机产权",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "manufacturerSubjectName",
    title: "制造单位",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "dechSourceTypeCode",
    title: "盾构机来源",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "equipmentStatusName",
    title: "设备状态",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "locationSubjectName",
    title: "所在单位",
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
