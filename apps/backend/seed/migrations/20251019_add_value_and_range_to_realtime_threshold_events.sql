-- Migration: add metric value and normal range columns to realtime_threshold_events
-- 2025-10-19

BEGIN;

ALTER TABLE public.realtime_threshold_events
    ADD COLUMN IF NOT EXISTS metric_value double precision,
    ADD COLUMN IF NOT EXISTS normal_range double precision[];

COMMENT ON COLUMN public.realtime_threshold_events.metric_value IS 'Latest observed metric value associated with the event';
COMMENT ON COLUMN public.realtime_threshold_events.normal_range IS 'Expected operating range for the metric expressed as a numeric array [min, max]';

COMMIT;
