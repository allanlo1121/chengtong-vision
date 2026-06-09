import { FormFieldMeta } from "@/lib/shared/form-engine/types/field.types";
import { idSchema } from "@/lib/shared/schema";

import { email, z } from "zod";

/**
 * Employee字段规则
 */
export const EmployeeInsertInputSchema = z.object({
  name: z
    .string()
    .min(2, { message: "员工姓名至少2个字符" })
    .max(10, { message: "员工姓名最多10个字符" })
    .meta({
      label: "员工姓名",
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

  genderId: idSchema.meta({
    label: "性别",
    component: "select",
    section: "基本信息",
    colSpan: 1,
    optionSource: { source: "master", code: "GENDER" },
  } satisfies FormFieldMeta),

  birthDate: z
    .string()
    .optional()
    .nullable()
    .meta({
      label: "出生日期",
      component: "datePicker",
      section: "基本信息",
      colSpan: 1,
    } satisfies FormFieldMeta),

  idCard: z
    .string()
    .max(18, { message: "身份证号码最多18个字符" })
    .optional()
    .nullable()
    .meta({
      label: "身份证号码",
      component: "input",
      section: "基本信息",
      colSpan: 1,
    } satisfies FormFieldMeta),

  phone: z
    .string()
    .regex(/^(\+?\d{1,3}[- ]?)?\d{10}$/, {
      message: "请输入有效的电话号码",
    })
    .optional()
    .meta({
      label: "电话号码",
      component: "input",
      section: "基本信息",
      colSpan: 1,
    } satisfies FormFieldMeta),

  email: z
    .email({ message: "请输入有效的邮箱地址" })
    .optional()
    .nullable()
    .meta({
      label: "邮箱",
      component: "input",
      section: "基本信息",
      colSpan: 1,
    } satisfies FormFieldMeta),

  employmentTypeId: idSchema.meta({
    label: "员工类型",
    component: "select",

    section: "雇员信息",
    colSpan: 1,
    optionSource: { source: "master", code: "EMPLOYMENT_TYPE" },
  } satisfies FormFieldMeta),

  hireDate: z
    .string()
    .optional()
    .nullable()
    .meta({
      label: "入职日期",
      component: "datePicker",
      section: "雇员信息",
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
  organizationId: idSchema.meta({
    label: "所属组织节点",
    component: "organizationPicker",
    section: "雇员信息",
    colSpan: 1,
  } satisfies FormFieldMeta),
  postId: idSchema
    .nullable()
    .optional()
    .meta({
      label: "岗位",

      component: "select",
      section: "基本信息",
      colSpan: 1,
      optionSource: { source: "master", code: "JOB_TITLE" },
    } satisfies FormFieldMeta),
  titleId: idSchema
    .nullable()
    .optional()
    .meta({
      label: "职级",
      component: "select",
      section: "基本信息",
      colSpan: 1,
      optionSource: { source: "master", code: "TITLE" },
    } satisfies FormFieldMeta),
});

export type EmployeeInsertInput = z.infer<typeof EmployeeInsertInputSchema>;

export const UpsertEmployeeResultSchema = z.object({
  id: z.uuid(),
  action: z.enum(["inserted", "updated", "skipped"]),
});

export type UpsertEmployeeResult = z.infer<typeof UpsertEmployeeResultSchema>;
