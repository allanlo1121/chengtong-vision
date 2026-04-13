import { RemoveNull } from "@/lib/utils/remove-nullable";
import { Database, Tables, TablesInsert, TablesUpdate } from "@/lib/core/types/database";

import { BaseSystemFields } from "@/lib/core/types";

export type RawOrganizationDetailRow = Database["public"]["Views"]["v_organizations_detail"]["Row"];

export type OrganizationDetailRow = RemoveNull<RawOrganizationDetailRow> & {
  full_name: string | null;
  parent_org_name: string | null;

  province_name: string | null;
  city_name: string | null;
  district_name: string | null;
  address: string | null;

  org_type_name: string | null;
  business_name: string | null;
  country_name: string | null;
};

export type RawOrganizationListRow = Database["public"]["Views"]["v_organizations_list"]["Row"];

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

export type OrganizationListRow = RemoveNull<RawOrganizationListRow> & {
  business_name: string | null;
  city_name: string | null;
  country_name: string | null;
  created_at: string | null;
  district_name: string | null;
};

// export type RawOrganizationTreeRow = Database["public"]["Views"]["v_organizations_tree"]["Row"];

// export type OrganizationTreeRow = RemoveNull<RawOrganizationTreeRow> & {
//   parent_id: string | null;
// };

type AutoFileds = "node_key" | "path" | "level";

export type OrganizationRow = Tables<"organizations">;
export type OrganizationInsertRow = Omit<
  TablesInsert<"organizations">,
  BaseSystemFields | AutoFileds
>;

export type OrganizationUpdateRow = Omit<
  TablesUpdate<"organizations">,
  BaseSystemFields | AutoFileds
>;
