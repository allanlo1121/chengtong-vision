-- =====================================================
-- 1) SCHEMA
-- =====================================================

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



-- =====================================================
-- 2) TABLES
-- =====================================================

-- 权限定义
create table if not exists rbac.permissions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,         -- project.read
  name text not null,
  description text,
  module text not null,
  action text not null,
  is_disabled boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint permissions_module_action_unique unique (module, action)
);

-- 角色
create table if not exists rbac.roles (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,         -- SUPER_ADMIN
  name text not null,
  description text,
  is_disabled boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 角色-权限
create table if not exists rbac.role_permissions (
  role_id uuid references rbac.roles(id) on delete cascade,
  permission_id uuid references rbac.permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

-- 用户-角色（假设 employees.id 对应 auth.uid()）
create table if not exists rbac.user_roles (
  user_id uuid not null references public.employees(id) on delete cascade,
  role_id uuid not null references rbac.roles(id) on delete cascade,
  assigned_at timestamptz default now(),
  primary key (user_id, role_id)
);

-- =====================================================
-- 3) INDEXES（生产必须）
-- =====================================================

create index if not exists idx_user_roles_user
  on rbac.user_roles(user_id);

create index if not exists idx_role_permissions_role
  on rbac.role_permissions(role_id);

create index if not exists idx_permissions_code
  on rbac.permissions(code);

-- =====================================================
-- 4) DEFAULT PRIVILEGES（未来表自动授权）
-- =====================================================

alter default privileges in schema rbac
grant select on tables to service_role;

grant select on all tables in schema rbac to service_role;

-- =====================================================
-- 5) 权限检查函数（核心）
-- =====================================================

create or replace function rbac.has_permission(p_code text)
returns boolean
language sql
stable
security definer
set search_path = public, rbac
as $$
  select exists (
    select 1
    from rbac.user_roles ur
    join rbac.role_permissions rp on ur.role_id = rp.role_id
    join rbac.permissions p on rp.permission_id = p.id
    where ur.user_id = auth.uid()
      and p.code = p_code
      and p.is_disabled = false
  );
$$;

-- 确保函数可执行
grant execute on function rbac.has_permission(text) to authenticated;

