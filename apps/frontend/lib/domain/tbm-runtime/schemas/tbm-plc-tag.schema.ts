import { z } from "zod";
import { FormFieldMeta } from "@/lib/shared/form-engine/types/field.types";
import { EntityReferenceSchema } from "@/lib/shared/schema";

/**
 * TBM PLC标签字段规则
 */
export const TbmPlcTagFormSchema = z.object({
  tbm: EntityReferenceSchema.meta({
    label: "盾构机",
    component: "tbmPicker",
    section: "基本信息",
    colSpan: 1,
  } satisfies FormFieldMeta),
  tagName: z
    .string()
    .max(50, { message: "名称最多50个字符" })
    .meta({
      label: "模版名称",
      component: "input",
      section: "基本信息",
      type: "text",
      colSpan: 1,
    } satisfies FormFieldMeta),
  dataType: z
    .string()
    .max(20, { message: "数据类型最多20个字符" })
    .meta({
      label: "数据类型",
      component: "input",
      section: "基本信息",
      type: "text",
      colSpan: 1,
    } satisfies FormFieldMeta),
  unit: z
    .string()
    .max(20, { message: "单位最多20个字符" })
    .optional()
    .meta({
      label: "单位",
      component: "input",
      section: "基本信息",
      type: "text",
      colSpan: 1,
    } satisfies FormFieldMeta),
  internal: z
    .string()
    .max(40, { message: "内部地址最多40个字符" })
    .optional()
    .meta({
      label: "内部地址",
      component: "input",
      section: "基本信息",
      type: "text",
      colSpan: 1,
    } satisfies FormFieldMeta),
  bit: z.coerce
    .number()
    .int()
    .min(0, { message: "Bit位必须大于或等于0" })
    .optional()
    .meta({
      label: "Bit位",
      component: "input",
      section: "基本信息",
      type: "number",
      colSpan: 1,
    } satisfies FormFieldMeta),
  comment: z
    .string()
    .max(100, { message: "备注最多100个字符" })
    .optional()
    .meta({
      label: "备注",
      component: "input",
      section: "基本信息",
      type: "text",
      colSpan: 1,
    } satisfies FormFieldMeta),
  archive: z
    .boolean()
    .default(false)
    .meta({
      label: "是否归档",
      component: "switch",
      section: "基本信息",
      colSpan: 1,
    } satisfies FormFieldMeta),
  sortOrder: z
    .number()
    .default(0)
    .meta({
      label: "排序",
      component: "input",
      section: "基本信息",
      type: "number",
      colSpan: 1,
    } satisfies FormFieldMeta),
});

export const CreateTbmPlcTagSchema = TbmPlcTagFormSchema;

export const UpdateTbmPlcTagSchema = TbmPlcTagFormSchema.extend({
  id: z.coerce.number(),
});

export const ImportTbmPlcTagSchema = TbmPlcTagFormSchema.omit({ tbm: true });

export const ImportTbmPlcTagsSchema = z.array(ImportTbmPlcTagSchema);

export type CreateTbmPlcTagInput = z.infer<typeof CreateTbmPlcTagSchema>;
export type UpdateTbmPlcTagInput = z.infer<typeof UpdateTbmPlcTagSchema>;
export type ImportTbmPlcTagInput = z.infer<typeof ImportTbmPlcTagSchema>;

export type TbmPlcTagFormFields = keyof z.infer<typeof TbmPlcTagFormSchema>;
