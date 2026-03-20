
create or replace function public.audit_fields_trigger()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid;
begin

  begin
    v_uid := auth.uid();
  exception
    when others then
      v_uid := null;
  end;

  if tg_op = 'INSERT' then
    new.created_at := now();
    new.updated_at := now();

    if v_uid is not null then
      new.created_by := v_uid;
      new.updated_by := v_uid;
    end if;

  elsif tg_op = 'UPDATE' then
    new.updated_at := now();

    if v_uid is not null then
      new.updated_by := v_uid;
    end if;
  end if;

  return new;
end;
$$;

create trigger trg_audit_fields_organizations
before insert or update
on public.organizations
for each row
execute function public.audit_fields_trigger();

create trigger trg_audit_fields_projects
before insert or update
on public.projects
for each row
execute function public.audit_fields_trigger();


create or replace function public.sync_entity_by_external(
  p_table text,          -- 表名
  p_rows jsonb,          -- [{external_id, external_version, ...}]
  p_external_id_col text default 'external_id',
  p_version_col text default 'external_version'
)
returns jsonb
language plpgsql
as $$
declare
  v_sql text;
  v_inserted int := 0;
  v_updated int := 0;
  v_skipped int := 0;
begin

  /*
    思路：
    1) jsonb → 临时数据集
    2) 先尝试 INSERT
    3) 冲突时 DO UPDATE + WHERE version 控制
    4) 用 RETURNING 判断 insert / update
  */

  v_sql := format($f$

    with input as (
      select
        *
      from jsonb_to_recordset($1)
      as t(%2$s text, %3$s int, data jsonb)
    ),

    upsert as (
      insert into %4$I
      select
        (i.data ->> %2$L) as %2$I,
        (i.data ->> %3$L)::int as %3$I,
        i.data
      from input i

      on conflict (%2$I)
      do update set
        %3$I = excluded.%3$I
      where
        %4$I.%3$I is null
        or excluded.%3$I > %4$I.%3$I

      returning xmax = 0 as inserted_flag
    )

    select
      count(*) filter (where inserted_flag) as inserted,
      count(*) filter (where not inserted_flag) as updated
    from upsert

  $f$,
    p_rows,
    p_external_id_col,
    p_version_col,
    p_table
  );

  execute v_sql into v_inserted, v_updated;

  v_skipped := jsonb_array_length(p_rows) - v_inserted - v_updated;

  return jsonb_build_object(
    'inserted', v_inserted,
    'updated', v_updated,
    'skipped', v_skipped
  );

end;
$$;


create or replace function public.sync_entity_auto(
  p_table text,
  p_rows jsonb,
  p_external_id_col text default 'external_id',
  p_version_col text default 'external_version'
)
returns jsonb
language plpgsql
as $$
declare
  v_sql text;
  v_inserted int := 0;
  v_updated int := 0;
  v_skipped int := 0;
begin

  /*
    核心思路：

    1️⃣ jsonb_to_recordset → 转数据
    2️⃣ jsonb_populate_record → 自动映射字段
    3️⃣ ON CONFLICT + version 控制
    4️⃣ RETURNING 判断 insert/update
  */

  v_sql := format($f$

    with input as (
      select
        jsonb_populate_record(null::%1$I, x) as row_data
      from jsonb_array_elements($1) as x
    ),

    upsert as (
      insert into %1$I
      select (row_data).*
      from input

      on conflict (%2$I)
      do update
      set
        -- ⭐ 自动更新所有字段
        %1$I = excluded

      where
        %1$I.%3$I is null
        or excluded.%3$I > %1$I.%3$I

      returning xmax = 0 as inserted_flag
    )

    select
      count(*) filter (where inserted_flag) as inserted,
      count(*) filter (where not inserted_flag) as updated
    from upsert

  $f$,
    p_table,
    p_external_id_col,
    p_version_col
  );

  execute v_sql into v_inserted, v_updated;

  v_skipped := jsonb_array_length(p_rows) - v_inserted - v_updated;

  return jsonb_build_object(
    'inserted', v_inserted,
    'updated', v_updated,
    'skipped', v_skipped
  );

end;
$$;