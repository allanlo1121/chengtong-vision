

create view eqp.v_tbm_list as
select
  t.id,
  t.code,
  t.name,
  t.manage_code,
  t.model,  
  t.diameter,
  t.power,
  t.serial_no,
  t.sort_order,
  t.is_disabled,
 

  t.tbm_type_id,
  mt.name as tbm_type_name,
  t.manufacturer_id,
  mf.name as manufacturer_name
from eqp.tbms t
left join public.master_data mt on t.tbm_type_id = mt.id
left join hr.customers mf on t.manufacturer_id = mf.id
where t.deleted_at is null;

create view eqp.v_tbm_picker as
select
  t.id,
  t.code,
  t.name,
  t.manage_code,
  t.diameter,
  mt.name as tbm_type_name,
  cus.name as manufacturer_name
from eqp.tbms t
left join public.master_data mt on t.tbm_type_id = mt.id
left join hr.customers cus on t.manufacturer_id = cus.id
where t.deleted_at is null;

create or replace view eqp.v_tbm_detail as
select
  t.id,
  t.code,
  t.name,
  t.manage_code,
  t.model,
  t.tbm_type_id,
  t.diameter,
  t.power,
  t.serial_no,
  t.sort_order,
  t.is_disabled,
  t.remark,
  t.external_id,
  t.external_version,

  mt.name as tbm_type_name,
  mf.name as manufacturer_name,
  t.created_at,
  t.updated_at,
  t.created_by,
  t.updated_by,
  t.deleted_at,
  t.deleted_by
from eqp.tbms t
left join public.master_data mt on t.tbm_type_id = mt.id
left join hr.customers mf on t.manufacturer_id = mf.id;

create or replace view eqp.v_tbm_type_counts as
select
  tbm_type_id,
  count(*)::int as tbm_count
from eqp.tbms
where deleted_at is null
group by tbm_type_id;

create or replace view eqp.v_tbm_manufacturer_counts as
select
  manufacturer_id,
  count(*)::int as tbm_count
from eqp.tbms
where deleted_at is null
group by manufacturer_id;

create or replace view eqp.v_tbm_bound_parameters as
select
  b.id as binding_id,
  b.tbm_id,
  b.parameter_id,

  s.id as subsystem_id,
  s.code as subsystem_code,
  s.name as subsystem_name,
  s.sort_order as subsystem_sort_order,

  p.code as parameter_code,
  p.name as parameter_name,
  p.unit,
  p.digits,
  p.data_type,
  p.sort_order as parameter_sort_order,
  p.is_alarm,
  p.is_chartable,
  p.is_disabled
from eqp.tbm_parameter_bindings b
join eqp.tbm_runtime_parameters p
  on p.id = b.parameter_id
join eqp.tbm_subsystems s
  on s.id = p.subsystem_id;