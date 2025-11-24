-- Migration: add foreign key from tbm_threshold_overrides.param_id -> tbm_runtime_parameters.id
-- 2025-10-16

BEGIN;

-- create an index on param_id to speed up joins/lookups (idempotent)
CREATE INDEX IF NOT EXISTS idx_tbm_threshold_overrides_param_id_fk ON public.tbm_threshold_overrides (param_id);

-- Add foreign key constraint only if it does not already exist. This is defensive so the migration is safe to re-run.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.referential_constraints rc ON tc.constraint_name = rc.constraint_name
        JOIN information_schema.constraint_column_usage ccu ON rc.unique_constraint_name = ccu.constraint_name
        WHERE tc.table_schema = 'public'
          AND tc.table_name = 'tbm_threshold_overrides'
          AND tc.constraint_type = 'FOREIGN KEY'
          AND kcu.column_name = 'param_id'
          AND ccu.table_name = 'tbm_runtime_parameters'
          AND ccu.column_name = 'id'
    ) THEN
        -- Attempt to add the FK. Assumes tbm_runtime_parameters.id is compatible with tbm_threshold_overrides.param_id (bigint).
        ALTER TABLE public.tbm_threshold_overrides
        ADD CONSTRAINT fk_tbm_threshold_overrides_param_id
        FOREIGN KEY (param_id) REFERENCES public.tbm_runtime_parameters(id) ON DELETE RESTRICT;
    END IF;
END
$$;

COMMIT;
