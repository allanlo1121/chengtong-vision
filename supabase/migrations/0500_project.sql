
create table public.projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  org_node_id uuid not null
    references public.organizations(id),

-- 软删除
deleted_at timestamptz,
deleted_by uuid references public.employees(id),

-- 审计字段
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid references public.employees(id) on delete set null,
  updated_by uuid references public.employees(id) on delete set null
);