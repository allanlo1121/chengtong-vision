import { Result } from "@/lib/shared/contracts";
import { employeeRepository } from "../repositories";

export async function deleteEmployee(id: string): Promise<Result<number>> {
  try {
    const count = await employeeRepository.softDeleteMany([id]);
    return { success: true, data: count };
  } catch (error) {
    return { success: false, message: (error as Error).message ?? "删除失败" };
  }
}
