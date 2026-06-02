create policy "super_admin_all"
on public.organizations
for all
to authenticated
using (rbac.is_super_admin())
with check (rbac.is_super_admin());


drop policy if exists employees_insert on hr.employees;

create policy "employees_insert"
on hr.employees
for insert
to authenticated
with check (
  rbac.is_super_admin()
  OR (
    organization_id IS NOT NULL
    AND access.can_write_employee(organization_id)
  )
);

create or replace function rbac.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public, rbac,hr
as $$
  select exists (
    select 1
    from rbac.employee_roles er
    join rbac.roles r on r.id = er.role_id
    where er.user_id = auth.uid()
      and r.code = 'SUPER_ADMIN'
      and r.is_active = true
  );
$$;


select
  ora.id,
  ora.employee_id,
  ora.organization_id,
  ora.role_type_id,

  e.id as e_id,
  o.id as o_id,
  md.id as role_id

from hr.organization_role_assignments ora

left join hr.employees e
  on e.id = ora.employee_id

left join public.organizations o
  on o.id = ora.organization_id

left join public.master_data md
  on md.id = ora.role_type_id

where ora.end_date is null;

alter table hr.organization_role_assignments
add constraint fk_ora_employee
foreign key (employee_id)
references hr.employees(id)
on delete cascade;

alter table hr.organization_role_assignments
add constraint fk_ora_organization
foreign key (organization_id)
references public.organizations(id)
on delete cascade;


select auth.uid(), system.current_employee_id();

select system.attach_audit_triggers('public.tbms');

drop table rbac.user_favorite_projects cascade;
create table rbac.user_favorite_projects (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id) on delete cascade,

  project_id uuid not null
    references proj.projects(id) on delete cascade,

  sort_order int not null default 0,
  is_disabled boolean not null default false,

  unique (user_id, project_id)
);

drop view v_user_favorite_projects cascade;
create or replace view public.v_user_favorite_projects as
select
  p.id,
  p.name,
  '/workspace/projects/' || p.id::text || '/overview' as url,
  'Map' as icon
from rbac.user_favorite_projects uf
join proj.projects p
  on p.id = uf.project_id
where uf.user_id = auth.uid()
  and uf.is_disabled = false
order by uf.sort_order;

create or replace view public.v_user_favorite_projects as
with current_employee as (
  select e.id,e.auth_id
  from hr.employees e
  where e.auth_id = auth.uid()
    and e.deleted_at is null
  limit 1
)
select
  p.id,
  p.name,
  '/workspace/projects/' || p.id::text || '/overview' as url,
  'Map' as icon
from current_employee ce
join rbac.user_favorite_projects uf
  on uf.user_id = ce.auth_id
join proj.projects p
  on uf.project_id = p.id
order by uf.sort_order;

drop view v_runtime_user cascade;
create or replace view public.v_runtime_user as

with current_employee as (
  select e.*
  from hr.employees e
  where e.auth_id = auth.uid()
    and e.deleted_at is null
  limit 1
),

-- 当前岗位
current_positions as (
  select ea.*
  from hr.employee_assignments ea
  join current_employee ce on ce.id = ea.employee_id
  where ea.end_date is null
),

-- 主岗位
primary_position as (
  select *
  from current_positions
  where is_primary = true
  limit 1
),

-- 岗位角色
post_roles_cte as (
  select pr.role_id
  from current_positions ea
  join rbac.post_roles pr
    on pr.post_id = ea.post_id
),

-- 用户角色
user_roles_cte as (
  select ur.role_id
  from rbac.user_roles ur
    where ur.user_id = auth.uid()
    and ur.is_disabled = false
),

-- 所有角色
all_roles as (
  select role_id from post_roles_cte
  union
  select role_id from user_roles_cte
),

-- 用户收藏项目
favorite_projects_cte as (
  select
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', p.id,
          'name', p.name
        )
        order by uf.sort_order
      ),
      '[]'::jsonb
    ) as favorite_projects
  from current_employee ce
  join rbac.user_favorite_projects uf
    on uf.user_id = ce.auth_id
  join proj.projects p
    on p.id = uf.project_id
)

select
  u.id as user_id,
  ce.id as employee_id,
  ce.name,

  -- 主组织
  pp.organization_id,

  -- 路径
  o.path as org_path,

  -- 所有组织
  (
    select coalesce(array_agg(distinct ep.organization_id), '{}')
    from current_positions ep
  ) as organization_ids,

  -- 角色
  (
    select coalesce(array_agg(distinct r.code), '{}')
    from all_roles ar
    join rbac.roles r on r.id = ar.role_id
    where r.is_disabled = false
  ) as roles,

  -- 权限（统一来源）
  (
    select coalesce(array_agg(distinct p.code), '{}')
    from all_roles ar
    join rbac.role_permissions rp on rp.role_id = ar.role_id
    join rbac.permissions p on p.id = rp.permission_id
    where p.is_disabled = false
  ) as permissions,

  -- 收藏项目
  fp.favorite_projects

from auth.users u
join current_employee ce on true
left join primary_position pp on true
left join hr.organizations o on o.id = pp.organization_id
left join favorite_projects_cte fp on true
where u.id = auth.uid();


select
  uf.user_id,
  ce.id as employee_id,
  ce.auth_id
from rbac.user_favorite_projects uf
cross join (
  select id, auth_id
  from hr.employees
  where auth_id = auth.uid()
) ce;


select *
from rbac.user_favorite_projects;

select id, name
from proj.projects
where id = '0e0adc14-d26f-4178-88bf-811c3a401c79';

select
  uf.*,
  p.id as project_id2,
  p.name as project_name,
  auth.uid() as current_user_id
from rbac.user_favorite_projects uf
left join proj.projects p
  on p.id = uf.project_id
where uf.user_id = 'f0c8694d-55b8-40a4-b4e6-7f14ca12d170';