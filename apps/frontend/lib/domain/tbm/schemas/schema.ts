import { idSchema } from "@/lib/shared/schema";

import { z } from "zod";

/**
 * Tbm字段规则
 */
export const TbmSchema = z.object({
  code: z.string().max(20, { message: "TBM编号最多20个字符" }).meta({
    table: "tbms",
    label: "TBM编号",
    field: "code",
    searchable: true, // ⭐
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
  name: z
    .string()
    .min(4, { message: "TBM简称至少4个字符" })
    .max(8, { message: "TBM简称最多8个字符" })
    .meta({
      table: "tbms",
      label: "TBM简称",
      field: "name",
      searchable: true, // ⭐
      sortable: true,
      component: "input",
      section: "基本信息",
      type: "text",
      disabled: false,
      required: true,
      readonly: false,
      colSpan: 1,
    }),

  model: z.string().max(50, { message: "型号最多50个字符" }).meta({
    table: "tbms",
    label: "型号",
    field: "model",
    searchable: true, // ⭐
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),

  manageCode: z.string().max(50, { message: "管理编号最多50个字符" }).optional().nullable().meta({
    table: "tbms",
    label: "管理编号",
    field: "management_code",
    searchable: false,
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),

  tbmTypeId: idSchema.meta({
    table: "tbms",
    label: "TBM类型",
    field: "type_id",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "master", code: "TBM_TYPE" },
  }),

  manufacturerId: idSchema.meta({
    table: "tbms",
    label: "制造商",
    field: "manufacturer_id",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "customers", categoryCode: "10500009" },
  }),

  serialNo: z.string().max(50, { message: "出厂序列号最多50个字符" }).optional().nullable().meta({
    table: "tbms",
    label: "出厂序列号",
    field: "serial_no",
    searchable: false,
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),

  diameter: z.coerce.number().optional().nullable().meta({
    table: "tbms",
    label: "直径（mm）",
    field: "diameter",
    searchable: false,
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),

  power: z.coerce.number().optional().nullable().meta({
    table: "tbms",
    label: "功率（kW）",
    field: "power",
    searchable: false,
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),

  sortOrder: z.number().default(0).meta({
    table: "tbms",
    label: "排序",
    field: "sort_order",
    searchable: false,
    sortable: true,
    component: "input",
    section: "其他信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  remark: z.string().max(500, { message: "备注最多500个字符" }).optional().nullable().meta({
    table: "tbms",
    label: "备注",
    field: "remark",
    searchable: false,
    sortable: false,
    component: "input",
    section: "其他信息",
    type: "text",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  isDisabled: z.coerce.boolean().default(false).meta({
    table: "tbms",
    label: "是否禁用",
    field: "is_disabled",
    searchable: false,
    sortable: true,
    component: "switch",
    section: "其他信息",
    type: "boolean",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  externalId: z.string().nullable().optional().meta({
    label: "外部ID",
    component: "input",
    section: "系统字段",
    colSpan: 1,
    disabled: true,
  }),

  externalVersion: z.coerce.number().nullable().optional().meta({
    label: "外部版本",
    component: "input",
    section: "系统字段",
    colSpan: 1,
    disabled: true,
  }),
});

export const CreateTbmSchema = TbmSchema;

export type CreateTbmInput = z.infer<typeof CreateTbmSchema>;

export type TbmFields = keyof z.infer<typeof TbmSchema>;

export const UpdateTbmSchema = TbmSchema.extend({
  id: idSchema,
});

export type UpdateTbmInput = z.infer<typeof UpdateTbmSchema>;
