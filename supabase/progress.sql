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

create extension if not exists "pgcrypto"; -- 若尚未启用 gen_random_uuid()

create table tunnel_daily_progress (
  id uuid primary key default gen_random_uuid(),

  plan_ring_count int, 
  tunnel_id uuid not null,

  ring_start int,
  ring_end int,

  op_num_start numeric,
  op_num_end numeric,

  progress_at timestamptz not null,          -- 数据记录时间（例如 2025-05-06）

  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  modified_by uuid,                          -- 预留：记录修改人

  -- 外键约束

  constraint fk_tunnel foreign key (tunnel_id) references tunnels(id) on delete cascade
);create unique index uniq_tunnel_progress_per_day on tunnel_daily_progress(tunnel_id, progress_at);