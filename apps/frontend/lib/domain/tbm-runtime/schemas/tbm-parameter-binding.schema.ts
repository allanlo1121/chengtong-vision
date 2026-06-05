import { idSchema } from "@/lib/shared/schema";

import { z } from "zod";

/**
 * TBM参数绑定字段规则
 */
export const TbmParameterBindingFormSchema = z.object({
  tbmId: idSchema.meta({
    table: "tbm_parameter_bindings",
    label: "TBM",
    field: "tbm_id",
    searchable: true, // ⭐
    sortable: true,
    component: "tbmPicker",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "tbms", code: "TBM" },
  }),
  parameterId: z.coerce.number().meta({
    table: "tbm_parameter_bindings",
    label: "参数",
    field: "parameter_id",
    searchable: true, // ⭐
    sortable: true,
    component: "parameterPicker",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
  customName: z.string().max(50, { message: "自定义名称最多50个字符" }).optional().nullable().meta({
    table: "tbm_parameter_bindings",
    label: "自定义名称",
    field: "custom_name",
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
  customUnit: z.string().max(20, { message: "自定义单位最多20个字符" }).optional().nullable().meta({
    table: "tbm_parameter_bindings",
    label: "自定义单位",
    field: "custom_unit",
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
  isDisabled: z.boolean().default(false).meta({
    table: "tbm_parameter_templates",
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
  remark: z.string().max(200, { message: "备注最多200个字符" }).optional().nullable().meta({
    table: "tbm_parameter_templates",
    label: "备注",
    field: "remark",
    searchable: false,
    sortable: false,
    component: "input",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
});

export const CreateTbmParameterBindingSchema = TbmParameterBindingFormSchema;

export const UpdateTbmParameterBindingSchema = TbmParameterBindingFormSchema.extend({
  id: z.coerce.number(),
});

export type CreateTbmParameterBindingInput = z.infer<typeof CreateTbmParameterBindingSchema>;
export type UpdateTbmParameterBindingInput = z.infer<typeof UpdateTbmParameterBindingSchema>;

export type TbmParameterBindingFormFields = keyof z.infer<typeof TbmParameterBindingFormSchema>;
