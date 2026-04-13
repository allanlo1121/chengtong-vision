
create or replace function rbac.jwt_permissions()
returns jsonb
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
),

-- 1️⃣ 岗位带来的角色
post_roles_cte as (
  select pr.role_id
  from current_employee ce
  join hr.employee_assignments ea
    on ea.employee_id = ce.id
   and ea.end_date is null
  join rbac.post_roles pr
    on pr.post_id = ea.post_id
),

-- 2️⃣ 用户直接角色
employee_roles_cte as (
  select er.role_id
  from current_employee ce
  join rbac.employee_roles er
    on er.user_id = ce.id
),

-- 3️⃣ 合并角色
all_roles as (
  select role_id from post_roles_cte
  union
  select role_id from employee_roles_cte
)

-- 4️⃣ 输出权限
select coalesce(
  jsonb_agg(distinct p.code) filter (where p.is_active),
  '[]'::jsonb
)
from all_roles r
join rbac.role_permissions rp
  on rp.role_id = r.role_id
join rbac.permissions p
  on p.id = rp.permission_id;

$$;

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
  ),

  -- 1️⃣ 岗位带来的角色
  post_roles_cte as (
    select pr.role_id
    from current_employee ce
    join hr.employee_assignments ea
      on ea.employee_id = ce.id
     and ea.end_date is null
    join rbac.post_roles pr
      on pr.post_id = ea.post_id
  ),

  -- 2️⃣ 用户直接角色
  employee_roles_cte as (
    select er.role_id
    from current_employee ce
    join rbac.employee_roles er
      on er.user_id = ce.id
  ),

  -- 3️⃣ 合并所有角色
  all_roles as (
    select role_id from post_roles_cte
    union
    select role_id from employee_roles_cte
  )

  -- 4️⃣ 判断权限
  select exists (
    select 1
    from all_roles r
    join rbac.role_permissions rp
      on rp.role_id = r.role_id
    join rbac.permissions p
      on p.id = rp.permission_id
    where p.code = p_code
      and p.is_active = true
  );
$$;


-- 确保函数可执行
grant execute on function rbac.has_permission(text) to authenticated;


