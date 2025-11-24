BEGIN;

DROP VIEW IF EXISTS public.delta_view_all;

CREATE OR REPLACE FUNCTION public.rebuild_shield_realdata_long()
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    tbl RECORD;
    param_code TEXT;
    param_codes CONSTANT TEXT[] := ARRAY['s100206003', 's100206004', 's100206006', 's100206007'];
    union_sql TEXT := '';
    first BOOLEAN := TRUE;
    tbm_key_value TEXT;
    tbm_id UUID;
    col_exists BOOLEAN;
BEGIN
    FOR tbl IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
          AND tablename LIKE 'shield_realdata_%'
    LOOP
        tbm_key_value := substring(tbl.tablename FROM '^shield_realdata_(.+)$');
        IF tbm_key_value IS NULL THEN
            CONTINUE;
        END IF;

        SELECT id INTO tbm_id
        FROM public.tbms
        WHERE tbm_key = tbm_key_value
        LIMIT 1;

        IF tbm_id IS NULL THEN
            RAISE NOTICE 'Skipping table %, tbm_key % not found in tbms', tbl.tablename, tbm_key_value;
            CONTINUE;
        END IF;

        IF NOT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name = tbl.tablename
              AND column_name = 'recorded_at'
        ) THEN
            RAISE NOTICE 'Skipping table %, missing recorded_at column', tbl.tablename;
            CONTINUE;
        END IF;

        FOREACH param_code IN ARRAY param_codes LOOP
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_schema = 'public'
                  AND table_name = tbl.tablename
                  AND column_name = param_code
            )
            INTO col_exists;

            IF NOT col_exists THEN
                CONTINUE;
            END IF;

            IF NOT EXISTS (
                SELECT 1
                FROM public.tbm_runtime_parameters
                WHERE code = param_code
            ) THEN
                RAISE NOTICE 'Skipping param % for %, metadata missing in tbm_runtime_parameters', param_code, tbl.tablename;
                CONTINUE;
            END IF;

            union_sql := union_sql ||
                CASE WHEN first THEN '' ELSE E'\nUNION ALL\n' END ||
                format(
                    'SELECT sub.recorded_at,
                            %L::uuid AS tbm_id,
                            %L::text AS param_code,
                            (SELECT id FROM public.tbm_runtime_parameters WHERE code = %L LIMIT 1)::bigint AS param_id,
                            sub.value
                     FROM (
                         SELECT recorded_at, %I::numeric AS value
                         FROM public.%I
                         WHERE %I IS NOT NULL
                         ORDER BY recorded_at DESC
                         LIMIT 1
                     ) AS sub',
                    tbm_id::text,
                    param_code,
                    param_code,
                    param_code,
                    tbl.tablename,
                    param_code
                );
            first := FALSE;
        END LOOP;
    END LOOP;

    IF first THEN
        EXECUTE 'CREATE OR REPLACE VIEW public.shield_realdata_long AS SELECT NULL::timestamptz AS recorded_at, NULL::uuid AS tbm_id, NULL::text AS param_code, NULL::bigint AS param_id, NULL::numeric AS value WHERE false';
    ELSE
        EXECUTE 'CREATE OR REPLACE VIEW public.shield_realdata_long AS ' || union_sql;
    END IF;
END;
$$;

SELECT public.rebuild_shield_realdata_long();

CREATE OR REPLACE VIEW public.delta_view_all AS
SELECT
    date_trunc('hour', recorded_at)
        + ((extract(minute FROM recorded_at)::int / 10) * 10) * interval '1 minute' AS bucket_start,
    tbm_id,
    param_id,
    param_code,
    MAX(value) - MIN(value) AS delta,
    MAX(value) AS max_value,
    MIN(value) AS min_value,
    COUNT(*) AS sample_count
FROM public.shield_realdata_long
WHERE recorded_at IS NOT NULL
  AND tbm_id IS NOT NULL
  AND param_id IS NOT NULL
  AND value IS NOT NULL
GROUP BY 1, 2, 3, 4;

-- Helper to build a dedicated delta view for a specific TBM on demand.
-- Usage: SELECT public.create_delta_view_for_tbm('2eb71d1e');
CREATE OR REPLACE FUNCTION public.create_delta_view_for_tbm(p_tbm_key text)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    base_table TEXT;
    view_name TEXT;
    tbm_id_uuid UUID;
    param_code TEXT;
    param_id BIGINT;
    col_exists BOOLEAN;
    union_sql TEXT := '';
    first BOOLEAN := TRUE;
    param_codes CONSTANT TEXT[] := ARRAY['s100206003', 's100206004', 's100206006', 's100206007'];
BEGIN
    IF p_tbm_key IS NULL OR length(p_tbm_key) = 0 THEN
        RAISE EXCEPTION 'p_tbm_key is required';
    END IF;

    base_table := format('shield_realdata_%s', p_tbm_key);
    view_name := format('delta_view_%s', p_tbm_key);

    IF NOT EXISTS (
        SELECT 1 FROM pg_tables
        WHERE schemaname = 'public' AND tablename = base_table
    ) THEN
        RAISE EXCEPTION 'table % does not exist', base_table;
    END IF;

    SELECT id INTO tbm_id_uuid
    FROM public.tbms
    WHERE tbm_key = p_tbm_key
    LIMIT 1;

    IF tbm_id_uuid IS NULL THEN
        RAISE EXCEPTION 'tbm_key % not found in tbms table', p_tbm_key;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = base_table
          AND column_name = 'recorded_at'
    ) THEN
        RAISE EXCEPTION 'table % is missing recorded_at column', base_table;
    END IF;

    FOREACH param_code IN ARRAY param_codes LOOP
        SELECT id INTO param_id
        FROM public.tbm_runtime_parameters
        WHERE code = param_code
        LIMIT 1;

        IF param_id IS NULL THEN
            RAISE NOTICE 'Skipping %, metadata not found in tbm_runtime_parameters', param_code;
            CONTINUE;
        END IF;

        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name = base_table
              AND column_name = param_code
        ) INTO col_exists;

        IF NOT col_exists THEN
            RAISE NOTICE 'Skipping %, column not present on %', param_code, base_table;
            CONTINUE;
        END IF;

        union_sql := union_sql ||
            CASE WHEN first THEN '' ELSE E'\nUNION ALL\n' END ||
            format(
                'SELECT
                     date_trunc(''hour'', recorded_at)
                         + ((extract(minute FROM recorded_at)::int / 10) * 10) * interval ''1 minute'' AS bucket_start,
                     %L::uuid AS tbm_id,
                     %s::bigint AS param_id,
                     %L::text AS param_code,
                     MAX(%I::numeric) - MIN(%I::numeric) AS delta,
                     MAX(%I::numeric) AS max_value,
                     MIN(%I::numeric) AS min_value,
                     COUNT(*) AS sample_count
                 FROM public.%I
                 WHERE recorded_at >= now() - interval ''10 minutes''
                   AND %I IS NOT NULL
                 GROUP BY bucket_start
                 HAVING MAX(%I::numeric) - MIN(%I::numeric) >= 10',
                tbm_id_uuid::text,
                param_id,
                param_code,
                param_code,
                param_code,
                param_code,
                param_code,
                base_table,
                param_code,
                param_code
            );
        first := FALSE;
    END LOOP;

    IF first THEN
        RAISE EXCEPTION 'No eligible parameters found for tbm_key %', p_tbm_key;
    END IF;

    EXECUTE format('CREATE OR REPLACE VIEW public.%I AS %s', view_name, union_sql);
END;
$$;

COMMIT;
