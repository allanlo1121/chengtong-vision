
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

-- create or replace function rbac.has_permission(p_code text)
-- returns boolean
-- language sql
-- stable
-- security definer
-- set search_path = public, rbac, hr
-- as $$
--   with current_employee as (
--     select e.id
--     from hr.employees e
--     where e.auth_id = auth.uid()
--       and e.deleted_at is null
--     limit 1
--   ),

--   -- 1️⃣ 岗位带来的角色
--   post_roles_cte as (
--     select pr.role_id
--     from current_employee ce
--     join hr.employee_assignments ea
--       on ea.employee_id = ce.id
--      and ea.end_date is null
--     join rbac.post_roles pr
--       on pr.post_id = ea.post_id
--   ),

--   -- 2️⃣ 用户直接角色
--   employee_roles_cte as (
--     select er.role_id
--     from current_employee ce
--     join rbac.employee_roles er
--       on er.user_id = ce.id
--   ),

--   -- 3️⃣ 合并所有角色
--   all_roles as (
--     select role_id from post_roles_cte
--     union
--     select role_id from employee_roles_cte
--   )

--   -- 4️⃣ 判断权限
--   select exists (
--     select 1
--     from all_roles r
--     join rbac.role_permissions rp
--       on rp.role_id = r.role_id
--     join rbac.permissions p
--       on p.id = rp.permission_id
--     where p.code = p_code
--       and p.is_active = true
--   );
-- $$;





-- create or replace function rbac.is_super_admin()
-- returns boolean
-- language sql
-- stable
-- security definer
-- set search_path = public, rbac, hr
-- as $$
--   with current_employee as (
--     select e.id
--     from hr.employees e
--     where e.auth_id = auth.uid()
--       and e.deleted_at is null
--     limit 1
--   ),

--   -- 岗位角色
--   post_roles_cte as (
--     select pr.role_id
--     from current_employee ce
--   join hr.employee_assignments ea
--       on ea.employee_id = ce.id
--      and ea.end_date is null
--     join rbac.post_roles pr
--       on pr.post_id = ea.post_id
--   ),

--   -- 用户角色
--   employee_roles_cte as (
--     select er.role_id
--     from current_employee ce
--     join rbac.employee_roles er
--       on er.user_id = ce.id
--   ),

--   all_roles as (
--     select role_id from post_roles_cte
--     union
--     select role_id from employee_roles_cte
--   )

--   select exists (
--     select 1
--     from all_roles r
--     join rbac.roles ro on ro.id = r.role_id
--     where ro.code = 'SUPER_ADMIN'
--       and ro.is_active = true
--   );
-- $$;

create or replace function rbac.is_super_admin()
returns boolean
language sql
stable
security definer
as $$
  with ce as (
    select system.current_employee_id() as id
  ),
  roles_union as (
    -- 岗位角色
    select pr.role_id
    from ce
    join hr.employee_assignments ea
      on ea.employee_id = ce.id
     and ea.end_date is null
    join rbac.post_roles pr
      on pr.post_id = ea.post_id

    union

    -- 个人角色（注意：用 auth_id 关联）
    select er.role_id
    from ce
    join hr.employees e on e.id = ce.id
    join rbac.employee_roles er
      on er.user_id = e.auth_id
  )
  select exists (
    select 1
    from roles_union ru
    join rbac.roles r on r.id = ru.role_id
    where r.code = 'SUPER_ADMIN'
      and r.is_active = true
  );
$$;

create or replace function rbac.has_permission(p_code text)
returns boolean
language sql
stable
security definer
as $$
  with ce as (
    select system.current_employee_id() as id
  ),
  roles_union as (
    select pr.role_id
    from ce
    join hr.employee_assignments ea
      on ea.employee_id = ce.id
     and ea.end_date is null
    join rbac.post_roles pr
      on pr.post_id = ea.post_id

    union

    select er.role_id
    from ce
    join hr.employees e on e.id = ce.id
    join rbac.employee_roles er
      on er.user_id = e.auth_id
  )
  select exists (
    select 1
    from roles_union ru
    join rbac.role_permissions rp on rp.role_id = ru.role_id
    join rbac.permissions p on p.id = rp.permission_id
    where p.code = p_code
  );
$$;

-- 确保函数可执行
grant execute on function rbac.has_permission(text) to authenticated;