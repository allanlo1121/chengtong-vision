-- 启用 Timescale 扩展（Supabase 默认已支持）
create extension if not exists timescaledb;

-- 创建 tbm_data 表（用于存储所有运行参数）
create table if not exists tbm_data (
  id uuid primary key default gen_random_uuid(),
  proj_id text not null,
  tbmcode text not null,
  timestamp timestamptz not null,
  data jsonb not null
);

-- 转换为 Timescale Hypertable（按 timestamp 分区）
select create_hypertable('tbm_data', 'timestamp', if_not_exists => true);

-- 创建索引（查询更快）
create index if not exists idx_tbm_data_time on "tbm_data" (timestamp desc);
create index if not exists idx_tbm_data_tbmcode on "tbm_data" (tbmcode);
create index if not exists idx_tbm_data_projid on "tbm_data" (proj_id);
