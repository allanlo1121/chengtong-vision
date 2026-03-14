-- ==============================
-- 0100 SYSTEM TABLES
-- ==============================

create schema if not exists system;

-- =====================================================
-- SYSTEM SCHEMA PERMISSIONS
-- =====================================================

-- 允许 API 访问 schema
grant usage on schema system to anon, authenticated, service_role;

-- 允许读取表
grant select on all tables in schema system
to anon, authenticated, service_role;

-- 未来新表自动授权
alter default privileges in schema system
grant select on tables to anon, authenticated, service_role;

create table system.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now(),
  updated_by uuid references auth.users(id)
);


create table system.jobs (
  id uuid primary key default gen_random_uuid(),
  job_type text not null,
  payload jsonb,
  status text default 'pending',
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz default now()
);

create table system.versions (
  id uuid primary key default gen_random_uuid(),
  version text not null,
  deployed_at timestamptz default now()
);

-- create table system.feature_flags (
--   key text primary key,
--   enabled boolean not null default false,
--   config jsonb
-- );

create table if not exists system.bootstrap_state (
  version text primary key,
  completed boolean not null default false,
  executed_at timestamptz
);




-- ============================================
-- 1️ 通用 updated_at 触发器函数
-- ============================================

create or replace function system.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace function system.touch_updated_at()
returns trigger as $$
begin
  if row(new.*) is distinct from row(old.*) then
    new.updated_at = now();
  end if;
  return new;
end;
$$ language plpgsql;

-- ============================================
-- 2 通用 updated_by 触发器函数
-- ============================================
create or replace function system.set_updated_by()
returns trigger
language plpgsql
security definer
as $$
begin
  new.updated_by := auth.uid();
  new.updated_at := now();
  return new;
end;
$$;



-- ============================================
-- 3 可选：通用软删除函数（如果需要统一调用）
-- ============================================

create or replace function system.soft_delete(
  p_table text,
  p_ids uuid[]
)
returns integer
language plpgsql
security definer
set search_path = public, system
as $$
declare
  v_sql text;
  v_count integer;
begin

  -- 安全校验：限制允许软删除的表（防止 SQL 注入）
  if p_table not in (
    'projects',
    'organizations',
    'employees',
    'tbms'
  ) then
    raise exception 'Table % is not allowed for soft delete', p_table;
  end if;

  -- 动态执行 UPDATE（软删除）
  v_sql := format(
    'update %I
     set deleted_at = now(),
         deleted_by = auth.uid(),
         updated_at = now()
     where id = any($1)
       and deleted_at is null',
    p_table
  );

  execute v_sql using p_ids;

  get diagnostics v_count = row_count;

  return v_count;
end;
$$;



-- ============================================
-- 4️ 建议的标准审计字段规范（说明性注释）
-- ============================================

comment on function system.set_updated_at()
is 'Auto-maintain updated_at before update';

comment on function system.soft_delete(text, uuid[])
is 'Optional soft delete trigger helper';
