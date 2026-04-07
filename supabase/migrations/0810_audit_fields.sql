
-- Add audit fields to master_definitions tables
alter table public.master_definitions
add column created_at timestamptz default now();

alter table public.master_definitions
add column updated_at timestamptz;


alter table public.master_definitions
add column created_by uuid
references hr.persons(id) on delete set null;

alter table public.master_definitions
add column updated_by uuid
references hr.persons(id) on delete set null;

-- Add audit fields to master_data tables
alter table public.master_data
add column created_at timestamptz default now();

alter table public.master_data
add column updated_at timestamptz;

alter table public.master_data
add column created_by uuid
references hr.persons(id) on delete set null;

alter table public.master_data
add column updated_by uuid
references hr.persons(id) on delete set null;

-- Add audit fields to countries
alter table public.countries
add column created_at timestamptz default now();

alter table public.countries
add column updated_at timestamptz;

alter table public.countries
add column created_by uuid
references hr.persons(id) on delete set null;

alter table public.countries
add column updated_by uuid
references hr.persons(id) on delete set null;

-- Add audit fields to admin_regions
alter table public.admin_regions
add column created_at timestamptz default now();

alter table public.admin_regions
add column updated_at timestamptz;

alter table public.admin_regions
add column created_by uuid
references hr.persons(id) on delete set null;

alter table public.admin_regions
add column updated_by uuid
references hr.persons(id) on delete set null;


--Add audit fields to hr.persons
alter table hr.persons
add column created_at timestamptz default now();

alter table hr.persons
add column updated_at timestamptz;

alter table hr.persons
add column deleted_at timestamptz;

alter table hr.persons
add column created_by uuid
references hr.persons(id) on delete set null;

alter table hr.persons
add column updated_by uuid
references hr.persons(id) on delete set null;

alter table hr.persons
add column deleted_by uuid
references hr.persons(id) on delete set null;

-- Add audit fields to organizations
alter table public.organizations
add column created_at timestamptz default now();

alter table public.organizations
add column updated_at timestamptz;

alter table public.organizations
add column deleted_at timestamptz;

alter table public.organizations
add column created_by uuid
references hr.persons(id) on delete set null;

alter table public.organizations
add column updated_by uuid
references hr.persons(id) on delete set null;

alter table public.organizations
add column deleted_by uuid
references hr.persons(id) on delete set null;


-- Add audit fields to employees
alter table hr.employees
add column created_at timestamptz default now();

alter table hr.employees
add column updated_at timestamptz;

alter table hr.employees
add column deleted_at timestamptz;

alter table hr.employees
add column created_by uuid
references hr.persons(id) on delete set null;

alter table hr.employees
add column updated_by uuid
references hr.persons(id) on delete set null;

alter table hr.employees
add column deleted_by uuid
references hr.persons(id) on delete set null;


-- Add audit fields to educations
alter table hr.educations
add column created_at timestamptz default now();

alter table hr.educations
add column updated_at timestamptz;

alter table hr.educations
add column deleted_at timestamptz;

alter table hr.educations
add column created_by uuid
references hr.persons(id) on delete set null;

alter table hr.educations
add column updated_by uuid
references hr.persons(id) on delete set null;

alter table hr.educations
add column deleted_by uuid
references hr.persons(id) on delete set null;

-- Add audit fields to employee_posts
alter table hr.employee_posts
add column created_at timestamptz default now();

alter table hr.employee_posts
add column updated_at timestamptz;

alter table hr.employee_posts
add column deleted_at timestamptz;

alter table hr.employee_posts
add column created_by uuid
references hr.persons(id) on delete set null;

alter table hr.employee_posts
add column updated_by uuid
references hr.persons(id) on delete set null;

alter table hr.employee_posts
add column deleted_by uuid
references hr.persons(id) on delete set null;

-- Add audit fields to employee_post_history
alter table hr.employee_post_history    
add column created_at timestamptz default now();

alter table hr.employee_post_history
add column updated_at timestamptz;

alter table hr.employee_post_history
add column deleted_at timestamptz;

alter table hr.employee_post_history
add column created_by uuid
references hr.persons(id) on delete set null;

alter table hr.employee_post_history
add column updated_by uuid
references hr.persons(id) on delete set null;

alter table hr.employee_post_history
add column deleted_by uuid
references hr.persons(id) on delete set null;

-- Add audit fields to employee_titles
alter table hr.employee_titles
add column created_at timestamptz default now();

alter table hr.employee_titles
add column updated_at timestamptz;

alter table hr.employee_titles
add column deleted_at timestamptz;

alter table hr.employee_titles
add column created_by uuid
references hr.persons(id) on delete set null;

alter table hr.employee_titles
add column updated_by uuid
references hr.persons(id) on delete set null;

alter table hr.employee_titles
add column deleted_by uuid
references hr.persons(id) on delete set null;

--Add aduit fields to Import_batches
alter table public.import_batches
add column created_at timestamptz default now();

alter table public.import_batches
add column updated_at timestamptz;

alter table public.import_batches
add column deleted_at timestamptz;

alter table public.import_batches
add column created_by uuid
references hr.persons(id) on delete set null;

alter table public.import_batches
add column updated_by uuid
references hr.persons(id) on delete set null;

alter table public.import_batches
add column deleted_by uuid
references hr.persons(id) on delete set null;

--Add audit fields to Import_records
alter table public.import_records
add column created_at timestamptz default now();

alter table public.import_records
add column updated_at timestamptz;

alter table public.import_records
add column deleted_at timestamptz;

alter table public.import_records
add column created_by uuid
references hr.persons(id) on delete set null;

alter table public.import_records
add column updated_by uuid
references hr.persons(id) on delete set null;

alter table public.import_records
add column deleted_by uuid
references hr.persons(id) on delete set null;

--- Add audit fields to projects
alter table public.projects
add column created_at timestamptz default now();

alter table public.projects
add column updated_at timestamptz;

alter table public.projects
add column deleted_at timestamptz;

alter table public.projects
add column created_by uuid
references hr.persons(id) on delete set null;

alter table public.projects
add column updated_by uuid
references hr.persons(id) on delete set null;

alter table public.projects
add column deleted_by uuid
references hr.persons(id) on delete set null;


--Add audit fields to audit_logs
alter table audit.logs
add column created_at timestamptz default now();


-- Add audit fields to permissions
alter table rbac.permissions
add column created_at timestamptz default now();

alter table rbac.permissions
add column updated_at timestamptz;


alter table rbac.permissions
add column created_by uuid
references hr.persons(id) on delete set null;

alter table rbac.permissions
add column updated_by uuid
references hr.persons(id) on delete set null;


-- Add audit fields to roles
alter table rbac.roles
add column created_at timestamptz default now();

alter table rbac.roles
add column updated_at timestamptz;

alter table rbac.roles
add column created_by uuid
references hr.persons(id) on delete set null;

alter table rbac.roles
add column updated_by uuid
references hr.persons(id) on delete set null;



-- Add audit fields to system.menus
alter table system.menus
add column created_at timestamptz default now();

alter table system.menus
add column updated_at timestamptz;


alter table system.menus
add column created_by uuid
references hr.persons(id) on delete set null;

alter table system.menus
add column updated_by uuid
references hr.persons(id) on delete set null;








