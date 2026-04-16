
CREATE TABLE public.projects (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),

--基本信息
  name                    TEXT NOT NULL,                 -- 项目全称
  fullname                TEXT,                          -- 项目简称
  code                    TEXT NOT NULL,          -- 项目编码
  project_overview        TEXT,                          -- 项目描述
  project_key_points      TEXT,                          -- 项目要点
  project_scope           TEXT,                          -- 项目范围  

--工程管理信息
  organization_id              UUID REFERENCES organizations(id), -- 负责该项目的组织机构
  project_management_mode_id   UUID REFERENCES master_data(id),       -- 管理模式（如“自管”、“托管”）
  project_type_id              UUID REFERENCES master_data(id),       -- 工程类型（如“铁路工程”、“公路工程”）
  project_sub_type_id   UUID REFERENCES master_data(id),             -- 子工程类型（如“高铁”、“客专”）
 

--进度信息时间
  actual_start_date      DATE,                                       -- 实际开工日期
  actual_end_date        DATE,                                       -- 实际竣工日期



--位置信息
  country_code            text REFERENCES countries(code),             -- 国家（如“中国”） 
  region_id             UUID REFERENCES master_data(id),             -- 大区（如“华东区”、“华北区”）
  province_code           text REFERENCES admin_regions(code),             -- 省份（如“上海市”、“北京市”）
  city_code               text REFERENCES admin_regions(code),             -- 城市（如“上海”、“北京”）  
  district_code           text REFERENCES admin_regions(code),             -- 区/县（如“浦东新区”、“朝阳区”）
  address               TEXT,                                        -- 详细地址（如“世纪大道100号”）
  longitude             DECIMAL(10, 6),                              -- 经度
  latitude              DECIMAL(10, 6),                              -- 纬度


--外部标识
  external_id    text,                        -- 外部全局唯一标识
  external_version    int,                                        -- 外部来源系统标识

  check (latitude between -90 and 90),
  check (longitude between -180 and 180)


);


