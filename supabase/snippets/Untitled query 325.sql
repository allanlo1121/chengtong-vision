create or replace function public.sync_entity_with_record(
  p_table text,
  p_rows jsonb
)
returns jsonb
language plpgsql
as $$
declare
  v_row jsonb;
  v_raw jsonb;
  v_data jsonb;

  v_external_id text;

  v_inserted int := 0;
  v_updated int := 0;
  v_skipped int := 0;
  v_failed int := 0;

  v_sql text;

  v_inserted_flag boolean;
  v_affected int;

  v_columns text;
  v_values text;
  v_set_clause text;

  v_valid_columns text[];
begin

  -- 🔥 1️⃣ 获取表字段白名单（防止非法字段）
  select array_agg(column_name::text)
  into v_valid_columns
  from information_schema.columns
  where table_name = p_table
    and is_generated = 'NEVER'
    and column_name not in ('id', 'created_at');

  -- 🔁 2️⃣ 遍历数据
  for v_row in select * from jsonb_array_elements(p_rows)
  loop
    begin
      v_raw := v_row->'raw';
      v_data := jsonb_strip_nulls(v_row->'data'); -- 🔥 去 NULL

      v_external_id := v_data->>'external_id';

      if v_external_id is null then
        raise exception 'external_id 不能为空';
      end if;

      -- 🔥 3️⃣ 动态生成列 + 值（只取 JSON 存在字段）
      select
        string_agg(format('%I', key), ', '),
        string_agg(format('$1->>%L', key), ', ')
      into v_columns, v_values
      from jsonb_object_keys(v_data) as key
      where key = any(v_valid_columns);

      if v_columns is null then
        raise exception '没有可插入字段';
      end if;

      -- 🔥 4️⃣ 构建 update set
      select string_agg(
        format('%I = excluded.%I', key, key),
        ', '
      )
      into v_set_clause
      from jsonb_object_keys(v_data) as key
      where key = any(v_valid_columns);

      -- 🔥 5️⃣ 动态 SQL
      v_sql := format($f$
        insert into %1$I (%2$s)
        values (%3$s)

        on conflict (code)
        do update
        set %4$s

        where
          %1$I.external_version is null
          or excluded.external_version > %1$I.external_version

        returning xmax = 0 as inserted_flag
      $f$, p_table, v_columns, v_values, v_set_clause);

      -- 🔹 执行
      execute v_sql
      using v_data
      into v_inserted_flag;

      GET DIAGNOSTICS v_affected = ROW_COUNT;

      -- 🔥 6️⃣ 状态判断
      if v_affected = 0 then
        v_skipped := v_skipped + 1;

      elsif v_inserted_flag then
        v_inserted := v_inserted + 1;

        insert into import_records (
          entity_type,
          external_id,
          status,
          import_json,
          mapped_json
        )
        values (
          p_table,
          v_external_id,
          'inserted',
          v_raw,
          v_data
        );

      else
        v_updated := v_updated + 1;

        insert into import_records (
          entity_type,
          external_id,
          status,
          import_json,
          mapped_json
        )
        values (
          p_table,
          v_external_id,
          'updated',
          v_raw,
          v_data
        );
      end if;

    exception when others then
      v_failed := v_failed + 1;

      insert into import_records (
        entity_type,
        external_id,
        status,
        import_json,
        mapped_json,
        error_json
      )
      values (
        p_table,
        v_external_id,
        'failed',
        v_raw,
        v_data,
        jsonb_build_array(
          jsonb_build_object(
            'message', SQLERRM
          )
        )
      );
    end;
  end loop;

  return jsonb_build_object(
    'total', v_inserted + v_updated + v_failed + v_skipped,
    'inserted', v_inserted,
    'updated', v_updated,
    'failed', v_failed,
    'skipped', v_skipped
  );

end;
$$;