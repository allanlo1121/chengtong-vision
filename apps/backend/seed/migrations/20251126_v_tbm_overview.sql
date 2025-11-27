DROP VIEW v_tbm_assignments_overview ;

CREATE OR REPLACE VIEW v_tbm_assignments_overview AS
SELECT 
    -- ===== TBM 基本信息 =====
    ta.tbm_id AS tbm_id,
    ta.operation_status AS tbm_operation_status,
    tb.name AS tbm_name,
    tb.code AS tbm_code,
    tb.model AS tbm_model,    
    tb.diameter,

    -- ===== 当前分配（有效的 TBM 接力/历史时间） =====
    ta.id AS assignment_id,    

    -- ===== 隧道实体（tunnels）======
    t.id AS tunnel_id,
    t.name AS tunnel_name,                 -- 例如“运~北区间右线”
    t.status_id,
    t.start_chainage,
    t.end_chainage,
    t.start_stake,
    t.end_stake,
    t.prefix,
    t.geology,
    t.longitude,
    t.latitude,

    -- ===== 工程目录（确定区间/左线）======
    pc.id AS catalog_id,
    pc.name AS catalog_name,               -- 左线/右线名称
    pc.parent_id AS section_id,
    pc2.name AS section_name,              -- 区间名称

    -- ===== 项目 =====
    p.id AS project_id,
    p.name AS project_name,
    p.name AS project_short_name,

    -- ===== 项目负责人 =====
    leaders.leaders   -- JSON 字段

FROM tbm_assignments ta

-- 当前有效 TBM 分配记录
LEFT JOIN tbms tb
       ON tb.id = ta.tbm_id

-- 隧道实体
LEFT JOIN tunnels t
       ON t.id = ta.tunnel_id

-- 工程目录：tunnel.project_catalog_id 对应左线/右线
LEFT JOIN project_catalogs pc
       ON pc.id = t.project_catalog_id

-- 区间节点（pc 的父节点）
LEFT JOIN project_catalogs pc2
       ON pc2.id = pc.parent_id

-- 项目
LEFT JOIN projects p
       ON p.id = t.project_id

-- 项目负责人（当前有效）
LEFT JOIN LATERAL (
    SELECT jsonb_agg(
        jsonb_build_object(
            'id', plh.employee_id,
            'name', e.name,
            'phone', e.phone_number,
            'role_id', plh.leader_role_id,
            'role_name', md.name,
            'valid_from', plh.valid_from,
            'valid_to', plh.valid_to
        )
    ) AS leaders
    FROM project_leader_history plh
    LEFT JOIN employees e ON e.id = plh.employee_id
    LEFT JOIN master_data md ON md.id = plh.leader_role_id
    WHERE plh.project_id = p.id
      AND (plh.valid_to IS NULL OR plh.valid_to > now())
) leaders ON TRUE;