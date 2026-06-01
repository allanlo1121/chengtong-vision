import { idSchema } from "@/lib/shared/schema";

import { z } from "zod";

/**
 * TBM参数模板字段规则
 */
export const TbmParameterTemplateFormSchema = z.object({
  id: z.coerce.number().optional().meta({
    table: "tbm_parameter_templates",
    label: "ID",
    field: "id",
    searchable: false,
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "number",
    disabled: true,
    required: false,
    readonly: true,
    colSpan: 1,
  }),
  name: z.string().max(50, { message: "名称最多50个字符" }).meta({
    table: "tbm_parameter_templates",
    label: "模版名称",
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
  code: z.string().meta({
    table: "tbm_parameter_templates",
    label: "模版编码",
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
  tbmTypeId: idSchema.meta({
    table: "tbm_parameter_templates",
    label: "TBM类型",
    field: "tbm_type_id",
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
  isDefault: z.boolean().default(false).meta({
    table: "tbm_parameter_templates",
    label: "是否默认",
    field: "is_default",
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
  diameter: z.coerce.number().nullable().meta({
    table: "tbm_parameter_templates",
    label: "直径",
    field: "diameter",
    searchable: true, // ⭐
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "number",
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
  sortOrder: z.coerce.number().default(0).meta({
    table: "tbm_parameter_templates",
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

export const CreateTbmParameterTemplateFormSchema = TbmParameterTemplateFormSchema.omit({
  id: true,
});

export const UpdateTbmParameterTemplateFormSchema = TbmParameterTemplateFormSchema;

export type CreateTbmParameterTemplateFormInput = z.infer<
  typeof CreateTbmParameterTemplateFormSchema
>;
export type UpdateTbmParameterTemplateFormInput = z.infer<
  typeof UpdateTbmParameterTemplateFormSchema
>;

export type TbmParameterTemplateFormFields = keyof z.infer<typeof TbmParameterTemplateFormSchema>;
