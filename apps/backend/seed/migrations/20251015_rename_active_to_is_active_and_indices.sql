-- Migration: rename active -> is_active on threshold-related tables and add partial indexes
-- 2025-10-15

BEGIN;

-- 1) Add new column is_active (if not exists) with default true
ALTER TABLE IF EXISTS public.threshold_profiles ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;
ALTER TABLE IF EXISTS public.tbm_profile_map ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;
ALTER TABLE IF EXISTS public.tbm_parameter_thresholds ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;
ALTER TABLE IF EXISTS public.tbm_threshold_overrides ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- 2) Copy existing values from legacy `active` to `is_active` where applicable
-- Use COALESCE to keep existing true default when `active` is NULL
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='threshold_profiles' AND column_name='active') THEN
    EXECUTE 'UPDATE public.threshold_profiles SET is_active = COALESCE(active, true) WHERE is_active IS DISTINCT FROM COALESCE(active, true)';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tbm_profile_map' AND column_name='active') THEN
    EXECUTE 'UPDATE public.tbm_profile_map SET is_active = COALESCE(active, true) WHERE is_active IS DISTINCT FROM COALESCE(active, true)';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tbm_parameter_thresholds' AND column_name='active') THEN
    EXECUTE 'UPDATE public.tbm_parameter_thresholds SET is_active = COALESCE(active, true) WHERE is_active IS DISTINCT FROM COALESCE(active, true)';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tbm_threshold_overrides' AND column_name='active') THEN
    EXECUTE 'UPDATE public.tbm_threshold_overrides SET is_active = COALESCE(active, true) WHERE is_active IS DISTINCT FROM COALESCE(active, true)';
  END IF;
END$$;

-- 3) Make is_active NOT NULL with default true to ensure no tri-state
ALTER TABLE IF EXISTS public.threshold_profiles ALTER COLUMN is_active SET NOT NULL;
ALTER TABLE IF EXISTS public.tbm_profile_map ALTER COLUMN is_active SET NOT NULL;
ALTER TABLE IF EXISTS public.tbm_parameter_thresholds ALTER COLUMN is_active SET NOT NULL;
ALTER TABLE IF EXISTS public.tbm_threshold_overrides ALTER COLUMN is_active SET NOT NULL;

-- 4) (Optional) Drop legacy `active` column if you want to fully migrate.
-- Uncomment the following lines to drop the old column. Keep commented for safety by default.
-- ALTER TABLE IF EXISTS public.threshold_profiles DROP COLUMN IF EXISTS active;
-- ALTER TABLE IF EXISTS public.tbm_profile_map DROP COLUMN IF EXISTS active;
-- ALTER TABLE IF EXISTS public.tbm_parameter_thresholds DROP COLUMN IF EXISTS active;
-- ALTER TABLE IF EXISTS public.tbm_threshold_overrides DROP COLUMN IF EXISTS active;

-- 5) Create example partial indexes to accelerate queries that target the minority (disabled) rows
-- These indexes are helpful when most rows are active=true and you commonly query for disabled rows.
CREATE INDEX IF NOT EXISTS idx_threshold_profiles_is_active_false ON public.threshold_profiles (profile_name) WHERE is_active = false;
CREATE INDEX IF NOT EXISTS idx_tbm_profile_map_is_active_false ON public.tbm_profile_map (tbm_code) WHERE is_active = false;
CREATE INDEX IF NOT EXISTS idx_tbm_parameter_thresholds_is_active_false ON public.tbm_parameter_thresholds (param_id) WHERE is_active = false;
CREATE INDEX IF NOT EXISTS idx_tbm_threshold_overrides_is_active_false ON public.tbm_threshold_overrides (tbm_code, param_id) WHERE is_active = false;

COMMIT;
