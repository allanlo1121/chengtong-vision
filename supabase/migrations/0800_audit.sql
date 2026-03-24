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


create type audit.action_type as enum (
  'INSERT',
  'UPDATE',
  'DELETE',
  'LOGIN',
  'LOGOUT',
  'CUSTOM'
);

create table audit.logs (
  id uuid primary key default gen_random_uuid(),

  -- 实体信息
  table_name text not null,
  entity_id uuid not null,

  -- 操作类型
  action audit.action_type not null,

  -- 数据快照
  old_data jsonb,
  new_data jsonb,
  changed_fields text[],

  -- 组织范围
  organization_id uuid,

  -- 操作人
  operated_by uuid
    references hr.persons(id),

  -- 请求追踪
  request_id uuid,
  ip_address inet,
  user_agent text,

  created_at timestamptz not null default now()
);

create index idx_audit_entity
on audit.logs(table_name, entity_id);

create index idx_audit_operated_by
on audit.logs(operated_by);

create index idx_audit_created_at
on audit.logs(created_at);


create or replace function audit.log_changes()
returns trigger
language plpgsql
security definer
as $$
declare
  v_user uuid;
  v_changed_fields text[];
  v_org uuid;
begin

  v_user := auth.uid();

  if (tg_op = 'INSERT') then

    v_org := (to_jsonb(new)->>'organization_id')::uuid;

    insert into audit.logs (
      table_name,
      entity_id,
      action,
      new_data,
      operated_by,
      organization_id
    )
    values (
      tg_table_name,
      new.id,
      'INSERT',
      to_jsonb(new),
      v_user,
      v_org
    );

    return new;
  end if;

  if (tg_op = 'UPDATE') then

    select array_agg(key)
    into v_changed_fields
    from jsonb_each(to_jsonb(new))
    where to_jsonb(new)->key is distinct from to_jsonb(old)->key;

    v_org := coalesce(
      (to_jsonb(new)->>'organization_id')::uuid,
      (to_jsonb(old)->>'organization_id')::uuid
    );

    insert into audit.logs (
      table_name,
      entity_id,
      action,
      old_data,
      new_data,
      changed_fields,
      operated_by,
      organization_id
    )
    values (
      tg_table_name,
      new.id,
      'UPDATE',
      to_jsonb(old),
      to_jsonb(new),
      v_changed_fields,
      v_user,
      v_org
    );

    return new;
  end if;

  if (tg_op = 'DELETE') then

    v_org := (to_jsonb(old)->>'organization_id')::uuid;

    insert into audit.logs (
      table_name,
      entity_id,
      action,
      old_data,
      operated_by,
      organization_id
    )
    values (
      tg_table_name,
      old.id,
      'DELETE',
      to_jsonb(old),
      v_user,
      v_org
    );

    return old;
  end if;

  return null;
end;
$$;

create trigger trg_audit_projects
after insert or update or delete
on public.projects
for each row
execute function audit.log_changes();

create or replace function public.audit_fields_trigger()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid;
begin
  -- 获取当前认证用户
  begin
    v_uid := auth.uid();
  exception
    when others then
      v_uid := null;
  end;

  if (tg_op = 'INSERT') then
    new.created_at := now();
    new.updated_at := now();

    if v_uid is not null then
      new.created_by := v_uid;
      new.updated_by := v_uid;
    end if;

  elsif (tg_op = 'UPDATE') then
    new.updated_at := now();

    if v_uid is not null then
      new.updated_by := v_uid;
    end if;
  end if;

  return new;
end;
$$;

create trigger trg_audit_organizations
before insert or update
on public.organizations
for each row
execute function public.audit_fields_trigger();