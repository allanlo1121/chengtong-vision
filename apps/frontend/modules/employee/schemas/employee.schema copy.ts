import {
  adminRegionCodeSchema,
  countryCodeSchema,
  idSchema,
  latitudeSchema,
  longitudeSchema,
} from "@/modules/shared/schema";
import { title } from "process";

import { email, z } from "zod";

/**
 * Person字段规则
 */
export const PersonSchema = z.object({
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

  genderId: idSchema.meta({
    label: "性别",
    component: "select",
    section: "基本信息",
    colSpan: 1,
    option: { source: "master", code: "GENDER" },
  }),

  birthDate: z.string().optional().nullable().meta({
    label: "出生日期",
    component: "datePicker",
    section: "基本信息",
    colSpan: 1,
  }),

  idCard: z.string().max(18, { message: "身份证号码最多18个字符" }).optional().nullable().meta({
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
      label: "电话号码",
      component: "input",
      section: "基本信息",
      colSpan: 1,
    }),

  email: z.email({ message: "请输入有效的邮箱地址" }).optional().nullable().meta({
    label: "邮箱",
    component: "input",
    section: "基本信息",
    colSpan: 1,
  }),
});

export const EmployeeSchema = z.object({
  personId: idSchema.meta({
    label: "关联人员",
    component: "select",
    section: "基本信息",
    colSpan: 1,
    option: { source: "person", labelKey: "name", valueKey: "id" },
  }),

  organizationId: idSchema.meta({
    label: "所属组织节点",
    component: "treeSelect",
    section: "雇员信息",
    colSpan: 1,
    option: { source: "organization_tree", parentId: null },
  }),

  statusId: idSchema.meta({
    label: "员工状态",
    component: "select",
    section: "雇员信息",
    colSpan: 1,
    option: { source: "master", code: "EMPLOYEE_STATUS" },
  }),

  employeeTypeId: idSchema.meta({
    label: "员工类型",
    component: "select",
    section: "雇员信息",
    colSpan: 1,
    option: { source: "master", code: "EMPLOYEE_TYPE" },
  }),

  hireDate: z.string().optional().nullable().meta({
    label: "入职日期",
    component: "datePicker",
    section: "雇员信息",
    colSpan: 1,
  }),

  entryDate: z.string().optional().nullable().meta({
    label: "转正日期",
    component: "datePicker",
    section: "雇员信息",
    colSpan: 1,
  }),

  leaveDate: z.string().optional().nullable().meta({
    label: "离职日期",
    component: "datePicker",
    section: "雇员信息",
    colSpan: 1,
  }),

  remark: z.string().max(500, { message: "备注最多500个字符" }).optional().nullable().meta({
    label: "备注",
    component: "input",
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
});

export const EmployeePostSchema = z.object({
  employeeId: idSchema.meta({
    label: "员工",
    component: "select",
    section: "基本信息",
    colSpan: 1,
    option: { source: "employee", labelKey: "name", valueKey: "id" },
  }),

  organizationId: idSchema.meta({
    label: "所属组织节点",
    component: "treeSelect",
    section: "雇员信息",
    colSpan: 1,
    option: { source: "organization_tree", parentId: null },
  }),

  postId: idSchema
    .nullable()
    .optional()
    .meta({
      label: "岗位",
      component: "select",
      section: "基本信息",
      colSpan: 1,
      option: { source: "master", code: "JOB_TITLE" },
    }),
});

export const EmployeeTitleSchema = z.object({
  employeeId: idSchema.meta({
    label: "员工",
    component: "select",
    section: "基本信息",
    colSpan: 1,
    option: { source: "employee", labelKey: "name", valueKey: "id" },
  }),

  titleId: idSchema
    .nullable()
    .optional()
    .meta({
      label: "职级",
      component: "select",
      section: "基本信息",
      colSpan: 1,
      option: { source: "master", code: "TITLE" },
    }),

  ObtainedDate: z.string().optional().nullable().meta({
    label: "获得日期",
    component: "datePicker",
    section: "基本信息",
    colSpan: 1,
  }),
});

// export const PersonSchema = z.object(OrganizationFields);

export const CreatePersonSchema = PersonSchema;

export const UpdatePersonSchema = PersonSchema.extend({
  id: idSchema,
});

export const CreateEmployeeSchema = EmployeeSchema;

export const UpdateEmployeeSchema = EmployeeSchema.extend({
  id: idSchema,
});

export type EmployeeInput = z.infer<typeof EmployeeSchema>;

export type EmployeePostInput = z.infer<typeof EmployeePostSchema>;

export type EmployeeTitleInput = z.infer<typeof EmployeeTitleSchema>;

// export type CreatePersonInput = z.infer<typeof CreatePersonSchema>;

// export const UpdatePersonSchema = PersonSchema.extend({
//   id: idSchema,
// });

// export type UpdatePersonInput = z.infer<typeof UpdatePersonSchema>;
