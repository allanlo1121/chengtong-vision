create table public.user_favorite_projects (
  user_id uuid references public.employees(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  sort_order int default 0,
  primary key (user_id, project_id)
);