

-- ============================================
--  首次进入建立管理员账户的函数
-- ============================================

create or replace function system.bootstrap(p_user_id uuid)
returns void
language plpgsql
security definer
as $$
declare
  v_role_id uuid;
  v_group_org_id uuid;
begin

  if auth.role() <> 'service_role' then
    raise exception 'permission denied';
  end if;

  if exists (
    select 1
    from system.bootstrap_state
    where version = '1.0.0'
      and completed = true
  ) then
    return;
  end if;

  -- 创建角色
  insert into rbac.roles (code, name)
  values ('SUPER_ADMIN', '超级管理员')
  on conflict (code) do nothing;

  select id into v_role_id
  from rbac.roles
  where code = 'SUPER_ADMIN';

  -- 创建 employee
  select id into v_group_org_id
  from public.organizations
  where code = '0-001-003';

  if v_group_org_id is null then
    raise exception 'Group organization not found';
  end if;

  insert into public.employees (
    id,
    name,
    code,
    org_node_id,
    is_active
  )
  values (
    p_user_id,
    '系统管理员',
    'admin',
    v_group_org_id,
    true
  )
  on conflict (id) do nothing;

  -- 绑定角色
  insert into rbac.user_roles (user_id, role_id)
  values (p_user_id, v_role_id)
  on conflict do nothing;

  -- 标记完成
  insert into system.bootstrap_state (version, completed, executed_at)
  values ('1.0.0', true, now())
  on conflict (version)
  do update set completed = true,
                executed_at = now();

end;
$$;

create or replace function public.bootstrap(p_user_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  if auth.role() <> 'service_role' then
    raise exception 'permission denied';
  end if;

  perform system.bootstrap(p_user_id);
end;
$$;

-- 移除默认权限
revoke execute on function public.bootstrap(p_user_id uuid) from anon;
revoke execute on function public.bootstrap(p_user_id uuid) from authenticated;

-- 只给 service_role
grant execute on function public.bootstrap(p_user_id uuid) to service_role;


-- 确保 owner 是 postgres
alter function system.bootstrap(p_user_id uuid) owner to postgres;
alter function public.bootstrap(p_user_id uuid) owner to postgres;