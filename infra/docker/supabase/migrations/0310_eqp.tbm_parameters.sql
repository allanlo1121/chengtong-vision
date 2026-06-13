
-- =========================================================
-- TBM SUBSYSTEMS
-- =========================================================

create table eqp.tbm_subsystems (

    id smallint generated always as identity primary key,

    -- s01 / s05 / s10
    code text not null unique
    check (
        code ~ '^[a-z][0-9]{2}$'
    ),

    name text not null,

    is_configurable boolean not null default true,

    sort_order smallint not null default 0,
    is_disabled boolean not null default false,

    remark text
);

comment on table eqp.tbm_subsystems
is '盾构机子系统';

-- =========================================================
-- TBM RUNTIME PARAMETERS
-- =========================================================

create table eqp.tbm_runtime_parameters (

    id integer generated always as identity primary key,
    -- s050001001
    code text not null unique
    check (
        code ~ '^[a-z][0-9]{9}$'
    ),
    name text not null,
    subsystem_id smallint not null
        references eqp.tbm_subsystems(id),
    -- boolean / integer / double
    data_type text not null
    check (
        data_type in (
            'boolean',
            'integer',
            'double',
            'text'
        )
    ),
    unit text,
    digits smallint not null default 2,
    is_alarm boolean not null default false,
    is_virtual boolean not null default false,
    is_group boolean not null default false,
    is_trendable boolean not null default true,
    is_reportable boolean not null default true,
    is_chartable boolean not null default true,
    is_disabled boolean not null default false,
    sort_order integer not null default 0,

    remark text
);

comment on table eqp.tbm_runtime_parameters
is '盾构机运行参数定义';

-- =========================================================
-- TBM PARAMETER TEMPLATES
-- =========================================================

create table eqp.tbm_parameter_templates (

    id smallint generated always as identity primary key,

    code text not null unique,

    name text not null,

    tbm_type_id uuid not null
        references public.master_data(id),

    diameter double precision,

    is_default boolean not null default true,

    sort_order smallint not null default 0,
    is_disabled boolean not null default false,

    remark text
);

comment on table eqp.tbm_parameter_templates
is '盾构机参数模板';

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

-- =========================================================
-- TEMPLATE PARAMETERS
-- =========================================================

create table eqp.tbm_parameter_template_parameters (

    template_id smallint not null
        references eqp.tbm_parameter_templates(id),

    parameter_id integer not null
        references eqp.tbm_runtime_parameters(id),

    sort_order integer not null default 0,

    is_required boolean not null default true,

    primary key (
        template_id,
        parameter_id
    )
);

comment on table eqp.tbm_parameter_template_parameters
is '模板参数绑定';

create table eqp.tbm_plc_tags (

    id bigserial primary key,

    tbm_id uuid not null
        references eqp.tbms(id),

    tag_name text not null,

    data_type text not null,

    unit text,

    internal text,

    bit integer,

    archive boolean not null default false,

    comment text,

    sort_order integer not null default 0,

    unique (
        tbm_id,
        tag_name
    )
);

-- =========================================================
-- TBM PARAMETER CONFIGURATIONS
-- =========================================================

create table eqp.tbm_parameter_configs (

    id bigserial primary key,

    tbm_id uuid not null
        references eqp.tbms(id),

    parameter_id integer not null
        references eqp.tbm_runtime_parameters(id),

    plc_tag_id bigint,

    scale numeric not null default 1,

    value_offset numeric not null default 0,

    is_disabled boolean not null default false,

    custom_name text,
    custom_unit text,

    remark text,
    unique (
        tbm_id,
        parameter_id
    )
);

comment on table eqp.tbm_parameter_configs
is 'TBM实际运行参数';



-- =========================================================
-- THRESHOLD RULES
-- =========================================================

create table eqp.tbm_parameter_threshold_rules (
    id bigserial primary key,

    binding_id bigserial not null
        references eqp.tbm_parameter_configs(id)
        on delete cascade,

    level smallint not null
        check (level in (1, 2, 3)),

    min_value double precision,
    max_value double precision,

    is_enabled boolean not null default true,

    remark text,

    unique (binding_id, level),

    check (
        min_value is not null
        or max_value is not null
    ),

    check (
        min_value is null
        or max_value is null
        or min_value <= max_value
    )
);

comment on table eqp.tbm_parameter_threshold_rules
is 'TBM参数报警规则';


create table eqp.tbm_parameter_template_threshold_rules (

    id bigserial primary key,

    template_id smallint not null
        references eqp.tbm_parameter_templates(id),

    parameter_id integer not null
        references eqp.tbm_runtime_parameters(id),

    level smallint not null,

    direction text not null
    check (
        direction in (
            'HIGH',
            'LOW',
            'ABS'
        )
    ),

    min_value double precision,

    max_value double precision,

    recover_value double precision,

    duration_ms integer not null default 0,

    color text,

    severity text
    check (
        severity in (
            'INFO',
            'WARNING',
            'CRITICAL'
        )
    ),

    message text,

    is_active boolean not null default true
);

comment on table eqp.tbm_parameter_template_threshold_rules
is 'TBM参数模板报警规则';





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
    p.is_chartable,
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
    s.name as subsystem_name,
    p.is_chartable
from eqp.tbm_runtime_parameters p
join eqp.tbm_subsystems s
  on s.id = p.subsystem_id
where p.is_disabled = false;

create schema if not exists realdata;

create or replace function eqp.sync_tbm_realdata_table(p_tbm_id uuid)
returns text
language plpgsql
security definer
set search_path = eqp, realdata, public
as $$
declare
  v_table_schema text := 'realdata';
  v_table_name text;
  v_table_regclass regclass;
  v_tbm_code text;
  r record;
  v_seq_name text;
  v_null_count int;
begin
  if p_tbm_id is null then
    raise exception 'p_tbm_id cannot be null';
  end if;

  -- 获取 TBM code
  select lower(code)
    into v_tbm_code
    from eqp.tbms
   where id = p_tbm_id;

  if v_tbm_code is null then
    raise exception 'TBM not found: %', p_tbm_id;
  end if;

  v_tbm_code := regexp_replace(v_tbm_code, '[^a-z0-9_]', '_', 'g');
  v_table_name := 'shield_' || v_tbm_code;

  -- 检查表是否存在
  v_table_regclass := to_regclass(format('%I.%I', v_table_schema, v_table_name));

  if v_table_regclass is null then
    -- 表不存在，创建基础表
    execute format(
      'create table %I.%I (
         id bigint generated always as identity primary key,
         recorded_at timestamptz not null,
         tbm_id uuid not null
       )',
      v_table_schema,
      v_table_name
    );
  else
    -- 表已存在，保证基础列存在
    execute format(
      'alter table %I.%I add column if not exists id bigint generated always as identity',
      v_table_schema,
      v_table_name
    );

    execute format(
      'alter table %I.%I add column if not exists recorded_at timestamptz not null',
      v_table_schema,
      v_table_name
    );

    execute format(
      'alter table %I.%I add column if not exists tbm_id uuid',
      v_table_schema,
      v_table_name
    );

    -- 设置 tbm_id NOT NULL 前先检查是否有 NULL
    execute format(
      'select count(*) from %I.%I where tbm_id is null',
      v_table_schema,
      v_table_name
    )
    into v_null_count;

    if v_null_count = 0 then
      execute format(
        'alter table %I.%I alter column tbm_id set not null',
        v_table_schema,
        v_table_name
      );
    end if;
  end if;

  -- 添加 TBM 参数字段
  for r in
    select
      p.code,
      case p.data_type
        when 'boolean' then 'boolean'
        when 'integer' then 'integer'
        when 'double' then 'double precision'
        when 'float' then 'double precision'
        when 'numeric' then 'numeric'
        when 'text' then 'text'
        else 'text'
      end as sql_type
    from eqp.tbm_parameter_configs tp
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

  -- 创建索引
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

  -- 针对环号 s100100008 建索引，如果列存在
  if exists (
    select 1
      from information_schema.columns
     where table_schema = v_table_schema
       and table_name = lower(v_table_name)
       and column_name = 's100100008'
  ) then
    execute format(
      'create index if not exists %I on %I.%I(tbm_id, s100100008)',
      'idx_' || v_tbm_code || '_tbm_ring',
      v_table_schema,
      v_table_name
    );
  end if;

  -- 授权 tbm_writer
  execute format(
    'grant insert, select on %I.%I to tbm_writer',
    v_table_schema,
    v_table_name
  );

  -- 授权序列
  select sequence_name
    into v_seq_name
    from information_schema.sequences
   where sequence_schema = v_table_schema
     and sequence_name = format('%I_id_seq', v_table_name);

  if v_seq_name is not null then
    execute format(
      'grant usage, select on %I.%I to tbm_writer',
      v_table_schema,
      v_seq_name
    );
  end if;

  return format('%I.%I', v_table_schema, v_table_name);
end;
$$;


-- =========================================================
-- INDEXES
-- =========================================================

create index idx_tbm_parameter_configs_tbm
on eqp.tbm_parameter_configs(tbm_id);

create index idx_tbm_parameter_configs_parameter
on eqp.tbm_parameter_configs(parameter_id);

create index idx_threshold_binding
on eqp.tbm_parameter_threshold_rules(binding_id);

create index idx_runtime_parameters_subsystem
on eqp.tbm_runtime_parameters(subsystem_id);