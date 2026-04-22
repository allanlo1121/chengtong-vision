
create or replace view v_project_contract_module as
select
  p.id as project_id,

  -- 当前合同
  (
    select jsonb_build_object(
      'contract_id', pc.id,
      'contract_code', pc.contract_code,
      'version_no', pcv.version_no,
      'contract_amount', pcv.contract_amount,
      'start_date', pcv.contract_start_date,
      'end_date', pcv.contract_end_date,
      'commissioning_date', pcv.commissioning_date
    )
    from project_contracts pc
    join project_contract_versions pcv
      on pcv.contract_id = pc.id
    where pc.project_id = p.id
      and pcv.effective_to is null
    order by pc.sign_date desc
    limit 1
  ) as contract_current,

  -- 历史
  (
    select jsonb_agg(
      jsonb_build_object(
        'contract_id', pc.id,
        'contract_code', pc.contract_code,
        'version_no', pcv.version_no,
        'contract_amount', pcv.contract_amount,
        'start_date', pcv.contract_start_date,
        'end_date', pcv.contract_end_date,
        'commissioning_date', pcv.commissioning_date,
        'effective_from', pcv.effective_from,
        'effective_to', pcv.effective_to
      )
      order by pcv.effective_from
    )
    from project_contracts pc
    join project_contract_versions pcv
      on pcv.contract_id = pc.id
    where pc.project_id = p.id
  ) as contract_history

from projects p;


create or replace view v_project_leader_module as
select
  p.id as project_id,

  -- 当前
  (
    select jsonb_object_agg(
      md.code,
      jsonb_build_object(
        'employee_id', e.id,
        'employee_name', e.name
      )
    )
    from project_leader_timeline plt
    join master_data md on md.id = plt.leader_role_id
    join hr.employees e on e.id = plt.employee_id
    where plt.project_id = p.id
      and plt.valid_to is null
  ) as leaders_current,

  -- 历史
  (
    select jsonb_agg(
      jsonb_build_object(
        'role_code', md.code,
        'employee_id', e.id,
        'employee_name', e.name,
        'valid_from', plt.valid_from,
        'valid_to', plt.valid_to
      )
      order by plt.valid_from
    )
    from project_leader_timeline plt
    join master_data md on md.id = plt.leader_role_id
    join hr.employees e on e.id = plt.employee_id
    where plt.project_id = p.id
  ) as leaders_history

from projects p;


create or replace view v_project_schedule_module as
select
  p.id as project_id,

  -- 当前
  (
    select jsonb_build_object(
      'schedule_start_date', psv.schedule_start_date,
      'schedule_end_date', psv.schedule_end_date
    )
    from project_schedule_versions psv
    where psv.project_id = p.id
      and psv.is_current = true
    limit 1
  ) as schedule_current,

  -- 历史
  (
    select jsonb_agg(
      jsonb_build_object(
        'schedule_start_date', psv.schedule_start_date,
        'schedule_end_date', psv.schedule_end_date,
        'version_no', psv.version_no
      )
      order by psv.version_no
    )
    from project_schedule_versions psv
    where psv.project_id = p.id
  ) as schedule_history

from projects p;