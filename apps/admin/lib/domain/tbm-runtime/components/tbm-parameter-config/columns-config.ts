"use client";

import type { ColumnConfig } from "@/components/data-table/column-types";

export const columnConfigs: ColumnConfig[] = [
  {
    id: "name",
    title: "盾构机名称",
    enableSorting: true,
    enableHiding: false,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "code",
    title: "盾构机代码",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "managementCode",
    title: "管理编码",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "model",
    title: "设备型号",
    enableSorting: true,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "tbmTypeId",
    title: "盾构机类型ID",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "tbmTypeName",
    title: "盾构机类型",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "manufacturerName",
    title: "制造商",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "diameter",
    title: "直径",
    enableSorting: true,
    enableHiding: true,
    defaultVisible: true,
    fixed: true,
  },
  {
    id: "serialNo",
    title: "出厂序列号",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "length",
    title: "长度",
    enableSorting: false,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "isDisabled",
    title: "是否禁用",
    enableSorting: true,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "sortOrder",
    title: "排序顺序",
    enableSorting: true,
    enableHiding: true,
    defaultVisible: false,
    fixed: true,
  },
  {
    id: "remark",
    title: "备注",
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
