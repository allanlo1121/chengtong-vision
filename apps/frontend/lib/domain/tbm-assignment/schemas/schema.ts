import { idSchema } from "@/lib/shared/schema";

import { z } from "zod";

/**
 * TBM运行时分配字段规则
 */
export const TbmAssignmentFormSchema = z.object({
  tbmId: idSchema.meta({
    table: "tbm_assignments",
    label: "盾构机",
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
  }),
  tunnelId: idSchema.meta({
    table: "tbm_assignments",
    label: "隧道",
    field: "tunnel_id",
    searchable: true, // ⭐
    sortable: true,
    component: "tunnelPicker",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
  startDate: z.coerce.date().meta({
    table: "tbm_assignments",
    label: "开始日期",
    field: "start_date",
    searchable: true,
    sortable: true,
    component: "datePicker",
    section: "基本信息",
    type: "date",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
  endDate: z.coerce.date().optional().nullable().meta({
    table: "tbm_assignments",
    label: "结束日期",
    field: "end_date",
    searchable: true,
    sortable: true,
    component: "datePicker",
    section: "基本信息",
    type: "date",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
});

export const CreateTbmAssignmentSchema = TbmAssignmentFormSchema;

export type TbmAssignmentForm = z.infer<typeof TbmAssignmentFormSchema>;

export const UpdateTbmAssignmentSchema = TbmAssignmentFormSchema.extend({
  id: idSchema,
});
export type CreateTbmAssignmentInput = z.infer<typeof CreateTbmAssignmentSchema>;
export type UpdateTbmAssignmentInput = z.infer<typeof UpdateTbmAssignmentSchema>;

export type TbmAssignmentFormFields = keyof z.infer<typeof TbmAssignmentFormSchema>;
