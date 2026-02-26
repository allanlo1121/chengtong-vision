import { OrganizationDetail, OrganizationListItem } from "./types";
import { ActionResult } from "../shared/types/common.types";

import { getOrganizationList } from "./repository";

export async function getOrganizationListAction(): Promise<ActionResult<OrganizationListItem[]>> {
  try {
    const data = await getOrganizationList();
    return { success: true, data };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}
