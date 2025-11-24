-- Migration: convert tbm_threshold_overrides to use tbm_id with FK to tbms/tunnels
-- 2025-10-21

BEGIN;

ALTER TABLE IF EXISTS public.tbm_threshold_overrides
    ADD COLUMN IF NOT EXISTS tbm_id uuid;

DO $$
DECLARE
    ref_table text := NULL;
    fk_exists boolean := FALSE;
    tbms_exists boolean := FALSE;
    tunnels_exists boolean := FALSE;
    column_exists boolean := FALSE;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'tbms'
    ) INTO tbms_exists;

    SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'tunnels'
    ) INTO tunnels_exists;

    IF tbms_exists THEN
        ref_table := 'tbms';
    ELSIF tunnels_exists THEN
        ref_table := 'tunnels';
    END IF;

    IF ref_table IS NULL THEN
        RAISE EXCEPTION 'Unable to determine TBM reference table (tbms/tunnels missing).';
    END IF;

    SELECT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'tbm_threshold_overrides'
          AND column_name = 'tbm_code'
    ) INTO column_exists;

    IF column_exists THEN
        EXECUTE format(
            'UPDATE public.tbm_threshold_overrides o
             SET tbm_id = t.id
             FROM public.%I t
             WHERE o.tbm_id IS NULL AND o.tbm_code = t.tbm_code',
            ref_table
        );
    END IF;

    SELECT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints tc
        WHERE tc.table_schema = 'public'
          AND tc.table_name = 'tbm_threshold_overrides'
          AND tc.constraint_type = 'FOREIGN KEY'
          AND tc.constraint_name = 'fk_tbm_threshold_overrides_tbm_id'
    ) INTO fk_exists;

    IF NOT fk_exists THEN
        EXECUTE format(
            'ALTER TABLE public.tbm_threshold_overrides
             ADD CONSTRAINT fk_tbm_threshold_overrides_tbm_id
             FOREIGN KEY (tbm_id) REFERENCES public.%I(id) ON DELETE RESTRICT',
            ref_table
        );
    END IF;
END$$;

-- ensure no NULL tbm_id remains before enforcing NOT NULL
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM public.tbm_threshold_overrides WHERE tbm_id IS NULL) THEN
        RAISE EXCEPTION 'tbm_threshold_overrides.tbm_id contains NULL values after migration; please backfill before re-running.';
    END IF;
END$$;

ALTER TABLE IF EXISTS public.tbm_threshold_overrides
    ALTER COLUMN tbm_id SET NOT NULL;

-- replace old indexes on tbm_code with tbm_id variants
DROP INDEX IF EXISTS idx_overrides_tbm_paramid;
DROP INDEX IF EXISTS idx_tbm_threshold_overrides_is_active_false;

CREATE INDEX IF NOT EXISTS idx_overrides_tbm_paramid
    ON public.tbm_threshold_overrides (tbm_id, param_id);

CREATE INDEX IF NOT EXISTS idx_tbm_threshold_overrides_is_active_false
    ON public.tbm_threshold_overrides (tbm_id, param_id)
    WHERE is_active = false;

ALTER TABLE IF EXISTS public.tbm_threshold_overrides
    DROP COLUMN IF EXISTS tbm_code;

COMMIT;
