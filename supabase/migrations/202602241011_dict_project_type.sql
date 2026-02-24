-- ==========================================
-- 工程类型 PROJECT_TYPE
-- ==========================================

INSERT INTO public.master_definitions (name, key)
VALUES ('工程类型', 'PROJECT_TYPE')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10110001', '铁路工程'),
    ('10110002', '公路工程'),
    ('10110003', '市政工程'),
    ('10110004', '房建工程'),
    ('10110005', '城市轨道交通工程'),
    ('10110006', '水利水电工程'),
    ('10110007', '其他工程')
) AS v(code, name)
ON true
WHERE md.key = 'PROJECT_TYPE'
ON CONFLICT (definition_id, code) DO NOTHING;
