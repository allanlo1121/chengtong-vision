


--岗位
create table hr.employee_positions (
  id uuid primary key default gen_random_uuid(),

  employee_id uuid not null,
  
  is_primary boolean default false, -- 是否主岗
  post_id uuid not null references public.master_data(id) on delete set null,

  organization_id uuid references public.organizations(id) on delete set null,

  start_date date,
  end_date date,


  constraint fk_post_employee
    foreign key (employee_id) references hr.employees(id) on delete cascade,

  constraint uq_employee_post
    unique (employee_id, post_id, organization_id)
);

-- 每人仅一个主岗（关键约束）
create unique index if not exists uq_employee_primary_position
on hr.employee_positions(employee_id)
where is_primary = true;

create index idx_employee_positions_current
on hr.employee_positions(employee_id)
where end_date is null;

create index idx_employee_positions_org
on hr.employee_positions(organization_id)
where end_date is null;
