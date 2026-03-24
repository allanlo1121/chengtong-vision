


alter table organizations
add column created_at timestamptz default now();

alter table organizations
add column updated_at timestamptz;

alter table organizations
add column deleted_at timestamptz;

alter table organizations
add column created_by uuid
default system.current_user_id()
references hr.persons(id) on delete set null;

alter table organizations
add column updated_by uuid
references hr.persons(id) on delete set null;

alter table organizations
add column deleted_by uuid
references hr.persons(id) on delete set null;


create trigger trg_organizations_audit_updated
before update on organizations
for each row
execute function system.set_audit_on_update();
