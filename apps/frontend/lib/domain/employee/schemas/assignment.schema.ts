import { idSchema } from "@/lib/shared/schema";
import { start } from "node:repl";

import { z } from "zod";
import id from "zod/v4/locales/id.cjs";

/**
 * Employee字段规则
 */
export const EmployeeAssignmentSchema = z.object({
  employeeId: idSchema.meta({
    table: "employee_assignments",
    label: "员工ID",
    component: "employeeSelect",
    section: "系统字段",
    colSpan: 1,
    disabled: true,
  }),
  organizationId: idSchema.meta({
    table: "employee_assignments",
    label: "所属组织",
    component: "organizationSelect",
    section: "岗位信息",
    colSpan: 1,
    optionSource: { source: "organizations", code: "ORG_NAME" },
  }),
  postId: idSchema.meta({
    table: "employee_assignments",
    label: "岗位",
    component: "select",
    section: "岗位信息",
    colSpan: 1,
    optionSource: { source: "posts", code: "JOB_TITLE" },
  }),
  isPrimary: z.boolean().default(false).meta({
    table: "employee_assignments",
    label: "是否主岗",
    component: "switch",
    section: "岗位信息",
    colSpan: 1,
  }),
  startDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .meta({
      table: "employee_assignments",
      label: "开始日期",
      component: "datePicker",
      section: "岗位信息",
      colSpan: 1,
    }),
  endDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .meta({
      table: "employee_assignments",
      label: "结束日期",
      component: "datePicker",
      section: "岗位信息",
      colSpan: 1,
    }),
});

export const CreateEmployeeAssignmentSchema = EmployeeAssignmentSchema;

export type CreateEmployeeAssignmentInput = z.infer<typeof CreateEmployeeAssignmentSchema>;

export const UpdateEmployeeAssignmentSchema = EmployeeAssignmentSchema.extend({
  id: idSchema,
});

export type UpdateEmployeeAssignmentInput = z.infer<typeof UpdateEmployeeAssignmentSchema>;

export type EmployeeAssignmentFields = keyof z.infer<typeof EmployeeAssignmentSchema>;
