-- ================================
-- 01_extensions.sql
-- ================================

create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;
create extension if not exists btree_gin;


-- ==============================
-- 02 COMMON FUNCTIONS
-- ==============================

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ==============================
-- 03 MASTER TABLES
-- ==============================

create table public.master_definitions (
  id uuid  primary key default uuid_generate_v4(),
  key text not null unique,
  name text not null,
  description text,
  is_disabled boolean not null default false,
  
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid,
  updated_by uuid

) TABLESPACE pg_default;

create trigger trg_master_definitions_updated
before update on master_definitions
for each row execute function set_updated_at();

create table public.master_data (
  id uuid primary key default uuid_generate_v4(),
  code text not null,
  definition_id uuid not null references master_definitions(id) on delete restrict,
  name text not null,
  description text null,

  is_disabled boolean not null default false,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  created_by uuid,
  updated_by uuid,

  constraint uq_master_data_def_code 
      unique (definition_id, code)

) TABLESPACE pg_default;

create trigger trg_master_data_updated
before update on master_data
for each row execute function set_updated_at();

-- ==============================
-- 04 ORGANIZATION STRUCTURE
-- ==============================

-- ==============================
-- 05 TBM STRUCTURE
-- ==============================

-- ==============================
-- 06 RUNTIME DATA TABLES
-- ==============================