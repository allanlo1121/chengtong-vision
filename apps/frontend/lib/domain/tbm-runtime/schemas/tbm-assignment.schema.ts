import { idSchema } from "@/lib/shared/schema";
import { start } from "node:repl";

import { z } from "zod";
import en from "zod/v4/locales/en.cjs";

/**
 * TBM运行时分配字段规则
 */
export const TbmAssignmentFormSchema = z.object({
  id: z.coerce.number().optional().meta({
    table: "tbm_assignments",
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
  endDate: z.date().optional().nullable().meta({
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

export const CreateTbmAssignmentFormSchema = TbmAssignmentFormSchema.omit({
  id: true,
});

// export type CreateTbmAssignmentInput = z.infer<typeof TbmAssignmentFormSchema>;

export const UpdateTbmAssignmentFormSchema = TbmAssignmentFormSchema;

export type CreateTbmAssignmentFormInput = z.infer<typeof CreateTbmAssignmentFormSchema>;
export type UpdateTbmAssignmentFormInput = z.infer<typeof UpdateTbmAssignmentFormSchema>;

export type TbmAssignmentFormFields = keyof z.infer<typeof TbmAssignmentFormSchema>;
