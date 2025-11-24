-- Create table to track delivery attempts for each notification channel per threshold event
CREATE TABLE IF NOT EXISTS realtime_threshold_event_notifications (
    id BIGSERIAL PRIMARY KEY,
    event_id UUID NOT NULL REFERENCES realtime_threshold_events(id) ON DELETE CASCADE,
    channel TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    attempts INTEGER NOT NULL DEFAULT 0,
    last_sent_at TIMESTAMPTZ,
    last_error TEXT,
    payload JSONB,
    meta JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure we only keep one row per event/channel combination
CREATE UNIQUE INDEX IF NOT EXISTS idx_realtime_threshold_event_notifications_event_channel
    ON realtime_threshold_event_notifications (event_id, channel);

-- Speed up lookups by channel when building fan-out queues
CREATE INDEX IF NOT EXISTS idx_realtime_threshold_event_notifications_channel_status
    ON realtime_threshold_event_notifications (channel, status);
