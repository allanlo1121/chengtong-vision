import { idSchema, latitudeSchema, longitudeSchema } from "@/lib/shared/schema";

import { z } from "zod";

/**
 * TunnelStatusTimeline字段规则
 */
export const TunnelStatusTimelineSchema = z.object({
  tunnelStatusId: idSchema
    .optional()
    .nullable()
    .meta({
      table: "tunnels",
      label: "当前状态",
      field: "tunnel_status_id",
      searchable: false,
      sortable: true,
      component: "select",
      section: "状态信息",
      type: "number",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 1,
      optionSource: { source: "master", code: "PROJECT_SUB_STATUS" },
    }),
  validFrom: z.string().optional().nullable().meta({
    table: "tunnel_status_timeline",
    label: "状态开始时间",
    field: "valid_from",
    searchable: false,
    sortable: true,
    component: "datePicker",
    section: "状态信息",
    type: "date",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  validTo: z.string().optional().nullable().meta({
    table: "tunnel_status_timeline",
    label: "状态结束时间",
    field: "valid_to",
    searchable: false,
    sortable: true,
    component: "datePicker",
    section: "状态信息",
    type: "date",
    disabled: true,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  changeType: z
    .string()
    .optional()
    .nullable()
    .meta({
      table: "tunnel_status_timeline",
      label: "变更类型",
      field: "change_type",
      searchable: false,
      sortable: true,
      component: "select",
      section: "状态信息",
      type: "string",
      disabled: true,
      required: false,
      readonly: false,
      colSpan: 1,
      options: [
        { label: "手动变更", value: "manual" },
        { label: "错误矫正", value: "correction" },
        { label: "自动变更", value: "auto" },
      ],
    }),
  remark: z.string().max(500, { message: "变更备注最多500个字符" }).optional().nullable().meta({
    table: "tunnel_status_timeline",
    label: "变更备注",
    field: "remark",
    searchable: false,
    sortable: false,
    component: "input",
    section: "状态信息",
    type: "string",
    disabled: true,
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

export const CreateTunnelStatusTimelineSchema = TunnelStatusTimelineSchema;

// export const UpdateTunnelSchema = TunnelSchema.extend({
//   id: idSchema,
// });

// export type TunnelInput = z.infer<typeof TunnelSchema>;

// export type TunnelPostInput = z.infer<typeof TunnelPostSchema>;

// export type TunnelTitleInput = z.infer<typeof TunnelTitleSchema>;

export type CreateTunnelStatusTimelineInput = z.infer<typeof CreateTunnelStatusTimelineSchema>;

export type TunnelStatusTimelineFields = keyof z.infer<typeof TunnelStatusTimelineSchema>;

// export const UpdateTunnelSchema = TunnelSchema.extend({
//   id: idSchema,
// });

// export type UpdateTunnelInput = z.infer<typeof UpdateTunnelSchema>;
