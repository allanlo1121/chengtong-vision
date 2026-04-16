

create table project_status_timeline(
  id uuid primary key default gen_random_uuid(),

  -- 🔥 通用对象
  project_id uuid not null,

  -- 状态
  project_status_id uuid references master_data(id),
  project_sub_status_id uuid references master_data(id),

  -- ✅ 业务时间（核心）
  valid_from timestamptz not null,
  valid_to timestamptz,


  -- 来源 
  change_type text,   -- normal / correction / auto

  -- 备注
  remark text
);

alter table project_status_timeline
add constraint no_overlap
exclude using gist (
  project_id with =,
  tstzrange(valid_from, coalesce(valid_to, 'infinity')) with &&
);

create table project_risk_levle_timeline(
  id uuid primary key default gen_random_uuid(),

  -- 🔥 通用对象
  project_id uuid not null,

  -- 状态
  project_risk_levle_id uuid references master_data(id),
  project_sub_risk_levle_id uuid references master_data(id),

  -- ✅ 业务时间（核心）
  valid_from timestamptz not null,
  valid_to timestamptz,


  -- 来源 
  change_type text,   -- normal / correction / auto

  -- 备注
  remark text
);

alter table project_risk_levle_timeline
add constraint no_overlap
exclude using gist (
  project_id with =,
  tstzrange(valid_from, coalesce(valid_to, 'infinity')) with &&
);

create table project_control_level_timeline(
  id uuid primary key default gen_random_uuid(),

  -- 🔥 通用对象
  project_id uuid not null,

  -- 状态
  project_control_level_id uuid references master_data(id),
  project_sub_control_level_id uuid references master_data(id),

  -- ✅ 业务时间（核心）
  valid_from timestamptz not null,
  valid_to timestamptz,


  -- 来源 
  change_type text,   -- normal / correction / auto

  -- 备注
  remark text
);

alter table project_control_level_timeline
add constraint no_overlap
exclude using gist (
  project_id with =,
  tstzrange(valid_from, coalesce(valid_to, 'infinity')) with &&
);

create table project_attention_level_timeline(
  id uuid primary key default gen_random_uuid(),

  -- 🔥 通用对象
  project_id uuid not null,

  -- 状态
  project_attention_level_id uuid references master_data(id),
  project_sub_attention_level_id uuid references master_data(id),

  -- ✅ 业务时间（核心）
  valid_from timestamptz not null,
  valid_to timestamptz,


  -- 来源 
  change_type text,   -- normal / correction / auto

  -- 备注
  remark text
);

alter table project_attention_level_timeline
add constraint no_overlap
exclude using gist (
  project_id with =,
  tstzrange(valid_from, coalesce(valid_to, 'infinity')) with &&
);


create table project_attention_type_timeline (
  id uuid primary key default gen_random_uuid(),

  project_id uuid not null references projects(id),

  attention_type_id uuid not null references master_data(id),

  -- 时间区间
  valid_from timestamptz not null,
  valid_to timestamptz,

  -- 来源
  source text,
  change_type text default 'normal'
);

alter table project_attention_type_timeline
add constraint no_overlap_same_type
exclude using gist (
  project_id with =,
  attention_type_id with =,
  tstzrange(valid_from, coalesce(valid_to, 'infinity')) with &&
);



create table public.project_leader_timeline(
  id uuid primary key default gen_random_uuid(),

  project_id uuid not null
    references projects(id) on delete cascade,

  employee_id uuid not null
    references hr.employees(id),

  leader_role_id uuid not null
    references master_data(id),

  -- 业务时间（核心）
  valid_from timestamptz not null,
  valid_to timestamptz,

  -- 来源
  source text,
  change_type text default 'normal'


);


alter table public.project_leader_timeline
add constraint no_overlap_project_leader
exclude using gist (
  project_id with =,
  leader_role_id with =,
  tstzrange(valid_from, coalesce(valid_to, 'infinity')) with &&
);

-- timeline
create index idx_leader_current
on project_leader_timeline (project_id)
where valid_to is null;