-- ==========================================
-- 客商性质 CUSTOMER_NATURE
-- ==========================================

INSERT INTO public.master_definitions (name, key)
VALUES ('客商性质', 'CUSTOMER_NATURE')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10050001', '地方政府'),
    ('10050002', '国资委管理的中央企业'),
    ('10050003', '中国国家铁路集团有限公司'),
    ('10050004', '中央部门管理的企业（不含中国国家铁路集团有限公司）'),
    ('10050005', '地方政府融资平台'),
    ('10050006', '地方国有企业（不含地方政府融资平台）'),
    ('10050007', '民营企业（不含民营房地产开发企业）'),
    ('10050008', '海外企业/政府'),
    ('10050009', '中央政府'),
    ('10050010', '民营房地产开发企业'),
    ('10050011', '部队客商'),
    ('10050012', '其他'),
    ('10050013', '设备厂家')
) AS v(code, name)
ON true
WHERE md.key = 'CUSTOMER_NATURE'
ON CONFLICT (definition_id, code) DO NOTHING;