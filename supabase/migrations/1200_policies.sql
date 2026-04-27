

-- =====================================================
-- 为 organizations 表启用 RLS
-- =====================================================
alter table public.organizations enable row level security;
alter table public.organizations force row level security;


create policy "organization read policy"
on public.organizations
for select
using (
  rbac.has_permission('organization.read')
);

create policy "organization write policy"
on public.organizations
for insert
with check (
  rbac.has_permission('organization.write')
);

create policy "organization update policy"
on public.organizations
for update
using (
  rbac.has_permission('organization.write')
);

create policy "organization delete policy"
on public.organizations
for delete
using (
  rbac.has_permission('organization.write')
);


-- =====================================================
-- 为 employees 表启用 RLS
-- =====================================================
alter table hr.employees enable row level security;
alter table hr.employees force row level security;


create policy "employees_select"
on hr.employees
for select
to authenticated
using (
  access.can_read_employee(organization_id)
);

create policy "employees_insert"
on hr.employees
for insert
to authenticated
with check (
  access.can_write_employee(organization_id)
);

create policy "employees_update"
on hr.employees
for update
to authenticated
using (
  access.can_write_employee(organization_id)
)
with check (
  access.can_write_employee(organization_id)
);

create policy "employees_delete"
on hr.employees
for delete
to authenticated
using (
  access.can_write_employee(organization_id)
);

alter table public.projects enable row level security;
alter table public.projects force row level security;

create policy "projects_select"
on public.projects
for select
to authenticated
using (
  access.can_read_project(organization_id)
);

create policy "projects_insert"
on public.projects
for all
to authenticated
using (
  access.can_write_project(organization_id)
)
with check (
  access.can_write_project(organization_id)
);


create policy "project_update"
on public.projects
for update
to authenticated
using (
  access.can_write_project(organization_id)
)
with check (
  access.can_write_project(organization_id)
);

create policy "project_delete_policy"
on public.projects
for delete
using (
  system.is_super_admin()
  OR
  organization_id in (
    select system.allowed_org_ids()
  )
);

-- =====================================================
-- 为 audit.logs 表启用 RLS
-- =====================================================

alter table audit.logs enable row level security;

create policy "audit_no_delete"
on audit.logs
for delete
using (false);


-- =====================================================
-- 为 system.menus 表启用 RLS
-- =====================================================

alter table system.menus enable row level security;

create policy "menu_select_policy"
on system.menus
for select
using (
  is_visible = true
  and (
    permission_code is null
    or rbac.has_permission(permission_code)
  )
);

create policy "menu_admin_policy"
on system.menus
for all
using (
  system.is_super_admin()
)
with check (
  system.is_super_admin()
);