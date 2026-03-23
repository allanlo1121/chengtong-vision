
create table public.import_batches (
  id uuid primary key default gen_random_uuid(),

  table_name text not null,

  total_count int not null,
  inserted_count int default 0,
  updated_count int default 0,
  skipped_count int default 0,
  failed_count int default 0,

  status text not null default 'processing', -- processing / success / failed

  started_at timestamptz default now(),
  finished_at timestamptz
);

create table public.import_records (
  id uuid primary key default gen_random_uuid(),

  batch_id uuid references import_batches(id),

  table_name text,

  raw jsonb,
  data jsonb,

  external_version int,

  status text, -- inserted / updated / skipped / error
  message text,

  created_at timestamptz default now()
);

-- create table public.import_records (
--   id uuid primary key default gen_random_uuid(),

--   batch_id uuid references import_batches(id),

--   entity_type text not null,
--   entity_id uuid,

--   external_id text,
--   external_source text default 'import',

--   status text not null, -- success / failed

--   import_json jsonb,
--   mapped_json jsonb,
--   error_json jsonb,

--   round int,

--   created_at timestamptz default now()
-- );

-- create or replace function public.sync_entity_with_record(
--   p_table text,
--   p_rows jsonb
-- )
-- returns jsonb
-- language plpgsql
-- as $$
-- declare
--   v_row jsonb;
--   v_raw jsonb;
--   v_data jsonb;

--   v_external_id text;

--   v_inserted int := 0;
--   v_updated int := 0;
--   v_skipped int := 0;
--   v_failed int := 0;

--   v_sql text;

--   v_inserted_flag boolean;
--   v_affected int;

--   v_columns text;     -- insert 列
--   v_set_clause text;  -- update 列
-- begin

--   -- 🔥 1️⃣ 获取“可写字段”（DB 白名单）
--   select string_agg(format('%I', column_name), ', ')
--   into v_columns
--   from information_schema.columns
--   where table_name = p_table
--     and is_generated = 'NEVER'
--     and column_name not in ('id', 'created_at');

--   -- 🔥 2️⃣ 构建 update set（动态）
--   select string_agg(
--     format('%I = excluded.%I', column_name, column_name),
--     ', '
--   )
--   into v_set_clause
--   from information_schema.columns
--   where table_name = p_table
--     and is_generated = 'NEVER'
--     and column_name not in ('id', 'created_at');

--   -- 🔁 3️⃣ 逐行处理
--   for v_row in select * from jsonb_array_elements(p_rows)
--   loop
--     begin
--       v_raw := v_row->'raw';
--       v_data := v_row->'data';

--       v_external_id := v_data->>'external_id';

--       if v_external_id is null then
--         raise exception 'external_id 不能为空';
--       end if;

--       -- 🔥 4️⃣ 动态 SQL（fields 驱动 + DB 过滤）
--       v_sql := format($f$

--         insert into %1$I (%2$s)
--         select %2$s
--         from (
--           select (jsonb_populate_record(null::%1$I, jsonb_strip_nulls($1))).*
--         ) t

--         on conflict (code)
--         do update
--         set %3$s

--         where
--           %1$I.external_version is null
--           or excluded.external_version > %1$I.external_version

--         returning xmax = 0 as inserted_flag

--       $f$, p_table, v_columns, v_set_clause);

--       -- 🔹 执行
--       execute v_sql
--       using v_data
--       into v_inserted_flag;

--       GET DIAGNOSTICS v_affected = ROW_COUNT;

--       -- 🔥 5️⃣ 状态判断（关键）
--       if v_affected = 0 then
--         v_skipped := v_skipped + 1;

--       elsif v_inserted_flag then
--         v_inserted := v_inserted + 1;

--         insert into import_records (
--           entity_type,
--           external_id,
--           status,
--           import_json,
--           mapped_json
--         )
--         values (
--           p_table,
--           v_external_id,
--           'inserted',
--           v_raw,
--           v_data
--         );

--       else
--         v_updated := v_updated + 1;

--         insert into import_records (
--           entity_type,
--           external_id,
--           status,
--           import_json,
--           mapped_json
--         )
--         values (
--           p_table,
--           v_external_id,
--           'updated',
--           v_raw,
--           v_data
--         );
--       end if;

--     exception when others then
--       v_failed := v_failed + 1;

--       insert into import_records (
--         entity_type,
--         external_id,
--         status,
--         import_json,
--         mapped_json,
--         error_json
--       )
--       values (
--         p_table,
--         v_external_id,
--         'failed',
--         v_raw,
--         v_data,
--         jsonb_build_array(
--           jsonb_build_object(
--             'message', SQLERRM
--           )
--         )
--       );
--     end;
--   end loop;

--   return jsonb_build_object(
--     'total', v_inserted + v_updated + v_failed + v_skipped,
--     'inserted', v_inserted,
--     'updated', v_updated,
--     'failed', v_failed,
--     'skipped', v_skipped
--   );

-- end;
$$;