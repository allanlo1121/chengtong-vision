-- Add param_key to realtime_threshold_events to support deduplication by ring/param/severity
ALTER TABLE IF EXISTS realtime_threshold_events
    ADD COLUMN IF NOT EXISTS param_key text;

-- Create a partial unique index to prevent duplicate open events per tbm/ring/param/severity/alert_type
-- The partial index excludes acknowledged events so resolved/closed alerts can be re-created.
CREATE UNIQUE INDEX IF NOT EXISTS uq_realtime_threshold_events_param_key
ON realtime_threshold_events(tbm_code, ring_no, param_key, severity, alert_type_id)
WHERE ack_status IS NULL OR ack_status <> 'acknowledged';

-- Note: param_key should be a normalized identifier (lowercase, whitespace replaced) created by upstream code.
