import { RemoveNull } from "@/lib/utils/remove-nullable";
import { AppDatabase } from "@/lib/core/database/types";

import { BaseSystemFields } from "@/lib/core/database/types";

export type EmployeeDetailRow = AppDatabase["hr"]["Views"]["v_employee_detail"]["Row"];

export type EmployeeListRow = AppDatabase["hr"]["Views"]["v_employee_list"]["Row"];

// export type EmployeeListRow = RemoveNull<RawEmployeeListRow> & {
//   post_name: string | null;
//   employment_status_name: string | null;
// };

export type EmployeePickerRow = AppDatabase["hr"]["Views"]["v_employee_picker"]["Row"];

export type EmployeeRow = AppDatabase["hr"]["Tables"]["employees"]["Row"];
export type EmployeeInsertRow = AppDatabase["hr"]["Tables"]["employees"]["Insert"];
export type EmployeeUpdateRow = AppDatabase["hr"]["Tables"]["employees"]["Update"];

export type EmployeeAssignmentRow = AppDatabase["hr"]["Tables"]["employee_assignments"]["Row"];
export type EmployeeAssignmentInsertRow =
  AppDatabase["hr"]["Tables"]["employee_assignments"]["Insert"];
export type EmployeeAssignmentUpdateRow =
  AppDatabase["hr"]["Tables"]["employee_assignments"]["Update"];
