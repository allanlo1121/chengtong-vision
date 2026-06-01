import {
  adminRegionCodeSchema,
  countryCodeSchema,
  idSchema,
  latitudeSchema,
  longitudeSchema,
} from "@/lib/shared/schema";

import { z } from "zod";

/**
 * 基础字段规则
 */
export const OrganizationFormSchema = {
  name: z
    .string()
    .min(2, { message: "组织名称至少2个字符" })
    .max(50, { message: "组织名称最多50个字符" })
    .meta({
      label: "组织名称",
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
    .regex(/^[A-Z0-9_-]+$/, {
      message: "编码只能包含大写字母、数字、下划线和中划线",
    })
    .meta({
      label: "编码",
      component: "input",
      type: "text",
      section: "基本信息",
      colSpan: 1,
      description: "唯一标识，建议使用大写字母、数字和下划线",
    }),

  fullName: z.string().max(100, { message: "组织全称最多100个字符" }).optional().meta({
    label: "组织全称",
    component: "input",
    type: "text",
    section: "基本信息",
    colSpan: 2,
  }),

  description: z.string().max(200, { message: "描述最多200个字符" }).optional().nullable().meta({
    label: "描述",
    component: "textarea",
    section: "基本信息",
    colSpan: 2,
  }),

  parentId: idSchema.meta({
    label: "上级组织",
    component: "organizationPicker",
    section: "基本信息",
    colSpan: 1,
    optionSource: { source: "organizations", parentId: null },
  }),

  orgTypeId: idSchema.meta({
    label: "组织类型",
    component: "select",
    section: "基本信息",
    colSpan: 1,
    optionSource: { source: "master", code: "ORG_TYPE" },
  }),
  orgCategoryId: idSchema
    .nullable()
    .optional()
    .meta({
      label: "机构类型",
      component: "select",
      section: "基本信息",
      colSpan: 1,
      optionSource: { source: "master", code: "ORG_CATEGORY" },
    }),

  businessId: idSchema
    .nullable()
    .optional()
    .meta({
      label: "业务类型",
      component: "select",
      section: "基本信息",
      colSpan: 1,
      optionSource: { source: "master", code: "ORG_BUSINESS" },
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
    colSpan: 2,
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
    label: "排序",
    component: "input",
    section: "其他信息",
    type: "number",
    colSpan: 1,
  }),

  isDisabled: z.coerce.boolean().default(false).meta({
    label: "是否禁用",
    component: "switch",
    section: "其他信息",
    colSpan: 1,
  }),

  externalId: z.string().nullable().optional().meta({
    label: "外部ID",
    component: "input",
    section: "系统字段",
    colSpan: 1,
    disabled: true,
  }),

  externalVersion: z.coerce.number().nullable().optional().meta({
    label: "外部版本",
    component: "input",
    section: "系统字段",
    colSpan: 1,
    disabled: true,
  }),
};

export const OrganizationSchema = z.object(OrganizationFormSchema);

export const CreateOrganizationSchema = OrganizationSchema;

export type CreateOrganizationInput = z.infer<typeof CreateOrganizationSchema>;

export const UpdateOrganizationSchema = OrganizationSchema.extend({
  id: idSchema,
});

export type UpdateOrganizationInput = z.infer<typeof UpdateOrganizationSchema>;

export type OrganizationFields = keyof z.infer<typeof OrganizationSchema>;
