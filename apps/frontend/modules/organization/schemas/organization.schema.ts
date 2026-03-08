import {
  adminRegionCodeSchema,
  countryCodeSchema,
  idSchema,
  latitudeSchema,
  longitudeSchema,
  optionalFields,
} from "@/modules/shared/schema";
import { z } from "zod";
import { is } from "zod/v4/locales";

/**
 * 基础字段规则
 */
export const OrganizationFields = {
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
    .regex(/^[A-Z0-9_]+$/, { message: "编码只能包含大写字母、数字和下划线" })
    .optional()
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

  description: z.string().max(200, { message: "描述最多200个字符" }).optional().meta({
    label: "描述",
    component: "textarea",
    section: "基本信息",
    colSpan: 2,
  }),

  // parentId: idSchema.nullable().meta({
  //   label: "上级组织",
  //   component: "treeSelect",
  //   option: { source: "organization_tree", colSpan: 1 }
  // }),

  orgTypeId: idSchema.meta({
    label: "组织类型",
    component: "select",
    section: "基本信息",
    option: { source: "master", code: "ORG_CATEGORY", colSpan: 1 },
  }),

  // businessId: idSchema.optional().meta({
  //   label: "业务类型",
  //   component: "select",
  //   option: { source: "master", code: "BUSINESS", colSpan: 1 }
  // }),

  // regionId: idSchema.meta({
  //   label: "区域",
  //   component: "select",
  //   option: { source: "master", code: "REGION", colSpan: 1 }
  // }),

  // countryCode: countryCodeSchema.default("CN").meta({
  //   label: "国家代码",
  //   component: "select",
  //   option: { source: "countries", colSpan: 1 }
  // }),

  provinceCode: z
    .string()
    .optional()
    .meta({
      label: "省",
      component: "select",
      section: "基本信息",
      option: {
        source: "admin_regions",
        level: 1,
      },
    }),

  cityCode: z
    .string()
    .optional()
    .meta({
      label: "市",
      component: "select",
      section: "基本信息",
      dependsOn: ["provinceCode"],
      option: (v) => ({
        source: "admin_regions",
        level: 2,
        parentCode: v.provinceCode,
      }),
    }),

  districtCode: z
    .string()
    .optional()
    .meta({
      label: "区县",
      component: "select",
      section: "基本信息",
      dependsOn: ["cityCode"],
      option: (v) => ({
        source: "admin_regions",
        level: 3,
        parentCode: v.cityCode,
      }),
    }),

  // address: z.string().max(200, { message: "地址最多200个字符" }).optional().meta({
  //   label: "地址",
  //   component: "input",
  //   colSpan: 1
  // }),

  // latitude: latitudeSchema.optional().meta({
  //   label: "纬度",
  //   component: "input",
  //    type: "number",
  //   colSpan: 1
  // }),

  // longitude: longitudeSchema.optional().meta({
  //   label: "经度",
  //   component: "input",
  //    type: "number",
  //   colSpan: 1
  // }),

  // isActive: z.boolean().default(false).meta({
  //   label: "是否启用",
  //   component: "switch",
  //   colSpan: 1
  // }),
};

export const CreateOrganizationSchema = z.object({ ...OrganizationFields });

export type CreateOrganizationInput = z.infer<typeof CreateOrganizationSchema>;

export const updateSchema = z.object({
  id: idSchema,
  ...optionalFields(OrganizationFields),
});
