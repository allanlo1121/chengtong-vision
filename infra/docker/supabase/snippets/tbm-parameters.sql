create or replace view tbm.v_tbm_parameter_configs as
select

    tp.id as tbm_parameter_id,
    tp.tbm_id,

    tp.custom_name,
    tp.custom_unit,
    tp.scale,
    tp.value_offset,
    tb.code as tbm_code,
    tb.name as tbm_name,

    -- subsystem
    s.id as subsystem_id,
    s.code as subsystem_code,
    s.name as subsystem_name,  

    -- runtime parameter
    p.id as parameter_id,
    p.code as parameter_code,
    p.name as parameter_name,
    p.unit as parameter_unit,
    p.digits as parameter_digits,
    p.data_type as parameter_data_type,
    p.is_chartable,
    p.sort_order,

    -- plc tag
    tp.plc_tag_id,
    t.tag_name,
    t.comment as plc_tag_comment,

    t.data_type as plc_data_type,
    t.unit as plc_unit,

    t.archive,
    tp.is_disabled

from tbm.tbm_parameter_configs tp

join tbm.tbms tb
    on tb.id = tp.tbm_id

join tbm.tbm_runtime_parameters p
    on p.id = tp.parameter_id

join tbm.tbm_subsystems s
    on s.id = p.subsystem_id

left join tbm.plc_tags t
    on t.id = tp.plc_tag_id;