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
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
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
  id uuid primary key default gen_random_uuid(),
  version text not null unique,
  completed boolean not null default false,
  executed_at timestamptz
);





