import { mapOrganizationTree } from "../mappers";
import { getOrganizationTreeRows } from "../repositories/organization-tree.repository";
import { Result } from "@/modules/shared/contracts";
import { OrganizationTreeNode } from "../types";

export async function getOrganizationTree(
  parentId: string | null = null
): Promise<Result<OrganizationTreeNode[]>> {
  try {
    const rows = await getOrganizationTreeRows(parentId);

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
