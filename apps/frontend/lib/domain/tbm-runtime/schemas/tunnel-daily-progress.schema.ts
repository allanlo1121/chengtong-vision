import { idSchema } from "@/lib/shared/schema";

import { z } from "zod";

import { MqttUserSchema } from "./mqtt-user.schema";

/**
 * 隧道每日进度字段规则
 */
export const TunnelDailyProgressFormSchema = z.object({
  id: idSchema.meta({
    table: "tunnel_daily_progress",
    label: "ID",
    field: "id",
    searchable: true, // ⭐
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "hide",
    disabled: true,
    required: true,
    readonly: true,
    colSpan: 1,
  }),
  tunnelId: idSchema.meta({
    table: "tunnel_daily_progress",
    label: "隧道ID",
    field: "tunnelId",
    searchable: true, // ⭐
    sortable: true,
    component: "tunnelPicker",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "tunnels" },
  }),
  tbmId: idSchema.nullable().meta({
    table: "tunnel_daily_progress",
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
      table: "tunnel_daily_progress",
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
    table: "tunnel_daily_progress",
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
    table: "tunnel_daily_progress",
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
    table: "tunnel_daily_progress",
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

export type TunnelDailyProgressForm = z.infer<typeof TunnelDailyProgressFormSchema>;

export const CreateTunnelDailyProgressSchema = TunnelDailyProgressFormSchema.omit({
  id: true,
});

export type CreateTunnelDailyProgressInput = z.infer<typeof CreateTunnelDailyProgressSchema>;

export const UpdateTunnelDailyProgressSchema = TunnelDailyProgressFormSchema.partial().extend({
  id: z.string().uuid(),
});

export type UpdateTunnelDailyProgressInput = z.infer<typeof UpdateTunnelDailyProgressSchema>;

export type TunelDailyProgressFields = keyof z.infer<typeof TunnelDailyProgressFormSchema>;
