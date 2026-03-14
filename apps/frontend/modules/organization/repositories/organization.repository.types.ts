import { Database } from "@/types/database";

export type OrganizationDetailRow = Database["public"]["Views"]["v_organizations_detail"]["Row"];

export type OrganizationListRow = Database["public"]["Views"]["v_organizations_list"]["Row"];

export type OrganizationTreeRow = Database["public"]["Views"]["v_organizations_tree"]["Row"];
