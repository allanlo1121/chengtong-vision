-- ==============================
-- 0200 MASTER TABLES
-- ==============================

create table public.master_definitions (
  id uuid  primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  is_disabled boolean not null default false,
  
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  deleted_at timestamptz,
  deleted_by uuid references auth.users(id) on delete set null

) TABLESPACE pg_default;



create table public.master_data (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  definition_id uuid not null references master_definitions(id) on delete restrict,
  name text not null,
  description text null,

  is_disabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  deleted_at timestamptz,
  deleted_by uuid references auth.users(id) on delete set null,

  constraint uq_master_data_def_code 
      unique (definition_id, code)

) TABLESPACE pg_default;


create index idx_master_data_definition
on public.master_data(definition_id);

create index idx_master_data_deleted
on public.master_data(deleted_at);


create table public.countries (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,  -- ISO alpha-2

  name text not null,
  english_name text,
  alpha3_code text unique,
  numeric_code text unique,

  sort_order integer not null default 0,
  is_disabled boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz
);




create table public.admin_regions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,  -- 国家统计局编码

  name text not null,
  short_name text,
  full_name text,

  level integer not null,
  parent_code text references public.admin_regions(code) on delete restrict,

  pinyin_code text,

  sort_order integer not null default 0,
  is_disabled boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create view public.v_master_options as
select
  d.id,
  d.code,
  d.name,
  d.description,
  d.is_disabled,
  def.id as definition_id,
  def.code as definition_code,
  def.name as definition_name
from public.master_data d
join public.master_definitions def
  on d.definition_id = def.id
where d.is_disabled = false
  and d.deleted_at is null;