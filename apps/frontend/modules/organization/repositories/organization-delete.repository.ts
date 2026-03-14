import { softDelete } from "@/modules/system/repositories/system.repository";

export async function deleteOrganizations(ids: string[]): Promise<number> {
  return softDelete("organizations", ids);
}
