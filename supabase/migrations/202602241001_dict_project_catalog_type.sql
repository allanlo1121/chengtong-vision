-- ==========================================
-- 工号类型 PROJECT_CATALOG_TYPE
-- ==========================================

INSERT INTO public.master_definitions (name, key)
VALUES ('工号类型', 'PROJECT_CATALOG_TYPE')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10010001', '工程类型'),
    ('10010002', '专业类型'),
    ('10010003', '单位工程'),
    ('10010004', '子单位工程'),
    ('10010005', '分部工程'),
    ('10010006', '子分部工程'),
    ('10010007', '分项工程'),
    ('10010008', '单项工程')
) AS v(code, name)
ON true
WHERE md.key = 'PROJECT_CATALOG_TYPE'
ON CONFLICT (definition_id, code) DO NOTHING;