import { idSchema } from "@/lib/shared/schema";

import { z } from "zod";
import { EmployeeAssignmentSchema } from "./assignment.schema";
import { Form } from "radix-ui";
import { FormFieldMeta } from "@/lib/shared/form-engine/types";

/**
 * Employee字段规则
 */
export const EmployeeSchema = z.object({
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
    .nullable()
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
  employmentStatusId: idSchema.optional().meta({
    label: "员工状态",
    component: "select",
    section: "雇员信息",
    colSpan: 1,
    optionSource: { source: "master", code: "EMPLOYMENT_STATUS" },
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

  entryDate: z
    .string()
    .optional()
    .nullable()
    .meta({
      label: "转正日期",
      component: "datePicker",
      section: "雇员信息",
      colSpan: 1,
    } satisfies FormFieldMeta),

  leaveDate: z
    .string()
    .optional()
    .nullable()
    .meta({
      label: "离职日期",
      component: "datePicker",
      section: "雇员信息",
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
  sortOrder: z.coerce
    .number()
    .optional()
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
  organizationId: idSchema.meta({
    label: "所属组织节点",
    component: "organizationPicker",
    section: "岗位信息",
    colSpan: 1,
  } satisfies FormFieldMeta),
});

export const CreateEmployeeSchema = EmployeeSchema;

export type CreateEmployeeInput = z.infer<typeof CreateEmployeeSchema>;

export const UpdateEmployeeSchema = EmployeeSchema.extend({
  id: idSchema,
});

export type UpdateEmployeeInput = z.infer<typeof UpdateEmployeeSchema>;

export type EmployeeFields = keyof z.infer<typeof EmployeeSchema>;

export const CreateEmployeeWithAssignmentSchema = z.object({
  ...EmployeeSchema.shape,
  ...EmployeeAssignmentSchema.shape,
});

export type CreateEmployeeWithAssignmentInput = z.infer<typeof CreateEmployeeWithAssignmentSchema>;

export const UpdateEmployeeWithAssignmentSchema = CreateEmployeeWithAssignmentSchema.extend({
  id: idSchema,
});
