create table public.user_favorite_projects (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references hr.persons(id) on delete cascade,

  project_id uuid not null
    references public.projects(id) on delete cascade,

  sort_order int not null default 0,

  created_at timestamptz default now(),

  unique (user_id, project_id)

);
