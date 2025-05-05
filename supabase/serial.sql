DO $$
DECLARE
  tbl RECORD;
  col_name TEXT;
  seq_name TEXT;
  full_seq_name TEXT;
  max_id BIGINT;
BEGIN
  -- 遍历所有 serial 类型字段
  FOR tbl IN
    SELECT 
      c.table_schema,
      c.table_name,
      c.column_name,
      c.column_default
    FROM information_schema.columns c
    WHERE c.column_default LIKE 'nextval(%::regclass)'
      AND c.table_schema = 'public'
  LOOP
    -- 提取列名
    col_name := tbl.column_name;

    -- 提取序列名称
    seq_name := regexp_replace(tbl.column_default, '^nextval\(''', '');
    seq_name := regexp_replace(seq_name, '''::regclass\)$', '');
    full_seq_name := quote_ident(tbl.table_schema) || '.' || quote_ident(seq_name);

    -- 获取当前最大 ID
    EXECUTE format('SELECT MAX(%I) FROM %I.%I', col_name, tbl.table_schema, tbl.table_name) INTO max_id;

    -- 修正序列值（从最大 ID 开始 +1）
    IF max_id IS NOT NULL THEN
      EXECUTE format('SELECT setval(''%s'', %s)', full_seq_name, max_id);
      RAISE NOTICE '✅ 序列 % 修正为 %', full_seq_name, max_id;
    END IF;
  END LOOP;
END $$;