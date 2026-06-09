import { FormFieldMeta } from "@/lib/shared/form-engine/types/field.types";
import { idSchema } from "@/lib/shared/schema";

import { z } from "zod";

/**
 * Tbm字段规则
 */
export const TbmFormSchema = z.object({
  code: z
    .string()
    .max(20, { message: "TBM编号最多20个字符" })
    .meta({
      label: "TBM编号",
      component: "input",
      section: "基本信息",
      type: "text",
      disabled: false,
      required: true,
      readonly: false,
      colSpan: 1,
    } satisfies FormFieldMeta),
  name: z
    .string()
    .min(4, { message: "TBM简称至少4个字符" })
    .max(8, { message: "TBM简称最多8个字符" })
    .meta({
      label: "TBM简称",
      component: "input",
      section: "基本信息",
      type: "text",
      disabled: false,
      required: true,
      readonly: false,
      colSpan: 1,
    } satisfies FormFieldMeta),

  model: z
    .string()
    .max(50, { message: "型号最多50个字符" })
    .meta({
      label: "型号",
      component: "input",
      section: "基本信息",
      type: "text",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 1,
    } satisfies FormFieldMeta),

  manageCode: z
    .string()
    .max(50, { message: "管理编号最多50个字符" })
    .optional()
    .nullable()
    .meta({
      label: "管理编号",
      component: "input",
      section: "基本信息",
      type: "text",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 1,
    } satisfies FormFieldMeta),

  tbmTypeId: idSchema.meta({
    label: "TBM类型",
    component: "select",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "master", code: "TBM_TYPE" },
  } satisfies FormFieldMeta),

  manufacturerId: idSchema.meta({
    label: "制造商",
    component: "select",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "customers", categoryCode: "10500009" },
  } satisfies FormFieldMeta),

  serialNo: z
    .string()
    .max(50, { message: "出厂序列号最多50个字符" })
    .optional()
    .nullable()
    .meta({
      label: "出厂序列号",
      component: "input",
      section: "基本信息",
      type: "text",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 1,
    } satisfies FormFieldMeta),

  diameter: z.coerce
    .number()
    .optional()
    .nullable()
    .meta({
      label: "直径（mm）",
      component: "input",
      section: "基本信息",
      type: "number",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 1,
    } satisfies FormFieldMeta),

  power: z.coerce
    .number()
    .optional()
    .nullable()
    .meta({
      label: "功率（kW）",
      component: "input",
      section: "基本信息",
      type: "number",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 1,
    } satisfies FormFieldMeta),

  sortOrder: z.coerce
    .number()
    .default(0)
    .meta({
      label: "排序",
      component: "input",
      section: "其他信息",
      type: "number",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 1,
    } satisfies FormFieldMeta),
  remark: z
    .string()
    .max(500, { message: "备注最多500个字符" })
    .optional()
    .nullable()
    .meta({
      label: "备注",
      component: "input",
      section: "其他信息",
      type: "text",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 1,
    } satisfies FormFieldMeta),
  isDisabled: z.coerce
    .boolean()
    .default(false)
    .meta({
      label: "是否禁用",
      component: "switch",
      section: "其他信息",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 1,
    } satisfies FormFieldMeta),
  externalId: z
    .string()
    .nullable()
    .optional()
    .meta({
      label: "外部ID",
      component: "input",
      section: "系统字段",
      colSpan: 1,
      disabled: true,
    } satisfies FormFieldMeta),

  externalVersion: z.coerce
    .number()
    .nullable()
    .optional()
    .meta({
      label: "外部版本",
      component: "input",
      section: "系统字段",
      colSpan: 1,
      disabled: true,
    } satisfies FormFieldMeta),
});

export const CreateTbmSchema = TbmFormSchema;

export type CreateTbmInput = z.infer<typeof CreateTbmSchema>;

export type TbmFields = keyof z.infer<typeof TbmFormSchema>;

export const UpdateTbmSchema = TbmFormSchema.extend({
  id: idSchema,
});

export type UpdateTbmInput = z.infer<typeof UpdateTbmSchema>;
