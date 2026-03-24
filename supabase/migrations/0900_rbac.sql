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
  id uuid primary key default gen_random_uuid(),
  role_id uuid references rbac.roles(id) on delete cascade,
  permission_id uuid references rbac.permissions(id) on delete cascade,
  unique (role_id, permission_id)
);

-- 用户-角色（假设 employees.id 对应 auth.uid()）
create table if not exists rbac.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references hr.persons(id) on delete cascade,
  role_id uuid not null references rbac.roles(id) on delete cascade,
  assigned_at timestamptz default now(),
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
  with current_person as (
    select id
    from hr.persons
    where auth_id = auth.uid()
  ),

  role_perms as (
    select p.code
    from current_person cp
    join rbac.user_roles ur on ur.user_id = cp.id
    join rbac.role_permissions rp on rp.role_id = ur.role_id
    join rbac.permissions p on p.id = rp.permission_id
  ),

  post_perms as (
    select p.code
    from current_person cp
    join hr.employees e on e.person_id = cp.id
    join hr.employee_posts ep on ep.employee_id = e.id
    join rbac.post_permissions pp on pp.post_id = ep.post_id
    join rbac.permissions p on p.id = pp.permission_id
  ),

  direct_perms as (
    select p.code
    from current_person cp
    join rbac.person_permissions dp on dp.person_id = cp.id
    join rbac.permissions p on p.id = dp.permission_id
  )

  select exists (
    select 1
    from (
      select code from role_perms
      union
      select code from post_perms
      union
      select code from direct_perms
    ) all_perms
    where code = p_code
  );
$$;

-- 确保函数可执行
grant execute on function rbac.has_permission(text) to authenticated;

create table system.menus (
  id uuid primary key default gen_random_uuid(),

  parent_id uuid
    references system.menus(id)
    on delete cascade,

  label text not null,
  name text not null unique,      -- 唯一标识（如 project.list）

  path text,
  icon text,

  sort_order int default 0,
  level int default 0,

  group_name text,                -- System / Project / TBM

  permission_code text
    references rbac.permissions(code),

  is_visible boolean default true,
  is_disabled boolean default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz,
  deleted_at timestamptz,

  created_by uuid default system.current_user_id()
    references hr.persons(id),

  updated_by uuid references hr.persons(id),
  deleted_by uuid references hr.persons(id)
);

create index idx_menus_parent on system.menus(parent_id);
create index idx_menus_sort on system.menus(sort_order);
create index idx_menus_group on system.menus(group_name);
create index idx_menus_permission on system.menus(permission_code);

create trigger trg_menus_updated
before update on system.menus
for each row
execute function system.set_audit_on_update();

create or replace function system.set_menu_level()
returns trigger
language plpgsql
as $$
begin
  if new.parent_id is null then
    new.level := 0;
  else
    select level + 1
    into new.level
    from system.menus
    where id = new.parent_id;
  end if;

  return new;
end;
$$;

create trigger trg_set_menu_level
before insert or update on system.menus
for each row
execute function system.set_menu_level();


