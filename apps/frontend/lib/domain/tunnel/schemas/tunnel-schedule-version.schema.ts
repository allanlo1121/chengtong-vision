import { idSchema, latitudeSchema, longitudeSchema } from "@/lib/shared/schema";

import { z } from "zod";

/**
 * TunnelScheduleVersion字段规则
 */
export const TunnelScheduleVersionSchema = z.object({
  versionNo: z.coerce.number().optional().nullable().meta({
    table: "tunnel_schedule_versions",
    label: "版本号",
    field: "version_no",
    searchable: false,
    sortable: true,
    component: "input",
    section: "进度信息",
    type: "number",
    disabled: true,
    required: false,
    readonly: true,
    colSpan: 1,
  }),
  scheduleStartDate: z.string().optional().nullable().meta({
    table: "tunnel_schedule_versions",
    label: "计划开工日期",
    field: "schedule_start_date",
    searchable: false,
    sortable: true,
    component: "datePicker",
    section: "进度信息",
    type: "date",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  scheduleEndDate: z.string().optional().nullable().meta({
    table: "tunnel_schedule_versions",
    label: "计划竣工日期",
    field: "schedule_end_date",
    searchable: false,
    sortable: true,
    component: "datePicker",
    section: "进度信息",
    type: "date",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  changeReason: z
    .string()
    .max(500, { message: "变更原因最多500个字符" })
    .optional()
    .nullable()
    .meta({
      table: "tunnel_schedule_versions",
      label: "变更原因",
      field: "change_reason",
      searchable: false,
      sortable: false,
      component: "textarea",
      section: "进度信息",
      type: "text",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 1,
    }),
  source: z.string().max(255, { message: "数据来源最多255个字符" }).optional().nullable().meta({
    table: "tunnel_schedule_versions",
    label: "数据来源",
    field: "source",
    searchable: false,
    sortable: false,
    component: "input",
    section: "进度信息",
    type: "text",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  remark: z.string().max(500, { message: "备注最多500个字符" }).optional().nullable().meta({
    table: "tunnel_schedule_versions",
    label: "备注",
    field: "remark",
    searchable: false,
    sortable: false,
    component: "input",
    section: "进度信息",
    type: "text",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
});

// export const employeeschema = z.object(OrganizationFields);

// export const Createemployeeschema = employeeschema;

// export const Updateemployeeschema = employeeschema.extend({
//   id: idSchema,
// });

export const CreateTunnelScheduleVersionSchema = TunnelScheduleVersionSchema;

// export const UpdateTunnelSchema = TunnelSchema.extend({
//   id: idSchema,
// });

// export type TunnelInput = z.infer<typeof TunnelSchema>;

// export type TunnelPostInput = z.infer<typeof TunnelPostSchema>;

// export type TunnelTitleInput = z.infer<typeof TunnelTitleSchema>;

export type CreateTunnelScheduleVersionInput = z.infer<typeof CreateTunnelScheduleVersionSchema>;

export type TunnelScheduleVersionFields = keyof z.infer<typeof TunnelScheduleVersionSchema>;

// export const UpdateTunnelSchema = TunnelSchema.extend({
//   id: idSchema,
// });

// export type UpdateTunnelInput = z.infer<typeof UpdateTunnelSchema>;
