import { FormFieldMeta } from "@/lib/shared/form-engine/types/field.types";
import { idSchema, latitudeSchema, longitudeSchema } from "@/lib/shared/schema";

import { z } from "zod";

/**
 * TunnelStatusTimeline字段规则
 */
export const TunnelStatusTimelineFormSchema = z.object({
  tunnelId: idSchema.meta({
    label: "隧道ID",
    component: "tunnelPicker",
    section: "基本信息",
    type: "number",
    colSpan: 1,
  } satisfies FormFieldMeta),
  tunnelStatusId: idSchema
    .optional()
    .nullable()
    .meta({
      label: "当前状态",
      component: "select",
      section: "状态信息",
      type: "number",
      colSpan: 1,
      optionSource: { source: "master", code: "PROJECT_SUB_STATUS" },
    } satisfies FormFieldMeta),
  validFrom: z
    .string()
    .optional()
    .nullable()
    .meta({
      label: "状态开始时间",

      component: "datePicker",
      section: "状态信息",
      type: "date",
      colSpan: 1,
    } satisfies FormFieldMeta),
  validTo: z
    .string()
    .optional()
    .nullable()
    .meta({
      label: "状态结束时间",
      component: "datePicker",
      section: "状态信息",
      type: "date",
      colSpan: 1,
    } satisfies FormFieldMeta),
  changeType: z
    .string()
    .optional()
    .nullable()
    .meta({
      label: "变更类型",
      component: "select",
      section: "状态信息",
      colSpan: 1,
      options: [
        { label: "手动变更", value: "manual" },
        { label: "错误矫正", value: "correction" },
        { label: "自动变更", value: "auto" },
      ],
    } satisfies FormFieldMeta),
  remark: z
    .string()
    .max(500, { message: "变更备注最多500个字符" })
    .optional()
    .nullable()
    .meta({
      label: "变更备注",
      component: "input",
      section: "状态信息",
      type: "text",
      colSpan: 1,
    } satisfies FormFieldMeta),
});

export type TunnelStatusTimelineFormInput = z.infer<typeof TunnelStatusTimelineFormSchema>;

export const CreateTunnelStatusTimelineSchema = TunnelStatusTimelineFormSchema.omit({
  tunnelId: true,
});

export type CreateTunnelStatusTimelineInput = z.infer<typeof CreateTunnelStatusTimelineSchema>;

export type TunnelStatusTimelineFields = keyof z.infer<typeof TunnelStatusTimelineFormSchema>;

export const UpdateTunnelStatusTimelineSchema = TunnelStatusTimelineFormSchema.extend({
  id: idSchema,
});

export type UpdateTunnelStatusTimelineInput = z.infer<typeof UpdateTunnelStatusTimelineSchema>;
