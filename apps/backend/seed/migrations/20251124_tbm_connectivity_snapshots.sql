CREATE TABLE public.tbm_connectivity_snapshots (
    tbm_id UUID PRIMARY KEY REFERENCES public.tbms(id) ON DELETE CASCADE,

    -- 心跳状态: online/offline
    heartbeat_status TEXT NOT NULL CHECK (heartbeat_status IN ('online', 'offline'))
        DEFAULT 'offline',

    -- PLC 数据状态: online/offline
    plc_status TEXT NOT NULL CHECK (plc_status IN ('online', 'offline'))
        DEFAULT 'offline',

    -- 最后一次收到心跳时间
    last_heartbeat_at TIMESTAMPTZ NULL,

    -- 最后一次收到实时数据（PLC）
    last_realdata_at TIMESTAMPTZ NULL,

    -- 最后一次 ring 号（数据中提取）
    last_ring INTEGER NULL,

    -- 最近的原始 payload（可选，便于调试）
    last_heartbeat_payload JSONB NULL,
    last_realdata_payload JSONB NULL,

    -- 更新时间
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tbm_connectivity_snapshots_updated
BEFORE UPDATE ON public.tbm_connectivity_snapshots
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();


ALTER TABLE public.tbm_connectivity_snapshots
ADD COLUMN heartbeat_status_change_at TIMESTAMPTZ,
ADD COLUMN plc_status_change_at TIMESTAMPTZ;


ALTER TABLE public.tbm_connectivity_snapshots
ADD COLUMN last_heartbeat_status TEXT NOT NULL
    CHECK (last_heartbeat_status IN ('online', 'offline'))
    DEFAULT 'offline';

ALTER TABLE public.tbm_connectivity_snapshots
ADD COLUMN last_plc_status TEXT NOT NULL
    CHECK (last_plc_status IN ('online', 'offline'))
    DEFAULT 'offline';


CREATE TABLE public.tbm_connectivity_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    tbm_id UUID NOT NULL REFERENCES public.tbms(id) ON DELETE CASCADE,

    -- online / offline
    heartbeat_status TEXT NOT NULL CHECK (heartbeat_status IN ('online', 'offline')),
    plc_status TEXT NOT NULL CHECK (plc_status IN ('online', 'offline')),

    -- 时间区段
    start_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    end_at   TIMESTAMPTZ,  -- null = 正在进行的状态

    -- 原始快照（可选，用于分析）
    snapshot JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE OR REPLACE FUNCTION log_()
RETURNS TRIGGER AS $$connectivity_history
BEGIN
  -- heartbeat 状态变化
  IF NEW.heartbeat_status <> OLD.heartbeat_status THEN
    -- 关闭旧记录
    UPDATE public.tbm_connectivity_history
    SET end_at = now()
    WHERE tbm_id = NEW.tbm_id
      AND end_at IS NULL
      AND heartbeat_status = OLD.heartbeat_status;

    -- 插入新记录
    INSERT INTO public.tbm_connectivity_history (
      tbm_id,
      heartbeat_status,
      plc_status,
      start_at,
      snapshot
    )
    VALUES (
      NEW.tbm_id,
      NEW.heartbeat_status,
      NEW.plc_status,
      now(),
      to_jsonb(NEW)
    );
  END IF;

  -- PLC 状态变化
  IF NEW.plc_status <> OLD.plc_status THEN
    UPDATE public.tbm_connectivity_history
    SET end_at = now()
    WHERE tbm_id = NEW.tbm_id
      AND end_at IS NULL
      AND plc_status = OLD.plc_status;

    INSERT INTO public.tbm_connectivity_history (
      tbm_id,
      heartbeat_status,
      plc_status,
      start_at,
      snapshot
    )
    VALUES (
      NEW.tbm_id,
      NEW.heartbeat_status,
      NEW.plc_status,
      now(),
      to_jsonb(NEW)
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER tg_connectivity_history
AFTER UPDATE OF heartbeat_status, plc_status
ON public.tbm_connectivity_snapshots
FOR EACH ROW
WHEN (
    NEW.heartbeat_status <> OLD.heartbeat_status
 OR NEW.plc_status      <> OLD.plc_status
)
EXECUTE FUNCTION log_connectivity_history();

