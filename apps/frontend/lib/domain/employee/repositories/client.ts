import { createClient } from "@/lib/infra/supabase/client";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { EmployeePickerQuery, EmployeePickerItem } from "../types";
import { PaginatedResult } from "@/lib/shared/contracts";
import { mapEmployeePicker } from "../mappers";

export async function searchEmployeePicker(
  query: EmployeePickerQuery
): Promise<PaginatedResult<EmployeePickerItem>> {
  const supabase = createClient();

  let builder = supabase.schema("hr").from("v_employee_picker").select("*", { count: "exact" });

  if (query.search?.trim()) {
    const keyword = query.search.trim();

    builder = builder.or(
      [
        `name.ilike.%${keyword}%`,
        `organization_name.ilike.%${keyword}%`,
        `post_name.ilike.%${keyword}%`,
      ].join(",")
    );
  }

  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 20;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await builder.range(from, to);

  assertNoError(error);

  return {
    items: (data ?? []).map(mapEmployeePicker),
    total: count ?? 0,
    page,
    pageSize,
  };
}

// export function getPickerItemById(id: string) {
//   const supabase = createClient();

//   return supabase
//     .schema("hr")
//     .from("v_employee_picker")
//     .select("*")
//     .eq("id", id)
//     .single()
//     .then(({ data, error }) => {
//       assertNoError(error);
//       return data ? mapEmployeePicker(data) : null;
//     });
// }

export async function getPickerById(id: string): Promise<EmployeePickerItem | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .schema("hr")
    .from("v_employee_picker")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  assertNoError(error);

  return data ? mapEmployeePicker(data) : null;
}
