

create or replace view public.v_project_list as
select
  -- ===== 基本信息 =====
  p.id,
  p.name,
  p.full_name,
  p.code,
  p.external_id,
  p.external_version,

  -- ===== 组织 =====  
  p.organization_id,
  org.name as organization_name,

  -- ===== 主数据（管理/类型/状态）=====
  pm.id as project_management_mode_id,
  pm.name  as project_management_mode_name,
  
  prl.project_risk_level_id,
  prl_md.name  as project_risk_level_name,
  
  pt.id as project_type_id,
  pt.name  as project_type_name,
  spt.id as project_sub_type_id,
  spt.name as project_sub_type_name,
  
  s.id as project_status_id,
  s.name  as project_status_name,
  ss.id as project_sub_status_id,
  ss.name as project_sub_status_name,

  pal.project_attention_level_id,
  pcl.project_control_level_id,
  pal_md.name  as project_attention_level_name,
  pcl_md.name  as project_control_level_name,

  -- ===== 负责人 =====
  v_osp.employee_id as project_oversight_leader_id,
  v_osp.employee_name as project_oversight_leader_name,

  v_pm.employee_id as project_manager_id,
  v_pm.employee_name as project_manager_name,

  v_ce.employee_id as project_chief_engineer_id,
  v_ce.employee_name as project_chief_engineer_name,

  -- ===== 地理信息 ===== 
  country.name  as country_name,  
  region.name   as region_name,  
  province.name as province_name,
 
  city.name     as city_name,
  district.name as district_name,

  p.address,
  p.longitude,
  p.latitude,

  -- ===== 时间 =====
  p.actual_start_date,
  p.actual_end_date,
  psv.schedule_start_date,
  psv.schedule_end_date,
  pcv.contract_start_date,
  pcv.contract_end_date,
  pcv.commissioning_date,
  pcv.contract_amount



from projects p
left join organizations org on org.id = p.organization_id

left join master_data pm on pm.id = p.project_management_mode_id
left join master_data pt on pt.id = p.project_type_id
left join master_data spt on spt.id =p.project_sub_type_id

left join  project_risk_level_timeline prl
  on prl.project_id = p.id
 and prl.valid_to is null
left join master_data prl_md on prl_md.id = prl.project_risk_level_id

left join project_status_timeline ps
  on ps.project_id = p.id
 and ps.valid_to is null

left join master_data s
  on s.id = ps.project_status_id

left join master_data ss
  on ss.id = ps.project_sub_status_id

left join project_attention_level_timeline pal
  on pal.project_id = p.id
 and pal.valid_to is null
left join master_data pal_md on pal_md.id = pal.project_attention_level_id

left join project_control_level_timeline pcl
  on pcl.project_id = p.id
 and pcl.valid_to is null
left join master_data pcl_md on pcl_md.id = pcl.project_control_level_id

lleft join hr.v_org_responsibles v_pm
  on v_pm.organization_id = p.organization_id
 and v_pm.role_type_code = 'administrative'

left join hr.v_org_responsibles v_ce
  on v_ce.organization_id = p.organization_id
 and v_ce.role_type_code = 'technical'

lleft join hr.v_org_responsibles v_osp
  on v_osp.organization_id = p.organization_id
 and v_osp.role_type_code = 'oversight'

left join hr.employees e_ce on e_ce.id = ce.employee_id

left join project_schedule_versions psv
  on psv.project_id = p.id
 and psv.is_current = true

 left join lateral (
  select pcv.*
  from project_contracts pc
  join project_contract_versions pcv
    on pcv.contract_id = pc.id
  where pc.project_id = p.id
    and pcv.effective_to is null
  order by pc.sign_date desc
  limit 1
) pcv on true


left join countries country  on country.code  = p.country_code
left join master_data region   on region.id   = p.region_id
left join admin_regions province on province.code = p.province_code
left join admin_regions city     on city.code     = p.city_code
left join admin_regions district on district.code = p.district_code;