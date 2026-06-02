
drop view eqp.v_tbm_runtime_parameters_list cascade;

create or replace view eqp.v_tbm_runtime_parameters_list as
select
    p.id,
    p.code,
    p.name,
    p.subsystem_id,
    s.code as subsystem_code,
    s.name as subsystem_name,
    p.data_type,
    p.unit,
    p.digits,
    p.is_alarm,
    p.sort_order,
    p.is_disabled
from eqp.tbm_runtime_parameters p
join eqp.tbm_subsystems s
  on s.id = p.subsystem_id;

create or replace view eqp.v_tbm_runtime_parameters_picker as
select
    p.id,
    p.code,
    p.name,
    s.code as subsystem_code,
    s.name as subsystem_name
from eqp.tbm_runtime_parameters p
join eqp.tbm_subsystems s
  on s.id = p.subsystem_id
where p.is_disabled = false;


alter table eqp.tbm_parameter_templates
  add column diameter double precision;

create or replace view eqp.v_tbm_parameter_templates_list as
select
  t.id,
  t.code,
  t.name,
  t.tbm_type_id,
  md.code as tbm_type_code,
  md.name as tbm_type_name,
  t.is_default,
  t.is_disabled,
  t.diameter,
  t.sort_order,
  t.remark
from eqp.tbm_parameter_templates t
join public.master_data md
  on md.id = t.tbm_type_id;



alter table eqp.tbm_subsystems
  add column is_configurable boolean not null default true;


drop table eqp.tbm_parameter_bindings cascade;

create table eqp.tbm_parameter_bindings (

    id uuid primary key default gen_random_uuid(),

    tbm_id uuid not null
        references eqp.tbms(id),

    parameter_id integer not null
        references eqp.tbm_runtime_parameters(id),

    is_disabled boolean not null default false,

    custom_name text,
    custom_unit text,

    remark text,
    unique (
        tbm_id,
        parameter_id
    )
);




select eqp.sync_tbm_realdata_table('6cf96599-c08d-45be-8be0-7f65f2f66895');

select extname
from pg_extension
where extname = 'timescaledb';

create extension if not exists timescaledb;


create or replace function eqp.sync_tbm_realdata_table(p_tbm_id uuid)
returns text
language plpgsql
security definer
set search_path = eqp, public
as $$
declare
  v_table_schema text := 'eqp';
  v_table_name text;
  v_table_regclass regclass;
  v_tbm_code text;
  r record;
begin
  if p_tbm_id is null then
    raise exception 'p_tbm_id cannot be null';
  end if;

  select lower(code)
  into v_tbm_code
  from eqp.tbms
  where id = p_tbm_id;

  if v_tbm_code is null then
    raise exception 'TBM not found: %', p_tbm_id;
  end if;

  v_tbm_code := regexp_replace(v_tbm_code, '[^a-z0-9_]', '_', 'g');
  v_table_name := 'shield_realdata_' || v_tbm_code;

  v_table_regclass := to_regclass(format('%I.%I', v_table_schema, v_table_name));

  if v_table_regclass is null then
    execute format(
      $sql$
      create table %I.%I (
        recorded_at timestamptz not null,
        tunnel_id uuid not null,
        primary key (recorded_at, tunnel_id)
      )
      $sql$,
      v_table_schema,
      v_table_name
    );
  end if;

  for r in
    select
      p.code,
      case p.data_type
        when 'boolean' then 'boolean'
        when 'integer' then 'integer'
        when 'double' then 'double precision'
        when 'text' then 'text'
        else 'text'
      end as sql_type
    from eqp.tbm_parameter_bindings tp
    join eqp.tbm_runtime_parameters p
      on p.id = tp.parameter_id
    where tp.tbm_id = p_tbm_id
      and coalesce(p.is_disabled, false) = false
    order by p.sort_order, p.code
  loop
    execute format(
      'alter table %I.%I add column if not exists %I %s',
      v_table_schema,
      v_table_name,
      r.code,
      r.sql_type
    );
  end loop;

  execute format(
    'create index if not exists %I on %I.%I(recorded_at desc)',
    'idx_' || v_tbm_code || '_time',
    v_table_schema,
    v_table_name
  );

  execute format(
    'create index if not exists %I on %I.%I(tunnel_id, recorded_at desc)',
    'idx_' || v_tbm_code || '_tunnel_time',
    v_table_schema,
    v_table_name
  );

  if exists (
    select 1
    from information_schema.columns
    where table_schema = v_table_schema
      and table_name = v_table_name
      and column_name = 's100100008'
  ) then
    execute format(
      'create index if not exists %I on %I.%I(tunnel_id, s100100008)',
      'idx_' || v_tbm_code || '_tunnel_ring',
      v_table_schema,
      v_table_name
    );
  end if;

  execute format(
    'grant insert, select on %I.%I to tbm_writer',
    v_table_schema,
    v_table_name
  );

  return v_table_schema || '.' || v_table_name;
end;
$$;

create role tbm_writer;

create role tbm_writer with login password 'Luo112781@';

grant usage on schema eqp to tbm_writer;



create or replace function eqp.sync_tbm_realdata_table(p_tbm_id uuid)
returns text
language plpgsql
security definer
set search_path = eqp, public
as $$
declare
  v_table_schema text := 'eqp';
  v_table_name text;
  v_table_regclass regclass;
  v_tbm_code text;
  r record;
begin
  if p_tbm_id is null then
    raise exception 'p_tbm_id cannot be null';
  end if;

  select lower(code)
  into v_tbm_code
  from eqp.tbms
  where id = p_tbm_id;

  if v_tbm_code is null then
    raise exception 'TBM not found: %', p_tbm_id;
  end if;

  v_tbm_code := regexp_replace(v_tbm_code, '[^a-z0-9_]', '_', 'g');
  v_table_name := 'shield_realdata_' || v_tbm_code;

  v_table_regclass := to_regclass(format('%I.%I', v_table_schema, v_table_name));

  if v_table_regclass is null then
    execute format(
      $sql$
      create table %I.%I (
        id bigint generated always as identity primary key,
        recorded_at timestamptz not null,
        tbm_id uuid not null,
        tunnel_id uuid
      )
      $sql$,
      v_table_schema,
      v_table_name
    );
  else
    execute format(
      'alter table %I.%I add column if not exists id bigint generated always as identity',
      v_table_schema,
      v_table_name
    );

    execute format(
      'alter table %I.%I add column if not exists tbm_id uuid',
      v_table_schema,
      v_table_name
    );

    execute format(
      'alter table %I.%I alter column tbm_id set not null',
      v_table_schema,
      v_table_name
    );

    execute format(
      'alter table %I.%I add column if not exists tunnel_id uuid',
      v_table_schema,
      v_table_name
    );
  end if;

  for r in
    select
      p.code,
      case p.data_type
        when 'boolean' then 'boolean'
        when 'integer' then 'integer'
        when 'double' then 'double precision'
        when 'text' then 'text'
        else 'text'
      end as sql_type
    from eqp.tbm_parameter_bindings tp
    join eqp.tbm_runtime_parameters p
      on p.id = tp.parameter_id
    where tp.tbm_id = p_tbm_id
      and coalesce(p.is_disabled, false) = false
    order by p.sort_order, p.code
  loop
    execute format(
      'alter table %I.%I add column if not exists %I %s',
      v_table_schema,
      v_table_name,
      r.code,
      r.sql_type
    );
  end loop;

  execute format(
    'create index if not exists %I on %I.%I(recorded_at desc)',
    'idx_' || v_tbm_code || '_time',
    v_table_schema,
    v_table_name
  );

  execute format(
    'create index if not exists %I on %I.%I(tbm_id, recorded_at desc)',
    'idx_' || v_tbm_code || '_tbm_time',
    v_table_schema,
    v_table_name
  );

  execute format(
    'create index if not exists %I on %I.%I(tunnel_id, recorded_at desc)',
    'idx_' || v_tbm_code || '_tunnel_time',
    v_table_schema,
    v_table_name
  );

  if exists (
    select 1
    from information_schema.columns
    where table_schema = v_table_schema
      and table_name = v_table_name
      and column_name = 's100100008'
  ) then
    execute format(
      'create index if not exists %I on %I.%I(tunnel_id, s100100008)',
      'idx_' || v_tbm_code || '_tunnel_ring',
      v_table_schema,
      v_table_name
    );
  end if;

  execute format(
    'grant insert, select on %I.%I to tbm_writer',
    v_table_schema,
    v_table_name
  );

  execute format(
    'grant usage, select on all sequences in schema %I to tbm_writer',
    v_table_schema
  );

  return v_table_schema || '.' || v_table_name;
end;
$$;


drop view eqp.v_tbm_bound_parameters cascade;

create or replace view eqp.v_tbm_bound_parameters as
select
  b.id as binding_id,
  b.tbm_id,
  b.parameter_id,

  s.id as subsystem_id,
  s.code as subsystem_code,
  s.name as subsystem_name,
  s.sort_order as subsystem_sort_order,

  p.code as parameter_code,
  p.name as parameter_name,
  p.unit,
  p.digits,
  p.data_type,
  p.sort_order as parameter_sort_order,
  p.is_alarm,
  p.is_chartable,
  p.is_disabled
from eqp.tbm_parameter_bindings b
join eqp.tbm_runtime_parameters p
  on p.id = b.parameter_id
join eqp.tbm_subsystems s
  on s.id = p.subsystem_id;


alter table eqp.tbm_runtime_parameters
    add column is_chartable boolean not null default false;

  update eqp.tbm_runtime_parameters
set is_chartable = true
where code like 's%';



drop function 
create or replace function eqp.fn_get_tunnel_tbm_param_history(
  p_tunnel_id uuid,
  p_from timestamptz,
  p_to timestamptz,
  p_fields text[],
  p_work_mode text default null
)
returns table (
  ts timestamptz,
  data jsonb
)
language plpgsql
security definer
set search_path = eqp, public
as $$
declare
  v_tbm_code text;
  v_table_name text;
  v_values_sql text;
  v_field text;
  v_work_mode_sql text := '';
begin
  if p_to <= p_from then
    raise exception '结束时间必须大于开始时间';
  end if;

  if p_to - p_from > interval '7 days' then
    raise exception '查询时间范围不能超过 7 天';
  end if;

  if array_length(p_fields, 1) is null then
    raise exception '请选择参数';
  end if;

  select lower(t.code)
  into v_tbm_code
  from eqp.tbm_assignments a
  join eqp.tbms t on t.id = a.tbm_id
  where a.tunnel_id = p_tunnel_id
    and a.end_date is null
  limit 1;

  if v_tbm_code is null then
    raise exception '未找到当前区间绑定的盾构机';
  end if;

  v_tbm_code := regexp_replace(v_tbm_code, '[^a-z0-9_]', '_', 'g');
  v_table_name := 'shield_realdata_' || v_tbm_code;

  -- 只允许查询 is_chartable = true 的字段
  if exists (
    select 1
    from unnest(p_fields) f(code)
    left join eqp.tbm_runtime_parameters p
      on p.code = f.code
    where p.id is null
       or p.is_chartable is not true
  ) then
    raise exception '包含不允许绘图的参数';
  end if;

  select string_agg(
    format('%L, %I', f.code, f.code),
    ', '
  )
  into v_values_sql
  from unnest(p_fields) f(code);

  if p_work_mode = 'advance' then
    v_work_mode_sql := ' and b000000001 = true';
  elsif p_work_mode = 'assembly' then
    v_work_mode_sql := ' and b000000002 = true';
  elsif p_work_mode = 'shutdown' then
    v_work_mode_sql := ' and coalesce(b000000001, false) = false and coalesce(b000000002, false) = false';
  else
   v_work_mode_sql := '';

  end if;

  return query execute format(
    '
    select
      recorded_at as ts,
      jsonb_build_object(%s) as data
    from eqp.%I
    where tunnel_id = $1
      and recorded_at >= $2
      and recorded_at <= $3
      %s
    order by recorded_at asc
    ',
    v_values_sql,
    v_table_name,
    v_work_mode_sql
  )
  using p_tunnel_id, p_from, p_to;
end;
$$;