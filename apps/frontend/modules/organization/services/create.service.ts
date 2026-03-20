import { insertOrganization } from "../repositories";
import { CreateOrganizationInput } from "../schemas";
import { createRepository } from "@/lib/infra/repositories";
import { ServiceResult } from "@/modules/shared/types";

// export async function createOrganizationService(
//   input: CreateOrganizationInput
// ): Promise<ServiceResult> {
//   // 业务规则可以在这里
//   // 例如：code 自动生成 / fullname 拼接
//   try {
//     await insertOrganization(input);
//     return {
//       success: true,
//       message: "创建成功",
//     };
//   } catch (error: unknown) {
//     return {
//       success: false,
//       message: (error as Error)?.message ?? "创建失败",
//     };
//   }
// }

export async function createOrganization(input: CreateOrganizationInput) {
  const repo = createRepository("organizations");

  return await repo.insert(input);
}
