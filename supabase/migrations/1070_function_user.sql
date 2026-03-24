create or replace function system.current_org_id()
returns uuid
language sql
stable
security definer
as $$
  select e.organization_id
  from hr.persons p
  join hr.employees e on e.person_id = p.id
  where p.auth_id = auth.uid()
  limit 1;
$$;

create or replace function system.is_super_admin()
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1
    from rbac.user_roles ur
    join rbac.roles r on ur.role_id = r.id
    where ur.user_id = auth.uid()
      and r.code = 'SUPER_ADMIN'
  );
$$;

create or replace function system.allowed_org_ids()
returns setof uuid
language sql
stable
security definer
as $$
  select o2.id
  from public.organizations o1
  join public.organizations o2
    on o2.path <@ o1.path
  where o1.id = system.current_org_id();
$$;