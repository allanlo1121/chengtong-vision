
create schema if not exists hr;

-- 允许 API 访问 schema
grant usage on schema hr to anon, authenticated, service_role;

-- 允许读取表
grant select on all tables in schema hr
to anon, authenticated, service_role;


create table hr.employees (
    id                  uuid primary key default gen_random_uuid(),

    auth_id uuid unique references auth.users(id) on delete set null,   

    name                text not null,
    code text unique not null,

    gender_id uuid  references master_data(id),

    birth_date date,
    id_card text,
    phone text,
    email text,
 
    employment_status_id uuid references master_data(id) on delete set null,
    employment_type_id uuid references master_data(id) on delete set null,

    hire_date           date,
    entry_date          date,
    leave_date          date,

    sort_order          int default 0,

    external_id           text, -- 外部系统 ID
    external_version        int,  -- 外部系统版本号（乐观锁）

    remark              text
);

