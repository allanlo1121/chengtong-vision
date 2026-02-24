-- ==========================================
-- 业务板块 BUSINESS
-- ==========================================

INSERT INTO public.master_definitions (name, key)
VALUES ('业务板块', 'BUSINESS')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10100001', '基建建设'),
    ('10100002', '勘测设计'),
    ('10100003', '工业'),
    ('10100004', '房地产业'),
    ('10100005', '矿产资源'),
    ('10100006', '建筑业上游项目'),
    ('10100007', '技术咨询'),
    ('10100008', '工程监理'),
    ('10100009', '批发零售贸易'),
    ('10100010', '机械租赁'),
    ('10100011', '对外劳务合作'),
    ('10100012', '其他外经外贸业务'),
    ('10100013', '其他')
) AS v(code, name)
ON true
WHERE md.key = 'BUSINESS'
ON CONFLICT (definition_id, code) DO NOTHING;
