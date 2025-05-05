-- 中文名 | 字段名（小写蛇形） | 英文名称
-- 计划始发时间 | plan_launch_date | Planned Launch Date
-- 实际始发时间 | actual_launch_date | Actual Launch Date
-- 计划到达时间（贯通时间） | plan_arrival_date | Planned Arrival Date
-- 实际到达时间（贯通时间） | actual_arrival_date | Actual Arrival Date
-- 计划贯通时间 | plan_breakthrough_date | Planned Breakthrough Date
-- 实际贯通时间 | actual_breakthrough_date | Actual Breakthrough Date
-- 计划洞门施工完成时间 | plan_portal_completion_date | Planned Portal Completion Date
-- 实际洞门施工完成时间 | actual_portal_completion_date | Actual Portal Completion Date
-- 计划掘进开始时间（盾构掘进） | plan_excavation_start_date | Planned Excavation Start Date
-- 实际掘进开始时间 | actual_excavation_start_date | Actual Excavation Start Date
-- 计划掘进完成时间 | plan_excavation_end_date | Planned Excavation End Date
-- 实际掘进完成时间 | actual_excavation_end_date | Actual Excavation End Date
CREATE TABLE
    tbm_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        tunnel_id UUID REFERENCES tunnels (id) ON DELETE CASCADE,
        tbm_id UUID REFERENCES tbms (id),
        changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        changed_by TEXT, -- 可选，记录操作人
        remark TEXT -- 可选说明字段
    );

CREATE TABLE
    tunnels (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (), -- 子项目的唯一标识符
        name VARCHAR(255) NOT NULL, -- 子项目名称，不能为空
        project_id UUID NOT NULL, -- 外键，引用父项目的 proj_id，不能为空 
        short_name VARCHAR(255), -- 工程名称，可以为 NULL 
        wtype VARCHAR(255), -- 工况类型，可以为 NULL
        ring_start INTEGER, -- 起始环号，可以为 NULL
        ring_end INTEGER, -- 结束环号，可以为 NULL    
        op_num_start NUMERIC, -- 起始里程，可以为 NULL
        op_num_end NUMERIC, -- 结束里程，可以为 NULL 
        plan_launch_date TIMESTAMPTZ, -- 开始日期（时间戳），可以为 NULL
        plan_breakthrough_date TIMESTAMPTZ, -- 结束日期（时间戳），可以为 NULL
        actual_launch_date TIMESTAMPTZ, -- 开始日期（时间戳），可以为 NULL
        actual_breakthrough_date TIMESTAMPTZ, -- 结束日期（时间戳），可以为 NULL
        status ENUM Project_status, -- 状态，可以为 NULL
        remark TEXT, -- 备注，可以为 NULL

        tbm_id UUID REFERENCES tbms(id),
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
        CONSTRAINT fk_project_id FOREIGN KEY (project_id) REFERENCES projects (id) -- 外键约束，引用父项目的 ID
    );


-- 创建自动更新时间的函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 给 tunnels 表加触发器
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON tunnels
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();




CREATE OR REPLACE VIEW v_tunnels_overview AS
SELECT 
  t.id,
  t.name,
  t.short_name,
  r.name AS region_name,
  p.short_name AS project_short_name,
  t.ring_start,
  t.ring_end,
  t.wtype,
  t.plan_launch_date,
  t.plan_breakthrough_date,
  t.actual_launch_date,
  t.actual_breakthrough_date,
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
  t.ring_start, t.ring_end, t.wtype,
  t.plan_launch_date, t.plan_breakthrough_date, t.actual_launch_date,t.actual_breakthrough_date,t.mshift, t.twins,
  t.op_num_start, t.op_num_end, t.status, tb.name;