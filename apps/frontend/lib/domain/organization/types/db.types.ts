import { RemoveNull } from "@/lib/utils/remove-nullable";
import { AppDatabase, Database } from "@/lib/core/database/types";

import { BaseSystemFields } from "@/lib/core/database/types";

export type OrganizationDetailRow = AppDatabase["hr"]["Views"]["v_organization_detail"]["Row"];

export type OrganizationListRow = Database["hr"]["Views"]["v_organization_list"]["Row"];

export type OrganizationRow = AppDatabase["hr"]["Tables"]["organizations"]["Row"];
export type RawOrganizationInsertRow = AppDatabase["hr"]["Tables"]["organizations"]["Insert"];
export type OrganizationInsertRow = Omit<RawOrganizationInsertRow, BaseSystemFields>;
export type OrganizationUpdateRow = AppDatabase["hr"]["Tables"]["organizations"]["Update"];
// export type OrganizationUpdateRow = Omit<RawOrganizationUpdateRow, BaseSystemFields>;

export type OrganizationPickerRow = AppDatabase["hr"]["Views"]["v_organization_picker"]["Row"];
