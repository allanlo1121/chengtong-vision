create table project_schedule_versions (
  id uuid primary key default gen_random_uuid(),

  project_id uuid not null references projects(id),

  version_no int not null,   -- 1,2,3...

  -- 只放会“业务调整”的
  schedule_start_date date,
  schedule_end_date date,
  commissioning_date date,

  effective_from timestamptz not null,
  effective_to timestamptz,

  is_current boolean default true,

  -- 变更信息
  change_reason text,
  source text,
  remark text
);


alter table project_schedule_versions
add constraint no_overlap_schedule_version
exclude using gist (
  project_id with =,
  tstzrange(effective_from, coalesce(effective_to, 'infinity')) with &&
);


-- schedule
create index idx_schedule_current
on project_shedule_versions (project_id)
where is_current = true;