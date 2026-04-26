
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


