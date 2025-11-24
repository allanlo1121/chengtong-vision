ALTER TABLE realtime_threshold_events
    ADD COLUMN IF NOT EXISTS resolved_by TEXT DEFAULT 'system';
