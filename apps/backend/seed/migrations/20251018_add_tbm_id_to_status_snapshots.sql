-- Migration: Add tbm_id to tbm_status_snapshots and backfill from tbms
BEGIN;

-- 1) Add new column (nullable for now)
ALTER TABLE public.tbm_status_snapshots
ADD COLUMN tbm_id text;

-- 2) Backfill tbm_id by joining with tbms table using tbm_key (if existing)
--    This assumes tbms.tbm_key matches the existing tbm_status_snapshots.tbm_key values
UPDATE public.tbm_status_snapshots s
SET tbm_id = t.tbm_id
FROM public.tbms t
WHERE s.tbm_key IS NOT NULL
  AND t.tbm_key = s.tbm_key;

-- 3) Add foreign key constraint to tbms(tbm_id) if tbm_id values are present
--    Create an index on tbm_id first
CREATE INDEX IF NOT EXISTS idx_tbm_status_snapshots_tbm_id ON public.tbm_status_snapshots(tbm_id);

ALTER TABLE public.tbm_status_snapshots
ADD CONSTRAINT fk_tbm_status_snapshots_tbm_id
FOREIGN KEY (tbm_id) REFERENCES public.tbms(tbm_id);

COMMIT;

-- Rollback (to be used in downgrade script):
-- BEGIN;
-- ALTER TABLE public.tbm_status_snapshots DROP CONSTRAINT IF EXISTS fk_tbm_status_snapshots_tbm_id;
-- DROP INDEX IF EXISTS idx_tbm_status_snapshots_tbm_id;
-- ALTER TABLE public.tbm_status_snapshots DROP COLUMN IF EXISTS tbm_id;
-- COMMIT;
