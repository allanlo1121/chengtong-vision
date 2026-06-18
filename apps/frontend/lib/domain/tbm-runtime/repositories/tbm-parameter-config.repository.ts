import { createClient } from "@/lib/infra/supabase/server";
import {
  TbmParameterConfigInsertRow,
  TbmParameterConfig,
  TbmParameterConfigListItem,
} from "../types";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";

import { appErrors, PaginatedResult } from "@/lib/shared/contracts";
import {
  mapTbmParameterConfig,
  mapTbmParameterConfigInsertRow,
  mapTbmParameterConfigListItem,
  mapTbmParameterConfigUpdateRow,
} from "../mappers";
import { CreateTbmParameterConfigInput, UpdateTbmParameterConfigInput } from "../schemas";

export const tbmParameterConfigRepository = {
  insert: async (input: CreateTbmParameterConfigInput): Promise<TbmParameterConfig> => {
    const supabase = await createClient();
    const payload = mapTbmParameterConfigInsertRow(input);
    const { data, error } = await supabase
      .schema("tbm")
      .from("tbm_parameter_configs")
      .insert(payload)
      .select()
      .single();

    assertNoError(error);
    if (!data) {
      throw appErrors.internal("插入TBM参数绑定记录失败");
    }
    return mapTbmParameterConfig(data);
  },
  update: async (input: UpdateTbmParameterConfigInput): Promise<TbmParameterConfig> => {
    const supabase = await createClient();

    const payload = mapTbmParameterConfigUpdateRow(input);

    const { data, error } = await supabase
      .schema("tbm")
      .from("tbm_parameter_configs")
      .update(payload)
      .eq("id", input.id)
      .select()
      .single();

    assertNoError(error);

    if (!data) {
      throw appErrors.internal("更新TBM参数绑定记录失败");
    }

    return mapTbmParameterConfig(data);
  },
  deleteById: async (id: number): Promise<void> => {
    const supabase = await createClient();

    // 删除记录
    const { data, error } = await supabase
      .schema("tbm")
      .from("tbm_parameter_configs")
      .delete()
      .eq("id", id)
      .select()
      .single();

    assertNoError(error);

    if (!data) {
      throw appErrors.internal("删除TBM参数绑定记录失败");
    }

    return;
  },
  findById: async (id: number): Promise<TbmParameterConfig | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("tbm")
      .from("tbm_parameter_configs")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    assertNoError(error);

    return data ? mapTbmParameterConfig(data) : null;
  },
  deleteByTbmId: async (tbmId: string): Promise<void> => {
    const supabase = await createClient();

    const { error } = await supabase
      .schema("tbm")
      .from("tbm_parameter_configs")
      .delete()
      .eq("tbm_id", tbmId);

    assertNoError(error);
  },
  insertMany: async (rows: TbmParameterConfigInsertRow[]): Promise<number> => {
    const supabase = await createClient();

    const { error } = await supabase.schema("tbm").from("tbm_parameter_configs").insert(rows);

    assertNoError(error);

    return rows.length;
  },
  paginateByTbmId,
  syncTbmRealdataTable,
  // findParameterBindingGroups,
  // replaceBindingParameters,
  getTbmParameterConfigs,
};

async function syncTbmRealdataTable(tbmId: string): Promise<void> {
  const supabase = await createClient();
  console.log("Syncing TBM realdata table for TBM ID", tbmId);
  const { error } = await supabase.schema("tbm").rpc("sync_realdata_table", {
    p_tbm_id: tbmId,
  });

  console.log("Sync result", { error });
  assertNoError(error);
}

// async function findParameterBindingGroups(tbmId: string): Promise<TbmParameterBindingGroup[]> {
//   const supabase = await createClient();

//   const [
//     { data: subsystems, error: subsystemError },
//     { data: parameters, error: parameterError },
//     { data: BindingParameters, error: BindingError },
//   ] = await Promise.all([
//     supabase
//       .schema("eqp")
//       .from("tbm_subsystems")
//       .select("id, code, name")
//       .eq("is_configurable", true)
//       .order("sort_order", { ascending: true }),

//     supabase
//       .schema("eqp")
//       .from("tbm_runtime_parameters")
//       .select(
//         `
//           id,
//           code,
//           name,
//           subsystem_id,
//           data_type,
//           unit,
//           digits,
//           is_alarm,
//           is_virtual,
//           is_group,
//           is_trendable,
//           is_reportable,
//           is_disabled,
//           sort_order
//         `
//       )
//       .order("sort_order", { ascending: true }),

//     supabase
//       .schema("eqp")
//       .from("tbm_parameter_bindings")
//       .select("parameter_id")
//       .eq("tbm_id", tbmId),
//   ]);

//   assertNoError(subsystemError);
//   assertNoError(parameterError);
//   assertNoError(BindingError);

//   const selectedIds = new Set(BindingParameters?.map((item) => item.parameter_id) ?? []);

//   return (
//     subsystems?.map((subsystem) => {
//       const groupParameters =
//         parameters
//           ?.filter((item) => item.subsystem_id === subsystem.id)
//           .map((item) => ({
//             id: item.id,
//             code: item.code,
//             name: item.name,
//             subsystemId: item.subsystem_id,
//             subsystemName: subsystem.name,
//             dataType: item.data_type,
//             unit: item.unit,
//             digits: item.digits,
//             isAlarm: item.is_alarm,
//             isVirtual: item.is_virtual,
//             isGroup: item.is_group,
//             isTrendable: item.is_trendable,
//             isReportable: item.is_reportable,
//             isDisabled: item.is_disabled,
//             sortOrder: item.sort_order,
//           })) ?? [];

//       return {
//         subsystemId: subsystem.id,
//         subsystemCode: subsystem.code,
//         subsystemName: subsystem.name,
//         runtimeParameters: groupParameters,
//         tbmParameterIds: groupParameters
//           .filter((item) => selectedIds.has(item.id))
//           .map((item) => item.id),
//       };
//     }) ?? []
//   );
// }

// async function replaceBindingParameters(input: {
//   tbmId: string;
//   parameterIds: number[];
// }): Promise<number> {
//   const supabase = await createClient();

//   const { error: deleteError } = await supabase
//     .schema("eqp")
//     .from("tbm_parameter_bindings")
//     .delete()
//     .eq("tbm_id", input.tbmId);

//   assertNoError(deleteError);

//   if (input.parameterIds.length === 0) {
//     return 0;
//   }

//   const rows = input.parameterIds.map((parameterId, index) => ({
//     tbm_id: input.tbmId,
//     parameter_id: parameterId,
//   }));

//   const { data, error } = await supabase
//     .schema("eqp")
//     .from("tbm_parameter_bindings")
//     .insert(rows)
//     .select();

//   assertNoError(error);

//   return data?.length ?? 0;
// }

async function getTbmParameterConfigs(tbmId: string): Promise<TbmParameterConfigListItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("eqp")
    .from("v_tbm_parameter_configs")
    .select("*")
    .eq("tbm_id", tbmId)
    .eq("is_disabled", false)
    .eq("is_chartable", true)
    .order("parameter_code", { ascending: true });
  assertNoError(error);
  return (data ?? []).map(mapTbmParameterConfigListItem);
}

import { tbmParameterConfigQuery, TbmParameterConfigQueryType } from "../queries";

async function paginateByTbmId(
  tbmId: string,
  query: TbmParameterConfigQueryType
): Promise<PaginatedResult<TbmParameterConfigListItem>> {
  const supabase = await createClient();

  // console.log("org list query", query);

  const { from, to } = applyPagination(query.page, query.pageSize);

  let dbQuery = supabase
    .schema("tbm")
    .from("v_tbm_parameter_configs")
    .select("*", { count: "exact" })
    .eq("tbm_id", tbmId)
    .range(from, to);

  if (query.subsystemId) {
    dbQuery = dbQuery.eq("subsystem_id", query.subsystemId);
  }

  if (typeof query.isDisabled === "boolean") {
    dbQuery = dbQuery.eq("is_disabled", query.isDisabled);
  }

  if (query.search) {
    dbQuery = dbQuery.or(`name.ilike.%${query.search}%,code.ilike.%${query.search}%`);
  }

  // 排序逻辑（只排序一次）
  const dbSortField = tbmParameterConfigQuery.mapSort(query.sortBy);

  dbQuery = dbQuery.order(dbSortField, {
    ascending: query.sortDirection === "asc",
  });

  const { data, count, error } = await dbQuery;

  console.log("Tunnel paginate query result:", { data, count, error });

  assertNoError(error);

  return {
    items: (data ?? []).map(mapTbmParameterConfigListItem),
    total: count ?? 0,
    page: query.page,
    pageSize: query.pageSize,
  };
}
