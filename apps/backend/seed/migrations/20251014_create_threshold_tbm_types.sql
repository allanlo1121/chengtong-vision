-- Migration: create mapping table threshold_tbm_types
-- 2025-10-14

BEGIN;

CREATE TABLE IF NOT EXISTS public.threshold_tbm_types (
  threshold_id int NOT NULL REFERENCES public.tbm_parameter_thresholds(id) ON DELETE CASCADE,
  tbm_type_code text NOT NULL,
  PRIMARY KEY (threshold_id, tbm_type_code)
);

CREATE INDEX IF NOT EXISTS idx_threshold_tbmtype ON public.threshold_tbm_types(tbm_type_code);
CREATE INDEX IF NOT EXISTS idx_threshold_by_thresholdid ON public.threshold_tbm_types(threshold_id);

COMMIT;
