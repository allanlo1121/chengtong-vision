
create or replace view v_project_full as
select
  pl.*,

  cm.contract_current,
  cm.contract_history,

  lm.leaders_current,
  lm.leaders_history,

  sm.schedule_current,
  sm.schedule_history

from v_project_list pl

left join v_project_contract_module cm
  on cm.project_id = pl.id

left join v_project_leader_module lm
  on lm.project_id = pl.id

left join v_project_schedule_module sm
  on sm.project_id = pl.id;