import { mapOrganizationTree, OrganizationTreeFlatNode } from "./mapper";
import { getOrganizationTreeRows } from "../repositories/organization-tree.repository";
import { Result } from "@/modules/shared/contracts";

export async function getOrganizationTree(): Promise<Result<OrganizationTreeFlatNode[]>> {
  try {
    const rows = await getOrganizationTreeRows();

    const items = rows.map(mapOrganizationTree);

    return {
      success: true,
      data: items ?? [],
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "获取组织树失败",
    };
  }
}
