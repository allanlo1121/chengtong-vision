import { createClient } from "@/lib/infra/supabase/server";

import { employeeQuery, EmployeeQueryType } from "../queries";
import { appErrors, PaginatedResult } from "@/lib/shared/contracts";
import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";

import {
  EmployeeDetailRow,
  EmployeeDetail,
  EmployeeInsertRow,
  EmployeeListRow,
  EmployeeListItem,
  EmployeeRow,
  EmployeeUpdateRow,
  Employee,
} from "../types";
import {
  mapEmployee,
  mapEmployeeDetail,
  mapEmployeeListItem,
  mapEmployeeToInsert,
  mapEmployeeToUpdate,
} from "../mappers";
import { map } from "zod";
import { CreateEmployeeInput, UpdateEmployeeInput } from "../schemas";

export async function findDetailById(id: string): Promise<EmployeeDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .schema("hr")
    .from("v_employee_detail")
    .select("*")
    .eq("id", id)
    .single();

  assertNoError(error);

  return data ? mapEmployeeDetail(data) : null;
}

// export async function getAllEmployeeList(): Promise<EmployeeListRow[]> {
//   const supabase = await createClient();

//   const { data, error } = await supabase.schema("hr").from("v_employee_list").select("*");

//   assertNoError(error);

//   return data as EmployeeListRow[];
// }

// async function softDeleteManyEmployee(ids: string[]) {
//   const supabase = await createClient();

//   const { data, error } = await supabase.schema("system").rpc("soft_delete", {
//     p_table: "employees",
//     p_ids: ids,
//   });

//   assertNoError(error);
//   return data ?? 0;
// }

async function paginate(query: EmployeeQueryType): Promise<PaginatedResult<EmployeeListItem>> {
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

  if (query.organizationId) {
    dbQuery = dbQuery.eq("organization_id", query.organizationId);
  }

  // 排序逻辑（只排序一次）
  const dbSortField = employeeQuery.mapSort(query.sortBy);

  dbQuery = dbQuery.order(dbSortField, {
    ascending: query.sortDirection === "asc",
  });

  const { data, count, error } = await dbQuery;

  console.log("Employee paginate query result:", { data, count, error });

  assertNoError(error);

  return {
    items: (data ?? []).map(mapEmployeeListItem),
    total: count ?? 0,
    page: query.page,
    pageSize: query.pageSize,
  };
}

export const employeeRepository = {
  insert: async (input: CreateEmployeeInput): Promise<Employee> => {
    console.log("Inserting employee with input:", input);

    const payload = mapEmployeeToInsert(input);
    const supabase = await createClient();

    // const { data: debugAuth } = await supabase.rpc('debug_auth');
    // console.log('before insert:', debugAuth);

    const { data, error } = await supabase
      .schema("hr")
      .from("employees")
      .insert(payload)
      .select("*")
      .single();

    console.log("Insert employee result:", { data, error });

    assertNoError(error);

    if (!data) {
      throw appErrors.internal("employeeRepository.insert", "创建员工失败");
    }

    return mapEmployee(data);
  },
  update: async (input: UpdateEmployeeInput): Promise<Employee> => {
    const payload = mapEmployeeToUpdate(input);
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("hr")
      .from("employees")
      .update(payload)
      .eq("id", input.id)
      .select("*")
      .single();

    assertNoError(error);

    if (!data) {
      throw appErrors.internal("employeeRepository.update", "更新员工失败");
    }

    return mapEmployee(data);
  },
  deleteById: async (id: string): Promise<void> => {
    const supabase = await createClient();

    const { error } = await supabase
      .schema("hr")
      .from("employees")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    assertNoError(error);
  },
  findByCode: async (code: string): Promise<Employee | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("hr")
      .from("employees")
      .select("*")
      .eq("code", code)
      .maybeSingle();

    assertNoError(error);

    return data ? mapEmployee(data) : null;
  },
  findById: async (id: string): Promise<Employee | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .schema("hr")
      .from("employees")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    assertNoError(error);

    return data ? mapEmployee(data) : null;
  },
  findDetailById,
  paginate,
};
