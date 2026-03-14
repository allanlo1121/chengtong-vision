
create schema if not exists hr;

-- 允许 API 访问 schema（本地开发用）
grant usage on schema hr to service_role;

create table public.employees (
    -- 登录主体（= auth.users.id）
    id                  uuid primary key
                        references auth.users(id) on delete cascade,

    -- 员工基础标识
    code                text unique not null,   -- 工号 / 登录账号
    name                text not null,          -- 姓名

    -- 基础属性（主数据）
    gender_id           uuid references master_data(id),
    type_id             uuid references master_data(id),        -- 员工类型
    job_title_id        uuid references master_data(id),
    edu_level_id        uuid references master_data(id),

    -- 组织关系
    org_node_id uuid references organizations(id) on delete set null,

    -- 个人信息
    idcard              text,
    birthday            date,
    phone               text,
    email               text,
    major               text,
    work_start_date     date,



    -- 状态控制
    is_active           boolean default true,

    -- 入职/生效
    effect_at           timestamptz,

    -- 预留
    remark              text
);

create index idx_employees_org_node on public.employees(org_node_id);
create index idx_employees_active on public.employees(is_active);
create index idx_employees_job on public.employees(job_title_id);


create table hr.employee_assignments (
    id                  uuid primary key default gen_random_uuid(),

    employee_id         uuid not null
                        references public.employees(id) on delete cascade,

    org_node_id         uuid not null
                        references public.organizations(id),

    job_title_id        uuid references master_data(id),

    start_at            timestamptz not null,
    end_at              timestamptz,

    change_reason       text,
    changed_by          uuid references public.employees(id)  on delete set null,

    created_at          timestamptz default now(),

    constraint chk_time_valid
        check (end_at is null or end_at > start_at)
);

create unique index uniq_employee_current_org
on hr.employee_assignments(employee_id)
where end_at is null;

create table public.employee_org_access (
  employee_id uuid references public.employees(id),
  org_id uuid references public.organizations(id),
  primary key (employee_id, org_id)
);

