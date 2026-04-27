
--上下文函数

--当前用户
create or replace function system.current_employee_id()
returns uuid
language plpgsql
stable
security definer
set search_path = public, hr
as $$
declare
  v_employee_id uuid;
begin
  select p.id into v_employee_id
  from hr.employees p
  where p.auth_id = auth.uid()
    and p.deleted_at is null
  limit 1;

  if v_employee_id is not null then
    return v_employee_id;
  end if;

  -- fallback（系统任务）
  return '00000000-0000-0000-0000-000000000001';
end;
$$;

--当前组织
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


--组织范围
-- create or replace function system.allowed_org_ids()
-- returns setof uuid
-- language sql
-- stable
-- security definer
-- set search_path = public, hr
-- as $$
--   select o2.id
--   from public.organizations o1
--   join public.organizations o2
--     on o2.path <@ o1.path
--   where o1.id = system.current_org_id()
-- $$;

create or replace function system.allowed_org_ids()
returns setof uuid
language sql
stable
security definer
as $$
  with current_node as (
    select o.id, o.path
    from public.organizations o
    where o.id = system.current_org_id()
  ),

  root as (
    select o.id, o.path
    from public.organizations o
    join current_node cn on o.path @> cn.path
    join hr.org_type_scope_map map on map.org_type_id = o.org_type_id
    where map.scope_code in ('company', 'project_org')  -- 👈 控制范围
    order by nlevel(o.path) desc
    limit 1
  )

  select o.id
  from public.organizations o
  join root r on o.path <@ r.path
$$;
