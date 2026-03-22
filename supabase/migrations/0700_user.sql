create table public.user_favorite_projects (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.employees(id) on delete cascade,

  project_id uuid not null
    references public.projects(id) on delete cascade,

  sort_order int not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz,
  deleted_at timestamptz,

  created_by uuid default system.current_user_id()
    references public.employees(id),

  updated_by uuid references public.employees(id),
  deleted_by uuid references public.employees(id)
);

create unique index uq_user_project_active
on public.user_favorite_projects(user_id, project_id)
where deleted_at is null;

create trigger trg_user_fav_update
before update on public.user_favorite_projects
for each row
execute function system.set_audit_on_update();