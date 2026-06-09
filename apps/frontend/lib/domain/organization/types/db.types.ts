import { RemoveNull } from "@/lib/utils/remove-nullable";
import { AppDatabase, Database } from "@/lib/core/database/types";

import { BaseSystemFields } from "@/lib/core/database/types";

export type OrganizationDetailRow = AppDatabase["hr"]["Views"]["v_organization_detail"]["Row"];

export type OrganizationListRow = Database["hr"]["Views"]["v_organization_list"]["Row"];

export type OrganizationFormRow = Database["hr"]["Tables"]["organizations"]["Row"] & {
  parent: {
    id: string;
    name: string;
  } | null;
};
// export type OrganizationListRow = {
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

// export type OrganizationListRow = RemoveNull<RawOrganizationListRow>
//  & {
//   business_name: string | null;
//   city_name: string | null;
//   country_name: string | null;
//   created_at: string | null;
//   district_name: string | null;
// };

// export type RawOrganizationTreeRow = Database["public"]["Views"]["v_organizations_tree"]["Row"];

// export type OrganizationTreeRow = RemoveNull<RawOrganizationTreeRow> & {
//   parent_id: string | null;
// };

export type OrganizationRow = AppDatabase["hr"]["Tables"]["organizations"]["Row"];
export type RawOrganizationInsertRow = AppDatabase["hr"]["Tables"]["organizations"]["Insert"];
export type OrganizationInsertRow = Omit<RawOrganizationInsertRow, BaseSystemFields>;
export type OrganizationUpdateRow = AppDatabase["hr"]["Tables"]["organizations"]["Update"];
// export type OrganizationUpdateRow = Omit<RawOrganizationUpdateRow, BaseSystemFields>;

export type OrganizationPickerRow = AppDatabase["hr"]["Views"]["v_organization_picker"]["Row"];
