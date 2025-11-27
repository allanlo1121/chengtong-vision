
DROP TABLE tbm_active_operational_events cascade ;



CREATE TABLE IF NOT EXISTS public.tbm_active_operational_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    tbm_id UUID NOT NULL REFERENCES public.tbms(id) ON DELETE CASCADE,
    param_code TEXT NOT NULL,       -- s100206007 / heartbeat / torque
    value NUMERIC,

    alarm_type TEXT NOT NULL,       -- CONNECTIVITY / GUIDANCE / ADVANCE / SAFETY
    group_name TEXT,                -- thrust / torque / guidance_y / etc
    severity TEXT NOT NULL CHECK (severity IN ('info','warning','critical')),

    ring_no INT,
    message TEXT,
    parameters JSONB,               -- 具体参数信息
    payload JSONB,                  -- 原始 realdata   
  
    notified_channels JSONB DEFAULT '[]'::jsonb,
 
    notified_users JSONB DEFAULT '[]'::jsonb,

    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id) DEFAULT '6b7b6472-da9a-411d-94a0-27bd8fcd822e',
    updated_by UUID REFERENCES auth.users(id) DEFAULT '6b7b6472-da9a-411d-94a0-27bd8fcd822e',
  
    UNIQUE (tbm_id, param_code)
);

DROP TABLE tbm_operational_events cascade ;

CREATE TABLE public.tbm_operational_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    event_id UUID NOT NULL,

    tbm_id UUID NOT NULL REFERENCES public.tbms(id) ON DELETE CASCADE,

    param_code TEXT NOT NULL,       -- s100206003 / rear_y / heartbeat
    value NUMERIC,
    alarm_type TEXT NOT NULL,       -- CONNECTIVITY / GUIDANCE / ADVANCE / SAFETY
    group_name TEXT,

    severity TEXT NOT NULL CHECK (severity IN ('info','warning','critical')),
    occurred_at TIMESTAMPTZ NOT NULL,
    
    ring_no INT,
    action TEXT CHECK (action IN ('start','update','end')),

    parameters JSONB,
    payload JSONB,
    message TEXT,

    notified_channels JSONB DEFAULT '[]'::jsonb,
    notified_users JSONB DEFAULT '[]'::jsonb,


    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id) DEFAULT '6b7b6472-da9a-411d-94a0-27bd8fcd822e',
    updated_by UUID REFERENCES auth.users(id) DEFAULT '6b7b6472-da9a-411d-94a0-27bd8fcd822e'
);


CREATE TABLE public.tbm_event_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    event_id UUID NOT NULL REFERENCES public.tbm_operational_events(id) ON DELETE CASCADE,
    tbm_id UUID NOT NULL REFERENCES public.tbms(id) ON DELETE CASCADE,

    param_code TEXT NOT NULL,       -- 事件对应的参数
    alarm_type TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('info','warning','critical')),

    employee_id UUID REFERENCES public.employees(id),
    employee_name TEXT,
    employee_phone TEXT,

    channel TEXT NOT NULL CHECK (channel IN ('wecom','sms','email')),
    sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,

    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id) DEFAULT '6b7b6472-da9a-411d-94a0-27bd8fcd822e',
    updated_by UUID REFERENCES auth.users(id) DEFAULT '6b7b6472-da9a-411d-94a0-27bd8fcd822e'
);




CREATE OR REPLACE FUNCTION log_realdata_event_start()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.tbm_operational_events (
        event_id,
        tbm_id,
        param_code,
        value,
        alarm_type,
        group_name,
        severity,
        occurred_at,
        ring_no,
        parameters,
        payload,
        message,
        action
    )
    VALUES (
        NEW.id,
        NEW.tbm_id,
        NEW.param_code,
        NEW.value,
        NEW.alarm_type,
        NEW.group_name,
        NEW.severity,
        NEW.activated_at,
        NEW.ring_no,
        NEW.parameters,
        NEW.payload,
        NEW.message,
        'start'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_realdata_event_start
AFTER INSERT ON public.tbm_active_operational_events
FOR EACH ROW EXECUTE FUNCTION log_realdata_event_start();

CREATE OR REPLACE FUNCTION log_realdata_event_update()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.tbm_operational_events (
        event_id,
        tbm_id,
        param_code,
        value,
        alarm_type,
        group_name,
        severity,
        occurred_at,
        ring_no,
        parameters,
        payload,
        message,
        action
    )
    VALUES (
        NEW.id,
        NEW.tbm_id,
        NEW.param_code,
        NEW.value,
        NEW.alarm_type,
        NEW.group_name,
        NEW.severity,
        NEW.updated_at,
        NEW.ring_no,
        NEW.parameters,
        NEW.payload,
        NEW.message,
        'update'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_event_update
AFTER UPDATE ON public.tbm_active_operational_events
FOR EACH ROW EXECUTE FUNCTION log_realdata_event_update();

CREATE OR REPLACE FUNCTION log_realdata_event_end()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.tbm_operational_events (
        event_id,
        tbm_id,
        param_code,
        value,
        alarm_type,
        group_name,
        severity,
        occurred_at,
        ring_no,
        parameters,
        payload,
        message,
        action
    )
    VALUES (
        OLD.id,
        OLD.tbm_id,
        OLD.param_code,
        OLD.value,
        OLD.alarm_type,
        OLD.group_name,
        OLD.severity,
        now(),               -- 结束时间
        OLD.ring_no,
        OLD.parameters,
        OLD.payload,
        OLD.message,
        'end'
    );

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_event_end
AFTER DELETE ON public.tbm_active_operational_events
FOR EACH ROW EXECUTE FUNCTION log_realdata_event_end();

