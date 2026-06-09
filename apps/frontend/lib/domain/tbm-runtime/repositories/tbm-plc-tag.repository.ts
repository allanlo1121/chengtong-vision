import { createClient } from "@/lib/infra/supabase/server";
import { TbmPlcTag, TbmPlcTagFormModel } from "../types";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";

import { appErrors, PaginatedResult } from "@/lib/shared/contracts";
import {
  mapTbmPlcTag,
  mapTbmPlcTagInsertRow,
  mapTbmPlcTagUpdateRow,
  mapTbmPlcTagFormModel,
  mapTbmPlcTagInsertFromImportRow,
} from "../mappers";
import { CreateTbmPlcTagInput, ImportTbmPlcTagInput, UpdateTbmPlcTagInput } from "../schemas";
import { paginate } from "../../tbm-assignment/repositories";
import { tbmPlcTagQuery, TbmPlcTagQueryType } from "../queries/tbm-plc-tag.query";

export const tbmPlcTagRepository = {
  insert: async (input: CreateTbmPlcTagInput): Promise<TbmPlcTag> => {
    const supabase = await createClient();
    const payload = mapTbmPlcTagInsertRow(input);
    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_plc_tags")
      .insert(payload)
      .select()
      .single();

    assertNoError(error);
    if (!data) {
      throw appErrors.internal("插入TBM PLC标签记录失败");
    }
    return mapTbmPlcTag(data);
  },
  update: async (input: UpdateTbmPlcTagInput): Promise<TbmPlcTag> => {
    const supabase = await createClient();

    const payload = mapTbmPlcTagUpdateRow(input);

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_plc_tags")
      .update(payload)
      .eq("id", input.id)
      .select()
      .single();

    assertNoError(error);

    if (!data) {
      throw appErrors.internal("更新TBM PLC标签记录失败");
    }

    return mapTbmPlcTag(data);
  },
  delete: async (id: number): Promise<void> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_plc_tags")
      .delete()
      .eq("id", id)
      .select()
      .single();

    assertNoError(error);
  },
  findById: async (id: number): Promise<TbmPlcTagFormModel | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("eqp")
      .from("tbm_plc_tags")
      .select(
        `
        *,
        tbm:tbms ({
          id,
          name
        })
        `
      )
      .eq("id", id)
      .maybeSingle();

    assertNoError(error);

    return data ? mapTbmPlcTagFormModel(data) : null;
  },
  deleteByTbmId: async (tbmId: string): Promise<void> => {
    const supabase = await createClient();

    const { error } = await supabase
      .schema("eqp")
      .from("tbm_plc_tags")
      .delete()
      .eq("tbm_id", tbmId);

    assertNoError(error);
  },
  insertMany: async (tbmId: string, rows: ImportTbmPlcTagInput[]): Promise<number> => {
    const supabase = await createClient();

    const payload = rows.map((row) => mapTbmPlcTagInsertFromImportRow(tbmId, row));

    const { error } = await supabase.schema("eqp").from("tbm_plc_tags").insert(payload);

    assertNoError(error);

    return rows.length;
  },
  paginateByTbmId: async (
    tbmId: string,
    queryParams: TbmPlcTagQueryType
  ): Promise<PaginatedResult<TbmPlcTag>> => {
    const supabase = await createClient();

    const { from, to } = applyPagination(queryParams.page, queryParams.pageSize);

    let dbQuery = supabase
      .schema("eqp")
      .from("tbm_plc_tags")
      .select("*", { count: "exact" })
      .eq("tbm_id", tbmId)
      .range(from, to);

    if (queryParams.search) {
      dbQuery = dbQuery.ilike("tag_name", `%${queryParams.search}%`);
    }

    const dbSortField = tbmPlcTagQuery.mapSort(queryParams.sortBy);

    if (queryParams.sortBy) {
      dbQuery = dbQuery.order(dbSortField, {
        ascending: queryParams.sortDirection === "asc",
      });
    }

    const { data, count, error } = await dbQuery;

    assertNoError(error);

    const items = data.map(mapTbmPlcTag);
    const total = count ?? 0;

    return { items, total, page: queryParams.page, pageSize: queryParams.pageSize };
  },
};
