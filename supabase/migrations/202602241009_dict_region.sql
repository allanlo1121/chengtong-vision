-- ==========================================
-- 所属区域 REGION
-- ==========================================

INSERT INTO public.master_definitions (name, key)
VALUES ('所属区域', 'REGION')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10090001', '京津冀区域'),
    ('10090002', '北方区域'),
    ('10090003', '晋鲁豫区域'),
    ('10090004', '西部区域'),
    ('10090005', '华东区域'),
    ('10090006', '华南区域'),
    ('10090007', '中南区域'),
    ('10090008', '西南区域'),
    ('10090009', '川渝区域'),
    ('10090010', '海外区域')
) AS v(code, name)
ON true
WHERE md.key = 'REGION'
ON CONFLICT (definition_id, code) DO NOTHING;
