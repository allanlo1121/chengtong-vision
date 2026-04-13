
create or replace function system.current_org_id()
returns uuid
language sql
stable
security definer
set search_path = public, hr
as $$
  select ea.organization_id
  from hr.employees e
  join hr.employee_assignments ea
    on ea.employee_id = e.id
   and ea.is_primary = true
   and ea.end_date is null
  where e.auth_id = auth.uid()
    and e.deleted_at is null
  limit 1
$$;

create or replace function system.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public, rbac, hr
as $$
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

  select exists (
    select 1
    from all_roles r
    join rbac.roles ro on ro.id = r.role_id
    where ro.code = 'SUPER_ADMIN'
      and ro.is_active = true
  );
$$;

create or replace function system.allowed_org_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public, hr
as $$
  select o2.id
  from public.organizations o1
  join public.organizations o2
    on o2.path <@ o1.path
  where o1.id = system.current_org_id()
$$;