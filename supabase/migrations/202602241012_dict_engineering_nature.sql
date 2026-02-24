-- ==========================================
-- 工程性质 ENGINEERING_NATURE
-- ==========================================

INSERT INTO public.master_definitions (name, key)
VALUES ('工程性质', 'ENGINEERING_NATURE')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10120001', '公司自管工程'),
    ('10120002', '代局指工程'),
    ('10120003', '子公司自管'),
    ('10120004', '授权管理工程')
) AS v(code, name)
ON true
WHERE md.key = 'ENGINEERING_NATURE'
ON CONFLICT (definition_id, code) DO NOTHING;