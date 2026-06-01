import { createClient } from "@/lib/infra/supabase/client";
import { assertNoError } from "@/lib/infra/repositories/base.repository";
import { ParameterSubsystemNode } from "../../types";

// export async function searchTbmSubsystemPicker(
//     query: TbmPickerQuery
// ): Promise<TbmPickerResult> {
//     const supabase = createClient();

//     console.log("searchTbmSubsystemPicker query", query);

//     let builder = supabase
//         .schema("eqp")
//         .from("v_tbm_picker")
//         .select("*", { count: "exact" });

//     if (query.search) {
//         builder = builder.or(`name.ilike.%${query.search}%`);
//     }

//     if (query.tbmTypeName && query.tbmTypeName !== "all") {
//         builder = builder.eq(
//             "tbm_type_name",
//             query.tbmTypeName
//         );
//     }

//     if (query.manufacturerName && query.manufacturerName !== "all") {
//         builder = builder.ilike(
//             "manufacturer_name",
//             `%${query.manufacturerName}%`
//         );
//     }

//     if (query.diameterRange) {
//         builder = builder.gte("diameter", query.diameterRange[0] * 1000).lte("diameter", query.diameterRange[1] * 1000);
//     }

//     const page = query.page ?? 1;
//     const pageSize = query.pageSize ?? 20;

//     const from = (page - 1) * pageSize;
//     const to = from + pageSize - 1;

//     const { data, count, error } = await builder.range(from, to);

//     assertNoError(error);

//     return {
//         data: data ?? [],
//         count: count ?? 0,
//     };
// }

export async function listTbmSubsystems(): Promise<ParameterSubsystemNode[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .schema("eqp")
    .from("tbm_subsystems")
    .select(
      `
      id,
      code,
      name,
      sort_order,
      tbm_runtime_parameters(count)
    `
    )
    .order("sort_order", { ascending: true });

  assertNoError(error);

  return (
    data?.map((item) => ({
      id: item.id,
      code: item.code,
      name: item.name,
      sortOrder: item.sort_order,

      parameterCount: item.tbm_runtime_parameters?.[0]?.count ?? 0,
    })) ?? []
  );
}
