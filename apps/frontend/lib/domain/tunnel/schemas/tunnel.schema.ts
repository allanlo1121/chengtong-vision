import { idSchema, latitudeSchema, longitudeSchema } from "@/lib/shared/schema";
import { start } from "node:repl";

import { z } from "zod";

/**
 * Tunnel字段规则
 */
export const TunnelSchema = z.object({
  name: z
    .string()
    .min(4, { message: "隧道简称至少4个字符" })
    .max(8, { message: "隧道简称最多8个字符" })
    .meta({
      table: "tunnels",
      label: "隧道简称",
      field: "name",
      searchable: true, // ⭐
      sortable: true,
      component: "input",
      section: "基本信息",
      type: "text",
      disabled: false,
      required: true,
      readonly: false,
      colSpan: 1,
    }),

  fullName: z.string().max(100, { message: "隧道全称最多100个字符" }).meta({
    table: "tunnels",
    label: "隧道全称",
    field: "full_name",
    searchable: true, // ⭐
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),

  projectId: idSchema.meta({
    table: "tunnels",
    label: "所属项目",
    field: "project_id",
    searchable: true, // ⭐
    sortable: true,
    component: "projectPicker",
    section: "基本信息",
    type: "number",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "projects", parentId: null },
  }),

  startRing: z.coerce.number().default(0).meta({
    table: "tunnels",
    label: "起始环号",
    field: "start_ring",
    searchable: false,
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  endRing: z.coerce.number().optional().nullable().meta({
    table: "tunnels",
    label: "结束环号",
    field: "end_ring",
    searchable: false,
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  prefix: z.string().max(20, { message: "隧道编号前缀最多20个字符" }).optional().nullable().meta({
    table: "tunnels",
    label: "隧道编号前缀",
    field: "prefix",
    searchable: false,
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  startChainage: z.coerce.number().optional().nullable().meta({
    table: "tunnels",
    label: "起始里程",
    field: "start_chainage",
    searchable: false,
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),

  endChainage: z.coerce.number().optional().nullable().meta({
    table: "tunnels",
    label: "结束里程",
    field: "end_chainage",
    searchable: false,
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  geology: z.string().max(500, { message: "地质情况最多500个字符" }).optional().nullable().meta({
    table: "tunnels",
    label: "其他信息",
    field: "geology",
    searchable: false,
    sortable: false,
    component: "textarea",
    section: "基本信息",
    type: "text",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  longitude: longitudeSchema.optional().nullable().meta({
    table: "tunnels",
    label: "经度",
    field: "longitude",
    searchable: false,
    sortable: true,
    component: "input",
    section: "其他信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),

  latitude: latitudeSchema.optional().nullable().meta({
    table: "tunnels",
    label: "纬度",
    field: "latitude",
    searchable: false,
    sortable: true,
    component: "input",
    section: "其他信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  actualStartDate: z.string().optional().nullable().meta({
    table: "tunnels",
    label: "实际开工日期",
    field: "actual_start_date",
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

  actualEndDate: z.string().optional().nullable().meta({
    table: "tunnels",
    label: "实际竣工日期",
    field: "actual_end_date",
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

  sortOrder: z.number().default(0).meta({
    table: "tunnels",
    label: "排序",
    field: "sort_order",
    searchable: false,
    sortable: true,
    component: "input",
    section: "其他信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  isDisabled: z.coerce.boolean().default(false).meta({
    table: "tunnels",
    label: "是否禁用",
    field: "is_disabled",
    searchable: false,
    sortable: true,
    component: "switch",
    section: "其他信息",
    type: "boolean",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  remark: z.string().max(500, { message: "备注最多500个字符" }).optional().nullable().meta({
    table: "tunnels",
    label: "备注",
    field: "remark",
    searchable: false,
    sortable: false,
    component: "input",
    section: "其他信息",
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

export const CreateTunnelSchema = TunnelSchema;

// export const UpdateTunnelSchema = TunnelSchema.extend({
//   id: idSchema,
// });

// export type TunnelInput = z.infer<typeof TunnelSchema>;

// export type TunnelPostInput = z.infer<typeof TunnelPostSchema>;

// export type TunnelTitleInput = z.infer<typeof TunnelTitleSchema>;

export type CreateTunnelInput = z.infer<typeof CreateTunnelSchema>;

export type TunnelFields = keyof z.infer<typeof TunnelSchema>;

export const UpdateTunnelSchema = TunnelSchema.extend({
  id: idSchema,
});

export type UpdateTunnelInput = z.infer<typeof UpdateTunnelSchema>;
