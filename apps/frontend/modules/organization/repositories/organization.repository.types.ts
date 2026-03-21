import { RemoveNull } from "@/lib/utils/remove-nullable";
import { Database } from "@/lib/core/types/database";

export type OrganizationDetailRow = Database["public"]["Views"]["v_organizations_detail"]["Row"];

export type RawOrganizationListRow = Database["public"]["Views"]["v_organizations_list"]["Row"];

export type OrganizationListRow = RemoveNull<RawOrganizationListRow> & {
  parent_id: string | null;
  business_name: string | null;
  country_name: string | null;
  province_name: string | null;
  city_name: string | null;
  district_name: string | null;
};

export type OrganizationRow = Database["public"]["Tables"]["organizations"]["Row"];
