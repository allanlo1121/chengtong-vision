
create or replace function system.current_employee_id()
returns uuid
language sql
stable
as $$
  select id
  from public.employees
  where auth_user_id = auth.uid()
  limit 1
$$;

create or replace function system.set_updated_by()
returns trigger
language plpgsql
as $$
begin
  new.updated_by := system.current_employee_id();
  new.updated_at := now();
  return new;
end;
$$;

alter table organizations
add column created_at timestamptz default now();

alter table organizations
add column updated_at timestamptz;

alter table organizations
add column deleted_at timestamptz;

alter table organizations
add column created_by uuid
default system.current_employee_id()
references employees(id) on delete set null;

alter table organizations
add column updated_by uuid
references employees(id) on delete set null;

alter table organizations
add column deleted_by uuid
references employees(id) on delete set null;


create trigger trg_organizations_updated_by
before update on organizations
for each row
execute function system.set_updated_by();
