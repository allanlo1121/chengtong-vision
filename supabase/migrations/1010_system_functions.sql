
-- ============================================
-- 1️ 通用 updated_at 触发器函数
-- ============================================

create or replace function system.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace function system.touch_updated_at()
returns trigger as $$
begin
  if row(new.*) is distinct from row(old.*) then
    new.updated_at = now();
  end if;
  return new;
end;
$$ language plpgsql;



-- ============================================
-- 2️ 可选：通用软删除函数（如果需要统一调用）
-- ============================================

create or replace function system.soft_delete_row()
returns trigger as $$
begin
  new.deleted = true;
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;



-- ============================================
-- 3️ 建议的标准审计字段规范（说明性注释）
-- ============================================

comment on function system.set_updated_at()
is 'Auto-maintain updated_at before update';

comment on function system.soft_delete_row()
is 'Optional soft delete trigger helper';


create or replace function system.bootstrap()
returns void
language plpgsql
as $$
declare
  v_user_id uuid;
  v_role_id uuid;
begin

  -- 已执行则退出
  if exists (
    select 1
    from system.bootstrap_state
    where version = '1.0.0'
      and completed = true
  ) then
    return;
  end if;

  --------------------------------------------------
  -- 1️ 创建 SUPER_ADMIN
  --------------------------------------------------
  insert into rbac.roles (code, name)
  values ('SUPER_ADMIN', '超级管理员')
  on conflict (code) do nothing;

  select id into v_role_id
  from rbac.roles
  where code = 'SUPER_ADMIN';

  --------------------------------------------------
  -- 2️ 创建 admin 用户
  --------------------------------------------------
  insert into auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    role,
    aud
  )
  values (
    gen_random_uuid(),
    'admin@system.local',
    crypt('Admin123456', gen_salt('bf')),
    now(),
    '{}',
    '{}',
    'authenticated',
    'authenticated'
  )
  on conflict (email) do nothing
  returning id into v_user_id;

  if v_user_id is null then
    select id into v_user_id
    from auth.users
    where email = 'admin@system.local';
  end if;

  --------------------------------------------------
  -- 3️ 创建 employee
  --------------------------------------------------
  insert into public.employees (
    id,
    name,
    code,
    is_active
  )
  values (
    v_user_id,
    '系统管理员',
    'admin',
    true
  )
  on conflict (id) do nothing;

  --------------------------------------------------
  -- 4️ 绑定角色
  --------------------------------------------------
  insert into rbac.user_roles (user_id, role_id)
  values (v_user_id, v_role_id)
  on conflict do nothing;

  --------------------------------------------------
  -- 5️ 标记 bootstrap 完成
  --------------------------------------------------
  insert into system.bootstrap_state (version, completed, executed_at)
  values ('1.0.0', true, now())
  on conflict (version)
  do update set completed = true,
                executed_at = now();

end;
$$;

-- 1️ 先移除所有默认权限
revoke execute on function system.bootstrap() from public;
revoke execute on function system.bootstrap() from anon;
revoke execute on function system.bootstrap() from authenticated;

-- 2️ 只允许 service_role 调用
grant execute on function system.bootstrap() to service_role;