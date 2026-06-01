import { deleteEntity } from "@/lib/core/crud/delete";
import { Result } from "@/lib/shared/contracts";

export async function deleteEmployee(id: string): Promise<Result<number>> {
  try {
    const count = await deleteEntity("employees", id);
    return { success: true, data: count };
  } catch (error) {
    return { success: false, message: (error as Error).message ?? "删除失败" };
  }
}
