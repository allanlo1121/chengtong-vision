ALTER TABLE tbm_runtime_parameters
ADD COLUMN param_group text;

COMMENT ON COLUMN tbm_runtime_parameters.param_group IS '参数所属分组（如 guidance/thrust/torque/pressure）';
