
create or replace function public.audit_fields_trigger()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid;
begin

  begin
    v_uid := auth.uid();
  exception
    when others then
      v_uid := null;
  end;

  if tg_op = 'INSERT' then
    new.created_at := now();
    new.updated_at := now();

    if v_uid is not null then
      new.created_by := v_uid;
      new.updated_by := v_uid;
    end if;

  elsif tg_op = 'UPDATE' then
    new.updated_at := now();

    if v_uid is not null then
      new.updated_by := v_uid;
    end if;
  end if;

  return new;
end;
$$;

create trigger trg_audit_fields_organizations
before insert or update
on public.organizations
for each row
execute function public.audit_fields_trigger();

create trigger trg_audit_fields_projects
before insert or update
on public.projects
for each row
execute function public.audit_fields_trigger();


