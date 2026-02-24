
INSERT INTO "public"."master_definitions" ("name", "key")
VALUES 
    ('主数据字典','DICT_MASTER'),
    ('工号类型', 'PROJECT_CATALOG_TYPE'),
    ('是否', 'WHETHER'),
    ('工程专业', 'PROJECT_MAJOR'),
    ('客商性质', 'CUSTOMER_NATURE'),
    ('承包模式', 'CONTRACT_CODE'),
    ('所属区域', 'REGION'),
    ('业务板块', 'BUSINESS'),
    ('工程类型', 'PROJECT_TYPE'),
    ('工程性质', 'ENGINEERING_NATURE'),
    ('合同主体', 'USE_QUALIFICATION'),
    ('性别', 'GENDER'),
    ('人员类别', 'PERSON_TYPE'),
    ('岗位', 'JOB_TITLE'),
    ('项目状态', 'PROJECT_STATUS'),
    ('项目性质', 'PROJECT_NATURE'),
    ('组织类别', 'ORG_CATEGORY'),
    ('文化程度', 'EDU_LEVEL'),
    ('外部单位类型', 'EXT_UNIT_TYPE'),
    ('机构负责人', 'ORG_LEADER_ROLE'),
    ('产系统字典',  'DICT_PRODUCTION'),
    ('项目管控级别', 'PROJECT_CONTROL_LEVEL'),
    ('项目风险等级', 'PROJECT_RISK_LEVEL'),
    ('项目子状态', 'PROJECT_SUB_STATUS'),
    ('方案专业', 'PROGRAM_MAJOR'),
    ('工程子类别', 'ENGINEERING_SUBCATEGORY'),
    ('项目关注类别', 'PROJECT_FOCUS_CATEGORY'),
    ('项目关注子类别', 'PROJECT_FOCUS_SUBCATEGORY'),
    ('工点类型', 'PROJECT_WORK_POINT_TYPE'),
    ('危大工程类型', 'DANGEROU_LARGE_PRO_TYPE'),
    ('工号施工状态', 'PROJECT_WORK_POINT_STATUS'),
    ('技术系统字典', 'DICT_TECHNICAL'),
    ('械系统字典', 'DICT_MECHANICAL'),
    ('设备状态', 'EQUIPMENT_STATUS'),
    ('设备来源类型', 'MECH_SOURCE_TYPE'),
    ('报警规则类型', 'TBM_RULE_TYPE'),
    ('盾构机类型', 'TBM_TYPE'),
    ('盾构机业务状态', 'TBM_OPERATION_STATUS'),
    ('安全系统字典', 'DICT_SAFETY'),
    ('物资系统字典', 'DICT_MATERIAL'),
    ('成本系统字典', 'DICT_COST'),
    ('业主单位性质', 'OWNER_NATURE'),
    ('财务系统字典', 'DICT_FINANCE')
ON CONFLICT (key) DO NOTHING;


INSERT INTO "public"."master_data" ("definition_id","code","name") 
SELECT md.id,v.code,v.name
FROM "public"."master_definitions" md
JOIN (
    VALUES 
    ('10050005', '地方政府融资平台'),
    ('10050001', '地方政府'),
    ('10050002', '国资委管理的中央企业'),
    ('10050003', '中国国家铁路集团有限公司'),
    ('10050004', '中央部门管理的企业（不含中国国家铁路集团有限公司'),
    ('10050006', '地方国有企业（不含地方政府融资平台）'),
    ('10050007', '民营企业（不含民营房地产开发企业）'),
    ('10050008', '海外企业/政府'),
    ('10050009', '中央政府'),
    ('10050010', '民营房地产开发企业'),
    ('10050011', '部队客商'),
    ('10050012', '其他'),
    ('10050013', '设备厂家') 
) AS v(code,name)
ON true
WHERE md.key = 'CUSTOMER_NATURE' 


INSERT INTO "public"."master_data" ("definition_id","code","name") 
SELECT md.id,v.code,v.name
FROM "public"."master_definitions" md
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
) AS v(code,name)
ON true
WHERE md.key = 'PROJECT_CATALOG_TYPE' 

INSERT INTO "public"."master_data" ("definition_id","code","name") 
SELECT md.id,v.code,v.name
FROM "public"."master_definitions" md
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
) AS v(code,name)
ON true
WHERE md.key = 'PROJECT_MAJOR' 


INSERT INTO "public"."master_data" ("definition_id","code","name") 
SELECT md.id,v.code,v.name
FROM "public"."master_definitions" md
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
) AS v(code,name)
ON true
WHERE md.key = 'CONTRACT_CODE' 


INSERT INTO "public"."master_data" ("definition_id","code","name") 
SELECT md.id,v.code,v.name
FROM "public"."master_definitions" md
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
) AS v(code,name)
ON true
WHERE md.key = 'REGION' 

INSERT INTO "public"."master_data" ("definition_id","code","name")
SELECT md.id,v.code,v.name
FROM "public"."master_definitions" md
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
) AS v(code,name)
ON true
WHERE md.key = 'BUSSINESS'

INSERT INTO "public"."master_data" ("definition_id","code","name")
SELECT md.id,v.code,v.name
FROM "public"."master_definitions" md
JOIN (
    VALUES 
    ('10110001', '铁路工程'),
    ('10110002', '公路工程'),
    ('10110003', '市政工程'),
    ('10110004', '房建工程'),
    ('10110005', '城市轨道交通工程'),
    ('10110006', '水利水电工程'),
    ('10110007', '其他工程')
) AS v(code,name)
ON true
WHERE md.key = 'PROJECT_TYPE'


