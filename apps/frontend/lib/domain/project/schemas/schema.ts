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
export const ProjectSchema = z.object({
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
    optionSource: { source: "master", code: "PROJECT_MANAGEMENT_MODE" },
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

  remark: z.string().max(500, { message: "备注最多500个字符" }).optional().nullable().meta({
    table: "employees",
    label: "备注",
    component: "input",
    section: "其他信息",
    colSpan: 1,
  }),

  isDisabled: z.boolean().default(false).meta({
    table: "employees",
    label: "是否禁用",
    component: "switch",
    section: "其他信息",
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

export const CreateProjectSchema = ProjectSchema;

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;

export const UpdateProjectSchema = ProjectSchema.extend({
  id: idSchema,
});

export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
