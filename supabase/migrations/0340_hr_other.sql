
--学历专业
create table hr.educations (
  id uuid primary key default gen_random_uuid(),

  person_id uuid not null ,

  degree_id uuid references public.master_data(id) on delete set null,  -- 学历层次
  school text,

  major_id uuid references public.master_data(id) on delete set null,   -- 学历专业

  start_date date,
  end_date date,


  constraint fk_education_person
    foreign key (person_id) references hr.persons(id) on delete cascade
);

--岗位
create table hr.employee_posts (
  id uuid primary key default gen_random_uuid(),

  employee_id uuid not null,
  post_type_id uuid references public.master_data(id) on delete set null, -- 岗位类型
  is_primary boolean default false, -- 是否主岗
  post_id uuid not null references public.master_data(id) on delete set null,

  organization_id uuid references public.organizations(id) on delete set null,

  start_date date,
  end_date date,


  constraint fk_post_employee
    foreign key (employee_id) references hr.employees(id) on delete cascade,

  constraint uq_employee_post
    unique (employee_id, post_id, organization_id,post_type_id)
);

-- 每人仅一个主岗（关键约束）
create unique index if not exists uq_employee_primary_post
on hr.employee_posts(employee_id)
where is_primary = true;

--岗位历史
create table hr.employee_post_history (
  id uuid primary key default gen_random_uuid(),

  employee_id uuid not null,
  post_type_id uuid references public.master_data(id) on delete set null, -- 岗位类型
  post_id uuid not null references public.master_data(id) on delete set null,

  organization_id uuid references public.organizations(id) on delete set null,

  start_date date not null,
  end_date date,

  constraint fk_post_history_employee
    foreign key (employee_id) references hr.employees(id) on delete cascade
);

--职称
create table hr.employee_titles (
  id uuid primary key default gen_random_uuid(),

  employee_id uuid not null,
  title_id uuid not null,

  obtained_date date,


  constraint fk_title_employee
    foreign key (employee_id) references hr.employees(id) on delete cascade
);

