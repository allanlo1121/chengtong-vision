-- ==============================
-- 0200 MASTER TABLES
-- ==============================

create table public.master_definitions (
  id uuid  primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  is_active boolean not null default true 

) TABLESPACE pg_default;



create table public.master_data (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  definition_id uuid not null references master_definitions(id) on delete restrict,
  name text not null,
  description text null,

  is_active boolean not null default true,

  constraint uq_master_data_def_code 
      unique (definition_id, code)

) TABLESPACE pg_default;


create index idx_master_data_definition
on public.master_data(definition_id);


create table public.countries (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,  -- ISO alpha-2

  name text not null,
  english_name text,
  alpha3_code text unique,
  numeric_code text unique,

  sort_order integer not null default 0,
  is_active boolean not null default true

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
  is_active boolean not null default true
);


create table hr.post_categories (
  code text primary key,
  name text not null
);

create table hr.post_scopes (
  code text primary key,
  name text not null
);

create table hr.org_type_scope_map (
  org_type_code text primary key
    references public.master_data(code)
    on delete cascade,

  scope_code text not null
    references hr.post_scopes(code)
    on delete restrict
);
alter table hr.org_type_scope_map
add constraint chk_org_type_only
check (
  exists (
    select 1
    from master_data md
    join master_definitions def
      on def.id = md.definition_id
    where md.code = org_type_code
      and def.code = 'ORG_TYPE'
  )
);

create table hr.posts (
  id uuid primary key default gen_random_uuid(),

  code text unique not null,     -- 原 master_data.code
  name text not null,            -- 原 master_data.name
  scope_code text not null
    references hr.post_scopes(code)
    on delete restrict,       -- 🔥 范围（10230001 集团公司 10230002 子公司 10230004 项目部 等）

  category_code  text  references hr.post_categories(code) on delete restrict,                 -- 可选：岗位类别（管理/技术/安全）
  grade int,                     -- 可选：级别（用于排序/层级）

  sort_order int not null default 0,   -- 用于自定义排序
  is_active boolean default true

);
