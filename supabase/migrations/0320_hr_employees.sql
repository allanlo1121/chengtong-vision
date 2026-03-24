
create schema if not exists hr;

-- 允许 API 访问 schema（本地开发用）
grant usage on schema hr to service_role;

create table hr.employees (
    -- 登录主体（= auth.users.id）
    id                  uuid primary key default gen_random_uuid(),

    person_id          uuid not null unique
                        references hr.persons(id) on delete cascade,
    -- 组织关系
    organization_id uuid references organizations(id) on delete set null,
    status_id uuid references master_data(id) on delete set null,
    employee_type_id uuid references master_data(id) on delete set null,
    job_title_id uuid references master_data(id) on delete set null,
    professional_title_id uuid references master_data(id) on delete set null,

    hire_date           date,
    entry_date          date,
    leave_date          date,

    remark              text
);

create index idx_employees_organization on hr.employees(organization_id);
create index idx_employees_job on hr.employees(job_title_id);



