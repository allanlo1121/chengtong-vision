

alter table hr.employees
add column created_at timestamptz default now();

alter table hr.employees
add column updated_at timestamptz;

alter table hr.employees
add column deleted_at timestamptz;

alter table hr.employees
add column created_by uuid
default system.current_user_id()
references hr.persons(id) on delete set null;

alter table hr.employees
add column updated_by uuid
references hr.persons(id) on delete set null;

alter table hr.employees
add column deleted_by uuid
references hr.persons(id) on delete set null;


create trigger trg_hr_employees_audit_updated
before update on hr.employees
for each row
execute function system.set_audit_on_update();



alter table hr.educations
add column created_at timestamptz default now();

alter table hr.educations
add column updated_at timestamptz;

alter table hr.educations
add column deleted_at timestamptz;

alter table hr.educations
add column created_by uuid
default system.current_user_id()
references hr.persons(id) on delete set null;

alter table hr.educations
add column updated_by uuid
references hr.persons(id) on delete set null;

alter table hr.educations
add column deleted_by uuid
references hr.persons(id) on delete set null;


create trigger trg_hr_educations_audit_updated
before update on hr.educations
for each row
execute function system.set_audit_on_update();


alter table hr.employee_posts
add column created_at timestamptz default now();

alter table hr.employee_posts
add column updated_at timestamptz;

alter table hr.employee_posts
add column deleted_at timestamptz;

alter table hr.employee_posts
add column created_by uuid
default system.current_user_id()
references hr.persons(id) on delete set null;

alter table hr.employee_posts
add column updated_by uuid
references hr.persons(id) on delete set null;

alter table hr.employee_posts
add column deleted_by uuid
references hr.persons(id) on delete set null;


create trigger trg_hr_employee_posts_audit_updated
before update on hr.employee_posts
for each row
execute function system.set_audit_on_update();


alter table hr.employee_post_history
add column created_at timestamptz default now();

alter table hr.employee_post_history
add column updated_at timestamptz;

alter table hr.employee_post_history
add column deleted_at timestamptz;

alter table hr.employee_post_history
add column created_by uuid
default system.current_user_id()
references hr.persons(id) on delete set null;

alter table hr.employee_post_history
add column updated_by uuid
references hr.persons(id) on delete set null;

alter table hr.employee_post_history
add column deleted_by uuid
references hr.persons(id) on delete set null;


create trigger trg_hr_employee_post_history_audit_updated
before update on hr.employee_post_history
for each row
execute function system.set_audit_on_update();


alter table hr.employee_titles
add column created_at timestamptz default now();

alter table hr.employee_titles
add column updated_at timestamptz;

alter table hr.employee_titles
add column deleted_at timestamptz;

alter table hr.employee_titles
add column created_by uuid
default system.current_user_id()
references hr.persons(id) on delete set null;

alter table hr.employee_titles
add column updated_by uuid
references hr.persons(id) on delete set null;

alter table hr.employee_titles
add column deleted_by uuid
references hr.persons(id) on delete set null;


create trigger trg_hr_employee_titles_audit_updated
before update on hr.employee_titles
for each row
execute function system.set_audit_on_update();



