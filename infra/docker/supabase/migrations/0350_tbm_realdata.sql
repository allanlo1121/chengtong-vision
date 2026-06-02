

create table eqp.tbm_phase_active (
  id uuid primary key default gen_random_uuid(),
  
  tbm_id uuid not null references eqp.tbms(id),


  ring_no integer not null,

  phase_type text not null check (
    phase_type in ('advance', 'assembly', 'stop', 'fault')
  ),

  start_at timestamptz not null,

  source text not null default 'auto',
  remark text,

  unique (tbm_id, phase_type)
);


create table eqp.tbm_phase_records (
  id uuid primary key default gen_random_uuid(),


  tbm_id uuid not null references eqp.tbms(id),

  ring_no integer not null,

  phase_type text not null check (
    phase_type in ('advance', 'assembly', 'stop','fault')
  ),

  start_at timestamptz not null,
  end_at timestamptz not null,

  source text not null default 'auto' check (
    source in ('auto', 'manual', 'corrected')
  ),

  remark text,


  constraint tbm_phase_time_check
    check (end_at > start_at)
);

create index idx_tbm_phase
on eqp.tbm_phase_records (tbm_id, ring_no);

create index idx_tbm_phase_time
on eqp.tbm_phase_records (tbm_id, start_at, end_at);



create table eqp.tbm_daily_progress (
  id uuid primary key default gen_random_uuid(),

  tbm_id uuid not null references eqp.tbms(id),

  work_date date not null,

  ring_end integer not null,
  chainage_end numeric,

  plan_ring_count integer,


  unique (tbm_id, work_date)
);

create or replace view eqp.v_tbm_daily_progress as
select
  p.id,
  p.tbm_id, 
  p.work_date,

  lag(p.ring_end) over (
    partition by p.tbm_id
    order by p.work_date
  ) as ring_start,

  p.ring_end,

  p.ring_end
    - coalesce(
        lag(p.ring_end) over (
          partition by p.tbm_id
          order by p.work_date
        ),
        p.ring_end
      ) as completed_ring_count,

  p.chainage_end,

  lag(p.chainage_end) over (
    partition by p.tbm_id
    order by p.work_date
  ) as chainage_start,

  p.chainage_end
    - coalesce(
        lag(p.chainage_end) over (
          partition by p.tbm_id
          order by p.work_date
        ),
        p.chainage_end
      ) as completed_length,

  p.plan_ring_count

from eqp.tbm_daily_progress p;