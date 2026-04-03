

create or replace function system.current_person_id()
returns uuid
language plpgsql
stable
security definer
set search_path = public, hr
as $$
declare
  v_person_id uuid;
begin
  select p.id into v_person_id
  from hr.persons p
  where p.auth_id = auth.uid()
    and p.deleted_at is null
  limit 1;

  if v_person_id is not null then
    return v_person_id;
  end if;

  -- fallback（系统任务）
  return '00000000-0000-0000-0000-000000000001';
end;
$$;


create or replace function system.audit_insert()
returns trigger
language plpgsql
as $$
begin
  if new.created_at is null then
    new.created_at := now();
  end if;

  if new.created_by is null then
    new.created_by := system.current_person_id();
  end if;

  return new;
end;
$$;

create or replace function system.audit_update()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  new.updated_by := system.current_person_id();
  return new;
end;
$$;

create or replace function system.audit_delete()
returns trigger
language plpgsql
as $$
begin
  new.deleted_at := now();
  new.deleted_by := system.current_person_id();
  return new;
end;
$$;