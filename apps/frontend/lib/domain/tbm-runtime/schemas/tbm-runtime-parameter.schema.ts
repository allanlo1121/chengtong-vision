import { idSchema } from "@/lib/shared/schema";

import { coerce, z } from "zod";

/**
 * TBM运行时参数字段规则
 */
export const TbmRuntimeParameterFormSchema = z.object({
  name: z.string().max(50, { message: "名称最多50个字符" }).meta({
    table: "tbm_runtime_parameters",
    label: "参数名称",
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
  code: z
    .string()
    .regex(/^[a-z][0-9]{9}$/, { message: "编码格式必须为：1个字母 + 9个数字，例如 b000000001" })
    .meta({
      table: "tbm_runtime_parameters",

      label: "参数编码",
      field: "code",
      searchable: true,
      sortable: true,
      component: "input",
      section: "基本信息",
      type: "text",
      disabled: false,
      required: true,
      readonly: false,
      colSpan: 1,
    }),
  subsystemId: z.coerce.number().meta({
    table: "tbm_runtime_parameters",
    label: "子系统 ID",
    field: "subsystem_id",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "tbm_subsystems", labelField: "name", valueField: "id" },
  }),
  dataType: z.enum(["boolean", "integer", "double", "text"]).meta({
    table: "tbm_runtime_parameters",
    label: "数据类型",
    field: "data_type",
    searchable: true,
    sortable: true,
    component: "select",
    section: "基本信息",
    required: true,
    readonly: false,
    colSpan: 1,
    options: [
      {
        label: "布尔",
        value: "boolean",
      },
      {
        label: "整数",
        value: "integer",
      },
      {
        label: "浮点数",
        value: "double",
      },
      {
        label: "文本",
        value: "text",
      },
    ],
  }),
  digits: z.coerce.number().int().min(0).max(10).meta({
    table: "tbm_runtime_parameters",
    label: "小数位数",
    field: "digits",
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
  unit: z.string().max(20, { message: "单位最多20个字符" }).optional().nullable().meta({
    table: "tbm_runtime_parameters",
    label: "单位",
    field: "unit",
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
  isAlarm: z.boolean().default(false).meta({
    table: "tbm_runtime_parameters",
    label: "是否报警",
    field: "is_alarm",
    searchable: true, // ⭐
    sortable: true,
    component: "switch",
    section: "基本信息",
    type: "boolean",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
  isReportable: z.boolean().default(false).meta({
    table: "tbm_runtime_parameters",
    label: "是否可上报",
    field: "is_reportable",
    searchable: true, // ⭐
    sortable: true,
    component: "switch",
    section: "基本信息",
    type: "boolean",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
  isTrendable: z.boolean().default(false).meta({
    table: "tbm_runtime_parameters",
    label: "是否可趋势分析",
    field: "is_trendable",
    searchable: true, // ⭐
    sortable: true,
    component: "switch",
    section: "基本信息",
    type: "boolean",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
  isGroup: z.boolean().default(false).meta({
    table: "tbm_runtime_parameters",
    label: "是否分组",
    field: "is_group",
    searchable: true, // ⭐
    sortable: true,
    component: "switch",
    section: "基本信息",
    type: "boolean",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
  isVirtual: z.boolean().default(false).meta({
    table: "tbm_runtime_parameters",
    label: "是否虚拟参数",
    field: "is_virtual",
    searchable: true, // ⭐
    sortable: true,
    component: "switch",
    section: "基本信息",
    type: "boolean",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
  isDisabled: z.boolean().default(false).meta({
    table: "tbm_runtime_parameters",
    label: "是否启用",
    field: "is_enabled",
    searchable: true, // ⭐
    sortable: true,
    component: "switch",
    section: "基本信息",
    type: "boolean",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
  sortOrder: z.number().default(0).meta({
    table: "tbm_runtime_parameters",
    label: "排序",
    field: "sort_order",
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
});

export const CreateTbmRuntimeParameterSchema = TbmRuntimeParameterFormSchema;

// export type CreateTbmRuntimeParameterInput = z.infer<typeof TbmRuntimeParameterFormSchema>;

export const UpdateTbmRuntimeParameterSchema = TbmRuntimeParameterFormSchema.extend({
  id: coerce.number(),
});

export type CreateTbmRuntimeParameterInput = z.infer<typeof CreateTbmRuntimeParameterSchema>;
export type UpdateTbmRuntimeParameterInput = z.infer<typeof UpdateTbmRuntimeParameterSchema>;

export type TbmRuntimeParameterFormFields = keyof z.infer<typeof TbmRuntimeParameterFormSchema>;
