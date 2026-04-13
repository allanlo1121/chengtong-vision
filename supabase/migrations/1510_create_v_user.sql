
create or replace view rbac.v_user_permissions as
with current_employee as (
  select e.id
  from hr.employees e
  where e.auth_id = auth.uid()
    and e.deleted_at is null
  limit 1
),

-- 岗位角色
post_roles_cte as (
  select pr.role_id
  from current_employee ce
  join hr.employee_assignments ea
    on ea.employee_id = ce.id
   and ea.end_date is null
  join rbac.post_roles pr
    on pr.post_id = ea.post_id
),

-- 用户角色
employee_roles_cte as (
  select er.role_id
  from current_employee ce
  join rbac.employee_roles er
    on er.user_id = ce.id
),

all_roles as (
  select role_id from post_roles_cte
  union
  select role_id from employee_roles_cte
)

select
  ce.id as user_id,
  p.code as permission_code
from current_employee ce
join all_roles r on true
join rbac.role_permissions rp on rp.role_id = r.role_id
join rbac.permissions p on p.id = rp.permission_id
where p.is_active = true;

create or replace view public.v_user_menu as
select m.*
from system.menus m
where m.is_active = true
  and (
    m.permission_code is null
    or exists (
      select 1
      from rbac.v_user_permissions up
      where up.permission_code = m.permission_code
    )
  )
order by m.group_name, m.sort_order;


create or replace view public.v_user_favorite_projects as
with current_employee as (
  select e.id
  from hr.employees e
  where e.auth_id = auth.uid()
    and e.deleted_at is null
  limit 1
)

select
  p.id,
  p.name
from current_employee ce
join user_favorite_projects uf
  on uf.user_id = ce.id
join projects p
  on uf.project_id = p.id
order by uf.sort_order;


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
employee_roles_cte as (
  select er.role_id
  from current_employee ce
  join rbac.employee_roles er
    on er.user_id = ce.id
),

-- 所有角色
all_roles as (
  select role_id from post_roles_cte
  union
  select role_id from employee_roles_cte
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
    where r.is_active = true
  ) as roles,

  -- 权限（统一来源）
  (
    select coalesce(array_agg(distinct p.code), '{}')
    from all_roles ar
    join rbac.role_permissions rp on rp.role_id = ar.role_id
    join rbac.permissions p on p.id = rp.permission_id
    where p.is_active = true
  ) as permissions

from auth.users u
join current_employee ce on true
left join primary_position pp on true
left join public.organizations o on o.id = pp.organization_id
where u.id = auth.uid();