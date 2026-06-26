import { FormFieldMeta } from "@/lib/shared/form-engine/types/field.types";
import { idSchema } from "@/lib/shared/schema";
import { safeCompile } from "next/dist/shared/lib/router/utils/route-match-utils";
import { start } from "node:repl";

import { z } from "zod";
import id from "zod/v4/locales/id.cjs";

/**
 * Employee字段规则
 */
export const EmployeeAssignmentSchema = z.object({
  employeeId: idSchema.meta({
    label: "员工ID",
    component: "employeePicker",
    section: "系统字段",
    colSpan: 1,
  } satisfies FormFieldMeta),
  organizationId: idSchema.meta({
    label: "所属组织",
    component: "organizationPicker",
    section: "岗位信息",
    colSpan: 1,
  } satisfies FormFieldMeta),
  postId: idSchema.meta({
    label: "岗位",
    component: "select",
    section: "岗位信息",
    colSpan: 1,
    optionSource: { source: "posts" },
  } satisfies FormFieldMeta),
  isPrimary: z
    .boolean()
    .default(false)
    .meta({
      label: "是否主岗",
      component: "switch",
      section: "岗位信息",
      colSpan: 1,
    } satisfies FormFieldMeta),
  startDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .optional()
    .nullable()
    .meta({
      label: "开始日期",
      component: "datePicker",
      section: "岗位信息",
      colSpan: 1,
    } satisfies FormFieldMeta),
  endDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .optional()
    .nullable()
    .meta({
      label: "结束日期",
      component: "datePicker",
      section: "岗位信息",
      colSpan: 1,
    } satisfies FormFieldMeta),
});

export const CreateEmployeeAssignmentSchema = EmployeeAssignmentSchema;

export type CreateEmployeeAssignmentInput = z.infer<typeof CreateEmployeeAssignmentSchema>;

export const UpdateEmployeeAssignmentSchema = EmployeeAssignmentSchema.extend({
  id: idSchema,
});

export type UpdateEmployeeAssignmentInput = z.infer<typeof UpdateEmployeeAssignmentSchema>;

export type EmployeeAssignmentFields = keyof z.infer<typeof EmployeeAssignmentSchema>;
