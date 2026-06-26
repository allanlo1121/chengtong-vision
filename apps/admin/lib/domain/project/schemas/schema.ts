import { FormFieldMeta } from "@/lib/shared/form-engine/types/field.types";
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
      label: "工程简称",
      component: "input",
      section: "基本信息",
      type: "text",
      colSpan: 1,
    } satisfies FormFieldMeta),

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
      placeholder: "唯一标识，建议使用字母、数字和下划线",
    } satisfies FormFieldMeta),

  fullName: z
    .string()
    .max(100, { message: "工程全称最多100个字符" })
    .meta({
      label: "工程全称",
      component: "input",
      section: "基本信息",
      type: "text",
      colSpan: 1,
    } satisfies FormFieldMeta),

  projectOverview: z
    .string()
    .max(1000, { message: "工程概况最多1000个字符" })
    .optional()
    .nullable()
    .meta({
      label: "工程概况",
      component: "textarea",
      section: "基本信息",
      type: "text",
      colSpan: 2,
    } satisfies FormFieldMeta),

  projectKeyPoints: z
    .string()
    .max(1000, { message: "工程要点最多1000个字符" })
    .optional()
    .nullable()
    .meta({
      label: "工程要点",
      component: "textarea",
      section: "基本信息",
      type: "text",
      colSpan: 2,
    } satisfies FormFieldMeta),

  projectScope: z
    .string()
    .max(500, { message: "工程范围最多500个字符" })
    .optional()
    .nullable()
    .meta({
      label: "工程范围",
      component: "textarea",
      section: "基本信息",
      type: "text",
      colSpan: 2,
    } satisfies FormFieldMeta),

  organizationId: idSchema.meta({
    label: "所属组织",
    component: "organizationPicker",
    section: "基本信息",
    colSpan: 1,
  } satisfies FormFieldMeta),

  projectManagementModeId: idSchema.meta({
    label: "项目管理模式",
    component: "select",
    section: "项目信息",
    type: "text",
    colSpan: 1,
    optionSource: { source: "master", code: "PROJECT_MANAGEMENT_MODE" },
  } satisfies FormFieldMeta),

  projectTypeId: idSchema.meta({
    label: "项目类型",
    component: "select",
    section: "项目信息",
    type: "text",
    colSpan: 1,
    optionSource: { source: "master", code: "PROJECT_TYPE" },
  } satisfies FormFieldMeta),

  projectSubTypeId: idSchema.meta({
    label: "项目子类型",
    component: "select",
    section: "项目信息",
    type: "text",
    colSpan: 1,
    optionSource: { source: "master", code: "PROJECT_SUB_TYPE" },
  } satisfies FormFieldMeta),

  actualStartDate: z
    .string()
    .optional()
    .nullable()
    .meta({
      label: "实际开工日期",
      component: "datePicker",
      section: "项目信息",
      type: "date",
      colSpan: 1,
    } satisfies FormFieldMeta),

  actualEndDate: z
    .string()
    .optional()
    .nullable()
    .meta({
      label: "实际竣工日期",
      component: "datePicker",
      section: "项目信息",
      type: "date",
      colSpan: 1,
    } satisfies FormFieldMeta),

  countryCode: countryCodeSchema.default("CN").meta({
    label: "国家代码",
    component: "select",
    section: "地理信息",
    colSpan: 1,
    optionSource: { source: "countries" },
  } satisfies FormFieldMeta),

  regionId: idSchema.optional().meta({
    label: "所在区域",
    component: "select",
    section: "地理信息",
    type: "number",
    colSpan: 1,
    optionSource: { source: "master", code: "REGION" },
  } satisfies FormFieldMeta),

  provinceCode: adminRegionCodeSchema.meta({
    label: "省",
    component: "select",
    section: "地理信息",
    colSpan: 1,
    optionSource: {
      source: "admin_regions",
      level: 1,
    },
  } satisfies FormFieldMeta),

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
  } satisfies FormFieldMeta),

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
  } satisfies FormFieldMeta),

  address: z
    .string()
    .max(200, { message: "地址最多200个字符" })
    .optional()
    .nullable()
    .meta({
      label: "地址",
      component: "input",
      section: "地理信息",
      colSpan: 1,
    } satisfies FormFieldMeta),

  latitude: latitudeSchema
    .optional()
    .nullable()
    .meta({
      label: "纬度",
      component: "input",
      section: "地理信息",
      type: "number",
      colSpan: 1,
    } satisfies FormFieldMeta),

  longitude: longitudeSchema
    .optional()
    .nullable()
    .meta({
      label: "经度",
      component: "input",
      section: "地理信息",
      type: "number",
      colSpan: 1,
    } satisfies FormFieldMeta),

  remark: z
    .string()
    .max(500, { message: "备注最多500个字符" })
    .optional()
    .nullable()
    .meta({
      label: "备注",
      component: "input",
      section: "其他信息",
      colSpan: 1,
    } satisfies FormFieldMeta),

  isDisabled: z
    .boolean()
    .default(false)
    .meta({
      label: "是否禁用",
      component: "switch",
      section: "其他信息",
      colSpan: 1,
    } satisfies FormFieldMeta),

  sortOrder: z.coerce
    .number()
    .default(0)
    .meta({
      label: "排序",
      component: "input",
      section: "其他信息",
      type: "number",
      colSpan: 1,
    } satisfies FormFieldMeta),

  externalId: z
    .string()
    .optional()
    .meta({
      label: "外部ID",
      component: "input",
      section: "系统字段",
      colSpan: 1,
    } satisfies FormFieldMeta),

  externalVersion: z.coerce
    .number()
    .optional()
    .meta({
      label: "外部版本",
      component: "input",
      section: "系统字段",
      colSpan: 1,
    } satisfies FormFieldMeta),
});

export const CreateProjectSchema = ProjectSchema;

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;

export const UpdateProjectSchema = ProjectSchema.extend({
  id: idSchema,
});

export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
