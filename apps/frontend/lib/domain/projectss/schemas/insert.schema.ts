import {
  adminRegionCodeSchema,
  countryCodeSchema,
  idSchema,
  latitudeSchema,
  longitudeSchema,
} from "@/lib/shared/schema";

import { email, z } from "zod";

/**
 * ProjectImport字段规则
 */
export const ProjectImportSchema = z.object({
  name: z
    .string()
    .min(2, { message: "工程名称至少2个字符" })
    .max(100, { message: "工程名称最多100个字符" })
    .meta({
      table: "projects",
      label: "工程名称",
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
      table: "projects",
      label: "工程编码",
      component: "input",
      type: "text",
      section: "基本信息",
      colSpan: 1,
      description: "唯一标识，建议使用字母、数字和下划线",
    }),

  organization_id: idSchema.meta({
    table: "projects",
    label: "所属组织",
    component: "select",
    section: "基本信息",
    colSpan: 1,
    option: { source: "api", code: "organizations" },
  }),

  projectTypeId: idSchema.meta({
    table: "projects",
    label: "工程类型",
    component: "select",
    section: "基本信息",
    colSpan: 1,
    option: { source: "master", code: "PROJECT_TYPE" },
  }),

  projectSubTypeId: idSchema.meta({
    table: "projects",
    label: "工程子类型",
    component: "select",
    section: "基本信息",
    colSpan: 1,
    option: { source: "master", code: "PROJECT_SUB_TYPE" },
  }),

  projectStatusId: idSchema.meta({
    table: "projects",
    label: "工程状态",
    component: "select",
    field: "project_status_id",
    filterable: false,
    section: "基本信息",
    colSpan: 1,
    option: { source: "master", code: "PROJECT_STATUS" },
  }),

  projectSubStatusId: idSchema.meta({
    table: "projects",
    label: "工程子状态",
    component: "select",
    field: "project_sub_status_id",
    filterable: false,
    section: "基本信息",
    colSpan: 1,
    option: { source: "master", code: "PROJECT_SUB_STATUS" },
  }),

  projectManagementModeId: idSchema.meta({
    table: "projects",
    label: "工程管理模式",
    component: "select",
    field: "project_management_mode_id",
    filterable: false,
    section: "基本信息",
    colSpan: 1,
    option: { source: "master", code: "PROJECT_MANAGEMENT_MODE" },
  }),

  projectRiskLevelId: idSchema.meta({
    table: "projects",
    label: "工程风险等级",
    component: "select",
    field: "project_risk_level_id",
    filterable: false,
    section: "基本信息",
    colSpan: 1,
    option: { source: "master", code: "PROJECT_RISK_LEVEL" },
  }),

  projectAttentionLevelId: idSchema.meta({
    table: "projects",
    label: "工程关注度等级",
    component: "select",
    field: "project_attention_level_id",
    filterable: false,
    section: "基本信息",
    colSpan: 1,
    option: { source: "master", code: "PROJECT_ATTENTION_LEVEL" },
  }),

  projectAttentionTypeId: idSchema.meta({
    table: "projects",
    label: "工程关注类型",
    component: "select",
    field: "project_attention_type_id",
    filterable: false,
    section: "基本信息",
    colSpan: 1,
    option: { source: "master", code: "PROJECT_ATTENTION_TYPE" },
  }),

  projectControlLevelId: idSchema.meta({
    table: "projects",
    label: "工程管控级别",
    component: "select",
    field: "project_control_level_id",
    filterable: false,
    section: "基本信息",
    colSpan: 1,
    option: { source: "master", code: "PROJECT_CONTROL_LEVEL" },
  }),

  planStartDate: z.string().optional().nullable().meta({
    table: "projects",
    label: "计划开工日期",
    component: "datePicker",
    section: "基本信息",
    colSpan: 1,
  }),

  planEndDate: z.string().optional().nullable().meta({
    table: "projects",
    label: "计划竣工日期",
    component: "datePicker",
    section: "基本信息",
    colSpan: 1,
  }),

  actualStartDate: z.string().optional().nullable().meta({
    table: "projects",
    label: "实际开工日期",
    component: "datePicker",
    section: "基本信息",
    colSpan: 1,
  }),

  actualEndDate: z.string().optional().nullable().meta({
    table: "projects",
    label: "实际竣工日期",
    component: "datePicker",
    section: "基本信息",
    colSpan: 1,
  }),

  commissioningDate: z.string().optional().nullable().meta({
    table: "projects",
    label: "投产日期",
    component: "datePicker",
    section: "基本信息",
    colSpan: 1,
  }),

  countryCode: countryCodeSchema.default("CN").meta({
    label: "国家代码",
    component: "select",
    section: "地理信息",
    colSpan: 1,
    option: { source: "countries" },
  }),

  provinceCode: adminRegionCodeSchema.meta({
    label: "省",
    component: "select",
    section: "地理信息",
    colSpan: 1,
    option: {
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
    option: (v: any) => ({
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
    option: (v: any) => ({
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

  sortOrder: z.coerce.number().default(0).meta({
    table: "employees",
    label: "排序",
    component: "input",
    section: "其他信息",
    type: "number",
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

export type ProjectImportInput = z.infer<typeof ProjectImportSchema>;

// export type EmployeePostInput = z.infer<typeof EmployeePostSchema>;

// export type EmployeeTitleInput = z.infer<typeof EmployeeTitleSchema>;

// export type CreatePersonInput = z.infer<typeof Createemployeeschema>;

// export const Updateemployeeschema = employeeschema.extend({
//   id: idSchema,
// });

// export type UpdatePersonInput = z.infer<typeof Updateemployeeschema>;

// export const UpsertEmployeeResultSchema = z.object({
//   id: z.uuid(),
//   action: z.enum(["inserted", "updated", "skipped"]),
// });

// export type UpsertEmployeeResult = z.infer<typeof UpsertEmployeeResultSchema>;
