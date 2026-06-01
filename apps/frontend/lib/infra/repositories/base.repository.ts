// lib/infra/repositories/base.repository.ts

import { PostgrestError } from "@supabase/supabase-js";
import { AppError, ERROR_CODES, ERROR_TYPES } from "@/lib/shared/contracts";

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

export function assertNoError(error: PostgrestError | null): asserts error is null {
  if (!error) {
    return;
  }

  // PostgreSQL 唯一约束
  if (error.code === "23505") {
    throw new AppError({
      message: "数据已存在",
      code: ERROR_CODES.DUPLICATE_KEY,
      type: ERROR_TYPES.CONFLICT,
      cause: error,
    });
  }

  // PostgreSQL 外键约束
  if (error.code === "23503") {
    throw new AppError({
      message: "关联数据不存在",
      code: ERROR_CODES.CONFLICT,
      type: ERROR_TYPES.BUSINESS,
      cause: error,
    });
  }

  // PostgreSQL 非空约束
  if (error.code === "23502") {
    throw new AppError({
      message: "必填字段不能为空",
      code: ERROR_CODES.VALIDATION_FAILED,
      type: ERROR_TYPES.VALIDATION,
      cause: error,
    });
  }

  throw new AppError({
    message: error.message,
    code: ERROR_CODES.DATABASE_ERROR,
    type: ERROR_TYPES.SYSTEM,
    cause: error,
  });
}
