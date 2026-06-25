
grant usage on schema app to anon;
grant usage on schema app to authenticated;

grant select on all tables in schema app to anon;
grant select on all tables in schema app to authenticated;

alter default privileges in schema app
grant select on tables to anon;

alter default privileges in schema app
grant select on tables to authenticated;

grant usage, select on all sequences in schema app to anon;
grant usage, select on all sequences in schema app to authenticated;

alter default privileges in schema app
grant usage, select on sequences to anon;

alter default privileges in schema app
grant usage, select on sequences to authenticated;

alter publication supabase_realtime add table proj.tunnels;
alter publication supabase_realtime add table proj.tunnel_status_timeline;
alter publication supabase_realtime add table tbm.tbm_connection_status;
alter publication supabase_realtime add table tbm.tbm_phase_active;
alter publication supabase_realtime add table tbm.tbm_assignments;


drop view app.v_tbm_progress_overview cascade;
create or replace view app.v_tbm_progress_overview as

with settings as (
  select *
  from public.stat_period_settings
  where code = 'tunnel_progress'
    and current_date >= effective_from
    and current_date < coalesce(effective_to, date '9999-12-31')
  order by effective_from desc
  limit 1
),

bounds as (
  select
    s.*,
    (now() at time zone s.timezone) as local_now,

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

-- =========================
-- 日汇总事实
-- =========================
daily as (
  select
    tbm_id,
    work_date,
    max(ring_end) as ring_end,
    max(chainage_end) as chainage_end
  from tbm.tbm_daily_progress
  group by tbm_id, work_date
),

-- =========================
-- 日增量计算
-- =========================
progress_base as (
  select
    d.*,

    greatest(
      d.ring_end - lag(d.ring_end) over (
        partition by d.tbm_id order by d.work_date
      ),
      0
    ) as daily_ring_count,

    greatest(
      d.chainage_end - lag(d.chainage_end) over (
        partition by d.tbm_id order by d.work_date
      ),
      0
    ) as daily_advance_meter

  from daily d
),

-- =========================
-- 计划（如果没有 plan 表，这里可以先留 NULL）
-- =========================
plan as (
  select
    tbm_id,
    work_date,

    0::numeric as plan_ring,
    0::numeric as plan_meter
  from tbm.tbm_daily_progress
  group by tbm_id, work_date
),

-- =========================
-- 核心聚合
-- =========================
progress as (
  select
    pb.tbm_id,

    -- ===== 实际累计 =====
    max(pb.ring_end) as total_ring_end,
    max(pb.chainage_end) as total_advance_meter,

    -- ===== 今日 =====
    sum(pb.daily_ring_count) filter (
      where pb.work_date = p.current_work_date
    ) as today_ring_count,

    sum(pb.daily_advance_meter) filter (
      where pb.work_date = p.current_work_date
    ) as today_advance_meter,

    -- ===== 周 =====
    sum(pb.daily_ring_count) filter (
      where pb.work_date between p.week_start_work_date and p.current_work_date
    ) as week_ring_count,

    sum(pb.daily_advance_meter) filter (
      where pb.work_date between p.week_start_work_date and p.current_work_date
    ) as week_advance_meter,

    -- ===== 月 =====
    sum(pb.daily_ring_count) filter (
      where pb.work_date between p.month_start_work_date and p.current_work_date
    ) as month_ring_count,

    sum(pb.daily_advance_meter) filter (
      where pb.work_date between p.month_start_work_date and p.current_work_date
    ) as month_advance_meter,

    -- =========================
    -- 计划值（占位，可替换 plan 表）
    -- =========================
    sum(pl.plan_ring) filter (
      where pb.work_date = p.current_work_date
    ) as today_plan_ring,

    sum(pl.plan_meter) filter (
      where pb.work_date = p.current_work_date
    ) as today_plan_meter,

    sum(pl.plan_ring) filter (
      where pb.work_date between p.week_start_work_date and p.current_work_date
    ) as week_plan_ring,

    sum(pl.plan_meter) filter (
      where pb.work_date between p.week_start_work_date and p.current_work_date
    ) as week_plan_meter,

    sum(pl.plan_ring) filter (
      where pb.work_date between p.month_start_work_date and p.current_work_date
    ) as month_plan_ring,

    sum(pl.plan_meter) filter (
      where pb.work_date between p.month_start_work_date and p.current_work_date
    ) as month_plan_meter

  from progress_base pb
  cross join periods p
  left join plan pl
    on pl.tbm_id = pb.tbm_id
   and pl.work_date = pb.work_date

  group by pb.tbm_id, p.current_work_date, p.week_start_work_date, p.month_start_work_date
)

select
  pg.*,

  p.current_work_date,
  p.week_start_work_date,
  p.month_start_work_date,

  -- =========================
  -- 平均值（工程常用）
  -- =========================
  case
    when (p.current_work_date - p.month_start_work_date + 1) > 0
    then pg.month_ring_count
      / (p.current_work_date - p.month_start_work_date + 1)
    else 0
  end as month_avg_ring_per_day,

  case
    when (p.current_work_date - p.month_start_work_date + 1) > 0
    then pg.month_advance_meter
      / (p.current_work_date - p.month_start_work_date + 1)
    else 0
  end as month_avg_meter_per_day,

  -- =========================
  -- 完成率（核心 KPI）
  -- =========================
  case
    when coalesce(pg.month_plan_ring, 0) > 0
    then pg.month_ring_count::float / pg.month_plan_ring
    else null
  end as month_progress_rate,

  case
    when coalesce(pg.week_plan_ring, 0) > 0
    then pg.week_ring_count::float / pg.week_plan_ring
    else null
  end as week_progress_rate,

  -- =========================
  -- 元信息
  -- =========================
  now() as refreshed_at

from progress pg
cross join periods p;



drop view app.v_tunnel_kpi cascade;

create or replace view app.v_tunnel_kpi as
select
  ta.tunnel_id,
  s.tbm_name,
  s.tbm_code,
  tr.tunnel_name,
  tr.project_name,
  tr.region_name,

  abs(tr.end_chainage-tr.start_chainage) as tunnel_length,
  abs(tr.end_ring-tr.start_ring) as tunnel_ring_count,

  tr.schedule_start_date,
  tr.schedule_end_date,
  tr.actual_start_date,
  tr.actual_end_date,

  tr.longitude,
  tr.latitude,
  tr.sort_order,
  tr.tunnel_status_name,

  -- =========================
  -- 状态
  -- =========================
  s.phase_type,
  s.heartbeat_is_online,
  s.realdata_is_online,

  -- =========================
  -- 当前进度（实时）
  -- =========================
  s.ring_no,
  s.chainage,

  -- =========================
  -- 进度指标（来自 overview）
  -- =========================
  p.today_ring_count,
  p.week_ring_count,
  p.month_ring_count,

  p.today_advance_meter,
  p.week_advance_meter,
  p.month_advance_meter,

  p.total_ring_end,
  p.total_advance_meter,

  -- =========================
  -- 计划（未来扩展）
  -- =========================
  p.today_plan_ring,
  p.week_plan_ring,
  p.month_plan_ring,

  -- =========================
  -- 在线状态综合
  -- =========================
  case
    when s.realdata_is_online = false then 'offline'
    when s.phase_type = 'fault' then 'fault'
    when s.phase_type = 'assembly' then 'assembly'
    when s.phase_type = 'advance' then 'advance'
    else 'stopped'
  end as status_kpi,

  now() as refreshed_at

from tbm.tbm_assignments ta

left join app.v_tunnel_runtime tr
  on tr.tunnel_id = ta.tunnel_id

left join app.v_tbm_runtime_state s
  on s.tbm_id = ta.tbm_id

left join app.v_tbm_progress_overview p
  on p.tbm_id = ta.tbm_id;







drop view app.v_tbm_runtime_state cascade;

create or replace view app.v_tbm_runtime_state as

select
  ta.tbm_id,
  t.name as tbm_name,
  t.code as tbm_code,

  phase.phase_type,
  phase.ring_no,
  phase.chainage,
  phase.start_at as phase_start_at,  
  
  conn.is_online as realdata_is_online,
  conn.last_seen_at as realdata_last_seen_at,

  conn_heartbeat.is_online as heartbeat_is_online,
  conn_heartbeat.last_seen_at as heartbeat_last_seen_at


from  tbm.tbm_assignments ta

left join tbm.tbms t
  on t.id = ta.tbm_id

left join tbm.tbm_phase_active phase
  on phase.tbm_id = ta.tbm_id

left join tbm.tbm_connection_status conn
  on conn.tbm_id = ta.tbm_id
 and conn.type = 'realdata'

 left join tbm.tbm_connection_status conn_heartbeat
   on conn_heartbeat.tbm_id = ta.tbm_id
  and conn_heartbeat.type = 'heartbeat'

where ta.end_date is null;

drop view app.v_tbm_global_command_center_kpi cascade;
create or replace view  app.v_kpi_cockpit_global as
select

  -- =========================
  -- 结构维度
  -- =========================
  count(distinct project_id) as project_count,
  count(distinct tunnel_id) as tunnel_count,
  count(distinct tbm_id) as tbm_count,

  -- =========================
  -- 状态分布
  -- =========================
  count(*) filter (where phase_type = 'advance') as advancing_count,
  count(*) filter (where phase_type = 'assembly') as assembly_count,
  count(*) filter (where phase_type = 'stopped') as stopped_count,
  count(*) filter (where phase_type = 'fault') as fault_count,
  count(*) filter (where heartbeat_is_online = false) as offline_count,

  -- =========================
  -- 进度汇总
  -- =========================
  sum(today_ring_count) as today_ring,
  sum(week_ring_count) as week_ring,
  sum(month_ring_count) as month_ring,

  sum(today_advance_meter) as today_meter,
  sum(week_advance_meter) as week_meter,
  sum(month_advance_meter) as month_meter,

  sum(total_ring_end) as total_ring,
  sum(total_advance_meter) as total_meter,

  -- =========================
  -- 计划
  -- =========================
  sum(month_plan_ring) as month_plan_ring,
  sum(week_plan_ring) as week_plan_ring,
  sum(today_plan_ring) as today_plan_ring,

  -- =========================
  -- 完成率
  -- =========================
  case
    when sum(month_plan_ring) > 0
    then sum(month_ring_count)::float / sum(month_plan_ring)
    else null
  end as month_progress_rate,

  case
    when sum(week_plan_ring) > 0
    then sum(week_ring_count)::float / sum(week_plan_ring)
    else null
  end as week_progress_rate,

  now() as refreshed_at

from app.v_tunnel_command_center_kpi;