

DROP TABLE IF exists tbm_operational_events CASCADE;

DROP TABLE IF exists tbm_active_static_events CASCADE;

CREATE TABLE IF NOT EXISTS public.tbm_active_static_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    tbm_id UUID NOT NULL REFERENCES public.tbms(id) ON DELETE CASCADE,
    param_code TEXT NOT NULL,                 -- s100206003     
    
    value NUMERIC,                            -- 最新值
    severity SMALLINT NOT NULL DEFAULT 0,     -- 0 normal, 1 warning, 2 critical    
    trend TEXT CHECK (trend IN ('rising','falling','stable')),
    data_quality SMALLINT DEFAULT 0,          -- 数据质量
   
    payload JSONB,                           -- 可选：原始数据
    rule JSONB,                          -- 可选：规则细节
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    


    -- 唯一性：同一个 TBM，同一个参数，同一种规则，同一个窗口大小 = 一条记录
    UNIQUE (tbm_id, param_code)
);


DROP TABLE IF exists tbm_active_static_events CASCADE;

CREATE TABLE IF NOT EXISTS public.tbm_static_operational_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    tbm_id UUID NOT NULL REFERENCES public.tbms(id) ON DELETE CASCADE,
    param_code TEXT NOT NULL,   
    
    old_severity SMALLINT,               -- 上一次的状态
    severity SMALLINT NOT NULL,          -- 本次状态（0/1/2） 
    data_quality SMALLINT DEFAULT 0,     -- 数据质量
    trend TEXT, 

    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),  -- 事件发生时间

    rule JSONB,                      -- 可选：规则细节
    payload JSONB,                       -- 可选：原始数据

    action TEXT,

    created_at TIMESTAMPTZ DEFAULT now()
    
);


CREATE OR REPLACE FUNCTION log_active_static_event_start()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.tbm_static_operational_events (
        tbm_id,
        param_code,        

        old_value,
        value,
        old_severity,
        severity,
        trend,
        data_quality,

        payload,
        rule,

        occurred_at,
        created_at,
        action
    )
    VALUES (
        NEW.tbm_id,
        NEW.param_code,        

        NULL,                   -- 新事件无旧值
        NEW.value,
        NULL,                   -- 新事件无旧值
        NEW.severity,
        NEW.trend,
        NEW.data_quality,

        NEW.payload,
        NEW.rule,

        NEW.occurred_at,
        now(),
        'start'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_active_static_event_start
AFTER INSERT ON public.tbm_active_static_events
FOR EACH ROW EXECUTE FUNCTION log_active_static_event_start();


CREATE OR REPLACE FUNCTION log_active_static_event_update()
RETURNS trigger AS $$
BEGIN
    IF OLD.severity = NEW.severity AND OLD.value = NEW.value THEN
        RETURN NEW; -- 状态没变，不记录事件
    END IF;

    INSERT INTO public.tbm_static_operational_events (
        tbm_id,
        param_code,        

        old_value,
        value,        
        old_severity,
        severity,
        trend,
        data_quality,

        payload,
        rule,

        occurred_at,
        updated_at,
        action
    )
    VALUES (
        NEW.tbm_id,
        NEW.param_code,        

        OLD.value,
        NEW.value,
        OLD.severity,
        NEW.severity,
        NEW.trend,
        NEW.data_quality,
        
        NEW.payload,
        NEW.rule,

        NEW.occurred_at,
        now(),
        'update'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_active_static_event_update
AFTER UPDATE ON public.tbm_active_static_events
FOR EACH ROW EXECUTE FUNCTION log_active_static_event_update();

CREATE OR REPLACE FUNCTION log_active_static_event_end()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.tbm_static_operational_events (
        tbm_id,
        param_code,        

        old_value,
        value,        
        old_severity,
        severity,
        trend,
        data_quality,

        payload,
        rule,

        occurred_at,
        updated_at,
        action
    )
    VALUES (
        OLD.tbm_id,
        OLD.param_code,        

        OLD.value,
        NULL,
        OLD.severity,
        NULL,
        OLD.trend,
        OLD.data_quality,
        
        OLD.payload,
        OLD.rule,

        OLD.occurred_at,
        now(),
        'end'
    );

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_active_static_event_end
AFTER DELETE ON public.tbm_active_static_events
FOR EACH ROW EXECUTE FUNCTION log_active_static_event_end();

