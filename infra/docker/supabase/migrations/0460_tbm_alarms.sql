create table tbm.tbm_system_alarm_events (
  id uuid primary key default gen_random_uuid(),

  tbm_id uuid not null,
  tunnel_id uuid,

  alarm_type text not null,

  level text not null check (
    level in (
      'info',
      'warning',
      'critical'
    )
  ),

  title text not null,

  message text,

  old_value numeric,
  new_value numeric,
  delta_value numeric,

  metadata jsonb,

  occurred_at timestamptz not null,

  created_at timestamptz default now()
);