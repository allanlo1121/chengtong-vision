create view rbac.v_user_permissions as
select
  ur.user_id,
  p.code as permission_code
from rbac.user_roles ur
join rbac.role_permissions rp on ur.role_id = rp.role_id
join rbac.permissions p on rp.permission_id = p.id;


create or replace view public.v_user_menu as
select m.*
from system.menus m
where m.is_active = true
  and (
    m.permission_code is null
    or rbac.has_permission(m.permission_code)
  )
order by m.group_name, m.sort_order;


create view public.v_user_favorite_projects as
select
  p.id,
  p.name
from user_favorite_projects uf
join projects p on uf.project_id = p.id
where uf.user_id = auth.uid()
order by uf.sort_order;


create or replace view public.v_runtime_user as
with current_employee as (
  select e.*
  from hr.employees e
  where e.auth_id = auth.uid()
  limit 1
),

-- 当前岗位
current_positions as (
  select ep.*
  from hr.employee_positions ep
  join current_employee ce on ce.id = ep.employee_id
  where ep.end_date is null
),

-- 主岗位
primary_position as (
  select *
  from current_positions
  where is_primary = true
  limit 1
)

select
  u.id as user_id,
  ce.id as employee_id,

  ce.name,

  -- 主组织（来自主岗位）
  pp.organization_id as organization_id,

  -- 主组织路径
  o.path as org_path,

  -- 所有组织（数组）
  (
    select coalesce(array_agg(distinct ep.organization_id), '{}')
    from current_positions ep
  ) as organization_ids,

  -- 角色
  (
    select coalesce(array_agg(distinct r.code), '{}')
    from rbac.user_roles ur
    join rbac.roles r on r.id = ur.role_id
    where ur.user_id = ce.id
  ) as roles,

  -- 权限（岗位 + 角色）
  (
    select coalesce(array_agg(distinct perm.code), '{}')
    from (

      -- 岗位权限（主）
      select p.code
      from current_positions ep
      join rbac.post_permissions pp on pp.post_id = ep.post_id
      join rbac.permissions p on p.id = pp.permission_id

      union

      -- 角色权限（补）
      select p.code
      from rbac.user_roles ur
      join rbac.role_permissions rp on rp.role_id = ur.role_id
      join rbac.permissions p on p.id = rp.permission_id
      where ur.user_id = ce.id

    ) perm

  ) as permissions

from auth.users u
join current_employee ce on true
left join primary_position pp on true
left join public.organizations o on o.id = pp.organization_id
where u.id = auth.uid();