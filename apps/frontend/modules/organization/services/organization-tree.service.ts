import { buildTree, TreeNode } from "@/lib/utils/tree";
import { mapOrganizationTree } from "../mapper/organization.mapper";
import { findOrganizationTreeRows } from "../repositories/organization.repository";
import { OrganizationTreeItem, OrganizationTreeNode } from "../types";
import { ServiceResult } from "@/modules/shared/types";

export async function getOrganizationTree(): Promise<
  ServiceResult<TreeNode<OrganizationTreeItem>[]>
> {
  try {
    const rows = await findOrganizationTreeRows();

    const items = rows.map(mapOrganizationTree);

    const tree = buildTree(items);

    return {
      success: true,
      data: tree ?? [],
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "获取组织树失败",
    };
  }
}
