import { Result } from "@/lib/shared/contracts";
import { projectRepository } from "../repositories";

export async function deleteProject(id: string): Promise<Result<number>> {
  try {
    const count = await projectRepository.softDeleteMany([id]);
    return { success: true, data: count };
  } catch (error) {
    return { success: false, message: (error as Error).message ?? "删除失败" };
  }
}
