-- ==============================
-- 0400 ORGANIZATION TABLES
-- ==============================

create table public.organizations (
  id uuid primary key default gen_random_uuid(),

  parent_id uuid references public.organizations(id) on delete restrict,
  node_key text not null unique,
  path ltree not null, -- 可选（建议开启 ltree 扩展）
  level int generated always as (nlevel(path)) stored,

  code text not null unique,
  name text not null,
  full_name text,
  description text,

  sort_order integer default 0,

  org_type_id uuid not null references public.master_data(id),
  business_id uuid  references public.master_data(id),
  
  country_code text references public.countries(code),
  province_code text references public.admin_regions(code),
  city_code text references public.admin_regions(code),
  district_code text references public.admin_regions(code),
  address text,
  latitude numeric(10,6),
  longitude numeric(10,6),

  is_active boolean default true,

  check (latitude between -90 and 90),
  check (longitude between -180 and 180),
  check (id <> parent_id)
);


create index idx_organizations_parent
on public.organizations(parent_id);

create index idx_org_path on public.organizations using gist(path);





