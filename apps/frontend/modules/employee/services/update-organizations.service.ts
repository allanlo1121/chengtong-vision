import { Entity, TableRow } from "@/lib/core/types/entity.types";
import { Result } from "@/modules/shared/contracts/service-result";
import { update } from "@/lib/core/crud/update";
import { UpdateOrganizationInput } from "../schemas";

export async function updateOrganization(
  id: string,
  input: UpdateOrganizationInput
): Promise<Result<Entity<"organizations">>> {
  try {
    const result = await update("organizations", id, input);
    return {
      success: true,
      data: result,
      message: "创建成功",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "创建失败",
    };
  }
}
