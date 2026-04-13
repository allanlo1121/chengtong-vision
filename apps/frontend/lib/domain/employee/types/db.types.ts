import { RemoveNull } from "@/lib/utils/remove-nullable";
import { Database } from "@/lib/core/types/database";
import { Camelize } from "@/lib/shared/utils/case-converter";

export type EmployeeDetailRow = Database["hr"]["Views"]["v_employee_full"]["Row"];

// export type EmployeeDetailRow = RemoveNull<RawEmployeeDetailRow> & {
//   full_name: string | null;
//   parent_org_name: string | null;

//   province_name: string | null;
//   city_name: string | null;
//   district_name: string | null;
//   address: string | null;

//   org_type_name: string | null;
//   business_name: string | null;
//   country_name: string | null;
// };

export type RawEmployeeListRow = Database["hr"]["Views"]["v_employee_list"]["Row"];

// export type EmployeeListRow = {
//     business_name: string | null;
//     city_name: string | null;
//     country_name: string | null;
//     created_at: string | null;
//     district_name: string | null;
//     id: string;
//     is_active: boolean | null;
//     level: number | null;
//     name: string | null;
//     org_type_name: string | null;
//     parent_id: string | null;
//     parent_org_name: string | null;
//     province_name: string | null;
//     sort_order: number | null;
// }

export type EmployeeListRow = RemoveNull<RawEmployeeListRow> & {
  primary_post_name: string | null;
  status_name: string | null;
};

// export type RawOrganizationTreeRow = Database["public"]["Views"]["v_organizations_tree"]["Row"];

// export type OrganizationTreeRow = RemoveNull<RawOrganizationTreeRow> & {
//   parent_id: string | null;
// };

export type EmployeeRow = Database["hr"]["Tables"]["employees"]["Row"];
export type EmployeeInsertRow = Database["hr"]["Tables"]["employees"]["Insert"];
export type EmployeeUpdateRow = Database["hr"]["Tables"]["employees"]["Update"];

export type Employee = Camelize<EmployeeRow>;

export type EmployeePositionRow = Database["hr"]["Tables"]["employee_positions"]["Row"];
export type EmployeePositionInsertRow = Database["hr"]["Tables"]["employee_positions"]["Insert"];
export type EmployeePositionUpdateRow = Database["hr"]["Tables"]["employee_positions"]["Update"];

export type EmployeePosition = Camelize<EmployeePositionRow>;
