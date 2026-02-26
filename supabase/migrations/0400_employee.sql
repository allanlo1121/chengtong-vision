
create schema if not exists hr;

-- 允许 API 访问 schema（本地开发用）
grant usage on schema hr to service_role;

create table public.employees (
    -- 登录主体（= auth.users.id）
    id                  uuid primary key
                        references auth.users(id) on delete cascade,

    -- 员工基础标识
    code                varchar(100) unique not null,   -- 工号 / 登录账号
    name                varchar(100) not null,          -- 姓名

    -- 基础属性（主数据）
    gender_id           uuid references master_data(id),
    type_id             uuid references master_data(id),        -- 员工类型
    job_title_id        uuid references master_data(id),
    edu_level_id        uuid references master_data(id),

    -- 组织关系
    org_node_id uuid references organizations(id) on delete set null,

    -- 个人信息
    idcard              varchar(18),
    birthday            date,
    phone               varchar(50),
    email               varchar(100),
    major               varchar(100),
    work_start_date     date,



    -- 状态控制
    is_active           boolean default true,

    -- 入职/生效
    effect_at           timestamptz,

    -- 审计字段
    created_at          timestamptz default now(),
    updated_at          timestamptz,
    created_by          uuid references auth.users(id) on delete set null,
    updated_by          uuid references auth.users(id) on delete set null,
    deleted_at          timestamptz,
    deleted_by          uuid references auth.users(id) on delete set null,


    -- 预留
    remark              text
);

create index idx_employees_org_node on public.employees(org_node_id);
create index idx_employees_active on public.employees(is_active);
create index idx_employees_job on public.employees(job_title_id);




create table hr.employee_org_history (
    id                  uuid primary key default gen_random_uuid(),

    employee_id         uuid not null
                        references public.employees(id) on delete cascade,

    org_node_id         uuid not null
                        references public.organizations(id),

    job_title_id        uuid references master_data(id),

    start_at            timestamptz not null,
    end_at              timestamptz,

    change_reason       text,
    changed_by          uuid references auth.users(id) on delete set null,

    created_at          timestamptz default now(),

    constraint chk_time_valid
        check (end_at is null or end_at > start_at)
);

create unique index uniq_employee_current_org
on hr.employee_org_history(employee_id)
where end_at is null;

-- HR business functions

create or replace function hr.trg_employee_insert_init_history()
returns trigger as $$
begin

    insert into hr.employee_org_history (
        employee_id,
        org_node_id,
        job_title_id,
        start_at,
        change_reason,
        changed_by
    )
    values (
        new.id,
        new.org_node_id,
        new.job_title_id,
        coalesce(new.effect_at, now()),
        '入职初始化',
        new.created_by
    );

    return new;
end;
$$ language plpgsql;


create or replace function hr.trg_employee_org_change()
returns trigger as $$
begin

    -- 只有在组织或岗位发生变化时才处理
    if (new.org_node_id is distinct from old.org_node_id)
       or (new.job_title_id is distinct from old.job_title_id) then

        -- 关闭旧记录
        update hr.employee_org_history
        set end_at = now()
        where employee_id = old.id
          and end_at is null;

        -- 插入新记录
        insert into hr.employee_org_history (
            employee_id,
            org_node_id,
            job_title_id,
            start_at,
            change_reason,
            changed_by
        )
        values (
            old.id,
            new.org_node_id,
            new.job_title_id,
            now(),
            '组织或岗位变更',
            auth.uid()
        );

    end if;

    return new;
end;
$$ language plpgsql;

create trigger trg_employee_insert_init_history
after insert on public.employees
for each row
execute function hr.trg_employee_insert_init_history();


create trigger trg_employee_org_change
after update of org_node_id, job_title_id
on public.employees
for each row
execute function hr.trg_employee_org_change();