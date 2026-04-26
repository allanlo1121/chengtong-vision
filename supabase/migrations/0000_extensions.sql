-- =====================================================
-- GLOBAL EXTENSIONS
-- =====================================================

create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";
create extension if not exists ltree;
create extension if not exists btree_gist;
-- =====================================================
-- GLOBAL SEARCH PATH
-- =====================================================

alter database postgres set search_path to public;


-- =====================================================
-- 3) SCHEMA
-- =====================================================

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


-- =====================================================
-- HR SCHEMA PERMISSIONS
-- =====================================================
create schema if not exists hr;

-- 允许 API 访问 schema
grant usage on schema hr to anon, authenticated, service_role;

-- 2. 表
grant select, insert, update, delete
on all tables in schema hr
to anon, authenticated;

-- 3. view（批量）
do $$
declare r record;
begin
  for r in
    select table_name
    from information_schema.views
    where table_schema = 'hr'
  loop
    execute format(
      'grant select on hr.%I to anon, authenticated;',
      r.table_name
    );
  end loop;
end $$;

-- 4. 默认权限（未来）
alter default privileges in schema hr
grant select on tables to anon, authenticated;


create schema if not exists rbac;

-- =====================================================
-- RBAC SCHEMA PERMISSIONS
-- =====================================================

-- 允许 API 访问 schema
grant usage on schema rbac to anon, authenticated, service_role;

-- 允许读取表
grant select on all tables in schema rbac
to anon, authenticated, service_role;

-- 未来新表自动授权
alter default privileges in schema rbac
grant select on tables to anon, authenticated, service_role;
