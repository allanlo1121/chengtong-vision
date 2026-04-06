import { deleteEntity } from "@/lib/core/crud/delete";
import { Result } from "@/modules/shared/contracts";

export async function deleteOrganization(id: string): Promise<Result<number>> {
  try {
    const count = await deleteEntity("organizations", id);
    return { success: true, data: count };
  } catch (error) {
    return { success: false, message: (error as Error).message ?? "删除失败" };
  }
}
