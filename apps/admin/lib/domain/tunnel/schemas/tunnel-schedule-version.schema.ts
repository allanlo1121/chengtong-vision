import { FormFieldMeta } from "@/lib/shared/form-engine/types/field.types";
import { idSchema, latitudeSchema, longitudeSchema } from "@/lib/shared/schema";

import { z } from "zod";

/**
 * TunnelScheduleVersion字段规则
 */
export const TunnelScheduleVersionFormSchema = z.object({
  tunnelId: idSchema.meta({
    label: "隧道ID",
    component: "tunnelPicker",
    section: "基本信息",
    type: "number",
    colSpan: 1,
  } satisfies FormFieldMeta),
  versionNo: z.coerce
    .number()
    .optional()
    .nullable()
    .meta({
      label: "版本号",
      component: "input",
      section: "进度信息",
      type: "number",
      readonly: true,
      colSpan: 1,
    } satisfies FormFieldMeta),
  scheduleStartDate: z
    .string()
    .optional()
    .nullable()
    .meta({
      label: "计划开工日期",
      component: "datePicker",
      section: "进度信息",
      type: "date",
      colSpan: 1,
    } satisfies FormFieldMeta),
  scheduleEndDate: z
    .string()
    .optional()
    .nullable()
    .meta({
      label: "计划竣工日期",
      component: "datePicker",
      section: "进度信息",
      type: "date",
      colSpan: 1,
    } satisfies FormFieldMeta),
  changeReason: z
    .string()
    .max(500, { message: "变更原因最多500个字符" })
    .optional()
    .nullable()
    .meta({
      label: "变更原因",
      component: "textarea",
      section: "进度信息",
      type: "text",
      colSpan: 1,
    } satisfies FormFieldMeta),
  source: z
    .string()
    .max(255, { message: "数据来源最多255个字符" })
    .optional()
    .nullable()
    .meta({
      label: "数据来源",
      component: "input",
      section: "进度信息",
      type: "text",
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
      section: "进度信息",
      type: "text",

      colSpan: 1,
    } satisfies FormFieldMeta),
});

export const CreateTunnelScheduleVersionSchema = TunnelScheduleVersionFormSchema.omit({
  tunnelId: true,
});

export const UpdateTunnelScheduleVersionSchema = TunnelScheduleVersionFormSchema.extend({
  id: idSchema,
});

export type TunnelScheduleVersionFormInput = z.infer<typeof TunnelScheduleVersionFormSchema>;

export type CreateTunnelScheduleVersionInput = z.infer<typeof CreateTunnelScheduleVersionSchema>;

export type UpdateTunnelScheduleVersionInput = z.infer<typeof UpdateTunnelScheduleVersionSchema>;

export type TunnelScheduleVersionFields = keyof z.infer<typeof TunnelScheduleVersionFormSchema>;
