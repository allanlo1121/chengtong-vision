import { createClient } from "@/lib/infra/supabase/client";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { Tunnel, TunnelPickerItem, TunnelPickerQuery, TunnelPickerResult } from "../types";
import { mapTunnel, mapTunnelPicker } from "../mappers";
import { PaginatedResult } from "@/lib/shared/contracts/paginated-result";

export const tunnelClientRepository = {
  searchTunnelPicker,
  getPickerItemById,
  findById,
};

async function findById(id: string): Promise<Tunnel | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .schema("proj")
    .from("tunnels")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  assertNoError(error);

  return data ? mapTunnel(data) : null;
}

async function searchTunnelPicker(
  query: TunnelPickerQuery
): Promise<PaginatedResult<TunnelPickerItem>> {
  const supabase = createClient();

  console.log("searchTunnelPicker query", query);

  let builder = supabase.schema("proj").from("v_tunnel_picker").select("*", { count: "exact" });

  if (query.search) {
    builder = builder.or(`name.ilike.%${query.search}%,
      full_name.ilike.%${query.search}%,`);
  }

  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 20;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await builder.range(from, to);

  assertNoError(error);

  return {
    items: (data ?? []).map(mapTunnelPicker),
    total: count ?? 0,
    page,
    pageSize,
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
