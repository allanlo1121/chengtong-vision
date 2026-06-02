
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
    is_chartable boolean not null default false,
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

-- =========================================================
-- TBM PARAMETER BINDINGS
-- =========================================================

create table eqp.tbm_parameter_bindings (

    id bigserial primary key,

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

comment on table eqp.tbm_parameter_bindings
is 'TBM实际运行参数';

-- =========================================================
-- THRESHOLD RULES
-- =========================================================

create table eqp.tbm_parameter_threshold_rules (
    id bigserial primary key,

    binding_id bigint not null
        references eqp.tbm_parameter_bindings(id)
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



-- =========================================================
-- CREATE TBM RUNTIME TABLE
-- =========================================================

create or replace function eqp.create_tbm_runtime_table(
    p_tbm_id uuid
)
returns void
language plpgsql
security definer
as $$

declare

    v_table_name text;

    v_sql text;

    v_column_sql text := '';

    v_parameter record;

begin

    -- =====================================================
    -- get realtime table name
    -- =====================================================

    select
        realtime_table_name
    into
        v_table_name
    from public.tbms
    where id = p_tbm_id;

    if v_table_name is null then
        raise exception 'TBM realtime table name not found';
    end if;

    -- =====================================================
    -- build columns
    -- =====================================================

    for v_parameter in

        select
            p.code,
            p.data_type

        from eqp.tbm_parameter_bindings b

        join eqp.tbm_runtime_parameters p
          on p.id = b.parameter_id

        where b.tbm_id = p_tbm_id
          and b.is_enabled = true

        order by b.sort_order

    loop

        v_column_sql :=
            v_column_sql ||
            format(
                '%I %s,',
                v_parameter.code,

                case v_parameter.data_type

                    when 'boolean'
                        then 'boolean'

                    when 'integer'
                        then 'integer'

                    when 'text'
                        then 'text'

                    else
                        'double precision'

                end
            );

    end loop;

    -- =====================================================
    -- create table
    -- =====================================================

    v_sql := format(
    '
    create table if not exists tbm.%I (

        recorded_at timestamptz not null,

        tunnel_id uuid not null,

        %s

        primary key (
            recorded_at,
            tunnel_id
        )
    )
    ',
    v_table_name,
    v_column_sql
    );

    execute v_sql;

    -- =====================================================
    -- create hypertable
    -- =====================================================

    perform create_hypertable(
        format('tbm.%I', v_table_name),
        'recorded_at',
        if_not_exists => true,
        chunk_time_interval => interval '1 day'
    );

    -- =====================================================
    -- indexes
    -- =====================================================

    execute format(
        '
        create index if not exists %I
        on eqp.%I(recorded_at desc)
        ',
        'idx_' || v_table_name || '_time',
        v_table_name
    );

    execute format(
        '
        create index if not exists %I
        on eqp.%I(tunnel_id, recorded_at desc)
        ',
        'idx_' || v_table_name || '_tunnel_time',
        v_table_name
    );

end;

$$;

comment on function eqp.create_tbm_runtime_table(uuid)
is '动态创建TBM实时数据hypertable';

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