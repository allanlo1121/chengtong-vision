-- ==========================================
-- 项目状态 PROJECT_STATUS
-- ==========================================

INSERT INTO public.master_definitions (name, code)
VALUES ('项目状态', 'PROJECT_STATUS')
ON CONFLICT (code) DO NOTHING;

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
WHERE md.code = 'PROJECT_STATUS'
ON CONFLICT (definition_id, code) DO NOTHING;


-- ==========================================
-- 项目性质 PROJECT_NATURE
-- ==========================================

INSERT INTO public.master_definitions (name, code)
VALUES ('项目性质', 'PROJECT_NATURE')
ON CONFLICT (code) DO NOTHING;

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
WHERE md.code = 'PROJECT_NATURE'
ON CONFLICT (definition_id, code) DO NOTHING;


-- ==========================================
-- 工号类型 PROJECT_CATALOG_TYPE
-- ==========================================

INSERT INTO public.master_definitions (name, code)
VALUES ('工号类型', 'PROJECT_CATALOG_TYPE')
ON CONFLICT (code) DO NOTHING;

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
WHERE md.code = 'PROJECT_CATALOG_TYPE'
ON CONFLICT (definition_id, code) DO NOTHING;


-- ==========================================
-- 工程专业 PROJECT_MAJOR
-- ==========================================

INSERT INTO public.master_definitions (name, code)
VALUES ('工程专业', 'PROJECT_MAJOR')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10030001', '迁改工程'),
    ('10030002', '前期工程'),
    ('10030003', '临建工程'),
    ('10030004', '路基专业'),
    ('10030005', '路面专业'),
    ('10030006', '桥涵专业'),
    ('10030007', '隧道专业'),
    ('10030008', '房建专业'),
    ('10030009', '站场专业'),
    ('10030010', '轨道专业'),
    ('10030011', '附属工程'),
    ('10030012', '交通专业'),
    ('10030013', '绿化专业'),
    ('10030014', '给排水专业'),
    ('10030015', '土建专业'),
    ('10030016', '安装专业'),
    ('10030017', '园林专业'),
    ('10030018', '水利专业'),
    ('10030019', '水电专业'),
    ('10030020', '通信专业'),
    ('10030021', '信号专业'),
    ('10030022', '信息专业'),
    ('10030023', '电力专业'),
    ('10030024', '电力牵引供电专业'),
    ('10030025', '机电专业')
) AS v(code, name)
ON true
WHERE md.code = 'PROJECT_MAJOR'
ON CONFLICT (definition_id, code) DO NOTHING;

-- ==========================================
-- 承包模式 CONTRACT_CODE
-- ==========================================

INSERT INTO public.master_definitions (name, code)
VALUES ('承包模式', 'CONTRACT_CODE')
ON CONFLICT (code) DO NOTHING;

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
WHERE md.code = 'CONTRACT_CODE'
ON CONFLICT (definition_id, code) DO NOTHING;

-- ==========================================
-- 工程类型 PROJECT_TYPE
-- ==========================================

INSERT INTO public.master_definitions (name, code)
VALUES ('工程类型', 'PROJECT_TYPE')
ON CONFLICT (code) DO NOTHING;

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
WHERE md.code = 'PROJECT_TYPE'
ON CONFLICT (definition_id, code) DO NOTHING;


-- ==========================================
-- 工程性质 ENGINEERING_NATURE
-- ==========================================

INSERT INTO public.master_definitions (name, code)
VALUES ('工程性质', 'ENGINEERING_NATURE')
ON CONFLICT (code) DO NOTHING;

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
WHERE md.code = 'ENGINEERING_NATURE'
ON CONFLICT (definition_id, code) DO NOTHING;

-- ==========================================
-- 合同主体 USE_QUALIFICATION
-- ==========================================

INSERT INTO public.master_definitions (name, code)
VALUES ('合同主体', 'USE_QUALIFICATION')
ON CONFLICT (code) DO NOTHING;

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
WHERE md.code = 'USE_QUALIFICATION'
ON CONFLICT (definition_id, code) DO NOTHING;





