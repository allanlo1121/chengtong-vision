-- ==============================
-- 0400 ORGANIZATION TABLES
-- ==============================

create table public.organizations (
  id uuid primary key default gen_random_uuid(),

  parent_id uuid references public.organizations(id) on delete restrict,

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


