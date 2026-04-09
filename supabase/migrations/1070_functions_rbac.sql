-- =====================================================
-- 5) 权限检查函数（核心）
-- =====================================================

create or replace function rbac.has_permission(p_code text)
returns boolean
language sql
stable
security definer
set search_path = public, rbac, hr
as $$
  with current_employee as (
    select e.id
    from hr.employees e
    where e.auth_id = auth.uid()
      and e.deleted_at is null
    limit 1
  )

  select
    -- 1️⃣ 岗位权限（主）
    exists (
      select 1
      from current_employee ce
      join hr.employee_positions ep
        on ep.employee_id = ce.id
       and ep.end_date is null
      join rbac.post_permissions pp
        on pp.post_id = ep.post_id
      join rbac.permissions p
        on p.id = pp.permission_id
      where p.code = p_code
    )

    or

    -- 2️⃣ 角色权限（兜底）
    exists (
      select 1
      from current_employee ce
      join rbac.user_roles ur
        on ur.user_id = ce.id
      join rbac.role_permissions rp
        on rp.role_id = ur.role_id
      join rbac.permissions p
        on p.id = rp.permission_id
      where p.code = p_code
    )

    or

    -- 3️⃣ 直接赋权（可选）
    exists (
      select 1
      from current_employee ce
      join rbac.employee_permissions dp
        on dp.employee_id = ce.id
      join rbac.permissions p
        on p.id = dp.permission_id
      where p.code = p_code
    );
$$;


-- 确保函数可执行
grant execute on function rbac.has_permission(text) to authenticated;


