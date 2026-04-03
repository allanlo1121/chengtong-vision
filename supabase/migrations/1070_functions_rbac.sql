-- =====================================================
-- 5) 权限检查函数（核心）
-- =====================================================

create or replace function rbac.has_permission(p_code text)
returns boolean
language sql
stable
security definer
set search_path = public, rbac
as $$
  with current_person as (
    select id
    from hr.persons
    where auth_id = auth.uid()
  ),

  role_perms as (
    select p.code
    from current_person cp
    join rbac.user_roles ur on ur.user_id = cp.id
    join rbac.role_permissions rp on rp.role_id = ur.role_id
    join rbac.permissions p on p.id = rp.permission_id
  ),

  post_perms as (
    select p.code
    from current_person cp
    join hr.employees e on e.person_id = cp.id
    join hr.employee_posts ep on ep.employee_id = e.id
    join rbac.post_permissions pp on pp.post_id = ep.post_id
    join rbac.permissions p on p.id = pp.permission_id
  ),

  direct_perms as (
    select p.code
    from current_person cp
    join rbac.person_permissions dp on dp.person_id = cp.id
    join rbac.permissions p on p.id = dp.permission_id
  )

  select exists (
    select 1
    from (
      select code from role_perms
      union
      select code from post_perms
      union
      select code from direct_perms
    ) all_perms
    where code = p_code
  );
$$;

-- 确保函数可执行
grant execute on function rbac.has_permission(text) to authenticated;


