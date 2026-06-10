import { createClient } from "@/lib/infra/supabase/server";
import {
  TbmParameterTemplateListRow,
  TemplateOption,
  TbmParameterTemplate,
  TbmRuntimeParameterListItem,
  ParameterTemplateNode,
} from "../types";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";
import { ParameterTemplateQueryType } from "../queries";
import { PaginatedResult } from "@/lib/shared/contracts";
import { appErrors } from "@/lib/shared/contracts";
import {
  mapParameterTemplate,
  mapParameterTemplateInsertRow,
  mapParameterTemplateUpdateRow,
} from "../mappers";
import { CreateTbmParameterTemplateInput, UpdateTbmParameterTemplateInput } from "../schemas";

export const tptRepository = {
  insert: async (input: CreateTbmParameterTemplateInput): Promise<TbmParameterTemplate> => {
    const supabase = await createClient();

    const payload = mapParameterTemplateInsertRow(input);

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_parameter_templates")
      .insert(payload)
      .select("*")
      .single();

    assertNoError(error);
    if (!data) {
      throw appErrors.internal("插入参数模板失败");
    }
    return mapParameterTemplate(data);
  },
  update: async (input: UpdateTbmParameterTemplateInput): Promise<TbmParameterTemplate> => {
    const supabase = await createClient();
    const payload = mapParameterTemplateUpdateRow(input);

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_parameter_templates")
      .update(payload)
      .eq("id", input.id)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw appErrors.internal("更新参数模板失败");
    }

    return mapParameterTemplate(data);
  },
  findById: async (id: number): Promise<TbmParameterTemplate | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_parameter_templates")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    assertNoError(error);

    return data ? mapParameterTemplate(data) : null;
  },
  list: async (): Promise<TbmParameterTemplateListRow[]> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .schema("eqp")
      .from("v_tbm_parameter_templates_list")
      .select("*");
    assertNoError(error);
    return data as TbmParameterTemplateListRow[];
  },
  addParametersToTemplate,
  replaceTemplateParametersBySubsystem,
  findParameterTemplateGroups,
  replaceTemplateParameters,
  findParameterTemplateOptions,
};

export async function searchTbmParameterTemplates(): Promise<ParameterTemplateNode[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("eqp")
    .from("tbm_parameter_templates")
    .select(
      `
      id,
      code,
      name,
      sort_order,
       tbm_parameter_template_parameters(count)
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

      parameterCount: item.tbm_parameter_template_parameters?.[0]?.count ?? 0,
    })) ?? []
  );
}

export async function findParametersByTemplateId(
  query: ParameterTemplateQueryType
): Promise<PaginatedResult<TbmRuntimeParameterListItem>> {
  if (!query.parameterTemplateId) {
    throw appErrors.required("parameterTemplateId", "请选择参数模板");
  }

  const { from, to } = applyPagination(query.page, query.pageSize);

  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("eqp")
    .from("tbm_parameter_template_parameters")
    .select(
      `
      sort_order,
      parameter:tbm_runtime_parameters (
        id,
        code,
        name,
        data_type,
        unit,
        digits,
        is_alarm,
        sort_order,
        is_disabled,
        subsystem_id,
        subsystem:tbm_subsystems (
        id,
        code,
        name
      )
      )
    `
    )
    .eq("template_id", query.parameterTemplateId)
    .order("sort_order", { ascending: true })
    .range(from, to);

  assertNoError(error);

  return {
    items:
      data?.map((item) => {
        const { subsystem, ...parameter } = item.parameter;

        return {
          id: parameter.id,
          code: parameter.code,
          name: parameter.name,
          dataType: parameter.data_type,
          unit: parameter.unit,
          digits: parameter.digits,
          isAlarm: parameter.is_alarm,
          sortOrder: parameter.sort_order,
          isDisabled: parameter.is_disabled,
          subsystemId: parameter.subsystem_id,
          subsystemName: subsystem?.name ?? null,
          subsystemCode: subsystem?.code ?? null,
        };
      }) ?? [],
    total: data?.length ?? 0,
    page: query.page,
    pageSize: query.pageSize,
  };
}

async function addParametersToTemplate(input: {
  templateId: number;
  parameterIds: number[];
}): Promise<number> {
  const supabase = await createClient();

  const rows = input.parameterIds.map((parameterId, index) => ({
    template_id: input.templateId,
    parameter_id: parameterId,
    sort_order: index + 1,
    is_required: true,
  }));

  const { data, error } = await supabase
    .schema("eqp")
    .from("tbm_parameter_template_parameters")
    .upsert(rows, {
      onConflict: "template_id,parameter_id",
      ignoreDuplicates: true,
    })
    .select();

  assertNoError(error);

  return data?.length ?? 0;
}

async function replaceTemplateParametersBySubsystem(input: {
  templateId: number;
  subsystemId: number;
  parameterIds: number[];
}): Promise<number> {
  const supabase = await createClient();

  const { data: subsystemParameters, error: parameterError } = await supabase
    .schema("eqp")
    .from("tbm_runtime_parameters")
    .select("id")
    .eq("subsystem_id", input.subsystemId);

  assertNoError(parameterError);

  const subsystemParameterIds = subsystemParameters?.map((item) => item.id) ?? [];

  if (subsystemParameterIds.length > 0) {
    const { error: deleteError } = await supabase
      .schema("eqp")
      .from("tbm_parameter_template_parameters")
      .delete()
      .eq("template_id", input.templateId)
      .in("parameter_id", subsystemParameterIds);

    assertNoError(deleteError);
  }

  if (input.parameterIds.length === 0) {
    return 0;
  }

  const rows = input.parameterIds.map((parameterId, index) => ({
    template_id: input.templateId,
    parameter_id: parameterId,
    sort_order: index + 1,
    is_required: true,
  }));

  const { data, error } = await supabase
    .schema("eqp")
    .from("tbm_parameter_template_parameters")
    .insert(rows)
    .select();

  assertNoError(error);

  return data?.length ?? 0;
}

async function findParameterTemplateGroups(templateId: number) {
  const supabase = await createClient();

  const [
    { data: subsystems, error: subsystemError },
    { data: parameters, error: parameterError },
    { data: templateParameters, error: templateError },
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
      .from("tbm_parameter_template_parameters")
      .select("parameter_id")
      .eq("template_id", templateId),
  ]);

  assertNoError(subsystemError);
  assertNoError(parameterError);
  assertNoError(templateError);

  const selectedIds = new Set(templateParameters?.map((item) => item.parameter_id) ?? []);

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
        templateParameterIds: groupParameters
          .filter((item) => selectedIds.has(item.id))
          .map((item) => item.id),
      };
    }) ?? []
  );
}

async function replaceTemplateParameters(input: {
  templateId: number;
  parameterIds: number[];
}): Promise<number> {
  const supabase = await createClient();

  const { error: deleteError } = await supabase
    .schema("eqp")
    .from("tbm_parameter_template_parameters")
    .delete()
    .eq("template_id", input.templateId);

  assertNoError(deleteError);

  if (input.parameterIds.length === 0) {
    return 0;
  }

  const rows = input.parameterIds.map((parameterId, index) => ({
    template_id: input.templateId,
    parameter_id: parameterId,
    sort_order: index + 1,
    is_required: true,
  }));

  const { data, error } = await supabase
    .schema("eqp")
    .from("tbm_parameter_template_parameters")
    .insert(rows)
    .select();

  assertNoError(error);

  return data?.length ?? 0;
}

async function findParameterTemplateOptions(): Promise<TemplateOption[]> {
  const supabase = await createClient();

  const [
    { data: templates, error: templateError },
    { data: subsystems, error: subsystemError },
    { data: templateParameters, error: templateParameterError },
  ] = await Promise.all([
    supabase
      .schema("eqp")
      .from("tbm_parameter_templates")
      .select("id, name")
      .order("sort_order", { ascending: true }),

    supabase
      .schema("eqp")
      .from("tbm_subsystems")
      .select("id")
      .eq("is_configurable", true)
      .order("sort_order", { ascending: true }),

    supabase.schema("eqp").from("tbm_parameter_template_parameters").select(`
        template_id,
        parameter_id,
        parameter:tbm_runtime_parameters!inner(
          subsystem_id
        )
      `),
  ]);

  assertNoError(templateError);
  assertNoError(subsystemError);
  assertNoError(templateParameterError);

  return (templates ?? []).map((template) => {
    const groups =
      subsystems?.map((subsystem) => ({
        subsystemId: subsystem.id,
        templateParameterIds:
          templateParameters
            ?.filter(
              (item) =>
                item.template_id === template.id && item.parameter?.subsystem_id === subsystem.id
            )
            .map((item) => item.parameter_id) ?? [],
      })) ?? [];

    return {
      id: template.id,
      name: template.name,
      groups,
    };
  });
}
