

drop view v_runtime_user cascade;
create or replace view public.v_runtime_user as
select
  u.id as user_id,
  p.id as person_id,
  e.id as employee_id,

  p.name,
  e.organization_id,
  o.path as org_path,

  (
    select coalesce(array_agg(distinct r.code), '{}')
    from rbac.user_roles ur
    join rbac.roles r on r.id = ur.role_id
    where ur.user_id = p.id
  ) as roles,

  (
    select coalesce(array_agg(distinct perm.code), '{}')
    from rbac.user_roles ur
    join rbac.role_permissions rp on rp.role_id = ur.role_id
    join rbac.permissions perm on perm.id = rp.permission_id
    where ur.user_id = p.id
  ) as permissions

from auth.users u
join hr.persons p on p.auth_id = u.id

left join hr.employees e on e.person_id = p.id
left join public.organizations o on o.id = e.organization_id

where u.id = auth.uid();


select auth.uid();

select * from auth.users;

select * from hr.persons;

select * from v_runtime_user;


create or replace function public.tree_query_organizations(
  p_parent_id uuid default null,
  p_include_children boolean default false,
  p_search text default null,
  p_limit int default 20,
  p_offset int default 0
)
returns setof v_organizations_list
language plpgsql
as $$
declare
  v_parent_path ltree;
begin

  if p_parent_id is not null then
    select path into v_parent_path
    from organizations
    where id = p_parent_id;
  end if;

  return query
  select o.*
  from v_organizations_list o   -- ✅ 改这里
  where
    (
      p_parent_id is null

      or (
        p_include_children = true
        and o.path <@ v_parent_path
      )

      or (
        p_include_children = false
        and (
          o.id = p_parent_id
          or o.parent_id = p_parent_id
        )
      )
    )
    and (
      p_search is null
      or o.name ilike '%' || p_search || '%'
    )
  order by o.created_at desc
  limit p_limit
  offset p_offset;

end;
$$;


alter table hr.employees
    add column sort_order int default 0;

alter table hr.employees
    add column external_id text;


alter table hr.employees
    add column external_version text;

drop view hr.v_employee_list cascade;
create or replace view hr.v_employee_list as
select
  e.id,
  p.name,
  p.code,
  e.organization_id,
  org.name as organization_name,

  status.name as status_name,

  -- 主岗（简化版）
  (
    select md.name
    from hr.employee_posts ep
    left join master_data md on md.id = ep.post_id
    where ep.employee_id = e.id
      and ep.is_primary = true
      and ep.end_date is null
    limit 1
  ) as primary_post_name

from hr.employees e
left join hr.persons p on p.id = e.person_id
left join organizations org on org.id = e.organization_id
left join master_data status on status.id = e.status_id;

create or replace view hr.v_employee_list as
select
  e.id,
  p.name,
  p.code,
  e.organization_id,
  org.name as organization_name,

  status.name as status_name,
  e.sort_order,
  e.created_at,

  -- 主岗（简化版）
  (
    select md.name
    from hr.employee_posts ep
    left join master_data md on md.id = ep.post_id
    where ep.employee_id = e.id
      and ep.is_primary = true
      and ep.end_date is null
    limit 1
  ) as primary_post_name

from hr.employees e
left join hr.persons p on p.id = e.person_id
left join organizations org on org.id = e.organization_id
left join master_data status on status.id = e.status_id;