
create schema if not exists system;
create schema if not exists rbac;
create schema if not exists audit;
create schema if not exists hr;
create schema if not exists project;


-- ================================
-- 01_extensions.sql
-- ================================

create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;
create extension if not exists btree_gin;


-- ============================================
-- Base Audit Infrastructure
-- Version: 2026022402
-- Purpose:
--   - Unified audit columns
--   - Auto updated_at trigger
--   - Optional soft delete helper
-- ============================================


-- ============================================
-- 1️ 通用 updated_at 触发器函数
-- ============================================

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;



-- ============================================
-- 2️ 可选：通用软删除函数（如果需要统一调用）
-- ============================================

create or replace function public.soft_delete_row()
returns trigger as $$
begin
  new.deleted = true;
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;



-- ============================================
-- 3️ 建议的标准审计字段规范（说明性注释）
-- ============================================

comment on function public.set_updated_at()
is 'Auto-maintain updated_at before update';

comment on function public.soft_delete_row()
is 'Optional soft delete trigger helper';