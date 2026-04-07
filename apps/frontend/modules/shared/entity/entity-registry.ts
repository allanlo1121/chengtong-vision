import { EmployeeSchema } from "@/modules/employee/schemas";

export const entityRegistry = {
  employee: {
    schema: EmployeeSchema,
    schemaName: "hr", // ⭐ 指定 schema
    table: "employees",
    view: {
      list: "v_employee_list",
      full: "v_employee_full",
    },

    primaryKey: "id",
  },
} as const;
