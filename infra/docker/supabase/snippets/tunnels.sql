drop table tunnels cascade;
create table public.tunnels (
  id uuid primary key default gen_random_uuid(),

  -- 关联项目
  project_id uuid not null
    references public.projects(id)
    on delete cascade,

  -- 项目分册 / 标段（可选）
--   project_catalog_id uuid
--     references public.project_catalogs(id)
--     on delete set null,

  -- 基本信息
  name text not null,
  full_name text,
  prefix text, --  里程信息前缀 DK

  -- 里程信息
  start_stake text,
  end_stake text,
  start_chainage numeric,
  end_chainage numeric,

  --进度信息时间
  actual_start_date      DATE,                                       -- 实际开工日期
  actual_end_date        DATE,                                       -- 实际竣工日期

  -- 地质
  geology text,

  -- 坐标
  longitude numeric(10, 6),
  latitude numeric(10, 6),

  sort_order int default 0,

  -- 备注
  remark text


);


drop view v_tunnel_list cascade;

create or replace view public.v_tunnel_list as
select
  t.id,

  t.project_id,
  p.name as project_name,
  p.organization_id,
  o.name as organization_name,

  t.name,
  t.full_name,
  t.prefix,

  t.start_stake,
  t.end_stake,
  t.start_chainage,
  t.end_chainage,

  t.actual_start_date,
  t.actual_end_date,

  sv.schedule_start_date,
  sv.schedule_end_date,
  t.geology,
  t.longitude,
  t.latitude,
  t.sort_order,
  t.remark,

  ps.tunnel_status_id,
  s.name as tunnel_status_name

from public.tunnels t

left join public.projects p
  on p.id = t.project_id

left join public.organizations o
  on o.id = p.organization_id
 and o.deleted_at is null

left join public.tunnel_status_timeline ps
  on ps.tunnel_id = t.id
 and ps.valid_to is null

left join public.tunnel_schedule_versions sv
  on sv.tunnel_id = t.id
 and sv.is_current = true

left join public.master_data s
  on s.id = ps.tunnel_status_id;


  select definition
from pg_views
where definition ilike '%effective_from%';


select
  n.nspname as schema_name,
  p.proname,
  pg_get_functiondef(p.oid)
from pg_proc p
join pg_namespace n
  on n.oid = p.pronamespace
where p.prokind = 'f'
  and pg_get_functiondef(p.oid)
    ilike '%effective_from%';

  .select(`
  *,
  tunnel_schedule_versions(*)
`)

select
  schemaname,
  viewname,
  definition
from pg_views
where definition ilike '%effective_from%';

select
  table_name,
  column_name,
  generation_expression
from information_schema.columns
where generation_expression
  ilike '%effective_from%';

  select
  indexname,
  indexdef
from pg_indexes
where indexdef
  ilike '%effective_from%';



drop table public.tunnel_daily_progress cascade;

create table public.tunnel_daily_progress (
  id uuid primary key default gen_random_uuid(),

  tunnel_id uuid not null references proj.tunnels(id),
  tbm_id uuid references eqp.tbms(id),

  work_date date not null,

  ring_end integer not null,
  chainage_end numeric,

  plan_ring_count integer,

  remark text,

  unique (tunnel_id, work_date)
);



drop view public.v_tunnel_daily_progress cascade;
create or replace view public.v_tunnel_daily_progress as
select
  p.id,
  p.tunnel_id,
  p.tbm_id,
  p.work_date,

  lag(p.ring_end) over (
    partition by p.tunnel_id
    order by p.work_date
  ) as ring_start,

  p.ring_end,

  p.chainage_end,

  lag(p.chainage_end) over (
    partition by p.tunnel_id
    order by p.work_date
  ) as chainage_start,

  p.plan_ring_count

from public.tunnel_daily_progress p;





drop table eqp.tbm_phase_active cascade;
create table eqp.tbm_phase_active (
  id uuid primary key default gen_random_uuid(),
  
  tbm_id uuid not null,
  tunnel_id uuid,

  ring_no integer not null,

  phase_type text not null check (
    phase_type in ('advance', 'assembly', 'stop', 'fault')
  ),

  start_at timestamptz not null,

  source text not null default 'auto',
  remark text,

  unique (tunnel_id, phase_type)
);


create table eqp.tbm_phase_records (
  id uuid primary key default gen_random_uuid(),

  tunnel_id uuid,
  tbm_id uuid not null,

  ring_no integer not null,

  phase_type text not null check (
    phase_type in ('advance', 'assembly', 'stop','fault')
  ),

  start_at timestamptz not null,
  end_at timestamptz not null,

  source text not null default 'auto' check (
    source in ('auto', 'manual', 'corrected')
  ),

  remark text,


  constraint tbm_phase_time_check
    check (end_at > start_at)
);

create index idx_tbm_phase
on eqp.tbm_phase_records (tbm_id, ring_no);

create index idx_tbm_phase_time
on eqp.tbm_phase_records (tbm_id, start_at, end_at);