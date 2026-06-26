import { idSchema } from "@/lib/shared/schema";

import { z } from "zod";

/**
 * 隧道每日进度字段规则
 */
export const TbmDailyProgressFormSchema = z.object({
  tbmId: idSchema.nullable().meta({
    table: "tbm_daily_progress",
    label: "TBM ID",
    field: "tbmId",
    searchable: true, // ⭐
    sortable: true,
    component: "tbmPicker",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "tbms" },
  }),
  workDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .meta({
      table: "tbm_daily_progress",
      label: "进度日期",
      field: "workDate",
      searchable: true, // ⭐
      sortable: true,
      component: "datePicker",
      section: "基本信息",
      type: "text",
      disabled: false,
      required: true,
      readonly: false,
      colSpan: 1,
    }),
  ringEnd: z.coerce.number().meta({
    table: "tbm_daily_progress",
    label: "结束环号",
    field: "ringEnd",
    searchable: true, // ⭐
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "number",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
  chainageEnd: z.coerce.number().nullable().meta({
    table: "tbm_daily_progress",
    label: "结束里程",
    field: "opNumEnd",
    searchable: true, // ⭐
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "number",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
  }),
  planRingCount: z.coerce.number().nullable().meta({
    table: "tbm_daily_progress",
    label: "计划进度（环）",
    field: "planRingCount",
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
});

export type TbmDailyProgressForm = z.infer<typeof TbmDailyProgressFormSchema>;

export const CreateTbmDailyProgressSchema = TbmDailyProgressFormSchema;

export type CreateTbmDailyProgressInput = z.infer<typeof CreateTbmDailyProgressSchema>;

export const UpdateTbmDailyProgressSchema = TbmDailyProgressFormSchema.extend({
  id: idSchema,
});

export type UpdateTbmDailyProgressInput = z.infer<typeof UpdateTbmDailyProgressSchema>;

export type TbmDailyProgressFields = keyof z.infer<typeof TbmDailyProgressFormSchema>;
