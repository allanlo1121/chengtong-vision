-- ==========================================
-- 合同主体 USE_QUALIFICATION
-- ==========================================

INSERT INTO public.master_definitions (name, key)
VALUES ('合同主体', 'USE_QUALIFICATION')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10130001', '股份公司'),
    ('10130002', '集团公司'),
    ('10130003', '子公司'),
    ('10130004', '联合体')
) AS v(code, name)
ON true
WHERE md.key = 'USE_QUALIFICATION'
ON CONFLICT (definition_id, code) DO NOTHING;
