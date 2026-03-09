import { insertOrganization } from "../repositories";
import { updateOrganization } from "../repositories/organization-update.repository";
import { UpdateOrganizationInput } from "../schemas";

export type ServiceResult<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};

export async function updateOrganizationService(
  input: UpdateOrganizationInput
): Promise<ServiceResult> {
  // 业务规则可以在这里
  // 例如：code 自动生成 / fullname 拼接
  try {
    await updateOrganization(input);
    return {
      success: true,
      message: "更新成功",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "更新失败",
    };
  }
}
