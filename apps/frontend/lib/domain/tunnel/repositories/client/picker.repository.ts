import { createClient } from "@/lib/infra/supabase/client";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { TunnelPickerQuery, TunnelPickerResult } from "../../types";

export async function searchTunnelPicker(query: TunnelPickerQuery): Promise<TunnelPickerResult> {
  const supabase = createClient();

  console.log("searchTunnelPicker query", query);

  let builder = supabase.schema("proj").from("v_tunnel_picker").select("*", { count: "exact" });

  if (query.search) {
    builder = builder.or(`name.ilike.%${query.search}%`);
  }

  // if (query.organizationName && query.organizationName !== "all") {
  //     builder = builder.eq(
  //         "organization_name",
  //         query.organizationName
  //     );
  // }

  // if (query.projectName && query.projectName !== "all") {
  //     builder = builder.ilike(
  //         "project_name",
  //         `%${query.projectName}%`
  //     );
  // }

  // if (query.diameterRange) {
  //     builder = builder.gte("diameter", query.diameterRange[0] * 1000).lte("diameter", query.diameterRange[1] * 1000);
  // }

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
    .schema("proj")
    .from("v_tunnel_picker")
    .select("*")
    .eq("id", id)
    .single()
    .then(({ data, error }) => {
      assertNoError(error);
      return data ?? null;
    });
}
