create table rbac.roles (
  id uuid primary key default gen_random_uuid(),

  code text not null unique,
  name text not null,
  description text,

  is_system boolean default false,      -- 是否系统内置角色
  is_disabled boolean default false,    -- 是否禁用

  sort_order int default 0,

  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id)
);

create table rbac.permissions (
  id uuid primary key default gen_random_uuid(),

  code text not null unique,
  name text not null,
  description text,

  module text,                 -- 所属模块 (employee / project / tbm)
  action text,                 -- read / write / delete / approve

  is_system boolean default false,
  is_disabled boolean default false,

  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),

  constraint permissions_module_action_unique
    unique (module, action)
);

create table rbac.role_permissions (
  role_id uuid references rbac.roles(id) on delete cascade,
  permission_id uuid references rbac.permissions(id) on delete cascade,

  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),

  primary key (role_id, permission_id)
);

create table rbac.user_roles (
  user_id uuid references public.employees(id) on delete cascade,
  role_id uuid references rbac.roles(id) on delete cascade,

  assigned_at timestamptz default now(),
  assigned_by uuid references auth.users(id),
  updated_at timestamptz default now(),
  updated_by uuid references auth.users(id),

  primary key (user_id, role_id)
);