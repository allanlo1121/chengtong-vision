-- Migration: create placeholder tbm_runtime_parameters rows for orphan tbm_threshold_overrides.param_id
-- 2025-10-16

-- This script will:
-- 1) create an audit table `tbm_runtime_parameters_placeholders` if not exists
-- 2) insert placeholder rows into `tbm_runtime_parameters` for any param_id referenced by
--    tbm_threshold_overrides that does not exist in tbm_runtime_parameters
-- 3) record inserted placeholder ids in the audit table so they can be reviewed later

BEGIN;

-- 1) audit table
CREATE TABLE IF NOT EXISTS public.tbm_runtime_parameters_placeholders (
  id bigint PRIMARY KEY,
  code text,
  name text,
  inserted_at timestamptz DEFAULT now()
);

-- 2) find orphan param_ids and insert placeholders (do not overwrite existing rows)
WITH orphan_ids AS (
  SELECT DISTINCT o.param_id
  FROM public.tbm_threshold_overrides o
  LEFT JOIN public.tbm_runtime_parameters p ON o.param_id = p.id
  WHERE o.param_id IS NOT NULL AND p.id IS NULL
)
INSERT INTO public.tbm_runtime_parameters (id, code, name)
SELECT id, ('placeholder_param_' || id::text) as code, ('Placeholder param for override ' || id::text) as name
FROM orphan_ids
WHERE NOT EXISTS (SELECT 1 FROM public.tbm_runtime_parameters p2 WHERE p2.id = orphan_ids.param_id)
ON CONFLICT (id) DO NOTHING;

-- 3) record placeholders in audit table (avoid duplicates)
INSERT INTO public.tbm_runtime_parameters_placeholders (id, code, name, inserted_at)
SELECT p.id, p.code, p.name, now()
FROM public.tbm_runtime_parameters p
JOIN (
  SELECT DISTINCT o.param_id as id
  FROM public.tbm_threshold_overrides o
  LEFT JOIN public.tbm_runtime_parameters p2 ON o.param_id = p2.id
  WHERE o.param_id IS NOT NULL AND p2.id IS NULL
) oids ON p.id = oids.id
ON CONFLICT (id) DO NOTHING;

COMMIT;
