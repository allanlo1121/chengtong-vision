// import { insertOrganization } from "../repositories";
import { insertOne } from "@/lib/core/crud/insert";
import { CreateOrganizationInput } from "../schemas";
import { createRepository } from "@/lib/infra/repositories";
import { ServiceResult } from "@/modules/shared/types";
import { Entity, TableRow } from "@/lib/core/types/entity.types";
import { Result } from "@/modules/shared/contracts/service-result";

export async function createOrganization(
  input: CreateOrganizationInput
): Promise<Result<Entity<"organizations">>> {
  try {
    const result = await insertOne("organizations", input);
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
