import { createClient } from "@/lib/infra/supabase/server";
import {
  TbmParameterBindingUpdateRow,
  TbmParameterBindingInsertRow,
  TbmParameterBindingGroup,
  TbmBoundParametersRow,
  TbmParameterBinding,
} from "../types";
import { assertNoError } from "@/lib/infra/repositories/base.repository";

import { appErrors } from "@/lib/shared/contracts";
import {
  mapTbmParameterBinding,
  mapTbmParameterBindingInsertRow,
  mapTbmParameterBindingUpdateRow,
} from "../mappers";
import { CreateTbmParameterBindingInput, UpdateTbmParameterBindingInput } from "../schemas";

export const tpbRepository = {
  insert: async (input: CreateTbmParameterBindingInput): Promise<TbmParameterBinding> => {
    const supabase = await createClient();
    const payload = mapTbmParameterBindingInsertRow(input);
    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_parameter_bindings")
      .insert(payload)
      .select()
      .single();

    assertNoError(error);
    if (!data) {
      throw appErrors.internal("插入TBM参数绑定记录失败");
    }
    return mapTbmParameterBinding(data);
  },
  update: async (input: UpdateTbmParameterBindingInput): Promise<TbmParameterBinding> => {
    const supabase = await createClient();

    const payload = mapTbmParameterBindingUpdateRow(input);

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_parameter_bindings")
      .update(payload)
      .eq("id", input.id)
      .select()
      .single();

    assertNoError(error);

    if (!data) {
      throw appErrors.internal("更新TBM参数绑定记录失败");
    }

    return mapTbmParameterBinding(data);
  },
  findById: async (id: number): Promise<TbmParameterBinding | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_parameter_bindings")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    assertNoError(error);

    return data ? mapTbmParameterBinding(data) : null;
  },
  syncTbmRealdataTable,
  findParameterBindingGroups,
  replaceBindingParameters,
  getTbmBoundParameters,
};

async function syncTbmRealdataTable(tbmId: string): Promise<void> {
  const supabase = await createClient();
  console.log("Syncing TBM realdata table for TBM ID", tbmId);
  const { error } = await supabase.schema("eqp").rpc("sync_tbm_realdata_table", {
    p_tbm_id: tbmId,
  });

  console.log("Sync result", { error });
  assertNoError(error);
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

async function replaceBindingParameters(input: {
  tbmId: string;
  parameterIds: number[];
}): Promise<number> {
  const supabase = await createClient();

  const { error: deleteError } = await supabase
    .schema("eqp")
    .from("tbm_parameter_bindings")
    .delete()
    .eq("tbm_id", input.tbmId);

  assertNoError(deleteError);

  if (input.parameterIds.length === 0) {
    return 0;
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

  return data?.length ?? 0;
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
