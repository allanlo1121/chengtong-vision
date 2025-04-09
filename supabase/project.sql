CREATE TABLE
    projects (
        id SERIAL PRIMARY KEY, -- 项目唯一标识符
        project_name VARCHAR(255) NOT NULL, -- 项目名称，不能为空
        project_id VARCHAR(50), -- 项目ID，字符串类型，可以为 NULL
        construction_costs NUMERIC, -- 施工成本（产值），可以为 NULL
        design_units VARCHAR(255), -- 设计单位，可以为 NULL
        project_address VARCHAR(255), -- 项目地址，可以为 NULL
        project_lon_lat VARCHAR(50), -- 项目经纬度，可以为 NULL
        project_address_name VARCHAR(255), -- 项目地址名称，可以为 NULL
        supervision_unit VARCHAR(255), -- 监理单位，可以为 NULL
        contract_start_date DATE, -- 合同开工日期，可以为 NULL
        contract_end_date DATE, -- 合同结束日期，可以为 NULL
        actual_start_date DATE, -- 实际开始日期，可以为 NULL
        actual_end_date DATE, -- 实际结束日期，可以为 NULL
        project_status VARCHAR(20), -- 项目状态：前期、大干、收尾、竣工、未开工
        project_leader VARCHAR(255), -- 项目负责人，可以为 NULL
        project_leader_phone VARCHAR(20), -- 项目负责人电话，可以为 NULL
        project_introduction TEXT, -- 项目简介，可以为 NULL
        satellite_img BYTEA, -- 卫星图像，可以为 NULL
        floor_plan BYTEA, -- 平面图，可以为 NULL
        profile_map BYTEA, -- 剖面图，可以为 NULL
        project_length VARCHAR(50), -- 项目长度，可以为 NULL
        del_flag BOOLEAN DEFAULT FALSE, -- 删除标记，表示项目是否已删除，默认值为 FALSE       
        create_by INTEGER, -- 创建者 ID，不能为空
        create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 创建时间，不能为空
        update_by INTEGER, -- 更新者 ID，可以为 NULL
        update_time TIMESTAMP, -- 更新时间，可以为 NULL
        remark TEXT, -- 备注，可以为 NULL
        params JSONB, -- 附加参数，可以为 NULL
        owner_name VARCHAR(255), -- 业主（建设单位）名称，可以为 NULL
        areacode VARCHAR(50) -- 区域编码，可以为 NULL
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
