

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

