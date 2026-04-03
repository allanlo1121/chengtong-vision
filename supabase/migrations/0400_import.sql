
create table public.import_batches (
  id uuid primary key default gen_random_uuid(),

  table_name text not null,

  total_count int not null,
  inserted_count int default 0,
  updated_count int default 0,
  skipped_count int default 0,
  failed_count int default 0,

  status text not null default 'processing', -- processing / success / failed

  started_at timestamptz default now(),
  finished_at timestamptz
);

create table public.import_records (
  id uuid primary key default gen_random_uuid(),

  batch_id uuid references import_batches(id),

  table_name text,

  raw jsonb,
  data jsonb,

  external_version int,

  status text, -- inserted / updated / skipped / error
  message text

);