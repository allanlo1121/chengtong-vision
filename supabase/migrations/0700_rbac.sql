
-- =====================================================
-- 1) TABLES
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
  resource text,           -- 可选，进一步细化权限作用的资源（如特定项目 ID）
  is_active boolean default true,
  constraint permissions_module_action_unique unique (module, action)
);

-- 岗位-角色（可选）
create table if not exists rbac.post_roles (
  id uuid primary key default gen_random_uuid(),

  post_id uuid not null references public.master_data(id) on delete cascade,
  role_id uuid not null references rbac.roles(id) on delete cascade,

  unique (post_id, role_id)
);

-- 数据范围（可选）
create table if not exists rbac.post_data_scopes (
  id uuid primary key default gen_random_uuid(),

  post_id uuid not null references public.master_data(id) on delete cascade,

  scope_type_id uuid not null references public.master_data(id), -- DATA_SCOPE

  -- 可选：限定到具体资源（例如 project / tunnel）
  resource_type text,      -- 'project' | 'tunnel' | null
  resource_id uuid,        -- 具体项目ID（可空）

  unique (post_id, scope_type_id, resource_type, resource_id)
);

-- 角色-权限
create table if not exists rbac.role_permissions (
  id uuid primary key default gen_random_uuid(),
  role_id uuid not null references rbac.roles(id) on delete cascade,
  permission_id uuid not null references rbac.permissions(id) on delete cascade,
  unique (role_id, permission_id)
);

-- 用户-角色（employee.id 对应 auth.uid()）
create table if not exists rbac.employee_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references hr.employees(id) on delete cascade,
  role_id uuid not null references rbac.roles(id) on delete cascade,
  assigned_at timestamptz default now(),
  assigned_by uuid references hr.employees(id) on delete set null, -- 记录分配者（可选）
  unique (user_id, role_id)
);



-- =====================================================
-- 3) INDEXES（生产必须）
-- =====================================================

create index if not exists idx_employee_roles_user
  on rbac.employee_roles(user_id);

create index if not exists idx_role_permissions_role
  on rbac.role_permissions(role_id);

create index if not exists idx_permissions_code
  on rbac.permissions(code);

  create index if not exists idx_post_roles_post
  on rbac.post_roles(post_id);

create index if not exists idx_post_roles_role
  on rbac.post_roles(role_id);

-- =====================================================
-- 4) DEFAULT PRIVILEGES（未来表自动授权）
-- =====================================================

alter default privileges in schema rbac
grant select on tables to service_role;

grant select on all tables in schema rbac to service_role;



