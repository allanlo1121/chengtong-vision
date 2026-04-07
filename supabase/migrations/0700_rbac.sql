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

-- 角色
create table if not exists rbac.roles (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,         -- SUPER_ADMIN
  name text not null,
  description text,
  is_active boolean default true

);

-- 权限定义
create table if not exists rbac.permissions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,         -- project.read
  name text not null,
  description text,
  module text not null,
  action text not null,
  is_active boolean default true,
  constraint permissions_module_action_unique unique (module, action)
);

create table rbac.post_permissions (
  id uuid primary key default gen_random_uuid(),

  post_id uuid not null,
  permission_id uuid not null,

  unique (post_id, permission_id)
);


create table rbac.person_permissions (
  id uuid primary key default gen_random_uuid(),

  person_id uuid not null references hr.persons(id) on delete cascade,
  permission_id uuid not null references rbac.permissions(id) on delete cascade,

  unique (person_id, permission_id)
);



-- 角色-权限
create table if not exists rbac.role_permissions (
  id uuid primary key default gen_random_uuid(),
  role_id uuid references rbac.roles(id) on delete cascade,
  permission_id uuid references rbac.permissions(id) on delete cascade,
  unique (role_id, permission_id)
);

-- 用户-角色（persons.id 对应 auth.uid()）
create table if not exists rbac.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references hr.persons(id) on delete cascade,
  role_id uuid not null references rbac.roles(id) on delete cascade,
  assigned_at timestamptz default now(),
  assigned_by uuid references hr.persons(id) on delete set null, -- 记录分配者（可选）
  unique (user_id, role_id)
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



