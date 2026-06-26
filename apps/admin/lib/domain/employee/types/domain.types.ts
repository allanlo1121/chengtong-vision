import { Camelize } from "@/lib/shared/utils/case-converter";
import {
  EmployeeRow,
  EmployeeInsertRow,
  EmployeeUpdateRow,
  EmployeeListRow,
  EmployeeDetailRow,
  EmployeeAssignmentRow,
} from "./db.types";

// export type EmployeeDetail = Camelize<EmployeeDetailRow>;

export type Employee = Camelize<EmployeeRow>;

export type EmployeeInsert = Camelize<EmployeeInsertRow>;

export type EmployeeUpdate = Camelize<EmployeeUpdateRow>;

export type EmployeeListItem = Camelize<EmployeeListRow>;

export type EmployeeDetail = Camelize<EmployeeDetailRow>;

export type EmployeeAssignment = Camelize<EmployeeAssignmentRow>;
