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
where m.is_disabled = false
  and (
    m.permission_code is null
    or rbac.has_permission(m.permission_code)
  )
order by m.group_name, m.sort_order;


create view public.v_user_orgs as
select
  o.id,
  o.name,
  o.fullname
from employee_org_access eoa
join organizations o on eoa.org_id = o.id
where eoa.employee_id = auth.uid();


create view public.v_user_favorite_projects as
select
  p.id,
  p.name
from user_favorite_projects uf
join projects p on uf.project_id = p.id
where uf.user_id = auth.uid()
order by uf.sort_order;


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


create index idx_role_permissions_role on rbac.role_permissions(role_id);
create index idx_permissions_id on rbac.permissions(id);
create index idx_employees_id on public.employees(id);