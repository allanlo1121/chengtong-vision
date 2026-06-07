import { idSchema } from "@/lib/shared/schema";

import { z } from "zod";
import { EmployeeAssignmentSchema } from "./assignment.schema";

/**
 * Employee字段规则
 */
export const EmployeeSchema = z.object({
  name: z
    .string()
    .min(2, { message: "员工姓名至少2个字符" })
    .max(10, { message: "员工姓名最多10个字符" })
    .meta({
      table: "employees",
      label: "员工姓名",
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

  genderId: idSchema.meta({
    table: "employees",
    label: "性别",
    component: "select",
    section: "基本信息",
    colSpan: 1,
    optionSource: { source: "master", code: "GENDER" },
  }),

  birthDate: z.string().optional().nullable().meta({
    table: "employees",
    label: "出生日期",
    component: "datePicker",
    section: "基本信息",
    colSpan: 1,
  }),

  idCard: z.string().max(18, { message: "身份证号码最多18个字符" }).optional().nullable().meta({
    table: "employees",
    label: "身份证号码",
    component: "input",
    section: "基本信息",
    colSpan: 1,
  }),

  phone: z
    .string()
    .regex(/^(\+?\d{1,3}[- ]?)?\d{10}$/, {
      message: "请输入有效的电话号码",
    })
    .optional()
    .nullable()
    .meta({
      table: "employees",
      label: "电话号码",
      component: "input",
      section: "基本信息",
      colSpan: 1,
    }),

  email: z.email({ message: "请输入有效的邮箱地址" }).optional().nullable().meta({
    table: "employees",
    label: "邮箱",
    component: "input",
    section: "基本信息",
    colSpan: 1,
  }),
  employmentStatusId: idSchema.optional().meta({
    table: "employees",
    label: "员工状态",
    component: "select",
    field: "employment_status_id",
    filterable: true,
    section: "雇员信息",
    colSpan: 1,
    optionSource: { source: "master", code: "EMPLOYMENT_STATUS" },
  }),

  employmentTypeId: idSchema.meta({
    table: "employees",
    label: "员工类型",
    component: "select",
    field: "employment_type_id",
    filterable: true,
    section: "雇员信息",
    colSpan: 1,
    optionSource: { source: "master", code: "EMPLOYMENT_TYPE" },
  }),

  hireDate: z.string().optional().nullable().meta({
    table: "employees",

    label: "入职日期",
    component: "datePicker",
    section: "雇员信息",
    colSpan: 1,
  }),

  entryDate: z.string().optional().nullable().meta({
    table: "employees",
    label: "转正日期",
    component: "datePicker",
    section: "雇员信息",
    colSpan: 1,
  }),

  leaveDate: z.string().optional().nullable().meta({
    table: "employees",
    label: "离职日期",
    component: "datePicker",
    section: "雇员信息",
    colSpan: 1,
  }),

  remark: z.string().max(500, { message: "备注最多500个字符" }).optional().nullable().meta({
    table: "employees",
    label: "备注",
    component: "input",
    section: "其他信息",
    colSpan: 1,
  }),
  sortOrder: z.coerce.number().optional().default(0).meta({
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
  organizationId: idSchema.meta({
    table: "employee_assignments",
    label: "所属组织节点",
    component: "organizationPicker",
    section: "岗位信息",
    colSpan: 1,
    optionSource: { source: "organizations", parentId: null },
  }),
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
