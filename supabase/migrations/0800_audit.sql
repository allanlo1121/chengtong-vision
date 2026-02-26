-- ==============================
-- 0800 AUDIT TABLES
-- ==============================

create schema if not exists audit;

-- =====================================================
-- AUDIT SCHEMA PERMISSIONS
-- =====================================================

-- 允许 API 访问 schema
grant usage on schema audit to anon, authenticated, service_role;

-- 允许读取表
grant select on all tables in schema audit
to anon, authenticated, service_role;

-- 未来新表自动授权
alter default privileges in schema audit
grant select on tables to anon, authenticated, service_role;


create table audit.logs (
  id uuid primary key default gen_random_uuid(),
  entity_type text,
  entity_id uuid,
  action text not null,
  old_data jsonb,
  new_data jsonb,
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);