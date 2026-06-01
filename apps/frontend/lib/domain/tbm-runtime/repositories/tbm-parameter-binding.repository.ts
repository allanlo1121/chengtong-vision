import { createClient } from "@/lib/infra/supabase/server";
import {
  TbmParameterBindingRow,
  TbmParameterBindingUpdateRow,
  TbmParameterBindingInsertRow,
  TbmParameterBindingGroup,
  TbmBoundParametersRow,
} from "../types";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";
import { parameterQuery, ParameterQueryType, ParameterBindingQueryType } from "../queries";
import { PageData } from "@/lib/shared/contracts/paginated-result";
import { appErrors } from "@/lib/shared/contracts";

export const tpbRepository = {
  insert: async (input: TbmParameterBindingInsertRow): Promise<TbmParameterBindingRow | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_parameter_bindings")
      .insert(input)
      .select()
      .single();

    assertNoError(error);
    return data;
  },
  update: async (
    id: number,
    input: TbmParameterBindingUpdateRow
  ): Promise<TbmParameterBindingRow | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_parameter_bindings")
      .update(input)
      .eq("id", id)
      .select()
      .single();

    assertNoError(error);

    return data;
  },
  findById: async (id: number): Promise<TbmParameterBindingRow | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_parameter_bindings")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    assertNoError(error);

    return data;
  },
  syncTbmRealdataTable,
  // list: async (): Promise<TbmParameterBindingListRow[]> => {
  //     const supabase = await createClient();
  //     const { data, error } = await supabase
  //         .schema("eqp")
  //         .from("v_tbm_parameter_bindings_list")
  //         .select("*");
  //     assertNoError(error);
  //     return data as TbmParameterBindingListRow[];
  // },
  // addParametersToBinding,
  // replaceBindingParametersBySubsystem,
  findParameterBindingGroups,
  replaceBindingParameters,
  getTbmBoundParameters,
};

async function syncTbmRealdataTable(tbmId: string): Promise<{ success: boolean; message: string }> {
  const supabase = await createClient();
  console.log("Syncing TBM realdata table for TBM ID", tbmId);
  const { data, error } = await supabase.schema("eqp").rpc("sync_tbm_realdata_table", {
    p_tbm_id: tbmId,
  });
  console.log("Sync result", { data, error });
  assertNoError(error);

  if (!data) {
    return {
      success: false,
      message: "同步TBM实时数据失败",
    };
  }
  return { success: true, message: "同步TBM实时数据成功" };
}

async function findParameterBindingGroups(tbmId: string): Promise<TbmParameterBindingGroup[]> {
  const supabase = await createClient();

  const [
    { data: subsystems, error: subsystemError },
    { data: parameters, error: parameterError },
    { data: BindingParameters, error: BindingError },
  ] = await Promise.all([
    supabase
      .schema("eqp")
      .from("tbm_subsystems")
      .select("id, code, name")
      .eq("is_configurable", true)
      .order("sort_order", { ascending: true }),

    supabase
      .schema("eqp")
      .from("tbm_runtime_parameters")
      .select(
        `
          id,
          code,
          name,
          subsystem_id,
          data_type,
          unit,
          digits,
          is_alarm,
          is_virtual,
          is_group,
          is_trendable,
          is_reportable,
          is_disabled,
          sort_order
        `
      )
      .order("sort_order", { ascending: true }),

    supabase
      .schema("eqp")
      .from("tbm_parameter_bindings")
      .select("parameter_id")
      .eq("tbm_id", tbmId),
  ]);

  assertNoError(subsystemError);
  assertNoError(parameterError);
  assertNoError(BindingError);

  const selectedIds = new Set(BindingParameters?.map((item) => item.parameter_id) ?? []);

  return (
    subsystems?.map((subsystem) => {
      const groupParameters =
        parameters
          ?.filter((item) => item.subsystem_id === subsystem.id)
          .map((item) => ({
            id: item.id,
            code: item.code,
            name: item.name,
            subsystemId: item.subsystem_id,
            subsystemName: subsystem.name,
            dataType: item.data_type,
            unit: item.unit,
            digits: item.digits,
            isAlarm: item.is_alarm,
            isVirtual: item.is_virtual,
            isGroup: item.is_group,
            isTrendable: item.is_trendable,
            isReportable: item.is_reportable,
            isDisabled: item.is_disabled,
            sortOrder: item.sort_order,
          })) ?? [];

      return {
        subsystemId: subsystem.id,
        subsystemCode: subsystem.code,
        subsystemName: subsystem.name,
        runtimeParameters: groupParameters,
        tbmParameterIds: groupParameters
          .filter((item) => selectedIds.has(item.id))
          .map((item) => item.id),
      };
    }) ?? []
  );
}

async function replaceBindingParameters(input: { tbmId: string; parameterIds: number[] }) {
  const supabase = await createClient();

  const { error: deleteError } = await supabase
    .schema("eqp")
    .from("tbm_parameter_bindings")
    .delete()
    .eq("tbm_id", input.tbmId);

  assertNoError(deleteError);

  if (input.parameterIds.length === 0) {
    return {
      count: 0,
    };
  }

  const rows = input.parameterIds.map((parameterId, index) => ({
    tbm_id: input.tbmId,
    parameter_id: parameterId,
  }));

  const { data, error } = await supabase
    .schema("eqp")
    .from("tbm_parameter_bindings")
    .insert(rows)
    .select();

  assertNoError(error);

  return {
    count: data?.length ?? 0,
  };
}

async function getTbmBoundParameters(tbmId: string): Promise<TbmBoundParametersRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .schema("eqp")
    .from("v_tbm_bound_parameters")
    .select("*")
    .eq("tbm_id", tbmId)
    .eq("is_disabled", false)
    .eq("is_chartable", true)
    .order("subsystem_sort_order", { ascending: true })
    .order("parameter_sort_order", { ascending: true });
  assertNoError(error);
  return data as TbmBoundParametersRow[];
}
