-- Migration: add alert_types table and alert_type column to realtime_threshold_events

BEGIN;

-- 1) Create alert_types lookup table
CREATE TABLE IF NOT EXISTS public.alert_types (
    id serial PRIMARY KEY,
    code text NOT NULL UNIQUE,
    name text NOT NULL,
    description text,
    created_at timestamptz DEFAULT now()
);

-- 2) Add alert_type column to realtime_threshold_events (nullable by default for backward compat)
ALTER TABLE IF EXISTS public.realtime_threshold_events
    ADD COLUMN IF NOT EXISTS alert_type text;

-- 3) Optionally create FK to alert_types.code using a trigger or constraint is not convenient for text codes;
--    we'll create a simple index for fast lookups and leave FK optional (avoid migration failures if alert_types not populated).
CREATE INDEX IF NOT EXISTS idx_realtime_threshold_events_alert_type ON public.realtime_threshold_events(alert_type);

COMMIT;
