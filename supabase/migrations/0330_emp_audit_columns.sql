

alter table employees
add column created_at timestamptz default now();

alter table employees
add column updated_at timestamptz;

alter table employees
add column deleted_at timestamptz;

alter table employees
add column created_by uuid
default system.current_employee_id()
references employees(id) on delete set null;

alter table employees
add column updated_by uuid
references employees(id) on delete set null;

alter table employees
add column deleted_by uuid
references employees(id) on delete set null;


create trigger trg_employees_updated_by
before update on employees
for each row
execute function system.set_updated_by();
