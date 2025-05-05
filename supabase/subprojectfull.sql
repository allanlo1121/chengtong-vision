CREATE OR REPLACE VIEW v_subproject_full AS
SELECT
  sp.id AS sub_project_id,
  sp.project_name AS sub_project_name,
  sp.short_name AS sub_project_short_name,
  sp.project_id,
  sp.op_num_start,
  sp.op_num_end,
  sp.ring_start,
  sp.ring_end,
  sp.sub_project_status,
  sp.start_date,
  sp.end_date,


  p.project_name,
  p.short_name AS project_short_name,
  p.project_address_name,
  p.region,

  tsh.tbm_id,
  tbm.code AS tbm_code,
  tbm.name AS tbm_name  

FROM sub_projects sp
LEFT JOIN projects p ON sp.project_id = p.id
LEFT JOIN tbm_sub_project_history tsh ON sp.id = tsh.sub_project_id
LEFT JOIN tbm_infos tbm ON tsh.tbm_id = tbm.id;
