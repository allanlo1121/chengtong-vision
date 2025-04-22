/ / 盾构类型
CREATE TABLE
    tbm_types (
        id SERIAL PRIMARY KEY, -- 自动递增的唯一标识符
        code VARCHAR(255) NOT NULL, -- 代码，最大长度为 255
        name VARCHAR(255) NOT NULL, -- 名称，最大长度为 255
        remark TEXT -- 备注，可以为空
    );

-- 创建一个索引来优化基于 `code` 字段的查询（可选）
CREATE INDEX idx_tbm_types_code ON tbm_types (code);

-- 创建 DriverType 枚举类型
CREATE TYPE driver_type AS ENUM ('电驱', '液压');

-- 创建 DriverType 枚举类型
CREATE TYPE driver_type AS ENUM ('electric', 'hydraulic');

-- 创建 tbm_types 表
CREATE TABLE
    tbm_types (
        id SERIAL PRIMARY KEY, -- 自动递增的唯一标识符
        code VARCHAR(255) NOT NULL, -- 代码，最大长度为 255
        name VARCHAR(255) NOT NULL, -- 名称，最大长度为 255
        remark TEXT -- 备注，可以为空
    );

-- 创建 tbm_info 表
CREATE TABLE tbm_info (
  id SERIAL PRIMARY KEY,  -- 自动递增的唯一标识符
  code VARCHAR(255) NOT NULL,  -- 设备代码, 可以为 NULL
  name VARCHAR(255) NOT NULL,  -- 设备名称, 可以为 NULL
  tbm_model VARCHAR(255),  -- TBM 型号, 可以为 NULL
  tbm_type INTEGER,  -- 设备类型 ID, 可以为 NULL
  diameter NUMERIC NOT NULL,  -- 直径, 可以为 NULL
  device_len NUMERIC,  -- 设备长度, 可以为 NULL
  device_weight NUMERIC,  -- 设备重量, 可以为 NULL
  device_power NUMERIC,  -- 设备功率, 可以为 NULL
  cutter_speed NUMERIC,  -- 切削速度, 可以为 NULL
  producer VARCHAR(255),  -- 生产厂家, 可以为 NULL
  driver VARCHAR(255),  -- 驱动方式, 可以为 NULL
  production_date DATE,  -- 生产日期, 可以为 NULL
  owner INTEGER,  -- 所有者 ID, 可以为 NULL
  rated_thrust NUMERIC,  -- 额定推力, 可以为 NULL
  cutter_torque NUMERIC,  -- 切削扭矩, 可以为 NULL
  source BOOLEAN,  -- 资源来源, 可以为 NULL
  hinge INTEGER,  -- 铰接数量, 可以为 NULL
  geo VARCHAR(255),  -- 地理位置, 可以为 NULL
  remark TEXT,  -- 备注, 可以为 NULL
  cutter_open INTEGER,  -- 切削口径, 可以为 NULL
  ctbm_code VARCHAR(255),  -- TBM 代码, 可以为 NULL
  motor_num INTEGER,  -- 电机数量, 可以为 NULL
  frequency NUMERIC,  -- 频率, 可以为 NULL
  gf_ids INTEGER,  -- GF IDs, 可以为 NULL
  screw_torque NUMERIC,  -- 螺旋扭矩, 可以为 NULL
  screw_power NUMERIC,  -- 螺旋功率, 可以为 NULL
  segment_outer NUMERIC,  -- 隧道外径, 可以为 NULL
  worth NUMERIC,  -- 价值, 可以为 NULL
  segment_param VARCHAR(255),  -- 隧道段参数, 可以为 NULL
  use_date INTEGER,  -- 使用日期, 可以为 NULL
  particle_size NUMERIC,  -- 粒径, 可以为 NULL
  fp_power NUMERIC,  -- FP 功率, 可以为 NULL
  boot_support NUMERIC,  -- 启动支撑, 可以为 NULL
  main_belt_speed NUMERIC,  -- 主带速, 可以为 NULL
  le_belt_speed NUMERIC,  -- LE 带速, 可以为 NULL
  plc_file_ids VARCHAR(255),  -- PLC 文件 ID, 可以为 NULL
  alarm_time_limit NUMERIC,  -- 警报时间限制, 可以为 NULL
  producer_name VARCHAR(255),  -- 生产商名称, 可以为 NULL
  owner_name VARCHAR(255),  -- 所有者名称, 可以为 NULL
  driver_type driver_type NOT NULL,  -- 驱动类型（使用 ENUM 类型）
  thrust_group_num INTEGER,  -- 推力组数量, 可以为 NULL
  earth_pressure_bar_num INTEGER,  -- 土仓压力表数量, 可以为 NULL

  CONSTRAINT fk_tbm_type FOREIGN KEY (tbm_type) REFERENCES tbm_types(id)
);

CREATE TYPE project_status_enum AS ENUM ('在建', '停工', '竣工');

CREATE TABLE sub_projects (
  id SERIAL PRIMARY KEY,  -- 子项目的唯一标识符
  project_id INTEGER NOT NULL,  -- 外键，引用父项目的 project_id，不能为空
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
  twins BOOLEAN,  -- 是否为双胞胎设备，可以为 NULL
  op_num_start NUMERIC,  -- 开始作业环号，改为小数类型
  op_num_end NUMERIC,  -- 结束作业环号，改为小数类型 
  short_name VARCHAR(255),  -- 工程名称，可以为 NULL
  project_name VARCHAR(255) NOT NULL,  -- 项目名称，不能为空
  build_name VARCHAR(255),  -- 建设单位名称，可以为 NULL
  area_name VARCHAR(255),  -- 区域名称，可以为 NULL
  hover BOOLEAN,  -- 是否悬浮，可以为 NULL
  start_date DATE,  -- 项目开始日期（日期类型）
  end_date DATE,  -- 项目结束日期（日期类型）
  create_by INTEGER NOT NULL,  -- 创建者 ID，不能为空
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 创建时间，不能为空
  update_by INTEGER,  -- 更新者 ID，可以为 NULL
  update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 更新时间，可以为 NULL
  remark TEXT,  -- 备注，可以为 NULL  
  owner_name VARCHAR(255),  -- 业主（建设单位）名称，可以为 NULL
  areacode VARCHAR(50),  -- 区域编码，可以为 NULL
  sub_project_status project_status_enum NOT NULL, --工程状态

  CONSTRAINT fk_project_id FOREIGN KEY (project_id) REFERENCES projects(id)  -- 外键约束，引用父项目的 ID
);

CREATE TABLE tbm_sub_project_history (
  id SERIAL PRIMARY KEY,  -- 历史记录唯一标识
  tbm_id INT NOT NULL,  -- TBM的id（外键）
  sub_project_id INT NOT NULL,  -- 子项目的id（外键）
  start_date DATE NOT NULL,  -- 绑定开始时间
  end_date DATE,  -- 绑定结束时间（NULL 表示当前绑定）
  FOREIGN KEY (tbm_id) REFERENCES tbm_infos(id) ON DELETE CASCADE,
  FOREIGN KEY (sub_project_id) REFERENCES sub_projects(id) ON DELETE CASCADE
);


