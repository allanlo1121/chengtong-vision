-- ==============================
-- 0100 SYSTEM TABLES
-- ==============================

create schema if not exists system;

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
-- 2️ 可选：通用软删除函数（如果需要统一调用）
-- ============================================

create or replace function system.soft_delete_row()
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

comment on function system.set_updated_at()
is 'Auto-maintain updated_at before update';

comment on function system.soft_delete_row()
is 'Optional soft delete trigger helper';
