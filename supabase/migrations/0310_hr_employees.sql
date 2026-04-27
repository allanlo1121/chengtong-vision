


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
    
    organization_id uuid references public.organizations(id) on delete set null,
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

