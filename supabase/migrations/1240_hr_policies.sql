-- 2026022433_hr_policies.sql

alter table public.employees enable row level security;

create policy "employee_can_view_self"
on public.employees
for select
using (id = auth.uid());

create policy "department_manager_access"
on public.employees
for select
using (
  exists (
    select 1
    from public.employees e
    where e.id = auth.uid()
      and e.org_node_id = employees.org_node_id
  )
);

create policy "block_direct_update"
on hr.employee_org_history
for update
using (
  exists (
    select 1
    from rbac.user_roles ur
    join rbac.roles r on r.id = ur.role_id
    where ur.user_id = auth.uid()
      and r.code = 'SUPER_ADMIN'
  )
);