create schema if not exists hr;


create table hr.persons (
  id uuid primary key default gen_random_uuid(),

  auth_id uuid unique references auth.users(id) on delete set null,
  
  code text unique not null,
  name text not null,
  gender_id uuid  references master_data(id),

  birth_date date,
  id_card text,
  phone text,
  email text

);


alter table hr.persons
add column created_at timestamptz default now();

alter table hr.persons
add column updated_at timestamptz;

alter table hr.persons
add column deleted_at timestamptz;

alter table hr.persons
add column created_by uuid
default system.current_user_id()
references hr.persons(id) on delete set null;

alter table hr.persons
add column updated_by uuid
references hr.persons(id) on delete set null;

alter table hr.persons
add column deleted_by uuid
references hr.persons(id) on delete set null;


create trigger trg_persons_audit_updated
before update on hr.persons
for each row
execute function system.set_audit_on_update();