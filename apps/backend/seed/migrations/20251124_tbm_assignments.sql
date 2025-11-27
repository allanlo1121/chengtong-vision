DROP TABLE tbm_assignments CASCADE ;

CREATE TABLE IF NOT EXISTS public.tbm_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    tbm_id UUID NOT NULL REFERENCES public.tbms(id) ON DELETE CASCADE,
    tunnel_id UUID NOT NULL REFERENCES public.tunnels(id) ON DELETE CASCADE,

    -- TBM 当前业务状态（大型机功能状态）
    operation_status TEXT NOT NULL CHECK (
        operation_status IN (
            'IDLE',           -- 空闲：存放待命
            'WORKING',        -- 掘进中
            'PAUSED',         -- 暂停
            'MAINTENANCE',    -- 维修
            'COMMISSIONING',  -- 调试
            'TRANSPORT',      -- 运输
            'STORED'          -- 存放
        )
    ),

    start_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    end_at TIMESTAMPTZ,   

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id),

    UNIQUE (tbm_id)
);

DROP TABLE tbm_assignment_history CASCADE ;

CREATE TABLE IF NOT EXISTS public.tbm_assignment_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    tbm_id UUID NOT NULL REFERENCES public.tbms(id) ON DELETE CASCADE,
    tunnel_id UUID NOT NULL REFERENCES public.tunnels(id) ON DELETE CASCADE,

    operation_status TEXT NOT NULL CHECK (
        operation_status IN (
            'IDLE',
            'WORKING',
            'PAUSED',
            'MAINTENANCE',
            'COMMISSIONING',
            'TRANSPORT',
            'STORED'
        )
    ),

    start_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    end_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);



CREATE OR REPLACE FUNCTION public.fn_tbm_assignments_history()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
    now_ts TIMESTAMPTZ := now();
BEGIN
    -- 只有 operation_status 或 tunnel_id 改变时才记录历史
    IF TG_OP = 'UPDATE' THEN

        IF NEW.operation_status IS DISTINCT FROM OLD.operation_status
           OR NEW.tunnel_id IS DISTINCT FROM OLD.tunnel_id THEN

            -- 关闭上一段历史
            UPDATE public.tbm_assignment_history
            SET end_at = now_ts
            WHERE tbm_id = OLD.tbm_id
              AND end_at IS NULL;

            -- 写入新的状态段
            INSERT INTO public.tbm_assignment_history
                (tbm_id, tunnel_id, operation_status, start_at)
            VALUES
                (NEW.tbm_id, NEW.tunnel_id, NEW.operation_status, now_ts);
        END IF;

        RETURN NEW;
    END IF;

    -- 初始化 INSERT 的场景（第一次分配 TBM）
    IF TG_OP = 'INSERT' THEN
        INSERT INTO public.tbm_assignment_history
            (tbm_id, tunnel_id, operation_status, start_at)
        VALUES
            (NEW.tbm_id, NEW.tunnel_id, NEW.operation_status, now_ts);

        RETURN NEW;
    END IF;

    RETURN NEW;
END;
$$;


DROP TRIGGER IF EXISTS trg_tbm_assignments_history ON public.tbm_assignments;

CREATE TRIGGER trg_tbm_assignments_history
AFTER INSERT OR UPDATE
ON public.tbm_assignments
FOR EACH ROW
EXECUTE FUNCTION public.fn_tbm_assignments_history();
