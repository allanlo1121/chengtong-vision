-- Migration: add partial unique index to prevent duplicate open events for same tbm/ring/alert_type_id/severity
-- This index only applies to events that are not in a closed/acknowledged state.

DO $$
BEGIN
    -- Make sure the table exists
    IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'realtime_threshold_events'
    ) THEN
        -- Create a partial unique index enforcing uniqueness for open events
        CREATE UNIQUE INDEX IF NOT EXISTS ux_realtime_threshold_events_unique_open_event
        ON public.realtime_threshold_events (tbm_code, ring_no, alert_type_id, severity)
        WHERE COALESCE(ack_status, '') NOT IN ('acknowledged','resolved','closed','auto_resolved');
    END IF;
END$$;
