CREATE TABLE alarm_default_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    alarm_type TEXT NOT NULL,      -- HEARTBEAT_OFFLINE 等
    job_title_code TEXT NOT NULL,  -- ENGINEER_MANAGER 等岗位代码
    description TEXT,
    is_enabled BOOLEAN DEFAULT TRUE
);
CREATE TABLE alarm_notification_special (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    alarm_type TEXT NOT NULL,
    project_id UUID REFERENCES projects(id),
    tunnel_id UUID REFERENCES tunnels(id),
    tbm_id UUID REFERENCES tbms(id),

    employee_id UUID NOT NULL REFERENCES employees(id),

    note TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE alarm_global_notification (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    alarm_type TEXT NOT NULL,           -- 哪种报警类型
    employee_id UUID NOT NULL REFERENCES employees(id),

    role_code TEXT,                     -- 公司角色，如 COMPANY_MANAGER / SAFETY_MANAGER
    description TEXT,

    is_enabled BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT now()
);
