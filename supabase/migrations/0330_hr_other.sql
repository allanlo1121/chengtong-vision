
--学历专业
create table public.educations (
  id uuid primary key default gen_random_uuid(),

  person_id uuid not null ,

  degree_id uuid references public.master_data(id) on delete set null,  -- 学历层次
  school text,

  major_id uuid references public.master_data(id) on delete set null,   -- 学历专业

  start_date date,
  end_date date,


  constraint fk_education_person
    foreign key (person_id) references public.persons(id) on delete cascade
);

--岗位
create table public.employee_posts (
  id uuid primary key default gen_random_uuid(),

  employee_id uuid not null,
  post_id uuid not null references public.master_data(id) on delete set null,

  organization_id uuid,


  constraint fk_post_employee
    foreign key (employee_id) references public.employees(id) on delete cascade,

  constraint uq_employee_post
    unique (employee_id, post_id, organization_id)
);

--岗位历史
create table public.employee_post_history (
  id uuid primary key default gen_random_uuid(),

  employee_id uuid not null,
  post_id uuid not null references public.master_data(id) on delete set null,

  organization_id uuid,

  start_date date not null,
  end_date date,

  constraint fk_post_history_employee
    foreign key (employee_id) references public.employees(id) on delete cascade
);

--职称
create table public.employee_titles (
  id uuid primary key default gen_random_uuid(),

  employee_id uuid not null,
  title_id uuid not null,

  obtained_date date,


  constraint fk_title_employee
    foreign key (employee_id) references public.employees(id) on delete cascade
);

create or replace function public.sync_employee_post_history()
returns trigger as $$
begin

  -- 1️⃣ INSERT（新增岗位）
  if (tg_op = 'INSERT') then

    insert into public.employee_post_history (
      employee_id,
      post_id,
      organization_id,
      start_date
    )
    values (
      new.employee_id,
      new.post_id,
      new.organization_id,
      current_date
    );

    return new;
  end if;


  -- 2️⃣ DELETE（岗位结束）
  if (tg_op = 'DELETE') then

    update public.employee_post_history
    set end_date = current_date
    where employee_id = old.employee_id
      and post_id = old.post_id
      and end_date is null;

    return old;
  end if;


  return null;
end;
$$ language plpgsql;


create trigger trg_employee_post_history_insert
after insert on public.employee_posts
for each row
execute function public.sync_employee_post_history();

create trigger trg_employee_post_history_delete
after delete on public.employee_posts
for each row
execute function public.sync_employee_post_history();