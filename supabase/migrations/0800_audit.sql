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


create type audit.action_type as enum (
  'INSERT',
  'UPDATE',
  'DELETE',
  'LOGIN',
  'LOGOUT',
  'CUSTOM'
);

create table audit.logs (
  id uuid primary key default gen_random_uuid(),

  -- 实体信息
  table_name text not null,
  entity_id uuid not null,

  -- 操作类型
  action audit.action_type not null,

  -- 数据快照
  old_data jsonb,
  new_data jsonb,
  changed_fields text[],

  -- 组织范围
  organization_id uuid,

  -- 操作人
  operated_by uuid
    references hr.persons(id),

  -- 请求追踪
  request_id uuid,
  ip_address inet,
  user_agent text
);

create index idx_audit_entity
on audit.logs(table_name, entity_id);

