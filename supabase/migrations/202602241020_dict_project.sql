-- ==========================================
-- 项目状态 PROJECT_STATUS
-- ==========================================

INSERT INTO public.master_definitions (name, key)
VALUES ('项目状态', 'PROJECT_STATUS')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10200001', '未开工'),
    ('10200002', '在建'),
    ('10200003', '收尾'),
    ('10200004', '竣工')
) AS v(code, name)
ON true
WHERE md.key = 'PROJECT_STATUS'
ON CONFLICT (definition_id, code) DO NOTHING;


-- ==========================================
-- 项目性质 PROJECT_NATURE
-- ==========================================

INSERT INTO public.master_definitions (name, key)
VALUES ('项目性质', 'PROJECT_NATURE')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10210001', '局指'),
    ('10210002', '局指参建项目'),
    ('10210003', '代局指'),
    ('10210004', '代局指主责项目'),
    ('10210005', '代局指非主责项目'),
    ('10210006', '授权管理项目'),
    ('10210007', '（子）公司自管项目'),
    ('10210008', '虚拟指挥部')
) AS v(code, name)
ON true
WHERE md.key = 'PROJECT_NATURE'
ON CONFLICT (definition_id, code) DO NOTHING;




