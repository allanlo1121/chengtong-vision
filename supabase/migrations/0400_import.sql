


create table public.import_records (
  id uuid primary key default gen_random_uuid(),

  entity_type text not null,
  entity_id uuid,

  external_id text,
  external_source text default 'import',

  status text not null, -- success / failed

  import_json jsonb,
  mapped_json jsonb,
  error_json jsonb,

  round int,

  created_at timestamptz default now()
);