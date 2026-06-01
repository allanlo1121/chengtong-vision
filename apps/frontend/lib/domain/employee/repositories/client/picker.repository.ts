import { createClient } from "@/lib/infra/supabase/client";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { EmployeePickerQuery, EmployeePickerResult } from "../../types";

export async function searchEmployeePicker(
  query: EmployeePickerQuery
): Promise<EmployeePickerResult> {
  const supabase = createClient();

  let builder = supabase.schema("hr").from("v_employee_picker").select("*", { count: "exact" });

  if (query.search) {
    builder = builder.or(`
      name.ilike.%${query.search}%,
      short_name.ilike.%${query.search}%
    `);
  }

  if (query.organizationId) {
    builder = builder.eq("organization_id", query.organizationId);
  }

  if (query.organizationName) {
    builder = builder.eq("organization_name", query.organizationName);
  }

  if (query.postName) {
    builder = builder.ilike("post_name", `%${query.postName}%`);
  }

  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 20;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await builder.range(from, to);

  assertNoError(error);

  return {
    data: data ?? [],
    count: count ?? 0,
  };
}

export function getPickerItemById(id: string) {
  const supabase = createClient();

  return supabase
    .schema("hr")
    .from("v_employee_picker")
    .select("*")
    .eq("id", id)
    .single()
    .then(({ data, error }) => {
      assertNoError(error);
      return data ?? null;
    });
}
