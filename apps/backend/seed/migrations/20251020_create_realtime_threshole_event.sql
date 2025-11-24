-- ============================================
-- 表：realtime_threshold_events（实时阈值告警事件表）
-- 用于记录 TBM 实时参数超限、预警等触发事件
-- ============================================

CREATE TABLE IF NOT EXISTS public.realtime_threshold_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),               -- 主键
    tbm_id uuid REFERENCES tbms(id) ON DELETE SET NULL,          -- 盾构机ID
    ring_no integer SET NOT NULL,                                             -- 当前环号，可为空
    param_id integer REFERENCES tbm_realtime_params(id) ON DELETE SET NULL,
                                                                  -- 触发参数ID
    metric_value double precision NOT NULL,               -- 触发时的参数值
    normal_range normal_range double precision[] NOT NULL,                             -- 正常范围描述
    severity text NOT NULL CHECK (severity IN ('normal', 'warning', 'extreme')),
    -- 告警等级

    triggered_at timestamptz NOT NULL DEFAULT now(),             -- 触发时间
    message text,                                                -- 告警描述信息
    payload jsonb,                                               -- 触发时的原始参数数据
    notified_channels text[] DEFAULT '{}',                       -- 已通知通道

    ack_status text DEFAULT 'unacknowledged' CHECK (
        ack_status IN ('unacknowledged', 'acknowledged', 'ignored')
    ),                                                           -- 确认状态
    ack_by uuid,                                                 -- 确认人
    ack_at timestamptz,                                          -- 确认时间

    -- ✅ 新增：解决状态与解决信息
    resolution_status text DEFAULT 'pending' CHECK (
        resolution_status IN ('pending', 'in_progress', 'resolved', 'closed')
    ),                                                           -- 解决状态
    resolution text,                                             -- 解决说明
    resolved_at timestamptz,                                     -- 解决时间
    resolved_by uuid REFERENCES employees(id) ON DELETE SET NULL,-- 解决人

    extra jsonb,                                                 -- 扩展字段
    
    tbm_subsystem_id integer REFERENCES tbm_subsystems(id) ON DELETE SET NULL, 

    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- 更新时间自动维护
CREATE OR REPLACE FUNCTION update_realtime_threshold_events_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_realtime_threshold_events_updated_at
BEFORE UPDATE ON public.realtime_threshold_events
FOR EACH ROW
EXECUTE FUNCTION update_realtime_threshold_events_updated_at();

-- 常用索引
CREATE INDEX IF NOT EXISTS idx_rte_tbm_id ON public.realtime_threshold_events(tbm_id);
CREATE INDEX IF NOT EXISTS idx_rte_severity ON public.realtime_threshold_events(severity);
CREATE INDEX IF NOT EXISTS idx_rte_resolution_status ON public.realtime_threshold_events(resolution_status);
CREATE INDEX IF NOT EXISTS idx_rte_triggered_at ON public.realtime_threshold_events(triggered_at DESC);
CREATE INDEX IF NOT EXISTS idx_rte_ack_status ON public.realtime_threshold_events(ack_status);

DROP INDEX IF EXISTS uq_realtime_threshold_events_param;
CREATE UNIQUE INDEX uq_realtime_threshold_events_open
ON public.realtime_threshold_events (tbm_id, ring_no, param_id, severity,window_ms)

WHERE resolution_status IN ('pending','in_progress');