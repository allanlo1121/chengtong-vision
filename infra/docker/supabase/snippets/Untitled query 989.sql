create or replace view proj.v_tunnel_workspace_detail as
select
  t.id,

  t.project_id,
  p.name as project_name,
  p.organization_id,
  o.name as organization_name,

  t.name,
  t.full_name,
  t.start_stake,
  t.end_stake,

  tbm.id as tbm_id,
  tbm.code as tbm_code,
  tbm.name as tbm_name,

  t.actual_start_date,
  t.actual_end_date,

  tsv.schedule_start_date,
  tsv.schedule_end_date, 
  t.sort_order,


  ps.tunnel_status_id,
  s.name as tunnel_status_name

from proj.tunnels t

left join proj.projects p
  on p.id = t.project_id

left join hr.organizations o
  on o.id = p.organization_id
 and o.deleted_at is null

left join proj.tunnel_status_timeline ps
  on ps.tunnel_id = t.id
 and ps.valid_to is null

left join public.master_data s
  on s.id = ps.tunnel_status_id

left join eqp.tbm_assignments ta
  on ta.tunnel_id = t.id
 and ta.end_date is null

left join eqp.tbms tbm
  on tbm.id = ta.tbm_id

-- 取最新的计划进度版本
left join (
  select distinct on (tunnel_id)
    *
  from proj.tunnel_schedule_versions
  order by tunnel_id, version_no desc
) tsv
  on tsv.tunnel_id = t.id;