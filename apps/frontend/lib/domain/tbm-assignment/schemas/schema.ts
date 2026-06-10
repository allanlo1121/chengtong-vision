import { FormFieldMeta } from "@/lib/shared/form-engine/types/field.types";
import { idSchema } from "@/lib/shared/schema";

import { z } from "zod";

/**
 * TBM运行时分配字段规则
 */
export const TbmAssignmentFormSchema = z.object({
  tbmId: idSchema.meta({
    label: "盾构机",
    component: "tbmPicker",
    section: "基本信息",
    type: "text",
    colSpan: 1,
  } satisfies FormFieldMeta),
  tunnelId: idSchema.meta({
    label: "隧道",
    component: "tunnelPicker",
    section: "基本信息",
    type: "text",
    colSpan: 1,
  } satisfies FormFieldMeta),
  startDate: z.coerce.date().meta({
    label: "开始日期",
    component: "datePicker",
    section: "基本信息",
    type: "date",
    colSpan: 1,
  } satisfies FormFieldMeta),
  endDate: z.coerce
    .date()
    .optional()
    .nullable()
    .meta({
      label: "结束日期",
      component: "datePicker",
      section: "基本信息",
      type: "date",
      colSpan: 1,
    } satisfies FormFieldMeta),
});

export const CreateTbmAssignmentSchema = TbmAssignmentFormSchema;

export type TbmAssignmentForm = z.infer<typeof TbmAssignmentFormSchema>;

export const UpdateTbmAssignmentSchema = TbmAssignmentFormSchema.extend({
  id: idSchema,
});
export type CreateTbmAssignmentInput = z.infer<typeof CreateTbmAssignmentSchema>;
export type UpdateTbmAssignmentInput = z.infer<typeof UpdateTbmAssignmentSchema>;

export type TbmAssignmentFormFields = keyof z.infer<typeof TbmAssignmentFormSchema>;
