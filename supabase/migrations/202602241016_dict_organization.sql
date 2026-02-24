-- ==========================================
-- 组织类别 ORG_CATEGORY
-- ==========================================

INSERT INTO public.master_definitions (name, key)
VALUES ('组织类别', 'ORG_CATEGORY')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10230001', '集团公司'),
    ('10230002', '生产性子分公司'),
    ('10230003', '分公司'),
    ('10230004', '项目部'),
    ('10230005', '部门'),
    ('10230006', '局指'),
    ('10230007', '代局指'),
    ('10230008', '多元业务单位'),
    ('10230009', '分组（虚拟组织）'),
    ('10230010', '专业技术组'),
    ('10230011', '生产组织'),
    ('10230012', '区域指挥部'),
    ('10230013', '分公司（四级）'),
    ('10230014', '阶段性工作机构'),
    ('10230015', '科室'),
    ('10230016', '虚拟项目部'),
    ('10230017', '子公司区域指挥部'),
    ('10230018', '工程指挥部')
) AS v(code, name)
ON true
WHERE md.key = 'ORG_CATEGORY'
ON CONFLICT (definition_id, code) DO NOTHING;


-- ==========================================
-- 组织领导角色 ORG_LEADER_ROLE
-- ==========================================

INSERT INTO public.master_definitions (name, key)
VALUES ('组织领导角色', 'ORG_LEADER_ROLE')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('11190001', '行政负责人'),
    ('11190002', '党组织负责人'),
    ('11190003', '技术负责人'),
    ('11190004', '安全负责人')
) AS v(code, name)
ON true
WHERE md.key = 'ORG_LEADER_ROLE'
ON CONFLICT (definition_id, code) DO NOTHING;

    ('10230007', '代局指'),
    ('10230008', '多元业务单位'),
    ('10230009', '分组（虚拟组织）'),
    ('10230010', '专业技术组'),
    ('10230011', '生产组织'),
    ('10230012', '区域指挥部'),
    ('10230013', '分公司（四级）'),
    ('10230014', '阶段性工作机构'),
    ('10230015', '科室'),
    ('10230016', '虚拟项目部'),
    ('10230017', '子公司区域指挥部'),
    ('10230018', '工程指挥部')
) AS v(code, name)
ON true
WHERE md.key = 'ORG_CATEGORY'
ON CONFLICT (definition_id, code) DO NOTHING;
