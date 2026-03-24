import {
  adminRegionCodeSchema,
  countryCodeSchema,
  idSchema,
  latitudeSchema,
  longitudeSchema,
} from "@/modules/shared/schema";

import { z } from "zod";

/**
 * 基础字段规则
 */
export const OrganizationFields = {
  name: z
    .string()
    .min(2, { message: "员工姓名至少2个字符" })
    .max(10, { message: "员工姓名最多10个字符" })
    .meta({
      label: "员工姓名",
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
      label: "编码",
      component: "input",
      type: "text",
      section: "基本信息",
      colSpan: 1,
      description: "唯一标识，建议使用字母、数字和下划线",
    }),

  orgNodeId: idSchema.meta({
    label: "所属组织节点",
    component: "treeSelect",
    section: "基本信息",
    colSpan: 1,
    option: { source: "organization_tree", parentId: null },
  }),

  employeeTypeId: idSchema.meta({
    label: "员工类型",
    component: "select",
    section: "基本信息",
    colSpan: 1,
    option: { source: "master", code: "EMPLOYEE_TYPE" },
  }),

  genderId: idSchema.meta({
    label: "性别",
    component: "select",
    section: "基本信息",
    colSpan: 1,
    option: { source: "master", code: "GENDER" },
  }),

  eduLevelId: idSchema
    .nullable()
    .optional()
    .meta({
      label: "文化程度",
      component: "select",
      section: "基本信息",
      colSpan: 1,
      option: { source: "master", code: "EDU_LEVEL" },
    }),

  jobTitleId: idSchema
    .nullable()
    .optional()
    .meta({
      label: "岗位",
      component: "select",
      section: "基本信息",
      colSpan: 1,
      option: { source: "master", code: "JOB_TITLE" },
    }),

  professional_title_id: idSchema
    .nullable()
    .optional()
    .meta({
      label: "职称",
      component: "select",
      section: "基本信息",
      colSpan: 1,
      option: { source: "master", code: "PROFESSIONAL_TITLE" },
    }),
  employeeMajor: z.string().max(50, { message: "专业最多50个字符" }).optional().nullable().meta({
    label: "专业",
    component: "input",
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

  isActive: z.boolean().default(true).meta({
    label: "是否启用",
    component: "switch",
    section: "其他信息",
    colSpan: 1,
  }),

  sortOrder: z.coerce.number().default(0).meta({
    label: "排序",
    component: "input",
    section: "其他信息",
    type: "number",
    colSpan: 1,
  }),

  externalId: z.string().optional().meta({
    label: "外部ID",
    component: "input",
    section: "系统字段",
    colSpan: 1,
    disabled: true,
  }),

  externalVersion: z.coerce.number().optional().meta({
    label: "外部版本",
    component: "input",
    section: "系统字段",
    colSpan: 1,
    disabled: true,
  }),
};

export const OrganizationSchema = z.object(OrganizationFields);

export const CreateOrganizationSchema = OrganizationSchema;

export type CreateOrganizationInput = z.infer<typeof CreateOrganizationSchema>;

export const UpdateOrganizationSchema = OrganizationSchema.extend({
  id: idSchema,
});

export type UpdateOrganizationInput = z.infer<typeof UpdateOrganizationSchema>;
