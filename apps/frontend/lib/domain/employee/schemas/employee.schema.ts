import {
  adminRegionCodeSchema,
  countryCodeSchema,
  idSchema,
  latitudeSchema,
  longitudeSchema,
} from "@/lib/shared/schema";

import { email, z } from "zod";

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
    option: { source: "master", code: "GENDER" },
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
  employmentStatusId: idSchema.meta({
    table: "employees",
    label: "员工状态",
    component: "select",
    field: "employment_status_id",
    filterable: true,
    section: "雇员信息",
    colSpan: 1,
    option: { source: "master", code: "EMPLOYMENT_STATUS" },
  }),

  employmentTypeId: idSchema.meta({
    table: "employees",
    label: "员工类型",
    component: "select",
    field: "employment_type_id",
    filterable: true,
    section: "雇员信息",
    colSpan: 1,
    option: { source: "master", code: "EMPLOYMENT_TYPE" },
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
  posts: z
    .array(
      z.object({
        postId: idSchema.meta({
          label: "岗位",
          component: "select",
          section: "岗位信息",
          colSpan: 1,
          option: { source: "master", code: "JOB_TITLE" },
        }),
        organizationId: idSchema.meta({
          label: "所属组织节点",
          component: "treeSelect",
          section: "岗位信息",
          colSpan: 1,
          option: { source: "organization_tree", parentId: null },
        }),
        postTypeId: idSchema
          .optional()
          .nullable()
          .meta({
            label: "岗位类型",
            component: "select",
            section: "岗位信息",
            colSpan: 1,
            option: { source: "master", code: "POST_TYPE" },
          }),
        isPrimary: z.boolean().default(false).meta({
          label: "是否主岗",
          component: "checkbox",
          section: "岗位信息",
          colSpan: 1,
        }),
      })
    )
    .optional()
    .meta({
      table: "employee_posts",
      label: "岗位信息",
      component: "subTable",
      section: "岗位信息",
      colSpan: 2,
      key: ["postId", "organizationId"], // 复合唯一键
    }),

  titles: z
    .array(
      z.object({
        titleId: idSchema.meta({
          label: "职级",
          component: "select",
          section: "职级信息",
          colSpan: 1,
          option: { source: "master", code: "TITLE" },
        }),
        obtainedDate: z.string().optional().nullable().meta({
          label: "获得日期",
          component: "datePicker",
          section: "职级信息",
          colSpan: 1,
        }),
      })
    )
    .optional()
    .meta({
      table: "employee_titles",
      label: "职级信息",
      component: "subTable",
      section: "职级信息",
      colSpan: 2,
      key: ["titleId"], // 唯一键
    }),
});

// export const employeeschema = z.object(OrganizationFields);

// export const Createemployeeschema = employeeschema;

// export const Updateemployeeschema = employeeschema.extend({
//   id: idSchema,
// });

export const CreateEmployeeSchema = EmployeeSchema;

// export const UpdateEmployeeSchema = EmployeeSchema.extend({
//   id: idSchema,
// });

// export type EmployeeInput = z.infer<typeof EmployeeSchema>;

// export type EmployeePostInput = z.infer<typeof EmployeePostSchema>;

// export type EmployeeTitleInput = z.infer<typeof EmployeeTitleSchema>;

// export type CreatePersonInput = z.infer<typeof Createemployeeschema>;

// export const Updateemployeeschema = employeeschema.extend({
//   id: idSchema,
// });

// export type UpdatePersonInput = z.infer<typeof Updateemployeeschema>;
