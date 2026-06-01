"use client";

import type { ColumnConfig } from "@/components/data-table/column-types";

export const columnConfigs: ColumnConfig[] = [
  {
    id: "name",
    title: "组织名称",
    enableSorting: true,
    enableHiding: false,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "parentOrgName",
    title: "上级组织名称",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "regionName",
    title: "所在片区",
    enableSorting: true,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "orgTypeName",
    title: "组织类型",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "businessName",
    title: "业务板块",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "countryName",
    title: "所在国家",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "adminRegionName",
    title: "所在行政区",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "isActive",
    title: "是否激活",
    enableSorting: true,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "createdAt",
    title: "创建时间",
    enableSorting: true,
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
