// lib/infra/repositories/base.repository.ts

import { PostgrestError } from "@supabase/supabase-js";

/* ============================= */
/* 时间工具                      */
/* ============================= */

export function nowISO() {
  return new Date().toISOString();
}

/* ============================= */
/* 审计字段构造器                */
/* ============================= */

export function buildCreatePayload<T extends object>(data: T, userId: string) {
  const now = nowISO();

  return {
    ...data,
    created_at: now,
    created_by: userId,
    updated_at: now,
    updated_by: userId,
  };
}

export function buildUpdatePayload<T extends object>(data: T, userId: string) {
  return {
    ...data,
    updated_at: nowISO(),
    updated_by: userId,
  };
}

export function buildSoftDeletePayload(userId: string) {
  const now = nowISO();

  return {
    deleted_at: now,
    deleted_by: userId,
    updated_at: now,
    updated_by: userId,
  };
}

/* ============================= */
/* 分页工具                      */
/* ============================= */

export function applyPagination(page: number, pageSize: number) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  return { from, to };
}

/* ============================= */
/* 错误统一抛出                  */
/* ============================= */

export function assertNoError(error: PostgrestError | null) {
  if (error) {
    throw new Error(error.message);
  }
}
