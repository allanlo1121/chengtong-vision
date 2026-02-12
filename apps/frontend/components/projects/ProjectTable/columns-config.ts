"use client";
// components/projects/ProjectTable/columns-config.ts
import type { ColumnConfig } from "./column-types";

export const columnConfigs: ColumnConfig[] = [
  {
    id: "shortName",
    title: "项目名称",
    enableSorting: true,
    enableHiding: false,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "organizationName",
    title: "所属项目",
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
    id: "projectTypeName",
    title: "项目类型",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "projectStatusName",
    title: "项目状态",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "ownerName",
    title: "业主单位",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "contractAmount",
    title: "合同价",
    enableSorting: true,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "contractPeriod",
    title: "合约工期",
    enableSorting: true,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "actualPeriod",
    title: "实际工期",
    enableSorting: true,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "projectLeaderName",
    title: "项目负责人",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "companySupervisingLeader",
    title: "包保领导",
    enableSorting: true,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "projectManagementModeName",
    title: "管理模式",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "projectRiskLevelName",
    title: "风险等级",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "projectControlLevelName",
    title: "控制等级",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "cityName",
    title: "所在城市",
    enableSorting: false,
  },
  {
    id: "cityCode",
    title: "所在城市",
    enableSorting: false,
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
