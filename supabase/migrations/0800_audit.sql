-- ==============================
-- 0800 AUDIT TABLES
-- ==============================

create schema if not exists audit;

-- =====================================================
-- AUDIT SCHEMA PERMISSIONS
-- =====================================================

-- 允许 API 访问 schema
grant usage on schema audit to anon, authenticated, service_role;

-- 允许读取表
grant select on all tables in schema audit
to anon, authenticated, service_role;

-- 未来新表自动授权
alter default privileges in schema audit
grant select on tables to anon, authenticated, service_role;


create table audit.logs (
  id uuid primary key default gen_random_uuid(),

  -- 实体信息
  entity_type text not null,
  entity_id uuid not null,

  -- 操作类型
  action text not null check (
    action in ('INSERT','UPDATE','DELETE','LOGIN','LOGOUT','CUSTOM')
  ),

  -- 数据快照
  old_data jsonb,
  new_data jsonb,

  -- 组织范围
  org_node_id uuid,

  -- 操作人
  created_by uuid
    references auth.users(id),

  -- 请求追踪
  request_id uuid,
  ip_address inet,
  user_agent text,

  created_at timestamptz not null default now()
);



create index idx_audit_entity
  on audit.logs(entity_type, entity_id);

create index idx_audit_created_by
  on audit.logs(created_by);

create index idx_audit_created_at
  on audit.logs(created_at desc);

create index idx_audit_org
  on audit.logs(org_node_id);

create or replace function audit.log_changes()
returns trigger
language plpgsql
security definer
as $$
declare
  v_user uuid;
begin

  v_user := auth.uid();

  if (tg_op = 'INSERT') then
    insert into audit.logs (
      entity_type,
      entity_id,
      action,
      new_data,
      created_by,
      org_node_id
    )
    values (
      tg_table_name,
      new.id,
      'INSERT',
      to_jsonb(new),
      v_user,
      new.org_node_id
    );

    return new;
  end if;

  if (tg_op = 'UPDATE') then
    insert into audit.logs (
      entity_type,
      entity_id,
      action,
      old_data,
      new_data,
      created_by,
      org_node_id
    )
    values (
      tg_table_name,
      new.id,
      'UPDATE',
      to_jsonb(old),
      to_jsonb(new),
      v_user,
      new.org_node_id
    );

    return new;
  end if;

  if (tg_op = 'DELETE') then
    insert into audit.logs (
      entity_type,
      entity_id,
      action,
      old_data,
      created_by,
      org_node_id
    )
    values (
      tg_table_name,
      old.id,
      'DELETE',
      to_jsonb(old),
      v_user,
      old.org_node_id
    );

    return old;
  end if;

  return null;
end;
$$;

create trigger trg_projects_audit
after insert or update or delete
on public.projects
for each row
execute function audit.log_changes();