CREATE TABLE tunnel_daily_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),       -- UUID主键
  tunnel_id UUID NOT NULL,
  plan_at TIMESTAMPTZ NOT NULL,                        -- 计划日期时间
  plan_ring_count INT NOT NULL,                        -- 计划环数

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),                -- 更新时间
  modified_by UUID,                                    -- 预留：修改用户 ID（可关联 users 表）

  CONSTRAINT unique_tunnel_date UNIQUE (tunnel_id, plan_at),
  CONSTRAINT fk_tunnel FOREIGN KEY (tunnel_id) REFERENCES tunnels(id) ON DELETE CASCADE
);
