-- schema
grant usage on schema hr to anon, authenticated;

-- tables
grant select on all tables in schema hr to anon, authenticated;

-- views
grant select on all views in schema hr to anon, authenticated;

-- default
alter default privileges in schema hr
grant select on tables to anon, authenticated;

grant select on hr.v_employee_list
to anon, authenticated, service_role;


-- 1. schema
grant usage on schema hr to anon, authenticated;

-- 2. 表
grant select on all tables in schema hr to anon, authenticated;

-- 3. view（批量）
do $$
declare r record;
begin
  for r in
    select table_name
    from information_schema.views
    where table_schema = 'hr'
  loop
    execute format(
      'grant select on hr.%I to anon, authenticated;',
      r.table_name
    );
  end loop;
end $$;

-- 4. 默认权限（未来）
alter default privileges in schema hr
grant select on tables to anon, authenticated;


select *
from rbac.employee_roles
where user_id = '04b827fb-0167-4346-bce2-71e7bbdd2b68';


select table_schema, table_name
from information_schema.tables
where table_name = 'employees';

select auth.uid();

create or replace function debug_auth()
returns json
language sql
stable
as $$
  select json_build_object(
    'uid', auth.uid(),
    'is_admin', rbac.is_super_admin()
  );
$$;

select
  schemaname,
  tablename,
  policyname,
  cmd,
  roles,
  with_check
from pg_policies
where tablename = 'employees';

select grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'hr'
  and table_name = 'employees';



create or replace view hr.v_employee_picker as
with primary_position as (
  select
    ea.employee_id,
    ea.post_id,
    ea.organization_id
  from hr.employee_assignments ea
  where ea.is_primary = true
    and ea.end_date is null
)

select
  e.id,
  e.name,
  e.code,

  -- 主组织（来自主岗位）
  pp.organization_id,
  org.name as organization_name,

 
  e.sort_order,


  -- 主岗
  pp.post_id,
  po.name as post_name

from hr.employees e

-- 主岗位
left join primary_position pp
  on pp.employee_id = e.id

-- 岗位名称
left join hr.posts po
  on po.id = pp.post_id

-- 主组织
left join organizations org
  on org.id = pp.organization_id

-- 状态
left join master_data status
  on status.id = e.employment_status_id;