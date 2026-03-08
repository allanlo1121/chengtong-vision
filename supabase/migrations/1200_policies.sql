

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
alter table public.employees enable row level security;
alter table public.employees force row level security;


create policy "employee read policy"
on public.employees
for select
using (
  rbac.has_permission('employee.read')
);

create policy "employee write policy"
on public.employees
for insert
with check (
  rbac.has_permission('employee.write')
);

create policy "employee update policy"
on public.employees
for update
using (
  rbac.has_permission('employee.write')
);

create policy "employee delete policy"
on public.employees
for delete
using (
  rbac.has_permission('employee.write')
);

alter table public.projects enable row level security;
alter table public.projects force row level security;

create policy "project_select_policy"
on public.projects
for select
using (
  system.is_super_admin()
  OR
  org_node_id in (
    select system.allowed_org_ids()
  )
);

create policy "project_insert_policy"
on public.projects
for insert
with check (
  system.is_super_admin()
  OR
  org_node_id in (
    select system.allowed_org_ids()
  )
);


create policy "project_update_policy"
on public.projects
for update
using (
  system.is_super_admin()
  OR
  org_node_id in (
    select system.allowed_org_ids()
  )
)
with check (
  system.is_super_admin()
  OR
  org_node_id in (
    select system.allowed_org_ids()
  )
);

create policy "project_delete_policy"
on public.projects
for delete
using (
  system.is_super_admin()
  OR
  org_node_id in (
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