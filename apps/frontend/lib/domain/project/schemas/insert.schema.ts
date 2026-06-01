import {
  adminRegionCodeSchema,
  countryCodeSchema,
  idSchema,
  latitudeSchema,
  longitudeSchema,
} from "@/lib/shared/schema";

import { z } from "zod";

/**
 * Project字段规则
 */
export const ProjectInsertInputSchema = z.object({
  name: z
    .string()
    .min(4, { message: "工程简称至少4个字符" })
    .max(20, { message: "工程简称最多20个字符" })
    .meta({
      table: "projects",
      label: "工程简称",
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

  code: z
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "编码只能包含字母、数字、下划线和中划线",
    })
    .meta({
      table: "employees",
      label: "编码",
      component: "input",
      type: "text",
      section: "基本信息",
      colSpan: 1,
      description: "唯一标识，建议使用字母、数字和下划线",
    }),

  fullName: z.string().max(100, { message: "工程全称最多100个字符" }).meta({
    table: "projects",
    label: "工程全称",
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

  projectOverview: z
    .string()
    .max(1000, { message: "工程概况最多1000个字符" })
    .optional()
    .nullable()
    .meta({
      table: "projects",
      label: "工程概况",
      field: "project_overview",
      searchable: false,
      sortable: false,
      component: "textarea",
      section: "基本信息",
      type: "text",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 2,
    }),

  projectKeyPoints: z
    .string()
    .max(1000, { message: "工程要点最多1000个字符" })
    .optional()
    .nullable()
    .meta({
      table: "projects",
      label: "工程要点",
      field: "project_key_points",
      searchable: false,
      sortable: false,
      component: "textarea",
      section: "基本信息",
      type: "text",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 2,
    }),

  projectScope: z
    .string()
    .max(500, { message: "工程范围最多500个字符" })
    .optional()
    .nullable()
    .meta({
      table: "projects",
      label: "工程范围",
      field: "project_scope",
      searchable: false,
      sortable: false,
      component: "textarea",
      section: "基本信息",
      type: "text",
      disabled: false,
      required: false,
      readonly: false,
      colSpan: 2,
    }),

  organizationId: idSchema.meta({
    table: "projects",
    label: "所属组织",
    field: "organization_id",
    searchable: true, // ⭐
    sortable: true,
    component: "treeSelect",
    section: "基本信息",
    type: "number",
    disabled: false,
    required: true,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "organization_tree", parentId: null },
  }),

  projectManagementModeId: idSchema.meta({
    table: "projects",
    label: "项目管理模式",
    field: "project_management_mode_id",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    option: { source: "master", code: "PROJECT_MANAGEMENT_MODE" },
  }),

  projectTypeId: idSchema.meta({
    table: "projects",
    label: "项目类型",
    field: "project_type_id",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "master", code: "PROJECT_TYPE" },
  }),

  projectSubTypeId: idSchema.meta({
    table: "projects",
    label: "项目子类型",
    field: "project_sub_type_id",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "master", code: "PROJECT_SUB_TYPE", parentCodeField: "PROJECT_TYPE" },
  }),

  actualStartDate: z.string().optional().nullable().meta({
    table: "projects",
    label: "实际开工日期",
    field: "actual_start_date",
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

  actualEndDate: z.string().optional().nullable().meta({
    table: "projects",
    label: "实际竣工日期",
    field: "actual_end_date",
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
  regionId: idSchema.meta({
    table: "projects",
    label: "所在区域",
    field: "region_id",
    searchable: true, // ⭐
    sortable: true,
    component: "cascader",
    section: "地理信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "master", code: "REGION" },
  }),
  countryCode: countryCodeSchema.default("CN").meta({
    label: "国家代码",
    component: "select",
    section: "地理信息",
    colSpan: 1,
    optionSource: { source: "countries" },
  }),

  provinceCode: adminRegionCodeSchema.meta({
    label: "省",
    component: "select",
    section: "地理信息",
    colSpan: 1,
    optionSource: {
      source: "admin_regions",
      level: 1,
    },
  }),

  cityCode: adminRegionCodeSchema.meta({
    label: "市",
    component: "select",
    section: "地理信息",
    colSpan: 1,
    dependsOn: ["provinceCode"],
    optionSource: (v: any) => ({
      source: "admin_regions",
      level: 2,
      parentCode: v.provinceCode,
    }),
  }),

  districtCode: adminRegionCodeSchema.meta({
    label: "区县",
    component: "select",
    section: "地理信息",
    dependsOn: ["cityCode"],
    optionSource: (v: any) => ({
      source: "admin_regions",
      level: 3,
      parentCode: v.cityCode,
    }),
  }),

  address: z.string().max(200, { message: "地址最多200个字符" }).optional().nullable().meta({
    label: "地址",
    component: "input",
    section: "地理信息",
    colSpan: 1,
  }),

  latitude: latitudeSchema.optional().nullable().meta({
    label: "纬度",
    component: "input",
    section: "地理信息",
    type: "number",
    colSpan: 1,
  }),

  longitude: longitudeSchema.optional().nullable().meta({
    label: "经度",
    component: "input",
    section: "地理信息",
    type: "number",
    colSpan: 1,
  }),

  remark: z.string().max(500, { message: "备注最多500个字符" }).optional().nullable().meta({
    table: "employees",
    label: "备注",
    component: "input",
    section: "其他信息",
    colSpan: 1,
  }),

  externalId: z.string().optional().meta({
    table: "employees",
    label: "外部ID",
    component: "input",
    section: "系统字段",
    colSpan: 1,
    disabled: true,
  }),

  externalVersion: z.coerce.number().optional().meta({
    table: "employees",
    label: "外部版本",
    component: "input",
    section: "系统字段",
    colSpan: 1,
    disabled: true,
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

  organizationChiefEngineerId: idSchema.meta({
    table: "project_leader_timeline",
    label: "项目总工",
    field: "organization_chief_engineer_id",
    searchable: true, // ⭐
    sortable: true,
    component: "employeePicker",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "employees" },
  }),
  organizationChiefEngineerRoleTypeId: idSchema.meta({
    table: "project_leader_timeline",
    label: "项目总工角色类型",
    field: "organization_chief_engineer_role_type_id",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "organizationRoleType" },
  }),

  organizationManagerId: idSchema.meta({
    table: "project_leader_timeline",
    label: "项目经理",
    field: "organization_manager_id",
    searchable: true, // ⭐
    sortable: true,
    component: "employeePicker",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "employees" },
  }),

  organizationManagerRoleTypeId: idSchema.meta({
    table: "project_leader_timeline",
    label: "项目经理角色类型",
    field: "organization_manager_role_type_id",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "organizationRoleType" },
  }),

  organizationOversightLeaderId: idSchema.meta({
    table: "project_leader_timeline",
    label: "公司包保领导",
    field: "organization_oversight_leader_id",
    searchable: true, // ⭐
    sortable: true,
    component: "employeePicker",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "employees" },
  }),

  organizationOversightLeaderRoleTypeId: idSchema.meta({
    table: "project_leader_timeline",
    label: "公司包保领导角色类型",
    field: "organization_oversight_leader_role_type_id",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "organizationRoleType" },
  }),

  organizationPartySecretaryId: idSchema.meta({
    table: "project_leader_timeline",
    label: "项目党组织书记",
    field: "organization_party_secretary_id",
    searchable: true, // ⭐
    sortable: true,
    component: "employeePicker",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "employees" },
  }),

  organizationPartySecretaryRoleTypeId: idSchema.meta({
    table: "project_leader_timeline",
    label: "项目党组织书记角色类型",
    field: "organization_party_secretary_role_type_id",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "organizationRoleType" },
  }),

  organizationSafetyDirectorId: idSchema.meta({
    table: "project_leader_timeline",
    label: "项目安全总监",
    field: "organization_safety_director_id",
    searchable: true, // ⭐
    sortable: true,
    component: "employeePicker",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "employees" },
  }),

  organizationSafetyDirectorRoleTypeId: idSchema.meta({
    table: "project_leader_timeline",
    label: "项目安全总监角色类型",
    field: "organization_safety_director_role_type_id",
    searchable: true, // ⭐
    sortable: true,
    component: "select",
    section: "项目信息",
    type: "number",
    disabled: false,
    required: false,
    readonly: false,
    colSpan: 1,
    optionSource: { source: "organizationRoleType" },
  }),
});

// export const employeeschema = z.object(OrganizationFields);

// export const Createemployeeschema = employeeschema;

// export const Updateemployeeschema = employeeschema.extend({
//   id: idSchema,
// });

// export const CreateEmployeeSchema = EmployeeSchema;

// export const UpdateEmployeeSchema = EmployeeSchema.extend({
//   id: idSchema,
// });

export type ProjectInsertInput = z.infer<typeof ProjectInsertInputSchema>;

// export type EmployeePostInput = z.infer<typeof EmployeePostSchema>;

// export type EmployeeTitleInput = z.infer<typeof EmployeeTitleSchema>;

// export type CreatePersonInput = z.infer<typeof Createemployeeschema>;

// export const Updateemployeeschema = employeeschema.extend({
//   id: idSchema,
// });

// export type UpdatePersonInput = z.infer<typeof Updateemployeeschema>;

export const UpsertProjectResultSchema = z.object({
  id: z.uuid(),
  action: z.enum(["inserted", "updated", "skipped"]),
});

export type UpsertProjectResult = z.infer<typeof UpsertProjectResultSchema>;
