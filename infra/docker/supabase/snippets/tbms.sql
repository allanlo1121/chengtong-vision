create or replace view eqp.v_tbm_type_counts as
select
  tbm_type_id,
  count(*)::int as tbm_count
from eqp.tbms
where deleted_at is null
group by tbm_type_id;

create or replace view eqp.v_tbm_manufacturer_counts as
select
  manufacturer_id,
  count(*)::int as tbm_count
from eqp.tbms
where deleted_at is null
group by manufacturer_id;

drop view eqp.v_tbm_list ;

create view eqp.v_tbm_list as
select
  t.id,
  t.code,
  t.name,
  t.management_code,
  t.model,  
  t.diameter,
  t.length,
  t.serial_no,
  t.sort_order,
  t.is_disabled,  

  t.tbm_type_id,
  mt.name as tbm_type_name,
  t.manufacturer_id,
  mf.name as manufacturer_name
from eqp.tbms t
left join public.master_data mt on t.tbm_type_id = mt.id
left join hr.customers mf on t.manufacturer_id = mf.id
where t.deleted_at is null;


drop table eqp.tbm_phase_active cascade;
create table eqp.tbm_phase_active (
  id uuid primary key default gen_random_uuid(),
  
  tbm_id uuid not null references eqp.tbms(id),
  tunnel_id uuid references proj.tunnels(id),

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

  tunnel_id uuid,
  tbm_id uuid not null,

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