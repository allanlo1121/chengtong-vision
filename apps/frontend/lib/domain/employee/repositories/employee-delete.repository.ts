import { deleteEntity } from "@/lib/core/crud/delete";

export async function deleteEmployees(ids: string): Promise<number> {
  return deleteEntity("employees", ids);
}
