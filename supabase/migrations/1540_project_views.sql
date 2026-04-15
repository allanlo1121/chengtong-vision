
DROP VIEW IF exists v_projects_list cascade;

create or replace view public.v_projects_list as
select
  -- ===== 基本信息 =====
  p.id,
  p.name,
  p.fullname,
  p.code,
  p.external_global_id,

  -- ===== 组织 =====
  p.organization_id,
  org.name as organization_name,

  -- ===== 主数据（管理/类型/状态）=====
  pm.id  as project_management_mode_id,
  pm.name  as project_management_mode_name,

  pr.id  as project_risk_level_id,
  pr.name  as project_risk_level_name,

  pt.id  as project_type_id,
  pt.name  as project_type_name,

  ps.id  as project_status_id,
  ps.name  as project_status_name,

  pa.id  as project_attention_level_id,
  pa.name  as project_attention_level_name,

  pc.id  as project_control_level_id,
  pc.name  as project_control_level_name,

  pg.id  as progress_status_id,
  pg.name  as progress_status_name,

  spt.id as project_sub_type_id,
  spt.name as project_sub_type_name,



  -- ===== 地理信息 =====
  country.id  as country_id,
  country.name  as country_name,

  region.id   as region_id,
  region.name   as region_name,

  province.id as province_id,
  province.name as province_name,

  city.id     as city_id,
  city.name     as city_name,

  district.id as district_id,
  district.name as district_name,

  p.address,
  p.longitude,
  p.latitude,

  -- ===== 时间 =====
  p.plan_start_date,
  p.actual_start_date,
  p.plan_end_date,
  p.actual_end_date,
  p.commissioning_date,


from projects p
left join organizations org on org.id = p.organization_id

left join master_data_new pm on pm.id = p.project_management_mode_id
left join master_data_new pr on pr.id = p.project_risk_level_id
left join master_data_new pt on pt.id = p.project_type_id
left join master_data_new ps on ps.id = p.project_status_id
left join master_data_new pa on pa.id = p.project_attention_level_id
left join master_data_new pc on pc.id = p.project_control_level_id
left join master_data_new pg on pg.id = p.progress_status_id
left join master_data_new spt on spt.id =p.project_sub_type_id

left join master_data_new country  on country.id  = p.country_id
left join master_data_new region   on region.id   = p.region_id
left join master_data_new province on province.id = p.province_id
left join master_data_new city     on city.id     = p.city_id
left join master_data_new district on district.id = p.district_id;