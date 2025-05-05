CREATE TABLE
    projects (
    id SERIAL PRIMARY KEY,
    project_name character varying(255) NOT NULL,   
    construction_costs numeric,
    design_units character varying(255),
    project_address character varying(255),
    project_lon_lat character varying(50),
    project_address_name character varying(255),
    supervision_unit character varying(255),
    contract_start_date date,
    contract_end_date date,
    actual_start_date date,
    actual_end_date date,
    project_status character varying(20),
    project_leader character varying(255),
    project_leader_phone character varying(20),
    project_introduction text,
    satellite_img bytea,
    floor_plan bytea,
    profile_map bytea,
    project_length character varying(50),
    del_flag boolean DEFAULT false,
    create_by integer,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    update_by integer,
    update_time timestamp without time zone,
    remark text,
    params jsonb,
    owner_name character varying(255),
    areacode character varying(50),
    short_name character varying,
    region_id integer,  -- 区域 ID，外键引用 regions 表
    );


CREATE TABLE subprojects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- 子项目的唯一标识符
  name VARCHAR(255) NOT NULL,  -- 子项目名称，不能为空
  project_id UUID NOT NULL,  -- 外键，引用父项目的 proj_id，不能为空 
  short_name VARCHAR(255),  -- 工程名称，可以为 NULL 
  wtype VARCHAR(255),  -- 工况类型，可以为 NULL
  ring_start INTEGER,  -- 起始环号，可以为 NULL
  ring_end INTEGER,  -- 结束环号，可以为 NULL  
  mshift BOOLEAN,  -- 是否为换班工作，可以为 NULL
  twins BOOLEAN,  -- 是否为双线，可以为 NULL
  op_num_start INTEGER,  -- 起始里程，可以为 NULL
  op_num_end INTEGER,  -- 结束里程，可以为 NULL 
  plan_start_date INTEGER,  -- 开始日期（时间戳），可以为 NULL
  plan_end_date INTEGER,  -- 结束日期（时间戳），可以为 NULL
  status ENUM Project_status,  -- 状态，可以为 NULL
  remark TEXT,  -- 备注，可以为 NULL

  CONSTRAINT fk_project_id FOREIGN KEY (project_id) REFERENCES projects(id)  -- 外键约束，引用父项目的 ID
);

DROP VIEW IF EXISTS v_projects_overview ;

CREATE VIEW v_projects_overview AS
SELECT 
  p.id,
  p.name,
  p.short_name,
  r.name AS region_name,
  json_agg(
    json_build_object(
      'id', sp.id,
      'short_name', sp.short_name,
      'status', sp.status
    )
  ) AS sub_projects,
  p.construction_costs,
  p.leader,
  p.contract_start_date,
  p.contract_end_date,
  p.address_name,
  p.status
FROM 
  projects p
LEFT JOIN 
  subprojects sp ON p.id = sp.project_id
LEFT JOIN
  regions r ON p.region_id = r.id
GROUP BY 
  p.id, p.name, p.short_name, r.name,
  p.construction_costs, p.leader,
  p.contract_start_date, p.contract_end_date,
  p.address_name, p.status;


DROP VIEW IF EXISTS v_subproject_full;

CREATE OR REPLACE VIEW v_project_subproject_summary AS
SELECT 
  sp.id,
  sp.short_name AS subproject_short_name,
  sp.project_id,
  p.short_name AS project_short_name,
  p.region,
  sp.sub_project_status AS subproject_status,
  h.tbm_id AS current_tbm_id  -- 新增字段
FROM 
  sub_projects sp
JOIN 
  projects p ON sp.id = p.id
LEFT JOIN 
  tbm_sub_project_history h ON sp.id = h.sub_project_id AND h.end_date IS NULL;



CREATE TABLE regions (
  id SERIAL PRIMARY KEY,              -- 区域 ID
  name VARCHAR(50) UNIQUE NOT NULL DEFAULT '华东',  -- 区域名称默认 '华东'
  provinces TEXT[],                   -- 区域包含的省份
  manager_id INTEGER,                 -- 片区负责人（可关联员工表）
  created_at TIMESTAMP DEFAULT now()
);

INSERT INTO regions (name, provinces, manager_id)
VALUES 
  ('华东', ARRAY['上海', '江苏', '浙江', '安徽'], NULL),
  ('华南', ARRAY['广东', '福建', '海南'], NULL),
  ('西南', ARRAY[ '贵州', '云南','湖北'], NULL),
  ('中南',ARRAY['广西','湖南','江西'],NULL),
  ('北方', ARRAY['辽宁', '吉林', '黑龙江','内蒙古'], NULL),
  ('西北', ARRAY['陕西', '甘肃', '青海', '宁夏', '新疆'], NULL), 
  ('川渝', ARRAY['四川', '重庆'], NULL),
  ('晋鲁豫', ARRAY['山西', '山东','河南'], NULL),
  ('京津冀',ARRAY['北京', '天津', '河北'], NULL),
  ('海外',ARRAY['尼泊尔'],NULL);


CREATE VIEW v_projects_overview AS
SELECT 
  p.id,
  p.name,
  p.short_name,
  r.name AS region_name,
  json_agg(
    json_build_object(
      'id', sp.id,
      'short_name', sp.short_name,
      'status', sp.status
    )
  ) AS sub_projects,
  p.construction_costs,
  p.leader,
  p.contract_start_date,
  p.contract_end_date,
  p.address_name,
  p.status
FROM 
  projects p
LEFT JOIN 
  sub_projects sp ON p.id = sp.project_id
LEFT JOIN
  regions r ON p.region_id = r.id
GROUP BY 
  p.id, p.name, p.short_name, r.name,
  p.construction_costs, p.leader,
  p.contract_start_date, p.contract_end_date,
  p.address_name, p.status;


--项目领导表
  CREATE TABLE project_leader_history (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  leader_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE SET NULL,
  start_date DATE NOT NULL,
  end_date DATE,  -- 为空表示当前负责人
  created_at TIMESTAMP DEFAULT now()
);

CREATE OR REPLACE VIEW v_projects_overview AS
SELECT 
  p.id,
  p.name,
  p.short_name,
  r.name AS region_name,

  -- 子项目 JSON 聚合
  json_agg(
    json_build_object(
      'id', sp.id,
      'short_name', sp.short_name,
      'status', sp.status
    )
  ) AS sub_projects,

  p.construction_costs,

  -- 当前负责人：拼接 last_name + first_name
  CONCAT(e.last_name, e.first_name) AS leader,

  p.contract_start_date,
  p.contract_end_date,
  p.address_name,
  p.status

FROM 
  projects p

LEFT JOIN subprojects sp ON p.id = sp.project_id
LEFT JOIN regions r ON p.region_id = r.id

-- 加入项目负责人（当前负责人的记录）
LEFT JOIN project_leader_history plh ON plh.project_id = p.id AND plh.end_date IS NULL
LEFT JOIN employees e ON e.id = plh.leader_id

GROUP BY 
  p.id, p.name, p.short_name, r.name,
  p.construction_costs,
  CONCAT(e.last_name, e.first_name),
  p.contract_start_date, p.contract_end_date,
  p.address_name, p.status;






CREATE OR REPLACE VIEW v_tunnels_overview AS
SELECT 
  t.id,
  t.name,
  t.short_name,
  r.name AS region_name,
  p.short_name AS project_short_name,
  t.plan_start_date,
  t.plan_end_date,
  t.wtype,
  t.ring_start,
  t.ring_end,
  t.mshift,
  t.twins,
  t.op_num_start,
  t.op_num_end,
  t.status,
  tb.name AS tbm_name
FROM tunnels t
LEFT JOIN projects p ON t.project_id = p.id
LEFT JOIN regions r ON p.region_id = r.id
LEFT JOIN tbms tb ON tb.id = t.tbm_id
GROUP BY 
  t.id, t.name, t.short_name, r.name, p.short_name,
  t.plan_start_date, t.plan_end_date, t.wtype,
  t.ring_start, t.ring_end, t.mshift, t.twins,
  t.op_num_start, t.op_num_end, t.status, tb.name;