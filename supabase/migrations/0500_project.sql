
create table public.projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  org_node_id uuid not null
    references public.organizations(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);