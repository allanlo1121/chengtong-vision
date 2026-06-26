import { z } from "zod";
import { idSchema } from "@/lib/shared/schema";

export const ProjectStatusTimelineSchema = z.object({
  projectId: idSchema.meta({
    table: "project_status_timeline",
    label: "项目ID",
    field: "project_id",
    searchable: true, // ⭐
    sortable: true,
    component: "projectPicker",
    section: "项目信息",
    type: "number",
    disabled: true,
    required: true,
    readonly: true,
    colSpan: 1,
    optionSource: { source: "projects" },
  }),

  projectStatusId: idSchema.meta({
    table: "project_status_timeline",
    label: "项目状态",
    field: "project_status_id",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "master", code: "PROJECT_STATUS" },
  }),

  projectSubStatusId: idSchema.meta({
    table: "project_status_timeline",
    label: "项目子状态",
    field: "project_sub_status_id",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "master", code: "PROJECT_SUB_STATUS" },
  }),
  valid_from: z.string().optional().nullable().meta({
    table: "project_status_timeline",
    label: "状态生效时间",
    field: "valid_from",
    searchable: false,
    sortable: true,
    component: "datePicker",
    section: "项目信息",
    type: "date",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  valid_to: z.string().optional().nullable().meta({
    table: "project_status_timeline",
    label: "状态失效时间",
    field: "valid_to",
    searchable: false,
    sortable: true,
    component: "datePicker",
    section: "项目信息",
    type: "date",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),

  changeType: z
    .string()
    .optional()
    .nullable()
    .meta({
      table: "project_status_timeline",
      label: "变更类型",
      field: "change_type",
      searchable: true, // ⭐
      sortable: true,
      component: "select",
      section: "项目信息",
      type: "string",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 1,
      optionSource: { source: "master", code: "PROJECT_STATUS_CHANGE_TYPE" },
    }),
  remark: z.string().optional().nullable().meta({
    table: "project_status_timeline",
    label: "备注",
    field: "remark",
    searchable: false,
    sortable: false,
    component: "textArea",
    section: "项目信息",
    type: "string",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
});

export type ProjectStatusTimeline = z.infer<typeof ProjectStatusTimelineSchema>;

export const ProjectRiskLevelTimelineSchema = z.object({
  projectId: idSchema.meta({
    table: "project_risk_level_timeline",
    label: "项目ID",
    field: "project_id",
    searchable: true, // ⭐
    sortable: true,
    component: "projectPicker",
    section: "项目信息",
    type: "number",
    disabled: true,
    required: true,
    readonly: true,
    colSpan: 1,
    optionSource: { source: "projects" },
  }),
  projectRiskLevelId: idSchema.meta({
    table: "project_risk_level_timeline",
    label: "项目风险等级",
    field: "project_risk_level_id",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "master", code: "PROJECT_RISK_LEVEL" },
  }),
  valid_from: z.string().optional().nullable().meta({
    table: "project_status_timeline",
    label: "状态生效时间",
    field: "valid_from",
    searchable: false,
    sortable: true,
    component: "datePicker",
    section: "项目信息",
    type: "date",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  valid_to: z.string().optional().nullable().meta({
    table: "project_status_timeline",
    label: "状态失效时间",
    field: "valid_to",
    searchable: false,
    sortable: true,
    component: "datePicker",
    section: "项目信息",
    type: "date",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),

  changeType: z
    .string()
    .optional()
    .nullable()
    .meta({
      table: "project_status_timeline",
      label: "变更类型",
      field: "change_type",
      searchable: true, // ⭐
      sortable: true,
      component: "select",
      section: "项目信息",
      type: "string",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 1,
      optionSource: { source: "master", code: "PROJECT_STATUS_CHANGE_TYPE" },
    }),
  remark: z.string().optional().nullable().meta({
    table: "project_status_timeline",
    label: "备注",
    field: "remark",
    searchable: false,
    sortable: false,
    component: "textArea",
    section: "项目信息",
    type: "string",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
});

export type ProjectRiskLevelTimeline = z.infer<typeof ProjectRiskLevelTimelineSchema>;

export const ProjectControlLevelTimelineSchema = z.object({
  projectId: idSchema.meta({
    table: "project_control_level_timeline",
    label: "项目ID",
    field: "project_id",
    searchable: true, // ⭐
    sortable: true,
    component: "projectPicker",
    section: "项目信息",
    type: "number",
    disabled: true,
    required: true,
    readonly: true,
    colSpan: 1,
    optionSource: { source: "projects" },
  }),
  projectControlLevelId: idSchema.meta({
    table: "project_control_level_timeline",
    label: "项目管控等级",
    field: "project_control_level_id",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "master", code: "PROJECT_CONTROL_LEVEL" },
  }),
  valid_from: z.string().optional().nullable().meta({
    table: "project_status_timeline",
    label: "状态生效时间",
    field: "valid_from",
    searchable: false,
    sortable: true,
    component: "datePicker",
    section: "项目信息",
    type: "date",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  valid_to: z.string().optional().nullable().meta({
    table: "project_status_timeline",
    label: "状态失效时间",
    field: "valid_to",
    searchable: false,
    sortable: true,
    component: "datePicker",
    section: "项目信息",
    type: "date",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),

  changeType: z
    .string()
    .optional()
    .nullable()
    .meta({
      table: "project_status_timeline",
      label: "变更类型",
      field: "change_type",
      searchable: true, // ⭐
      sortable: true,
      component: "select",
      section: "项目信息",
      type: "string",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 1,
      optionSource: { source: "master", code: "PROJECT_STATUS_CHANGE_TYPE" },
    }),
  remark: z.string().optional().nullable().meta({
    table: "project_status_timeline",
    label: "备注",
    field: "remark",
    searchable: false,
    sortable: false,
    component: "textArea",
    section: "项目信息",
    type: "string",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
});
export type ProjectControlLevelTimeline = z.infer<typeof ProjectControlLevelTimelineSchema>;

export const ProjectAttentionLevelTimelineSchema = z.object({
  projectId: idSchema.meta({
    table: "project_attention_level_timeline",
    label: "项目ID",
    field: "project_id",
    searchable: true, // ⭐
    sortable: true,
    component: "projectPicker",
    section: "项目信息",
    type: "number",
    disabled: true,
    required: true,
    readonly: true,
    colSpan: 1,
    optionSource: { source: "projects" },
  }),
  projectAttentionLevelId: idSchema.meta({
    table: "project_attention_level_timeline",
    label: "项目关注等级",
    field: "project_attention_level_id",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "master", code: "PROJECT_ATTENTION_LEVEL" },
  }),

  valid_from: z.string().optional().nullable().meta({
    table: "project_status_timeline",
    label: "状态生效时间",
    field: "valid_from",
    searchable: false,
    sortable: true,
    component: "datePicker",
    section: "项目信息",
    type: "date",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  valid_to: z.string().optional().nullable().meta({
    table: "project_status_timeline",
    label: "状态失效时间",
    field: "valid_to",
    searchable: false,
    sortable: true,
    component: "datePicker",
    section: "项目信息",
    type: "date",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),

  changeType: z
    .string()
    .optional()
    .nullable()
    .meta({
      table: "project_status_timeline",
      label: "变更类型",
      field: "change_type",
      searchable: true, // ⭐
      sortable: true,
      component: "select",
      section: "项目信息",
      type: "string",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 1,
      optionSource: { source: "master", code: "PROJECT_STATUS_CHANGE_TYPE" },
    }),
  remark: z.string().optional().nullable().meta({
    table: "project_status_timeline",
    label: "备注",
    field: "remark",
    searchable: false,
    sortable: false,
    component: "textArea",
    section: "项目信息",
    type: "string",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
});

export type ProjectAttentionLevelTimeline = z.infer<typeof ProjectAttentionLevelTimelineSchema>;

export const ProjectAttentionTypeTimelineSchema = z.object({
  projectId: idSchema.meta({
    table: "project_attention_type_timeline",
    label: "项目ID",
    field: "project_id",
    searchable: true, // ⭐
    sortable: true,
    component: "projectPicker",
    section: "项目信息",
    type: "number",
    disabled: true,
    required: true,
    readonly: true,
    colSpan: 1,
    optionSource: { source: "projects" },
  }),

  projectAttentionTypeId: idSchema.optional().meta({
    table: "project_attention_type_timeline",
    label: "项目关注类型",
    field: "project_attention_type_id",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "master", code: "PROJECT_ATTENTION_TYPE" },
  }),
  valid_from: z.string().optional().nullable().meta({
    table: "project_status_timeline",
    label: "状态生效时间",
    field: "valid_from",
    searchable: false,
    sortable: true,
    component: "datePicker",
    section: "项目信息",
    type: "date",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),
  valid_to: z.string().optional().nullable().meta({
    table: "project_status_timeline",
    label: "状态失效时间",
    field: "valid_to",
    searchable: false,
    sortable: true,
    component: "datePicker",
    section: "项目信息",
    type: "date",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
  }),

  changeType: z
    .string()
    .optional()
    .nullable()
    .meta({
      table: "project_status_timeline",
      label: "变更类型",
      field: "change_type",
      searchable: true, // ⭐
      sortable: true,
      component: "select",
      section: "项目信息",
      type: "string",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 1,
      optionSource: { source: "master", code: "PROJECT_STATUS_CHANGE_TYPE" },
    }),
});

export type ProjectAttentionTypeTimeline = z.infer<typeof ProjectAttentionTypeTimelineSchema>;
