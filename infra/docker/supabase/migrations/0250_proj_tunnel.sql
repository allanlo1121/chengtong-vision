

create table proj.tunnels (
  id uuid primary key default gen_random_uuid(),

  -- 关联项目
  project_id uuid not null
    references proj.projects(id)
    on delete cascade,

  -- 项目分册 / 标段（可选）
--   project_catalog_id uuid
--     references proj.project_catalogs(id)
--     on delete set null,

  -- 基本信息
  name text not null,
  full_name text,
  prefix text, --  里程信息前缀 DK

  -- 里程信息
  start_chainage numeric(12,3), -- 起始里程
  end_chainage numeric(12,3),   -- 结束里程
  start_ring integer not null default 0,
  end_ring integer ,

  --进度信息时间
  actual_start_date      DATE,                                       -- 实际开工日期`
  actual_end_date        DATE,                                       -- 实际竣工日期

  -- 地质
  geology text,

  -- 坐标
  longitude numeric(10, 6),
  latitude numeric(10, 6),

  sort_order int default 0,
  is_disabled boolean not null default false,

  -- 备注
  remark text


);


-- 项目维度查询（最常用）
create index idx_tunnels_project_id
on proj.tunnels(project_id);

-- -- 状态筛选
-- create index idx_tunnels_status_id
-- on proj.tunnels(status_id);

-- 名称模糊搜索（如果你前端有搜索）
create index idx_tunnels_name
on proj.tunnels using gin (to_tsvector('simple', name));





create table proj.tunnel_status_timeline(
  id uuid primary key default gen_random_uuid(),

  -- 🔥 通用对象
  tunnel_id uuid not null references proj.tunnels(id) on delete cascade,

  -- 状态 PROJECT_SUB_STATUS
  tunnel_status_id uuid references master_data(id),

  -- ✅ 业务时间（核心）
  valid_from timestamptz not null,
  valid_to timestamptz,


  -- 来源 
  change_type text,   -- normal / correction / auto

  -- 备注
  remark text
);


create table proj.tunnel_schedule_versions (
  id uuid primary key default gen_random_uuid(),

  tunnel_id uuid not null references proj.tunnels(id) on delete cascade,

  version_no int not null,   -- 1,2,3...

  -- 只放会“业务调整”的
  schedule_start_date date,
  schedule_end_date date,

  -- 变更信息
  change_reason text,
  source text,
  remark text,

  unique (tunnel_id, version_no)
);

create table public.tunnel_daily_progress (
  id uuid primary key default gen_random_uuid(),

  tunnel_id uuid not null references proj.tunnels(id),
  tbm_id uuid references eqp.tbms(id),

  progress_date date not null,

  ring_end integer not null,
  op_num_end numeric,

  plan_ring_count integer,


  unique (tunnel_id, progress_date)
);

create or replace view public.v_tunnel_daily_progress as
select
  p.id,
  p.tunnel_id,
  p.tbm_id,
  p.progress_date,

  lag(p.ring_end) over (
    partition by p.tunnel_id
    order by p.progress_date
  ) as ring_start,

  p.ring_end,

  p.ring_end
    - coalesce(
        lag(p.ring_end) over (
          partition by p.tunnel_id
          order by p.progress_date
        ),
        p.ring_end
      ) as completed_ring_count,

  p.op_num_end,

  lag(p.op_num_end) over (
    partition by p.tunnel_id
    order by p.progress_date
  ) as op_num_start,

  p.op_num_end
    - coalesce(
        lag(p.op_num_end) over (
          partition by p.tunnel_id
          order by p.progress_date
        ),
        p.op_num_end
      ) as completed_length,

  p.plan_ring_count,
  p.created_at,
  p.updated_at,
  p.modified_by
from public.tunnel_daily_progress p;



