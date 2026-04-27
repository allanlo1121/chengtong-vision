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

grant usage on schema public to anon, authenticated service_role;

grant insert, update, delete on all tables in schema public to authenticated;

alter default privileges in schema public
grant select on tables to anon, authenticated;

alter default privileges in schema public
grant insert, update, delete on tables to authenticated;

-- =====================================================
-- 3) SCHEMA
-- =====================================================

create schema if not exists system;

-- =====================================================
-- 0100 SYSTEM SCHEMA PERMISSIONS
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
-- 0300 HR SCHEMA PERMISSIONS
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




-- =====================================================
-- 0700 RBAC SCHEMA PERMISSIONS
-- =====================================================

create schema if not exists rbac;

-- 允许 API 访问 schema
grant usage on schema rbac to anon, authenticated, service_role;

-- 允许读取表
grant select on all tables in schema rbac
to anon, authenticated, service_role;

-- 未来新表自动授权
alter default privileges in schema rbac
grant select on tables to anon, authenticated, service_role;


-- =====================================================
-- 0700 ACESS SCHEMA PERMISSIONS
-- =====================================================

create schema if not exists access;

grant usage on schema  access
to anon, authenticated;


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

