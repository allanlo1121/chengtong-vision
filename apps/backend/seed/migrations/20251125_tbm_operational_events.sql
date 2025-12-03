

DROP TABLE IF exists tbm_operational_events CASCADE;

DROP TABLE IF exists tbm_active_operational_events CASCADE;

CREATE TABLE IF NOT EXISTS public.tbm_active_parameter_state (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    tbm_id UUID NOT NULL REFERENCES public.tbms(id) ON DELETE CASCADE,
    param_code TEXT NOT NULL,                 -- s100206003
    rule_type TEXT NOT NULL,                  -- static | delta | ai | pattern
    window_ms INT NOT NULL DEFAULT 0,         -- delta 规则使用；static/ai/pattern=0

    value NUMERIC,                            -- 最新值
    severity SMALLINT NOT NULL DEFAULT 0,     -- 0 normal, 1 warning, 2 critical
    data_quality SMALLINT NOT NULL DEFAULT 0, -- 0=normal, 1=missing, 2=outlier, 3=noisy, 4=stuck, etc.

    ring_no INT,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),


    -- 唯一性：同一个 TBM，同一个参数，同一种规则，同一个窗口大小 = 一条记录
    UNIQUE (tbm_id, param_code, rule_type, window_ms)
);


INSERT INTO master_definitions (id, code, name, description, parent_id)
VALUES (
    gen_random_uuid(),
    'TBM_RULE_TYPE',
    '报警规则类型',
    '用于定义阈值检测规则类型（静态、动态、AI、模式识别等）',
    'b0df0270-aeb3-41d1-85a1-dab0f481e6fc'
);

WITH u AS (SELECT gen_random_uuid() AS id)
INSERT INTO master_definitions (
    id,
    parent_id,
    code,
    name,
    description,
    sort_order,
    external_global_id,
    created_at,
    updated_at
)
SELECT
    id,
    'b0df0270-aeb3-41d1-85a1-dab0f481e6fc',
    'TBM_RULE_TYPE',
    '报警规则类型',
    '用于定义阈值检测规则类型（静态、动态、AI、模式识别等）',
    1,
    id,
    NOW(),
    NOW()
FROM u
RETURNING id;'60d2ab09-d521-45a3-b9a8-88e9d241e05e'


WITH def AS (
    SELECT id FROM master_definitions WHERE code = 'TBM_RULE_TYPE'
),
uuid_src AS (
    SELECT gen_random_uuid() AS new_uuid
)

INSERT INTO master_data (
    id, definition_id, code, name, value, description,
    sort_order, external_global_id,
    created_by, updated_by
)
VALUES
-- 1. 静态阈值
((SELECT new_uuid FROM uuid_src), (SELECT id FROM def),
 '4008003', '模式识别', 'pattern',
 '通过趋势、波形、震荡特征识别异常',
 4, (SELECT new_uuid FROM uuid_src),'6b7b6472-da9a-411d-94a0-27bd8fcd822e','6b7b6472-da9a-411d-94a0-27bd8fcd822e');

-- 2. 动态阈值（基于窗口的变化值Delta）
(gen_random_uuid(), (SELECT id FROM def),
 '40820002', '动态变化阈值', 'delta',
 '基于一段时间窗口的变化量进行判断（如1分钟内变化超过20mm）',
 2, (SELECT new_uuid FROM uuid_src),'6b7b6472-da9a-411d-94a0-27bd8fcd822e','6b7b6472-da9a-411d-94a0-27bd8fcd822e'),

-- 3. AI 模型阈值
(gen_random_uuid(), (SELECT id FROM def),
 '40080003', 'AI模型规则', 'ai',
 '通过AI模型判断是否异常，如预测异常概率>90%',
 3, (SELECT new_uuid FROM uuid_src),'6b7b6472-da9a-411d-94a0-27bd8fcd822e','6b7b6472-da9a-411d-94a0-27bd8fcd822e'),

-- 4. 模式识别
(gen_random_uuid(), (SELECT id FROM def),
 '4008003', '模式识别', 'pattern',
 '通过趋势、波形、震荡特征识别异常',
 4, (SELECT new_uuid FROM uuid_src),'6b7b6472-da9a-411d-94a0-27bd8fcd822e','6b7b6472-da9a-411d-94a0-27bd8fcd822e');


CREATE TABLE IF NOT EXISTS public.tbm_operational_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    tbm_id UUID NOT NULL REFERENCES public.tbms(id) ON DELETE CASCADE,
    param_code TEXT NOT NULL,
    rule_type TEXT NOT NULL,
    window_ms INT NOT NULL DEFAULT 0,

    old_severity SMALLINT,               -- 上一次的状态
    severity SMALLINT NOT NULL,          -- 本次状态（0/1/2）
    data_quality SMALLINT DEFAULT 0,     -- 数据质量

    value NUMERIC,
    ring_no INT,

    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),  -- 事件发生时间

    metadata JSONB,                      -- 可选：规则细节
    payload JSONB,                       -- 可选：原始数据

    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id) DEFAULT '6b7b6472-da9a-411d-94a0-27bd8fcd822e',
    updated_by UUID REFERENCES auth.users(id) DEFAULT '6b7b6472-da9a-411d-94a0-27bd8fcd822e'
);


CREATE OR REPLACE FUNCTION log_active_event_start()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.tbm_operational_events (
        tbm_id,
        param_code,
        rule_type,
        window_ms,

        old_severity,
        severity,
        warning_level,
        data_quality,
        value,

        occurred_at,
        ring_no,
        action
    )
    VALUES (
        NEW.tbm_id,
        NEW.param_code,
        NEW.rule_type,
        NEW.window_ms,

        NULL,                   -- 新事件无旧值
        NEW.severity,
        NEW.warning_level,
        NEW.data_quality,
        NEW.value,

        now(),
        NULL,
        'start'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_active_event_start
AFTER INSERT ON public.tbm_active_parameter_state
FOR EACH ROW EXECUTE FUNCTION log_active_event_start();


CREATE OR REPLACE FUNCTION log_active_event_update()
RETURNS trigger AS $$
BEGIN
    IF OLD.severity = NEW.severity AND OLD.data_quality = NEW.data_quality THEN
        RETURN NEW; -- 状态没变，不记录事件
    END IF;

    INSERT INTO public.tbm_operational_events (
        tbm_id,
        param_code,
        rule_type,
        window_ms,

        old_severity,
        severity,
        data_quality,
        value,

        occurred_at,
        action
    )
    VALUES (
        NEW.tbm_id,
        NEW.param_code,
        NEW.rule_type,
        NEW.window_ms,

        OLD.severity,
        NEW.severity,
        NEW.data_quality,
        NEW.value,

        now(),
        'update'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_active_event_update
AFTER UPDATE ON public.tbm_active_parameter_state
FOR EACH ROW EXECUTE FUNCTION log_active_event_update();

CREATE OR REPLACE FUNCTION log_active_event_end()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.tbm_operational_events (
        tbm_id,
        param_code,
        rule_type,
        window_ms,

        old_severity,
        severity,
        data_quality,
        value,

        occurred_at,
        action
    )
    VALUES (
        OLD.tbm_id,
        OLD.param_code,
        OLD.rule_type,
        OLD.window_ms,

        OLD.severity,
        NULL,
        OLD.data_quality,
        OLD.value,

        now(),
        'end'
    );

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_active_event_end
AFTER DELETE ON public.tbm_active_parameter_state
FOR EACH ROW EXECUTE FUNCTION log_active_event_end();



ALTER TABLE public.tbm_active_parameter_state
ADD COLUMN warning_level SMALLINT DEFAULT 0;

ALTER TABLE public.tbm_operational_events
ADD COLUMN warning_level SMALLINT DEFAULT 0;




BEGIN
    INSERT INTO public.tbm_operational_events (
        tbm_id,
        param_code,
        ring_no,
        rule_type,
        window_ms,

        old_severity,
        severity,
        level,       
        data_quality,
        value,
        delta_value,
        payload,

        occurred_at,
        action
        
    )
    VALUES (
        OLD.tbm_id,        
        OLD.param_code,
        OLD.ring_no,
        OLD.rule_type,
        OLD.window_ms,

        OLD.severity,
        OLD.severity,
        OLD.level,        
        OLD.data_quality,
        OLD.value,
        OLD.delta_value,
        OLD.payload,

        now(),
        'end'
        
    );

    RETURN OLD;
END;


BEGIN
    INSERT INTO public.tbm_operational_events (
        tbm_id,
        param_code,
        ring_no,
        rule_type,
        window_ms,

       
        severity,
        level,       
        data_quality,
        value,
        delta_value,
        payload,

        occurred_at,
        action
        
    )
    VALUES (
        OLD.tbm_id,        
        OLD.param_code,
        OLD.ring_no,
        OLD.rule_type,
        OLD.window_ms,

        OLD.severity,        
        OLD.level,        
        OLD.data_quality,
        OLD.value,
        OLD.delta_value,
        OLD.payload,

        now(),
        'end'
        
    );

    RETURN OLD;
END;

--update trigger function to log ring_no, level, delta_value, payload
BEGIN
    IF OLD.severity = NEW.severity AND OLD.data_quality = NEW.data_quality THEN
        RETURN NEW; -- 状态没变，不记录事件
    END IF;

    INSERT INTO public.tbm_operational_events (
        tbm_id,
        ring_no,
        param_code,
        rule_type,
        window_ms,

        old_severity,
        severity,
        old_level,
        level,
        data_quality,
        value,
        delta_value,
        payload,

        occurred_at,
        action
    )
    VALUES (
        NEW.tbm_id,
        NEW.ring_no,
        NEW.param_code,
        NEW.rule_type,
        NEW.window_ms,

        OLD.severity,
        NEW.severity,
        OLD.level,
        NEW.level,
        NEW.data_quality,
        NEW.value,
        NEW.delta_value,
        NEW.payload,

        now(),
        'update'
    );

    RETURN NEW;
END;