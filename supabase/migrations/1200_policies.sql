

-- =====================================================
-- 为 organizations 表启用 RLS
-- =====================================================
alter table public.organizations enable row level security;
alter table public.organizations force row level security;


create policy "organizations_select"
on public.organizations
for select
to authenticated
using (
  rbac.is_super_admin()
  OR exists (
    select 1 from system.allowed_org_ids() a
    where a = organizations.id
  )
);

create policy "organizations_insert"
on public.organizations
for insert
to authenticated
with check (rbac.is_super_admin());

create policy "organizations_update"
on public.organizations
for update
to authenticated
using (rbac.is_super_admin())
with check (rbac.is_super_admin());

create policy "organizations_delete"
on public.organizations
for delete
to authenticated
using (rbac.is_super_admin());


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
  organization_id is not null
  AND access.can_write_employee(organization_id)
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

-- =====================================================
-- 为 projects 表启用 RLS
-- =====================================================

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
for insert
to authenticated
with check (
  access.can_write_project(organization_id)
);

create policy "projects_update"
on public.projects
for update
to authenticated
using (
  access.can_write_project(organization_id)
)
with check (
  access.can_write_project(organization_id)
);

create policy "projects_delete"
on public.projects
for delete
to authenticated
using (
  access.can_write_project(organization_id)
);

-- =====================================================
-- 为 audit.logs 表启用 RLS
-- =====================================================

-- alter table audit.logs enable row level security;

-- create policy "audit_no_delete"
-- on audit.logs
-- for delete
-- using (false);


-- =====================================================
-- 为 system.menus 表启用 RLS
-- =====================================================

-- alter table system.menus enable row level security;

-- create policy "menu_select_policy"
-- on system.menus
-- for select
-- using (
--   is_visible = true
--   and (
--     permission_code is null
--     or rbac.has_permission(permission_code)
--   )
-- );

-- create policy "menu_admin_policy"
-- on system.menus
-- for all
-- using (
--   system.is_super_admin()
-- )
-- with check (
--   system.is_super_admin()
-- );