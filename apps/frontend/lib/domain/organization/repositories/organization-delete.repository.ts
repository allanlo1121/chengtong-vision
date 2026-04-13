import { deleteEntity } from "@/lib/core/crud/delete";

export async function deleteOrganizations(ids: string): Promise<number> {
  return deleteEntity("organizations", ids);
}
