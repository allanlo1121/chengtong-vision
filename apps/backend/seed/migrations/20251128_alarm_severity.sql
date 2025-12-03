CREATE TABLE alarm_severity_levels (
    id SMALLINT PRIMARY KEY,
    name TEXT NOT NULL,
    label TEXT NOT NULL,
    notify_channels TEXT[] NOT NULL DEFAULT '{}',
    resend_interval_ms INTEGER NOT NULL DEFAULT 0
);


INSERT INTO alarm_severity_levels (id, name, notify_channels, resend_interval_ms)
VALUES
(0, 'normal','正常', '{}', 0),
(1, 'warning', '警告','{wecom}', 1800000),    -- 30分钟
(2, 'critical', '严重警告','{wecom,sms}', 300000); -- 5分钟