import { insertOrganization } from "../repositories";
import { CreateOrganizationInput } from "../schemas";

export async function createOrganizationService(input: CreateOrganizationInput) {
  console.log("===createOrganizaitonInput");

  // 业务规则可以在这里
  // 例如：code 自动生成 / fullname 拼接

  await insertOrganization(input);
}
