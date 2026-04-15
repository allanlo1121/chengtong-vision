create or replace function system.bootstrap(p_user_id uuid)
returns void
language plpgsql
security definer
as $$
declare
  v_role_id uuid;
  v_sys_org_id uuid;
begin

  if auth.role() <> 'service_role' then
    raise exception 'permission denied';
  end if;

  if exists (
    select 1
    from system.bootstrap_state
    where version = '1.0.0'
      and completed = true
  ) then
    return;
  end if;

  -- 创建角色
  insert into rbac.roles (code, name)
  values ('SUPER_ADMIN', '超级管理员')
  on conflict (code) do nothing;

  select id into v_role_id
  from rbac.roles
  where code = 'SUPER_ADMIN';

  -- 创建 employee
  select id into v_sys_org_id
  from public.organizations
  where code = 'SYS';

  if v_sys_org_id is null then
    raise exception 'SYS organization not found';
  end if;

  insert into public.employees (
    id,
    name,
    code,
    org_node_id,
    is_active
  )
  values (
    p_user_id,
    '系统管理员',
    'admin',
    v_sys_org_id,
    true
  )
  on conflict (id) do nothing;

  -- 绑定角色
  insert into rbac.user_roles (user_id, role_id)
  values (p_user_id, v_role_id)
  on conflict do nothing;

  -- 标记完成
  insert into system.bootstrap_state (version, completed, executed_at)
  values ('1.0.0', true, now())
  on conflict (version)
  do update set completed = true,
                executed_at = now();

end;
$$;


create or replace function public.bootstrap(p_user_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  perform system.bootstrap(p_user_id);
end;
$$;

create view rbac.v_user_permissions as
select
  ur.user_id,
  p.code as permission_code
from rbac.user_roles ur
join rbac.role_permissions rp on ur.role_id = rp.role_id
join rbac.permissions p on rp.permission_id = p.id;

insert into rbac.permissions (code, name, module, action, is_system)
values
  ('employee.read', '查看员工', 'employee', 'read', true),
  ('employee.write', '编辑员工', 'employee', 'write', true),

  ('project.read', '查看项目', 'project', 'read', true),
  ('project.write', '编辑项目', 'project', 'write', true),

  ('organization.read', '查看组织架构', 'organization', 'read', true),
  ('organization.write', '编辑组织架构', 'organization', 'write', true  )
on conflict (code) do nothing;

create table system.menus (
  id uuid primary key default gen_random_uuid(),

  parent_id uuid references system.menus(id) on delete cascade,

  label text not null,
  path text,
  icon text,                -- lucide icon 名
  sort_order int default 0,
  group_name text,          -- System / Project

  permission_code text references rbac.permissions(code),

  is_disabled boolean default false,
  created_at timestamptz default now()
);



insert into system.menus (label, path, icon, sort_order, group_name, permission_code)
values
('Dashboard','/dashboard','LayoutDashboard',0,'System','dashboard.read'),
('Organizations','/system/orgs','Building2',1,'System','organization.read'),
('Employees','/system/employees','Users',2,'System','employee.read'),
('Projects','/projects','FolderKanban',1,'Project','project.read');

create or replace function rbac.jwt_permissions()
returns jsonb
language sql
stable
security definer
as $$
  select jsonb_agg(p.code)
  from rbac.user_roles ur
  join rbac.role_permissions rp on ur.role_id = rp.role_id
  join rbac.permissions p on rp.permission_id = p.id
  where ur.user_id = auth.uid()
$$;

create or replace function auth.jwt_custom_claims()
returns jsonb
language sql
stable
security definer
as $$
  select jsonb_build_object(
    'permissions',
    rbac.jwt_permissions()
  );
$$;


create or replace view public.v_runtime_user as
select
  u.id as user_id,
  e.id as employee_id,
  e.name,
  e.org_node_id,
  o.path::text as org_path,

  -- 角色数组
  coalesce(
    array_agg(distinct r.code)
      filter (where r.code is not null),
    '{}'
  ) as roles,

  -- 权限数组
  coalesce(
    array_agg(distinct p.code)
      filter (where p.code is not null),
    '{}'
  ) as permissions

from auth.users u
join public.employees e
  on e.id = u.id
join public.organizations o
  on o.id = e.org_node_id

left join rbac.user_roles ur
  on ur.user_id = u.id

left join rbac.roles r
  on r.id = ur.role_id

left join rbac.role_permissions rp
  on rp.role_id = r.id

left join rbac.permissions p
  on p.id = rp.permission_id

group by
  u.id,
  e.id,
  e.name,
  e.org_node_id,
  o.path;


create index idx_role_permissions_role on rbac.role_permissions(role_id);
create index idx_permissions_id on rbac.permissions(id);
create index idx_employees_id on public.employees(id);


select * 
from v_runtime_user
where user_id = 'c97caef6-6386-4696-8f68-5f5a87b8be30'

select * from system.menus where permission_code is not null;

create or replace view public.v_runtime_user as
select
  u.id as user_id,
  e.id as employee_id,
  e.name,
  e.org_node_id,
  o.path::text as org_path,

  (
    select coalesce(array_agg(distinct r.code), '{}')
    from rbac.user_roles ur
    join rbac.roles r on r.id = ur.role_id
    where ur.user_id = u.id
  ) as roles,

  (
    select coalesce(array_agg(distinct p.code), '{}')
    from rbac.user_roles ur
    join rbac.role_permissions rp on rp.role_id = ur.role_id
    join rbac.permissions p on p.id = rp.permission_id
    where ur.user_id = u.id
  ) as permissions

from auth.users u
join public.employees e on e.id = u.id
join public.organizations o on o.id = e.org_node_id

where u.id = auth.uid();   -- 🔥 关键


insert into system.menus (name, label, path, icon, sort_order)
values
('system','系统设置',null,'Settings',0);



create or replace function set_updated_by()
returns trigger
language plpgsql
security definer
as $$
begin
  new.updated_by := auth.uid();
  new.updated_at := now();
  return new;
end;
$$;

create trigger trg_set_updated_by
before update on public.organizations
for each row
execute function set_updated_by();

delete trigger trg_set_updated_by;


create or replace function system.soft_delete(
  p_table text,
  p_ids uuid[]
)
returns integer
language plpgsql
security definer
set search_path = public, system
as $$
declare
  v_sql text;
  v_count integer;
begin

  -- 安全校验：限制允许软删除的表（防止 SQL 注入）
  if p_table not in (
    'projects',
    'organizations',
    'employees',
    'tbms'
  ) then
    raise exception 'Table % is not allowed for soft delete', p_table;
  end if;

  -- 动态执行 UPDATE（软删除）
  v_sql := format(
    'update %I
     set deleted_at = now(),
         deleted_by = auth.uid()
     where id = any($1)
       and deleted_at is null',
    p_table
  );

  execute v_sql using p_ids;

  get diagnostics v_count = row_count;

  return v_count;
end;
$$;

drop view public.v_organizations_list cascade;
create or replace view public.v_organizations_list as
select
  o.id,
  o.name,
  o.parent_id,
  p.name as parent_org_name,
  o.is_active,
  o.created_at,

  t.name as org_type_name,
  b.name as business_name,
  r.name as region_name,
  c.name as country_name,
  a.name as admin_region_name

from public.organizations o
left join organizations p on p.id = o.parent_id
left join public.master_data t on t.id = o.org_type_id
left join public.master_data b on b.id = o.business_id
left join public.master_data r on r.id = o.region_id
left join public.countries c on c.code = o.country_code
left join public.admin_regions a on a.code = o.admin_region_code
where o.deleted_at is null;


create view public.v_master_data as
select
  d.id,
  d.code,
  d.name,
  d.description,
  d.is_disabled,
  def.id as definition_id,
  def.code as definition_code,
  def.name as definition_name
from public.master_data d
join public.master_definitions def
  on d.definition_id = def.id
where d.deleted_at is null;

create view public.v_master_options as
select
  d.id,
  d.code,
  d.name,
  d.description,
  d.is_disabled,
  def.id as definition_id,
  def.code as definition_code,
  def.name as definition_name
from public.master_data d
join public.master_definitions def
  on d.definition_id = def.id
where d.is_disabled = false
  and d.deleted_at is null;

  alter table public.organizations
 add column province_code text references public.admin_regions(code),
 add column city_code text references public.admin_regions(code),
 add column district_code text references public.admin_regions(code);


 -- 1 删除 ltree 索引
DROP INDEX IF EXISTS idx_organizations_path;

-- 2 修改字段类型
ALTER TABLE organizations
ALTER COLUMN path TYPE text
USING path::text;

DROP VIEW v_organizations_detail cascade;

DROP VIEW v_runtime_user cascade;

create or replace view public.v_runtime_user as
select
  u.id as user_id,
  e.id as employee_id,
  e.name,
  e.org_node_id,
  o.path as org_path,

  (
    select coalesce(array_agg(distinct r.code), '{}')
    from rbac.user_roles ur
    join rbac.roles r on r.id = ur.role_id
    where ur.user_id = u.id
  ) as roles,

  (
    select coalesce(array_agg(distinct p.code), '{}')
    from rbac.user_roles ur
    join rbac.role_permissions rp on rp.role_id = ur.role_id
    join rbac.permissions p on p.id = rp.permission_id
    where ur.user_id = u.id
  ) as permissions

from auth.users u
join public.employees e on e.id = u.id
join public.organizations o on o.id = e.org_node_id

where u.id = auth.uid();   -- 🔥 关键



create or replace function public.soft_delete(
  p_table text,
  p_ids uuid[]
)
returns integer
language plpgsql
security definer
set search_path = public, system
as $$
declare
  v_sql text;
  v_count integer;
begin

  -- 安全校验：限制允许软删除的表（防止 SQL 注入）
  if p_table not in (
    'projects',
    'organizations',
    'employees',
    'tbms'
  ) then
    raise exception 'Table % is not allowed for soft delete', p_table;
  end if;

  -- 动态执行 UPDATE（软删除）
  v_sql := format(
    'update %I
     set deleted_at = now(),
         deleted_by = auth.uid(),
         updated_at = now()
     where id = any($1)
       and deleted_at is null',
    p_table
  );

  execute v_sql using p_ids;

  get diagnostics v_count = row_count;

  return v_count;
end;
$$;

drop view v_organizations_detail cascade;


create or replace view public.v_organizations_detail as
select
  o.id,
  o.code,
  o.name,
  o.full_name,
  o.description,

  p.name as parent_org_name,

  t.name as org_type_name,
  b.name as business_name,

  c.name as country_name,
  ap.name as province_name,
  ac.name as city_name,
  ad.name as district_name,

  o.address,
  o.latitude,
  o.longitude,

  o.is_active,
  o.created_at,
  o.updated_at

from public.organizations o
left join organizations p on p.id = o.parent_id
left join public.master_data t on t.id = o.org_type_id
left join public.master_data b on b.id = o.business_id
left join public.countries c on c.code = o.country_code
left join public.admin_regions ap on ap.code = o.province_code
left join public.admin_regions ac on ac.code = o.city_code
left join public.admin_regions ad on ad.code = o.district_code
where o.deleted_at is null;