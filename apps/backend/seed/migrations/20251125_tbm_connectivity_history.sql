


CREATE TABLE public.tbm_heartbeat_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tbm_id UUID NOT NULL REFERENCES tbms(id) ON DELETE CASCADE,

    status TEXT NOT NULL CHECK (status IN ('online','offline')),
    start_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    end_at   TIMESTAMPTZ,

    snapshot JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.tbm_plc_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tbm_id UUID NOT NULL REFERENCES tbms(id) ON DELETE CASCADE,

    status TEXT NOT NULL CHECK (status IN ('online','offline')),
    start_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    end_at   TIMESTAMPTZ,

    snapshot JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.tbm_plc_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tbm_id UUID NOT NULL REFERENCES tbms(id) ON DELETE CASCADE,

    status TEXT NOT NULL CHECK (status IN ('online','offline')),
    start_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    end_at   TIMESTAMPTZ,

    snapshot JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION log_heartbeat_history()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.heartbeat_status <> OLD.heartbeat_status THEN
  
    -- 结束旧区段
    UPDATE tbm_heartbeat_history
    SET end_at = now()
    WHERE tbm_id = NEW.tbm_id
      AND end_at IS NULL
      AND status = OLD.heartbeat_status;

    -- 插入新记录
    INSERT INTO tbm_heartbeat_history (
      tbm_id, status, start_at, snapshot
    )
    VALUES (
      NEW.tbm_id,
      NEW.heartbeat_status,
      now(),
      to_jsonb(NEW)
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION log_plc_history()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.plc_status <> OLD.plc_status THEN
  
    UPDATE tbm_plc_history
    SET end_at = now()
    WHERE tbm_id = NEW.tbm_id
      AND end_at IS NULL
      AND status = OLD.plc_status;

    INSERT INTO tbm_plc_history (
      tbm_id, status, start_at, snapshot
    )
    VALUES (
      NEW.tbm_id,
      NEW.plc_status,
      now(),
      to_jsonb(NEW)
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tg_heartbeat_history
AFTER UPDATE OF heartbeat_status
ON tbm_connectivity_snapshots
FOR EACH ROW
WHEN (NEW.heartbeat_status <> OLD.heartbeat_status)
EXECUTE FUNCTION log_heartbeat_history();

CREATE TRIGGER tg_plc_history
AFTER UPDATE OF plc_status
ON tbm_connectivity_snapshots
FOR EACH ROW
WHEN (NEW.plc_status <> OLD.plc_status)
EXECUTE FUNCTION log_plc_history();
