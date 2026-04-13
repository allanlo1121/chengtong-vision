import { createClient } from "@/lib/infra/supabase/server";

import { employeeQuery, EmployeeQueryType } from "../queries";

import { PageData } from "@/lib/shared/contracts";

import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";

import {
  EmployeeDetailRow,
  EmployeeInsertRow,
  EmployeeListRow,
  EmployeeRow,
  EmployeeUpdateRow,
} from "../types";

export async function findEmployeeDetailById(id: string): Promise<EmployeeDetailRow> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("hr")
    .from("v_employee_full")
    .select("*")
    .eq("id", id)
    .single();

  assertNoError(error);
  if (!data) {
    throw new Error("Employee not found");
  }

  return data as EmployeeDetailRow;
}

export async function getAllEmployeeList(): Promise<EmployeeListRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.schema("hr").from("v_employee_list").select("*");

  assertNoError(error);

  return data as EmployeeListRow[];
}

async function softDeleteManyEmployee(ids: string[]) {
  const supabase = await createClient();

  const { data, error } = await supabase.schema("system").rpc("soft_delete", {
    p_table: "employees",
    p_ids: ids,
  });

  assertNoError(error);
  return data ?? 0;
}

async function paginate(query: EmployeeQueryType): Promise<PageData<EmployeeListRow>> {
  const supabase = await createClient();

  // console.log("org list query", query);

  const { from, to } = applyPagination(query.page, query.pageSize);

  let dbQuery = supabase
    .schema("hr")
    .from("v_employee_list")
    .select("*", { count: "exact" })
    .range(from, to);

  if (query.search) {
    dbQuery = dbQuery.ilike("name", `%${query.search}%`);
  }

  if (query.parentId) {
    dbQuery = dbQuery.eq("parent_id", query.parentId);
  }

  // 排序逻辑（只排序一次）
  const dbSortField = employeeQuery.mapSort(query.sortBy);

  dbQuery = dbQuery.order(dbSortField, {
    ascending: query.sortDirection === "asc",
  });

  const { data, count, error } = await dbQuery;

  assertNoError(error);

  return {
    items: data as EmployeeListRow[],
    total: count ?? 0,
  };
}

export const employeeRepository = {
  insert: async (input: EmployeeInsertRow): Promise<EmployeeRow> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("hr")
      .from("employees")
      .insert(input)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw new Error(`Insert failed: no data returned for table "employees"`);
    }

    return data as EmployeeRow;
  },
  update: async (id: string, input: EmployeeUpdateRow): Promise<EmployeeRow> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("hr")
      .from("employees")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw new Error(`Update failed: no data returned for table "employees"`);
    }

    return data as EmployeeRow;
  },
  findById: findEmployeeDetailById,
  getAllList: getAllEmployeeList,
  paginate,
  softDeleteMany: softDeleteManyEmployee,
};
