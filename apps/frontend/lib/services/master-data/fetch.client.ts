import { createClient } from "@frontend/lib/supabase/client";
import { MasterDomainCode } from "@frontend/constants/master-data-type";
import { MasterOption } from "@frontend/types/master";

export async function fetchMasterOptionsClient(
  domainCode: MasterDomainCode
): Promise<MasterOption[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("master_data")
    .select("code, name, is_disabled")
    .eq("domain", domainCode)
    .order("sort_order");

  if (error) throw error;

  return (
    data?.map((item) => ({
      value: item.code,
      label: item.name,
      disabled: item.is_disabled ?? false,
    })) ?? []
  );
}
