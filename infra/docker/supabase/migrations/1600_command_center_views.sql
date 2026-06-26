
create schema if not exists app;

grant usage on schema app to anon;
grant usage on schema app to authenticated;

grant usage, select on all sequences in schema app to anon;
grant usage, select on all sequences in schema app to authenticated;

alter default privileges in schema app
grant usage, select on sequences to anon;

alter default privileges in schema app
grant usage, select on sequences to authenticated;


-- create or replace view app.v_command_center_summary as
-- with active_projects as (
--   select distinct pst.project_id
--   from proj.project_status_timeline pst
--   where pst.valid_to is null
--     and pst.project_status_id = (
--       select md.id
--       from public.master_data md
--       join public.master_definitions def
--         on def.id = md.definition_id
--       where def.code = 'PROJECT_STATUS'
--         and md.code = '10200002'
--       limit 1
--     )
-- ),

-- active_assignments as (
--   select distinct
--     ta.tbm_id,
--     ta.tunnel_id
--   from tbm.tbm_assignments ta
--   where ta.end_date is null
-- )

-- select
--   -- 设备运行状态
--   coalesce((
--     select count(*)
--     from tbm.tbm_phase_active p
--     where p.phase_type = 'advance'
--   ), 0) as advancing_count,

--   coalesce((
--     select count(*)
--     from tbm.tbm_phase_active p
--     where p.phase_type = 'assembly'
--   ), 0) as assembly_count,

--   coalesce((
--     select count(*)
--     from tbm.tbm_phase_active p
--     where p.phase_type = 'stop'
--   ), 0) as stopped_count,

--     coalesce((
--     select count(*)
--     from tbm.tbm_phase_active p
--     where p.phase_type = 'fault'
--   ), 0) as fault_count,

--   coalesce((
--   select count(distinct c.tbm_id)
--   from tbm.tbm_connection_status c
--   where c.type = 'realdata'
--     and c.is_online = false
-- ), 0) as offline_count,

--   -- 项目概况
--   coalesce((
--     select count(*)
--     from active_projects
--   ), 0) as project_count,

--   coalesce((
--     select count(distinct aa.tunnel_id)
--     from active_assignments aa
--     join proj.tunnels tn
--       on tn.id = aa.tunnel_id
--     join active_projects ap
--       on ap.project_id = tn.project_id
--     where tn.deleted_at is null
--   ), 0) as tunnel_count,

--   coalesce((
--     select count(distinct aa.tbm_id)
--     from active_assignments aa
--     join proj.tunnels tn
--       on tn.id = aa.tunnel_id
--     join active_projects ap
--       on ap.project_id = tn.project_id
--     join tbm.tbms t
--       on t.id = aa.tbm_id
--     where tn.deleted_at is null
--       and t.deleted_at is null
--   ), 0) as tbm_count,

--   now() as refreshed_at;

alter publication supabase_realtime add table proj.tunnels;
alter publication supabase_realtime add table proj.tunnel_status_timeline;
alter publication supabase_realtime add table tbm.tbm_connection_status;
alter publication supabase_realtime add table tbm.tbm_phase_active;
alter publication supabase_realtime add table tbm.tbm_assignments;
-- alter publication supabase_realtime add table warning.warning_events;


-- create or replace view app.v_command_center_tunnel as
-- with current_tunnel_status as (
--   select distinct on (tst.tunnel_id)
--     tst.tunnel_id,
--     tst.tunnel_status_id,
--     md.code as tunnel_status_code,
--     md.name as tunnel_status_name
--   from proj.tunnel_status_timeline tst
--   left join public.master_data md
--     on md.id = tst.tunnel_status_id
--   where tst.valid_to is null
--   order by tst.tunnel_id, tst.valid_from desc
-- )

-- select
--   tn.id as tunnel_id,
--   tn.name as tunnel_name,

--   cts.tunnel_status_id,
--   cts.tunnel_status_code,
--   cts.tunnel_status_name,

--   p.id as project_id,
--   p.name as project_name,

--   tb.id as tbm_id,
--   tb.name as tbm_name,
--   tb.code as tbm_code,

--   tn.actual_start_date,
--   tn.actual_end_date,

--   tsv.schedule_start_date,
--   tsv.schedule_end_date,

--   phase.phase_type,
--   phase.ring_no,  
--   phase.start_at as phase_start_at,  
  
--   conn.is_online as realdata_is_online,
--   conn.last_seen_at as realdata_last_seen_at,

--   conn_heartbeat.is_online as heartbeat_is_online,
--   conn_heartbeat.last_seen_at as heartbeat_last_seen_at,

--   abs(tn.end_ring - tn.start_ring) as total_ring_count,
--   coalesce(phase.ring_no, 0) as current_ring,
--   tn.sort_order

-- from proj.tunnels tn

-- join proj.projects p
--   on p.id = tn.project_id

-- left join lateral (
--   select *
--   from proj.tunnel_schedule_versions tsv
--   where tsv.tunnel_id = tn.id
--   order by tsv.version_no desc
--   limit 1
-- ) tsv on true


-- left join tbm.tbm_assignments ta
--   on ta.tunnel_id = tn.id
--  and ta.end_date is null

-- left join tbm.tbms tb
--   on tb.id = ta.tbm_id
--  and tb.deleted_at is null

-- left join tbm.tbm_phase_active phase
--   on phase.tbm_id = tb.id

-- left join tbm.tbm_connection_status conn
--   on conn.tbm_id = tb.id
--  and conn.type = 'realdata'

--  left join tbm.tbm_connection_status conn_heartbeat
--    on conn_heartbeat.tbm_id = tb.id
--   and conn_heartbeat.type = 'heartbeat'

-- left join current_tunnel_status cts
--   on cts.tunnel_id = tn.id
-- where tn.deleted_at is null
--   and p.deleted_at is null
--   and coalesce(cts.tunnel_status_code, '') not in (
--     '20160005', -- 竣工
--     '20160006', -- 完工
--     '20160007',
--     '20160008'
--   );


-- -- 隧道掘进当前\日\周\月进度总览视图
-- create or replace view app.v_tunnel_progress_overview as
-- with settings as (
--   select *
--   from public.stat_period_settings
--   where code = 'tunnel_progress'
--     and current_date >= effective_from
--     and current_date < coalesce(effective_to, date '9999-12-31')
--   order by effective_from desc
--   limit 1
-- ),

-- bounds as (
--   select
--     s.*,
--     now() at time zone s.timezone as local_now,
--     case
--       when (now() at time zone s.timezone)::time >= s.day_cutoff_time
--         then ((now() at time zone s.timezone)::date + 1)
--       else (now() at time zone s.timezone)::date
--     end as current_work_date
--   from settings s
-- ),

-- periods as (
--   select
--     current_work_date,
--     current_work_date
--       - (((extract(dow from current_work_date)::int - week_start_dow + 7) % 7))
--       as week_start_work_date,
--     case
--       when extract(day from current_work_date)::int >= month_start_day
--         then date_trunc('month', current_work_date)::date + (month_start_day - 1)
--       else
--         (date_trunc('month', current_work_date)::date - interval '1 month')::date
--           + (month_start_day - 1)
--     end as month_start_work_date
--   from bounds
-- ),

-- -- 🔥 现在按 TBM 统计
-- progress_base as (
--   select
--     tdp.tbm_id,
--     tdp.work_date,
--     tdp.ring_end,
--     tdp.chainage_end,

--     greatest(
--       tdp.ring_end
--       - coalesce(
--           lag(tdp.ring_end) over (
--             partition by tdp.tbm_id
--             order by tdp.work_date
--           ),
--           tdp.ring_end
--         ),
--       0
--     ) as daily_ring_count,

--     abs(
--       tdp.chainage_end
--       - coalesce(
--           lag(tdp.chainage_end) over (
--             partition by tdp.tbm_id
--             order by tdp.work_date
--           ),
--           tdp.chainage_end
--         )
--     ) as daily_advance_meter

--   from tbm.tbm_daily_progress tdp
-- ),

-- progress as (
--   select
--     pb.tbm_id,
--     max(pb.ring_end) as total_ring_end,

--     coalesce(sum(pb.daily_ring_count) filter (
--       where pb.work_date = p.current_work_date
--     ), 0) as today_ring_count,

--     coalesce(sum(pb.daily_ring_count) filter (
--       where pb.work_date >= p.week_start_work_date
--         and pb.work_date <= p.current_work_date
--     ), 0) as week_ring_count,

--     coalesce(sum(pb.daily_ring_count) filter (
--       where pb.work_date >= p.month_start_work_date
--         and pb.work_date <= p.current_work_date
--     ), 0) as month_ring_count,

--     coalesce(sum(pb.daily_advance_meter) filter (
--       where pb.work_date = p.current_work_date
--     ), 0) as today_advance_meter,

--     coalesce(sum(pb.daily_advance_meter) filter (
--       where pb.work_date >= p.week_start_work_date
--         and pb.work_date <= p.current_work_date
--     ), 0) as week_advance_meter,

--     coalesce(sum(pb.daily_advance_meter) filter (
--       where pb.work_date >= p.month_start_work_date
--         and pb.work_date <= p.current_work_date
--     ), 0) as month_advance_meter,

--     coalesce(max(pb.ring_end), 0) as total_ring_count,
--     coalesce(max(pb.chainage_end), 0) as total_advance_meter

--   from progress_base pb
--   cross join periods p
--   group by pb.tbm_id
-- ),

-- -- 🔥 通过 assignment 绑定当前 tunnel
-- active_assignments as (
--   select
--     ta.tbm_id,
--     ta.tunnel_id
--   from tbm.tbm_assignments ta
--   where current_date >= ta.start_date
--     and (ta.end_date is null or current_date <= ta.end_date)
-- )

-- select
--   p.id as project_id,
--   p.name as project_name,

--   tn.id as tunnel_id,
--   tn.name as tunnel_name,

--   tb.id as tbm_id,
--   tb.name as tbm_name,
--   tb.code as tbm_code,

--   abs(tn.end_chainage - tn.start_chainage) as total_length_meter,
--   abs(tn.end_ring - tn.start_ring) as total_ring_count,

--   coalesce(pg.today_ring_count, 0) as today_ring_count,
--   coalesce(pg.week_ring_count, 0) as week_ring_count,
--   coalesce(pg.month_ring_count, 0) as month_ring_count,
--   pg.total_ring_end as total_advance_ring_count,

--   coalesce(pg.today_advance_meter, 0) as today_advance_meter,
--   coalesce(pg.week_advance_meter, 0) as week_advance_meter,
--   coalesce(pg.month_advance_meter, 0) as month_advance_meter,
--   coalesce(pg.total_advance_meter, 0) as total_advance_meter,

--   pds.current_work_date,
--   pds.week_start_work_date,
--   pds.month_start_work_date,

--   tn.sort_order,
--   now() as refreshed_at

-- from tbm.tbms tb
-- left join active_assignments aa
--   on aa.tbm_id = tb.id
-- left join proj.tunnels tn
--   on tn.id = aa.tunnel_id
-- left join proj.projects p
--   on p.id = tn.project_id
-- cross join periods pds
-- left join progress pg
--   on pg.tbm_id = tb.id
-- where tb.deleted_at is null;



-- create or replace view app.v_tunnel_base as
-- select
--   t.id,

--   t.project_id,
--   p.name as project_name,
--   p.organization_id,
--   o.name as organization_name,

--   t.name,
--   t.full_name,
--   t.prefix,

--   t.start_chainage,
--   t.end_chainage,
--   t.start_ring,
--   t.end_ring,

--   t.actual_start_date,
--   t.actual_end_date,

--   tsv.schedule_start_date,
--   tsv.schedule_end_date,

--   t.longitude,
--   t.latitude,
--   t.sort_order,
--   t.remark,

--   ps.tunnel_status_id,
--   s.name as tunnel_status_name


-- from proj.tunnels t

-- left join proj.projects p
--   on p.id = t.project_id

-- left join hr.organizations o
--   on o.id = p.organization_id
--  and o.deleted_at is null

-- left join proj.tunnel_status_timeline ps
--   on ps.tunnel_id = t.id
--  and ps.valid_to is null

-- left join public.master_data s
--   on s.id = ps.tunnel_status_id

-- -- 取最新的计划进度版本
-- left join (
--   select distinct on (tunnel_id)
--     *
--   from proj.tunnel_schedule_versions
--   order by tunnel_id, version_no desc
-- ) tsv
--   on tsv.tunnel_id = t.id;




create view app.v_tunnel_runtime as
select 
  tl.id as tunnel_id,

  tl.project_id,
  tl.project_name as project_name,

  tl.region_id as region_id,
  tl.region_name as region_name,

  tl.name as tunnel_name,
  tl.full_name as tunnel_full_name,
  tl.prefix,

  tb.id as tbm_id,
  tb.name as tbm_name,
  tb.code as tbm_code,

  tl.start_chainage,
  tl.end_chainage,
  tl.start_ring,
  tl.end_ring,

  tl.actual_start_date,
  tl.actual_end_date,

  tl.schedule_start_date,
  tl.schedule_end_date,

  tl.longitude,
  tl.latitude,
  tl.sort_order,
  tl.remark,

  tl.tunnel_status_id,
  tl.tunnel_status_name

from proj.v_tunnel_list tl
left join tbm.tbm_assignments ta
  on ta.tunnel_id = tl.id

left join tbm.tbms tb
  on tb.id = ta.tbm_id

where tl.tunnel_status_name in (
  '正常在建',
  '停工',
  '未开工',
  '冬休'
);

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



-- 隧道掘进当前\日\周\月进度总览视图
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

daily as (
  select
    tbm_id,
    work_date,
    max(ring_end) as ring_end,
    max(chainage_end) as chainage_end
  from tbm.tbm_daily_progress
  group by tbm_id, work_date
),

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

progress as (
  select
    pb.tbm_id,
    max(pb.ring_end) as total_ring_end,

    sum(pb.daily_ring_count) filter (
      where pb.work_date = p.current_work_date
    ) as today_ring_count,

    sum(pb.daily_ring_count) filter (
      where pb.work_date between p.week_start_work_date and p.current_work_date
    ) as week_ring_count,

    sum(pb.daily_ring_count) filter (
      where pb.work_date between p.month_start_work_date and p.current_work_date
    ) as month_ring_count,

    sum(pb.daily_advance_meter) filter (
      where pb.work_date = p.current_work_date
    ) as today_advance_meter,

    sum(pb.daily_advance_meter) filter (
      where pb.work_date between p.week_start_work_date and p.current_work_date
    ) as week_advance_meter,

    sum(pb.daily_advance_meter) filter (
      where pb.work_date between p.month_start_work_date and p.current_work_date
    ) as month_advance_meter,

    max(pb.chainage_end) as total_advance_meter

  from progress_base pb
  cross join periods p
  group by pb.tbm_id
)

select
  pg.*,
  p.current_work_date,
  p.week_start_work_date,
  p.month_start_work_date,
  now() as refreshed_at
from progress pg
cross join periods p;


-- create or replace view app.v_tbm_command_center_kpi as
-- select
--   t.tbm_id,
--   t.tbm_name,
--   t.tbm_code,

--   t.tunnel_id,
--   t.tunnel_name,
--   t.project_id,
--   t.project_name,

--   -- =========================
--   -- 状态
--   -- =========================
--   s.phase_type,
--   s.heartbeat_is_online,
--   s.realdata_is_online,

--   -- =========================
--   -- 当前进度（实时）
--   -- =========================
--   s.ring_no,
--   s.chainage,

--   -- =========================
--   -- 进度指标（来自 overview）
--   -- =========================
--   p.today_ring_count,
--   p.week_ring_count,
--   p.month_ring_count,

--   p.today_advance_meter,
--   p.week_advance_meter,
--   p.month_advance_meter,

--   p.total_ring_end,
--   p.total_advance_meter,

--   -- =========================
--   -- 计划（未来扩展）
--   -- =========================
--   p.today_plan_ring,
--   p.week_plan_ring,
--   p.month_plan_ring,

--   p.today_plan_meter,
--   p.week_plan_meter,
--   p.month_plan_meter,

--   -- =========================
--   -- 派生 KPI
--   -- =========================
--   case 
--     when p.today_plan_ring > 0 
--     then p.today_ring_count::float / p.today_plan_ring
--     else null
--   end as today_progress_rate,

--   case 
--     when p.month_plan_ring > 0 
--     then p.month_ring_count::float / p.month_plan_ring
--     else null
--   end as month_progress_rate,

--   -- =========================
--   -- 在线状态综合
--   -- =========================
--   case
--     when s.heartbeat_is_online = false then 'offline'
--     when s.phase_type = 'fault' then 'fault'
--     when s.phase_type = 'assembly' then 'assembly'
--     when s.phase_type = 'advance' then 'advance'
--     else 'stopped'
--   end as status_kpi,

--   now() as refreshed_at

-- from tbm.tbm_list t

-- left join app.v_tbm_runtime_state s
--   on s.tbm_id = t.tbm_id

-- left join app.v_tbm_progress_overview p
--   on p.tbm_id = t.tbm_id;


-- create or replace view app.v_tunnel_command_center_kpi as
-- select
--   ta.tunnel_id,
--   ta.tbm_id,

--   t.tbm_name,
--   t.tbm_code,


--   tr.tunnel_name,
--   tr.project_id,
--   tr.project_name,
--   tr.region_id,
--   tr.region_name,

--   tr.tunnel_full_name,
--   tr.prefix,
--   Math.abs(tr.end_chainage-tr.start_chainage) as tunnel_length,
--   Math.abs(tr.end_ring-tr.start_ring) as tunnel_ring_count,
--   tr.schedule_start_date,
--   tr.schedule_end_date,
--   tr.actual_start_date,
--   tr.actual_end_date,

--   tr.longitude,
--   tr.latitude,
--   tr.sort_order,
--   tr.tunnel_status_id,
--   tr.tunnel_status_name,

--   -- =========================
--   -- 状态
--   -- =========================
--   s.phase_type,
--   s.heartbeat_is_online,
--   s.realdata_is_online,

--   -- =========================
--   -- 当前进度（实时）
--   -- =========================
--   s.ring_no,
--   s.chainage,

--   -- =========================
--   -- 进度指标（来自 overview）
--   -- =========================
--   p.today_ring_count,
--   p.week_ring_count,
--   p.month_ring_count,

--   p.today_advance_meter,
--   p.week_advance_meter,
--   p.month_advance_meter,

--   p.total_ring_end,
--   p.total_advance_meter,

--   -- =========================
--   -- 计划（未来扩展）
--   -- =========================
--   p.today_plan_ring,
--   p.week_plan_ring,
--   p.month_plan_ring,

--   p.today_plan_meter,
--   p.week_plan_meter,
--   p.month_plan_meter,

--   -- =========================
--   -- 派生 KPI
--   -- =========================
--   case 
--     when p.today_plan_ring > 0 
--     then p.today_ring_count::float / p.today_plan_ring
--     else null
--   end as today_progress_rate,

--   case 
--     when p.month_plan_ring > 0 
--     then p.month_ring_count::float / p.month_plan_ring
--     else null
--   end as month_progress_rate,

--   -- =========================
--   -- 在线状态综合
--   -- =========================
--   case
--     when s.realdat_is_online = false then 'offline'
--     when s.phase_type = 'fault' then 'fault'
--     when s.phase_type = 'assembly' then 'assembly'
--     when s.phase_type = 'advance' then 'advance'
--     else 'stopped'
--   end as status_kpi,

--   now() as refreshed_at

-- from tbm.tbm_assignments ta

-- left join app.v_tunnel_runtime tr
--   on t.tunnel_id = ta.tunnel_id

-- left join app.v_tbm_runtime_state s
--   on s.tbm_id = ta.tbm_id

-- left join app.v_tbm_progress_overview p
--   on p.tbm_id = ta.tbm_id;