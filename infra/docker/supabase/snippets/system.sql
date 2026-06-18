create table public.command_center_summary (
  id text primary key default 'global',
  advancing_count int not null default 0,
  assembly_count int not null default 0,
  stopped_count int not null default 0,
  fault_count int not null default 0,
  today_ring_count int not null default 0,
  today_advance_meter numeric not null default 0,
  project_count int not null default 0,
  tunnel_count int not null default 0,
  tbm_count int not null default 0,
  warning_high_count int not null default 0,
  warning_medium_count int not null default 0,
  warning_low_count int not null default 0,
  updated_at timestamptz not null default now()
);

create or replace view dashboard.v_command_center_summary as
select
  -- 设备状态
  count(*) filter (
    where
      p.phase_type = 'advance'
  ) as advancing_count,
  count(*) filter (
    where
      p.phase_type = 'assembly'
  ) as assembly_count,
  count(*) filter (
    where
      p.phase_type = 'stop'
  ) as stopped_count,
  count(*) filter (
    where
      p.phase_type = 'fault'
  ) as stopped_count,
  count(*) filter (
    where
      c.type = 'realdata'
      and c.is_online = false
  ) as offline_count,
  -- 项目概况
  (
    select
      count(*)
    from
      proj.projects
    where
      deleted_at is null
      and status
  ) as project_count,
  (
    select
      count(*)
    from
      proj.tunnels
    where
      deleted_at is null
  ) as tunnel_count,
  (
    select
      count(*)
    from
      eqp.tbms
    where
      deleted_at is null
  ) as tbm_count,
  now() as refreshed_at
from
  eqp.tbms t
  left join eqp.tbm_connection_status c on c.tbm_id = t.id
  left join eqp.tbm_phase_active p on p.tbm_id = t.id
where
  t.deleted_at is null;

create or replace view dashboard.v_command_center_summary as
with
  active_projects as (
    select distinct
      pst.project_id
    from
      proj.project_status_timeline pst
    where
      pst.valid_to is null
      and pst.project_sub_status_id = (
        select
          md.id
        from
          public.master_data md
          join public.master_definitions def on def.id = md.definition_id
        where
          def.code = 'PROJECT_SUB_STATUS'
          and md.code = 'UNDER_CONSTRUCTION'
        limit
          1
      )
  ),
  active_assignments as (
    select distinct
      ta.tbm_id,
      ta.tunnel_id
    from
      eqp.tbm_assignments ta
    where
      ta.end_date is null
  )
select
  -- 设备运行状态
  coalesce(
    (
      select
        count(*)
      from
        eqp.tbm_phase_active p
      where
        p.phase_type = 'advance'
    ),
    0
  ) as advancing_count,
  coalesce(
    (
      select
        count(*)
      from
        eqp.tbm_phase_active p
      where
        p.phase_type = 'assembly'
    ),
    0
  ) as assembly_count,
  coalesce(
    (
      select
        count(*)
      from
        eqp.tbm_phase_active p
      where
        p.phase_type = 'stop'
    ),
    0
  ) as stopped_count,
  coalesce(
    (
      select
        count(*)
      from
        eqp.tbm_phase_active p
      where
        p.phase_type = 'fault'
    ),
    0
  ) as fault_count,
  coalesce(
    (
      select
        count(distinct c.tbm_id)
      from
        eqp.tbm_connection_status c
      where
        c.type = 'realdata'
        and c.is_online = false
    ),
    0
  ) as offline_count
  -- 项目概况
  coalesce(
    (
      select
        count(*)
      from
        active_projects
    ),
    0
  ) as project_count,
  coalesce(
    (
      select
        count(distinct aa.tunnel_id)
      from
        active_assignments aa
        join proj.tunnels tn on tn.id = aa.tunnel_id
        join active_projects ap on ap.project_id = tn.project_id
      where
        tn.deleted_at is null
    ),
    0
  ) as tunnel_count,
  coalesce(
    (
      select
        count(distinct aa.tbm_id)
      from
        active_assignments aa
        join proj.tunnels tn on tn.id = aa.tunnel_id
        join active_projects ap on ap.project_id = tn.project_id
        join eqp.tbms t on t.id = aa.tbm_id
      where
        tn.deleted_at is null
        and t.deleted_at is null
    ),
    0
  ) as tbm_count,
  now() as refreshed_at;


create table system.stat_period_settings (
    id uuid primary key default gen_random_uuid(),

    code text not null,

    day_cutoff_time time not null default '19:00',

    week_start_dow smallint not null default 6,

    month_start_day smallint not null default 26,

    timezone text not null default 'Asia/Shanghai',

    effective_from date not null,

    effective_to date,

    created_at timestamptz not null default now(),

    unique(code, effective_from)
);


select column_default
from information_schema.columns
where table_schema='eqp' 
  and table_name='tbm_runtime_parameters'
  and column_name='is_chartable';


UPDATE eqp.tbm_runtime_parameters
SET is_chartable = true
WHERE code LIKE 's%';



insert into system.menus (
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order
)
values
(
  'workspace',
  'WorkspaceManagement',
  '工作区管理',
  'workspace',
  '/workspace',
  'HardHat',
  4
);

insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order
)
select
  parent.id,
  child.code,
  child.name,
  child.label,
  child.node_key,
  child.path_url,
  child.icon,
  child.sort_order
from system.menus parent
cross join (
  values
    (
  'workspace.command_center',
  'command_center',
  '指挥中心',
  'command_center',
  '/workspace/command-center',
  'Building2',
  1
  ),
   (
  'workspace.tunnels',
  'tunnels',
  '隧道工作台',
  'tunnels',
  '/workspace/tunnels',
  'Building2',
  1
  ),
  (
  'workspace.tbms',
  'tbms',
  '盾构机工作台',
  'tbms',
  '/workspace/tbms',
  'Building2',
  1
  )
  ) as child(
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order
  )
where parent.code = 'workspace';


select
  id,
  parent_id,
  name
from hr.organizations
where id = '4c6a49fe-ffcd-4248-bd59-0aa4b57609c2';

select
    conname,
    pg_get_constraintdef(oid)
from pg_constraint
where conrelid = 'hr.organizations'::regclass;

NOTIFY pgrst, 'reload schema';


create table public.stat_period_settings (
    id uuid primary key default gen_random_uuid(),

    code text not null,

    day_cutoff_time time not null default '19:00',

    week_start_dow smallint not null default 6,

    month_start_day smallint not null default 26,

    timezone text not null default 'Asia/Shanghai',

    effective_from date not null,

    effective_to date,

    created_at timestamptz not null default now(),

    unique(code, effective_from)
);

insert into public.stat_period_settings (
    code,
    effective_from
)
values (
    'tunnel_progress',
    '2025-01-01'
);