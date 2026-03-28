

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