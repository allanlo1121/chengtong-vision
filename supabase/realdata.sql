-- 启用 TimescaleDB 扩展（如尚未开启）
create extension if not exists timescaledb;

-- 创建主表：高频采集数据
create table if not exists tbmrealdata (
  id uuid not null default gen_random_uuid(),
  tbm_id integer not null references tbm_infos(id),
  timestamp timestamptz not null,

  s100100008 integer,
  b000000001 boolean,
  b000000002 boolean,
  s050001001 real,
  s050009003 real,
  s010102004 real,
  s010109001 real,
  s050109001 real,

  primary key (id, timestamp) -- ✅ 满足 hypertable 要求
);


-- 将该表注册为 TimescaleDB Hypertable（按时间分区）
select create_hypertable('tbmrealdata', 'timestamp', if_not_exists => true);



-- 创建组合索引，加速某设备近期查询
create index if not exists idx_tbmrealdata_device_time
on tbmrealdata (tbm_id, timestamp desc);


SELECT * FROM tbmrealdata
WHERE tbm_id = '0dd82825-6f10-482e-973b-d1575e5ff092'
ORDER BY timestamp DESC
LIMIT 100;