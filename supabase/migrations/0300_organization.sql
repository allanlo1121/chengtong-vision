-- ==============================
-- 0400 ORGANIZATION TABLES
-- ==============================

create table public.organizations (
  id uuid primary key default gen_random_uuid(),

  parent_id uuid references public.organizations(id) on delete restrict,
  path ltree, -- 可选（建议开启 ltree 扩展）
  level int not null default 0,

  code text not null unique,
  name text not null,
  fullname text,
  description text,

  sort_order integer default 0,

  org_type_id uuid not null references public.master_data(id),
  business_id uuid  references public.master_data(id),


  region_id uuid not null references public.master_data(id),
  country_code text not null default 'CN' references public.countries(code),
  admin_region_code text references admin_regions(code),
  address text,
  latitude numeric(10,6),
  longitude numeric(10,6),

  is_active boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  deleted_at timestamptz,
  deleted_by uuid references auth.users(id) on delete set null,

  check (latitude between -90 and 90),
  check (longitude between -180 and 180)
);


create index idx_organizations_parent
on public.organizations(parent_id);
create index idx_org_path on public.organizations using gist(path);

create table public.employee_org_access (
  employee_id uuid references public.employees(id),
  org_id uuid references public.organizations(id),
  primary key (employee_id, org_id)
);

-- =====================================================
-- 组织树查询函数
-- =====================================================
create or replace function public.fn_organizations_tree()
returns table (
  id uuid,
  name text,
  parent_id uuid,
  is_active boolean,
  level int
)
language sql
as $$
with recursive org_tree as (
  select
    o.id,
    o.name,
    o.parent_id,
    o.is_active,
    1 as level
  from organizations o
  where o.parent_id is null
    and o.deleted_at is null

  union all

  select
    c.id,
    c.name,
    c.parent_id,
    c.is_active,
    p.level + 1
  from organizations c
  join org_tree p on c.parent_id = p.id
  where c.deleted_at is null
)
select * from org_tree
order by level;
$$;