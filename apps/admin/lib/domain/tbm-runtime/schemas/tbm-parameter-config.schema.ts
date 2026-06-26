import { idSchema } from "@/lib/shared/schema";

import { z } from "zod";
import { FormFieldMeta } from "@/lib/shared/form-engine/types";

/**
 * TBM参数配置字段规则
 */
export const TbmParameterConfigFormSchema = z.object({
  tbmId: idSchema.meta({
    label: "TBM",
    component: "tbmPicker",
    section: "基本信息",
    type: "text",
    colSpan: 1,
  } satisfies FormFieldMeta),
  parameterId: z.coerce.number().meta({
    label: "参数",
    component: "select",
    section: "基本信息",
    type: "text",
    colSpan: 1,
  } satisfies FormFieldMeta),
  plcTagId: z.coerce
    .number()
    .optional()
    .meta({
      label: "PLC地址",
      component: "input",
      section: "基本信息",
      type: "text",
      colSpan: 1,
    } satisfies FormFieldMeta),
  scale: z.coerce
    .number()
    .default(1)
    .meta({
      label: "缩放比例",
      component: "input",
      section: "基本信息",
      type: "number",
      colSpan: 1,
    } satisfies FormFieldMeta),
  valueOffset: z.coerce
    .number()
    .default(0)
    .meta({
      label: "值偏移",
      component: "input",
      section: "基本信息",
      type: "number",
      colSpan: 1,
    } satisfies FormFieldMeta),
  customName: z
    .string()
    .max(50, { message: "自定义名称最多50个字符" })
    .optional()
    .meta({
      label: "自定义名称",
      component: "input",
      section: "基本信息",
      type: "text",
      colSpan: 1,
    } satisfies FormFieldMeta),
  customUnit: z
    .string()
    .max(20, { message: "自定义单位最多20个字符" })
    .optional()
    .meta({
      label: "自定义单位",
      component: "input",
      section: "基本信息",
      type: "text",
      colSpan: 1,
    } satisfies FormFieldMeta),
  isDisabled: z
    .boolean()
    .default(false)
    .meta({
      label: "是否启用",
      component: "switch",
      section: "基本信息",
      colSpan: 1,
    } satisfies FormFieldMeta),
  remark: z
    .string()
    .max(200, { message: "备注最多200个字符" })
    .optional()
    .nullable()
    .meta({
      label: "备注",
      component: "input",
      section: "基本信息",
      type: "text",
      colSpan: 1,
    } satisfies FormFieldMeta),
});

export const CreateTbmParameterConfigSchema = TbmParameterConfigFormSchema;

export const UpdateTbmParameterConfigSchema = TbmParameterConfigFormSchema.extend({
  id: z.coerce.number(),
});

export const ImportTbmParameterConfigSchema = TbmParameterConfigFormSchema.omit({
  tbmId: true,
});

export const ImportTbmParameterConfigRowSchema = z.array(ImportTbmParameterConfigSchema);

export type CreateTbmParameterConfigInput = z.infer<typeof CreateTbmParameterConfigSchema>;
export type UpdateTbmParameterConfigInput = z.infer<typeof UpdateTbmParameterConfigSchema>;

export type ImportTbmParameterConfigInput = z.infer<typeof ImportTbmParameterConfigSchema>;

export type TbmParameterConfigFormFields = keyof z.infer<typeof TbmParameterConfigFormSchema>;
