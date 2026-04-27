

create or replace function access.can_read_employee(p_org_id uuid)
returns boolean
language sql
stable
as $$
  select
    rbac.is_super_admin()
    OR (
      rbac.has_permission('employee.read')
      AND p_org_id in (select system.allowed_org_ids())
    );
$$;

create or replace function access.can_write_employee(p_org_id uuid)
returns boolean
language sql
stable
as $$
  select
    rbac.is_super_admin()
    OR (
      rbac.has_permission('employee.write')
      AND p_org_id in (select system.allowed_org_ids())
    );
$$;


create or replace function access.can_read_project(p_org_id uuid)
returns boolean
language sql
stable
as $$
  select
    rbac.is_super_admin()
    OR (
      rbac.has_permission('project.read')
      AND p_org_id in (select system.allowed_org_ids())
    );
$$;


create or replace function access.can_write_project(p_org_id uuid)
returns boolean
language sql
stable
as $$
  select
    rbac.is_super_admin()
    OR (
      rbac.has_permission('project.write')
      AND p_org_id in (select system.allowed_org_ids())
    );
$$;