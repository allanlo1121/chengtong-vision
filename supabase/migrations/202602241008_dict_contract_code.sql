-- ==========================================
-- 承包模式 CONTRACT_CODE
-- ==========================================

INSERT INTO public.master_definitions (name, key)
VALUES ('承包模式', 'CONTRACT_CODE')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10080001', '工程总承包'),
    ('10080002', '设计施工总承包'),
    ('10080003', '施工总承包'),
    ('10080004', '固定单价'),
    ('10080005', '联营体'),
    ('10080006', 'BT'),
    ('10080007', '单项费用包干'),
    ('10080008', 'BOT'),
    ('10080009', 'PPP')
) AS v(code, name)
ON true
WHERE md.key = 'CONTRACT_CODE'
ON CONFLICT (definition_id, code) DO NOTHING;
