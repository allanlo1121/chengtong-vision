import { FormFieldMeta } from "@/lib/shared/form-engine/types/field.types";
import { idSchema, latitudeSchema, longitudeSchema } from "@/lib/shared/schema";
import { start } from "node:repl";

import { z } from "zod";

/**
 * Tunnel字段规则
 */
export const TunnelFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: "隧道简称至少4个字符" })
    .max(8, { message: "隧道简称最多8个字符" })
    .meta({
      label: "隧道简称",
      component: "input",
      section: "基本信息",
      type: "text",
      colSpan: 1,
    } satisfies FormFieldMeta),

  fullName: z
    .string()
    .max(100, { message: "隧道全称最多100个字符" })
    .meta({
      label: "隧道全称",
      component: "input",
      section: "基本信息",
      type: "text",
      colSpan: 1,
    } satisfies FormFieldMeta),

  projectId: idSchema.meta({
    label: "所属项目",
    component: "projectPicker",
    section: "基本信息",
    type: "number",
    colSpan: 1,
  } satisfies FormFieldMeta),

  startRing: z.coerce
    .number()
    .default(0)
    .meta({
      label: "起始环号",
      component: "input",
      section: "基本信息",
      type: "number",
      colSpan: 1,
    } satisfies FormFieldMeta),
  endRing: z.coerce
    .number()
    .optional()
    .nullable()
    .meta({
      label: "结束环号",
      component: "input",
      section: "基本信息",
      type: "number",
      colSpan: 1,
    } satisfies FormFieldMeta),
  prefix: z
    .string()
    .max(20, { message: "隧道编号前缀最多20个字符" })
    .optional()
    .nullable()
    .meta({
      label: "隧道编号前缀",
      component: "input",
      section: "基本信息",
      type: "text",
      colSpan: 1,
    } satisfies FormFieldMeta),
  startChainage: z.coerce
    .number()
    .optional()
    .nullable()
    .meta({
      label: "起始里程",
      component: "input",
      section: "基本信息",
      type: "number",
      colSpan: 1,
    } satisfies FormFieldMeta),

  endChainage: z.coerce
    .number()
    .optional()
    .nullable()
    .meta({
      label: "结束里程",
      component: "input",
      section: "基本信息",
      type: "number",
      colSpan: 1,
    } satisfies FormFieldMeta),
  geology: z
    .string()
    .max(500, { message: "地质情况最多500个字符" })
    .optional()
    .nullable()
    .meta({
      label: "地质情况",
      component: "textarea",
      section: "基本信息",
      type: "text",
      colSpan: 1,
    } satisfies FormFieldMeta),
  longitude: longitudeSchema
    .optional()
    .nullable()
    .meta({
      label: "经度",
      component: "input",
      section: "其他信息",
      type: "number",
      colSpan: 1,
    } satisfies FormFieldMeta),

  latitude: latitudeSchema
    .optional()
    .nullable()
    .meta({
      label: "纬度",
      component: "input",
      section: "其他信息",
      type: "number",
      readonly: false,
      colSpan: 1,
    } satisfies FormFieldMeta),
  actualStartDate: z
    .string()
    .optional()
    .nullable()
    .meta({
      label: "实际开工日期",
      component: "datePicker",
      section: "进度信息",
      type: "date",
      colSpan: 1,
    } satisfies FormFieldMeta),

  actualEndDate: z
    .string()
    .optional()
    .nullable()
    .meta({
      label: "实际竣工日期",
      component: "datePicker",
      section: "进度信息",
      type: "date",
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
      colSpan: 1,
    } satisfies FormFieldMeta),
  isDisabled: z.coerce
    .boolean()
    .default(false)
    .meta({
      label: "是否禁用",
      component: "switch",
      section: "其他信息",
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
      colSpan: 1,
    } satisfies FormFieldMeta),
});

export const CreateTunnelSchema = TunnelFormSchema;

export type CreateTunnelInput = z.infer<typeof CreateTunnelSchema>;

export type TunnelFields = keyof z.infer<typeof TunnelFormSchema>;

export const UpdateTunnelSchema = TunnelFormSchema.extend({
  id: idSchema,
});

export type UpdateTunnelInput = z.infer<typeof UpdateTunnelSchema>;
