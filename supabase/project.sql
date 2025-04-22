CREATE TABLE
    projects (
    id SERIAL PRIMARY KEY,
    project_name character varying(255) NOT NULL,
    project_id character varying(50),
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
    region public.region_enum DEFAULT '华东'::public.region_enum NOT NULL
    );


CREATE TABLE sub_projects (
  sub_project_id SERIAL PRIMARY KEY,  -- 子项目的唯一标识符
  project_id INTEGER NOT NULL,  -- 外键，引用父项目的 proj_id，不能为空
  builder INTEGER,  -- 建设单位 ID，可以为 NULL
  wtype VARCHAR(255),  -- 工况类型，可以为 NULL
  ring_start INTEGER,  -- 起始环号，可以为 NULL
  ring_end INTEGER,  -- 结束环号，可以为 NULL
  tbm_code VARCHAR(255),  -- TBM 代码，可以为 NULL
  mshift BOOLEAN,  -- 是否为换班工作，可以为 NULL
  lng NUMERIC,  -- 经度，可以为 NULL
  lat NUMERIC,  -- 纬度，可以为 NULL
  direction BOOLEAN,  -- 方向，可以为 NULL
  loc VARCHAR(255),  -- 位置，可以为 NULL
  risk_dis NUMERIC,  -- 风险距离，可以为 NULL
  remark TEXT,  -- 备注，可以为 NULL
  twins BOOLEAN,  -- 是否为双胞胎设备，可以为 NULL
  op_num_start INTEGER,  -- 开始作业环号，可以为 NULL
  op_num_end INTEGER,  -- 结束作业环号，可以为 NULL 
  bid INTEGER,  -- 建设单位 ID，可以为 NULL
  xid INTEGER,  -- 外部 ID，可以为 NULL
  short_name VARCHAR(255),  -- 工程名称，可以为 NULL
  project_name VARCHAR(255) NOT NULL,  -- 项目名称，不能为空
  build_name VARCHAR(255),  -- 建设单位名称，可以为 NULL
  area_name VARCHAR(255),  -- 区域名称，可以为 NULL
  hover BOOLEAN,  -- 是否悬浮，可以为 NULL
  start_date INTEGER,  -- 开始日期（时间戳），可以为 NULL
  end_date INTEGER,  -- 结束日期（时间戳），可以为 NULL
  state_id INTEGER,  -- 状态 ID，可以为 NULL

  CONSTRAINT fk_project_id FOREIGN KEY (project_id) REFERENCES projects(id)  -- 外键约束，引用父项目的 ID
);



CREATE VIEW v_project_subproject_summary AS
SELECT 
  sp.id,
  sp.short_name AS subproject_short_name,
  sp.project_id,
  p.short_name AS project_short_name,
  p.region
FROM 
  sub_projects sp
JOIN 
  projects p ON sp.project_id = p.id;

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