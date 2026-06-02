
create or replace view public.v_command_center_summary as
with active_projects as (
  select distinct pst.project_id
  from proj.project_status_timeline pst
  where pst.valid_to is null
    and pst.project_status_id = (
      select md.id
      from public.master_data md
      join public.master_definitions def
        on def.id = md.definition_id
      where def.code = 'PROJECT_STATUS'
        and md.code = '10200002'
      limit 1
    )
),

active_assignments as (
  select distinct
    ta.tbm_id,
    ta.tunnel_id
  from eqp.tbm_assignments ta
  where ta.end_date is null
)

select
  -- 设备运行状态
  coalesce((
    select count(*)
    from eqp.tbm_phase_active p
    where p.phase_type = 'advance'
  ), 0) as advancing_count,

  coalesce((
    select count(*)
    from eqp.tbm_phase_active p
    where p.phase_type = 'assembly'
  ), 0) as assembly_count,

  coalesce((
    select count(*)
    from eqp.tbm_phase_active p
    where p.phase_type = 'stop'
  ), 0) as stopped_count,

    coalesce((
    select count(*)
    from eqp.tbm_phase_active p
    where p.phase_type = 'fault'
  ), 0) as fault_count,

  coalesce((
  select count(distinct c.tbm_id)
  from eqp.tbm_connection_status c
  where c.type = 'realdata'
    and c.is_online = false
), 0) as offline_count,

  -- 项目概况
  coalesce((
    select count(*)
    from active_projects
  ), 0) as project_count,

  coalesce((
    select count(distinct aa.tunnel_id)
    from active_assignments aa
    join proj.tunnels tn
      on tn.id = aa.tunnel_id
    join active_projects ap
      on ap.project_id = tn.project_id
    where tn.deleted_at is null
  ), 0) as tunnel_count,

  coalesce((
    select count(distinct aa.tbm_id)
    from active_assignments aa
    join proj.tunnels tn
      on tn.id = aa.tunnel_id
    join active_projects ap
      on ap.project_id = tn.project_id
    join eqp.tbms t
      on t.id = aa.tbm_id
    where tn.deleted_at is null
      and t.deleted_at is null
  ), 0) as tbm_count,

  now() as refreshed_at;


alter publication supabase_realtime add table eqp.tbm_connection_status;
alter publication supabase_realtime add table eqp.tbm_phase_active;
alter publication supabase_realtime add table eqp.tbm_assignments;
alter publication supabase_realtime add table warning.warning_events;


create or replace view public.v_command_center_tunnel as
with current_tunnel_status as (
  select distinct on (tst.tunnel_id)
    tst.tunnel_id,
    tst.tunnel_status_id,
    md.code as tunnel_status_code,
    md.name as tunnel_status_name
  from proj.tunnel_status_timeline tst
  left join public.master_data md
    on md.id = tst.tunnel_status_id
  where tst.valid_to is null
  order by tst.tunnel_id, tst.valid_from desc
)

select
  tn.id as tunnel_id,
  tn.name as tunnel_name,

  cts.tunnel_status_id,
  cts.tunnel_status_code,
  cts.tunnel_status_name,

  p.id as project_id,
  p.name as project_name,

  tbm.id as tbm_id,
  tbm.name as tbm_name,
  tbm.code as tbm_code,

  tn.actual_start_date,
  tn.actual_end_date,

  tsv.schedule_start_date,
  tsv.schedule_end_date,

  phase.phase_type,
  phase.ring_no,  
  phase.start_at as phase_start_at,  
  
  conn.is_online,
  conn.last_seen_at as connection_last_seen_at,

  abs(tn.end_ring - tn.start_ring) as total_ring_count,
  coalesce(phase.ring_no, 0) as current_ring,
  tn.sort_order

from proj.tunnels tn

join proj.projects p
  on p.id = tn.project_id

left join lateral (
  select *
  from proj.tunnel_schedule_versions tsv
  where tsv.tunnel_id = tn.id
  order by tsv.version_no desc
  limit 1
) tsv on true


left join eqp.tbm_assignments ta
  on ta.tunnel_id = tn.id
 and ta.end_date is null

left join eqp.tbms tbm
  on tbm.id = ta.tbm_id
 and tbm.deleted_at is null

left join eqp.tbm_phase_active phase
  on phase.tbm_id = tbm.id
 and phase.tunnel_id = tn.id

left join eqp.tbm_connection_status conn
  on conn.tbm_id = tbm.id
 and conn.type = 'realdata'

left join current_tunnel_status cts
  on cts.tunnel_id = tn.id
where tn.deleted_at is null
  and p.deleted_at is null
  and coalesce(cts.tunnel_status_code, '') not in (
    '20160005', -- 竣工
    '20160006', -- 完工
    '20160007',
    '20160008'
  );


-- 隧道掘进当前\日\周\月进度总览视图
create or replace view public.v_tunnel_progress_overview as
with settings as (
  select *
  from system.stat_period_settings
  where code = 'tunnel_progress'
    and current_date >= effective_from
    and current_date < coalesce(effective_to, date '9999-12-31')
  order by effective_from desc
  limit 1
),

bounds as (
  select
    s.*,
    now() at time zone s.timezone as local_now,
    case
      when (now() at time zone s.timezone)::time >= s.day_cutoff_time
        then ((now() at time zone s.timezone)::date + 1)
      else (now() at time zone s.timezone)::date
    end as current_work_date
  from settings s
),

periods as (
  select
    current_work_date,
    current_work_date
      - (((extract(dow from current_work_date)::int - week_start_dow + 7) % 7))
      as week_start_work_date,
    case
      when extract(day from current_work_date)::int >= month_start_day
        then date_trunc('month', current_work_date)::date + (month_start_day - 1)
      else
        (date_trunc('month', current_work_date)::date - interval '1 month')::date
          + (month_start_day - 1)
    end as month_start_work_date
  from bounds
),

progress_base as (
  select
    tdp.tunnel_id,
    tdp.work_date,
    tdp.ring_end,
    tdp.chainage_end,

    greatest(
      tdp.ring_end
      - coalesce(
          lag(tdp.ring_end) over (
            partition by tdp.tunnel_id
            order by tdp.work_date
          ),
          tdp.ring_end
        ),
      0
    ) as daily_ring_count,

    abs(
      tdp.chainage_end
      - coalesce(
          lag(tdp.chainage_end) over (
            partition by tdp.tunnel_id
            order by tdp.work_date
          ),
          tdp.chainage_end
        )
    ) as daily_advance_meter

  from public.tunnel_daily_progress tdp
),

progress as (
  select
    pb.tunnel_id,
    max(pb.ring_end) as total_ring_end,

    coalesce(sum(pb.daily_ring_count) filter (
      where pb.work_date = p.current_work_date
    ), 0) as today_ring_count,

    coalesce(sum(pb.daily_ring_count) filter (
      where pb.work_date >= p.week_start_work_date
        and pb.work_date <= p.current_work_date
    ), 0) as week_ring_count,

    coalesce(sum(pb.daily_ring_count) filter (
      where pb.work_date >= p.month_start_work_date
        and pb.work_date <= p.current_work_date
    ), 0) as month_ring_count,

    coalesce(sum(pb.daily_advance_meter) filter (
      where pb.work_date = p.current_work_date
    ), 0) as today_advance_meter,

    coalesce(sum(pb.daily_advance_meter) filter (
      where pb.work_date >= p.week_start_work_date
        and pb.work_date <= p.current_work_date
    ), 0) as week_advance_meter,

    coalesce(sum(pb.daily_advance_meter) filter (
      where pb.work_date >= p.month_start_work_date
        and pb.work_date <= p.current_work_date
    ), 0) as month_advance_meter,

    coalesce(max(pb.ring_end), 0) as total_ring_count,
    coalesce(max(pb.chainage_end), 0) as total_advance_meter

  from progress_base pb
  cross join periods p
  group by pb.tunnel_id
),

current_tunnel_status as (
  select distinct on (tst.tunnel_id)
    tst.tunnel_id,
    tst.tunnel_status_id,
    md.code as tunnel_status_code,
    md.name as tunnel_status_name
  from proj.tunnel_status_timeline tst
  left join public.master_data md
    on md.id = tst.tunnel_status_id
  where tst.valid_to is null
  order by tst.tunnel_id, tst.valid_from desc
),

active_assignments as (
  select distinct on (ta.tunnel_id)
    ta.tunnel_id,
    ta.tbm_id,
    ta.start_date,
    ta.end_date
  from eqp.tbm_assignments ta
  where ta.end_date is null
  order by ta.tunnel_id, ta.start_date desc
)

select
  p.id as project_id,
  p.name as project_name,

  tn.id as tunnel_id,
  tn.name as tunnel_name,

  cts.tunnel_status_id,
  cts.tunnel_status_code,
  cts.tunnel_status_name,

  tbm.id as tbm_id,
  tbm.name as tbm_name,
  tbm.code as tbm_code,

  abs(tn.end_chainage - tn.start_chainage) as total_length_meter,
  abs(tn.end_ring - tn.start_ring) as total_ring_count,

  coalesce(pg.today_ring_count, 0) as today_ring_count,
  coalesce(pg.week_ring_count, 0) as week_ring_count,
  coalesce(pg.month_ring_count, 0) as month_ring_count,
  pg.total_ring_end as total_advance_ring_count,

  coalesce(pg.today_advance_meter, 0) as today_advance_meter,
  coalesce(pg.week_advance_meter, 0) as week_advance_meter,
  coalesce(pg.month_advance_meter, 0) as month_advance_meter,
  coalesce(pg.total_advance_meter, 0) as total_advance_meter,


  pds.current_work_date,
  pds.week_start_work_date,
  pds.month_start_work_date,

  tn.sort_order,
  now() as refreshed_at

from proj.tunnels tn
join proj.projects p
  on p.id = tn.project_id
cross join periods pds
left join current_tunnel_status cts
  on cts.tunnel_id = tn.id
left join active_assignments aa
  on aa.tunnel_id = tn.id
left join eqp.tbms tbm
  on tbm.id = aa.tbm_id
 and tbm.deleted_at is null
left join progress pg
  on pg.tunnel_id = tn.id
where tn.deleted_at is null
  and p.deleted_at is null
  and coalesce(cts.tunnel_status_code, '') not in (
    '20160005',
    '20160006',
    '20160007',
    '20160008'
  );