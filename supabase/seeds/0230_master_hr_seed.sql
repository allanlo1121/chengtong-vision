-- ==========================================
-- 性别 GENDER
-- ==========================================

INSERT INTO public.master_definitions (name, code)
VALUES ('性别', 'GENDER')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10160001', '未知的性别'),
    ('10160002', '男性'),
    ('10160003', '女性'),
    ('10160004', '未说明的性别')
) AS v(code, name)
ON true
WHERE md.code = 'GENDER'
ON CONFLICT (definition_id, code) DO NOTHING;


-- ==========================================
-- 人员类型 EMPLOYMENT_TYPE
-- ==========================================

INSERT INTO public.master_definitions (name, code)
VALUES ('人员类型', 'EMPLOYMENT_TYPE')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10170001', '正式员工'),
    ('10170002', '局劳务派遣'),
    ('10170003', '公司劳务派遣'),
    ('10170004', '临时工'),
    ('10170005', '退休返聘'),
    ('10170006', '外部人员')
) AS v(code, name)
ON true
WHERE md.code = 'EMPLOYMENT_TYPE'
ON CONFLICT (definition_id, code) DO NOTHING;

-- ==========================================
-- 任职状态 EMPLOYMENT_STATUS
-- ==========================================

INSERT INTO public.master_definitions (name, code)
VALUES ('任职状态', 'EMPLOYMENT_STATUS')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10310001', '在职'),
    ('10310002', '离职'),
    ('10310003', '试用期'),
    ('10310004', '停职'),
    ('10310005', '待岗'),
    ('10310006', '退休'),
    ('10310007', '离岗休息'),
    ('10310008', '助勤'),
    ('10310009', '其他')
) AS v(code, name)
ON true
WHERE md.code = 'EMPLOYMENT_STATUS'
ON CONFLICT (definition_id, code) DO NOTHING;

-- ==========================================
-- 文化程度 EDU_LEVEL
-- ==========================================

INSERT INTO public.master_definitions (name, code)
VALUES ('文化程度', 'EDU_LEVEL')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10270001', '博士研究生'),
    ('10270002', '硕士研究生'),
    ('10270003', '大学本科'),
    ('10270004', '函授本科'),
    ('10270005', '大专'),
    ('10270006', '高中'),
    ('10270007', '中专'),
    ('10270008', '初中'),
    ('10270009', '小学'),
    ('10270010', '未知')
) AS v(code, name)
ON true
WHERE md.code = 'EDU_LEVEL'
ON CONFLICT (definition_id, code) DO NOTHING;

-- ==========================================
-- 专业 MAJOR
-- ==========================================

INSERT INTO public.master_definitions (name, code)
VALUES ('专业', 'MAJOR')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10320001', '计算机科学'),
    ('10320002', '电子工程'),
    ('10320003', '机械工程及其自动化'),
    ('10320004', '土木工程'),
    ('10320005', '建筑学'),
    ('10320006', '经济学'),
    ('10320007', '管理学'),
    ('10320008', '法律'),
    ('10320009', '医学'),
    ('10320010', '未知')
) AS v(code, name)
ON true
WHERE md.code = 'MAJOR'
ON CONFLICT (definition_id, code) DO NOTHING;


insert into hr.post_categories (code, name)
values
  ('management', '管理'),
  ('technical',  '技术'),
  ('safety',     '安全'),
  ('commercial', '商务'),
  ('finance',    '财务'),
  ('other',      '其他')
on conflict (code) do update
set name = excluded.name;

-- ==========================================
-- 岗位机构范围 POST_SCOPE
-- ==========================================

insert into hr.post_scopes (code, name)
values
  ('group',       '集团'),
  ('company',     '公司'),
  ('project_org', '项目部')
  ('department', '部门')
on conflict (code) do update
set name = excluded.name;

-- ==========================================
-- 岗位 对应 机构类别
-- ==========================================

insert into hr.org_type_scope_map (org_type_code, scope_code)
values
  ('10230001', 'group'),

  ('10230002', 'company'),
  ('10230003', 'company'),
  ('10230013', 'company'),

  ('10230004', 'project_org'),
  ('10230016', 'project_org'),

  ('10230006', 'company'),
  ('10230007', 'company'),
  ('10230012', 'company'),
  ('10230017', 'company'),
  ('10230018', 'company'),

  ('10230005', 'department'),
  ('10230015', 'department'),
  ('10230010', 'department'),

  ('10230008', 'company'),
  ('10230011', 'company'),
  ('10230014', 'company'),

  ('10230009', 'department')
on conflict (org_type_code) do update
set scope_code = excluded.scope_code;



-- ==========================================
-- 岗位 POST
-- ==========================================


INSERT INTO hr.posts ( code, name, scope_code,category_code,grade,sort_order)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10180001', '董事长','company','management','2'),
    ('10180002', '党委书记','company','management','2'),
    ('10180003', '总经理','company','management','2'),
    ('10180004', '正处级项目经理','project_org','management','3'),
    ('10180005', '党委副书记','company','management','2'),
    ('10180006', '工会主席','company','management','2'),
    ('10180007', '纪委书记','company','management','2'),
    ('10180008', '副总经理','company','management','2'),
    ('10180009', '总经济师','company','management','2'),
    ('10180010', '总会计师','company','management','2'),
    ('10180011', '总工程师','company','management','2'),
    ('10180012', '调研员','company','management','2'),
    ('10180013', '副处级项目经理','company','management','3'),
    ('10180014', '总法律顾问','company','management','2'),
    ('10180015', '高管','company','management','2'),
    ('10180016', '院长','company','management','2'),
    ('10180017', '副院长','company','management','2'),
    ('10180018', '纪委副书记','company','management','2'),
    ('10180019', '工会副主席','company','management','2'),
    ('10180020', '副总工程师','company','management','2'),
    ('10180021', '副总会计师','company','management','2'),
    ('10180022', '副总经济师','company','management','2'),
    ('10180023', '财务总监','company','management','2'),
    ('10180024', '安全总监','company','management','2'),
    ('10180025', '部长','company','management','2'),
    ('10180026', '主任','company','management','2'),
    ('10180027', '管控组组长','company','management','2'),
    ('10180028', '团委书记','company','management','2'),
    ('10180029', '副部长','company','management','2'),
    ('10180030', '副主任','company','management','2'),
    ('10180031', '管控组副组长','company','management','2'),
    ('10180032', '科长','company','management','2'),
    ('10180033', '项目经理','project_org','management','3'),
    ('10180034', '项目书记','project_org','management','3'),
    ('10180035', '指挥长','project_org','management','3'),
    ('10180036', '常务副指挥长','project_org','management','3'),
    ('10180037', '常务副经理','project_org','management','3'),
    ('10180038', '副经理','project_org','management','3'),
    ('10180039', '项目副书记','project_org','management','3'),
    ('10180040', '经理助理','project_org','management','3'),
    ('10180041', '副指挥长','project_org','management','3'),
    ('10180042', '项目部长','project_org','management','3'),
    ('10180043', '项目主任','project_org','management','3'),
    ('10180044', '队长','project_org','management','3'),
    ('10180045', '工区长','project_org','management','3'),
    ('10180046', '项目副部长','project_org','management','3'),
    ('10180047', '项目副主任','project_org','management','3'),
    ('10180048', '副队长','project_org','management','3'),
    ('10180049', '技术主管','project_org','management','3'),
    ('10180050', '测量主管','project_org','management','3'),
    ('10180051', '试验主管','project_org','management','3'),
    ('10180052', '物机主管','project_org','management','3'),
    ('10180053', '财务主管','project_org','management','3'),
    ('10180054', '工经主管','project_org','management','3'),
    ('10180055', '安质主管','project_org','management','3'),
    ('10180056', '技术员','project_org','management','3'),
    ('10180057', '测量员','project_org','management','3'),
    ('10180058', '安全员','project_org','management','3'),
    ('10180059', '会计员','project_org','management','3'),
    ('10180060', '材料员','project_org','management','3'),
    ('10180061', '资料员','project_org','management','3'),
    ('10180062', '预算员','project_org','management','3'),
    ('10180063', '施工员','project_org','management','3'),
    ('10180064', '调度员','project_org','management','3'),
    ('10180065', '试验员','project_org','management','3'),
    ('10180066', '职员','project_org','management','3'),
    ('10180067', '管理员','project_org','management','3'),
    ('10180068', '劳务员','project_org','management','3'),
    ('10180069', '机管员','project_org','management','3'),
    ('10180070', '协调员','project_org','management','3'),
    ('10180071', '机械员','project_org','management','3'),
    ('10180072', '干事','company','management','2'),
    ('10180073', '盾构副机长','project_org','management','3'),
    ('10180074', '机修工','project_org','management','3'),
    ('10180075', '盾构司机','project_org','management','3'),
    ('10180076', '一级专家','project_org','management','3'),
    ('10180077', '二级专家','project_org','management','3'),
    ('10180078', '站长','project_org','management','3'),
    ('10180079', '纪检员','project_org','management','3'),
    ('10180080', '团委副书记','project_org','management','3'),
    ('10180081', '巡查员','project_org','management','3'),
    ('10180082', '管控组组员','project_org','management','3'),
    ('10180083', '支部书记','project_org','management','3'),
    ('10180084', '总经理助理','company','management','2'),
    ('10180085', '业务经理','company','management','2'),
    ('10180086', '执行董事','company','management','2'),
    ('10180087', '院长助理','company','management','2'),
    ('10180088', '设计总监','company','management','2'),
    ('10180089', '外派董事','company','management','2'),
    ('10180090', '常务副总经理','company','management','2'),
    ('10180091', '常务副部长','company','management','2'),
    ('10180092', '副总法律顾问','company','management','2'),
    ('10180093', '一级职员','company','management','2'),
    ('10180094', '二级职员','company','management','2'),
    ('10180095', '三级职员','company','management','2'),
    ('10180096', '四级职员','company','management','2'),
    ('10180097', '市场经理','company','management','2'),
    ('10180098', '高级专务','company','management','2'),
    ('10180099', '专务','company','management','2'),
    ('10180100', '待岗人员','company','management','2'),
    ('10180101', '离岗休息人员','company','management','2'),
    ('10180102', '助勤人员','company','management','2'),
    ('10180103', '党工委书记','company','management','2'),
    ('10180104', '总编辑','company','management','2'),
    ('10180105', '副总编辑','company','management','2'),
    ('10180106', '副部长（副队长）','company','management','2'),
    ('10180107', '副部长（副队长）','company','management','2'),
    ('10180108', '副部长（副队长）','company','management','2'),
    ('10180109', '汽车驾驶员','company','management','2'),
    ('10180110', '厨师','company','management','2'),
    ('10180111', '副部长（主持工作）','company','management','2'),
    ('10180112', '副主任（主持工作）','company','management','2'),
    ('10180113', '副指挥长（主持行政工作）','company','management','2'),
    ('10180114', '建设工程安全官','company','management','2'),
    ('10180115', '党工委副书记（主持党工委工作）','company','management','2'),
    ('10180116', '商务经理','project_org','management','3')
    ('10180117', '总工程师','project_org','management','3')
) AS v(code, name)
ON true
WHERE md.code = 'POST'
ON CONFLICT (definition_id, code) DO NOTHING;






