drop view eqp.v_mqtt_users cascade;
create or replace view eqp.v_mqtt_users as
select
    mu.id,
    mu.tbm_id,
    mu.username,
    mu.user_type,
    mu.topic_prefix,
    mu.is_superuser,
    mu.is_enabled,
    mu.created_at,
    mu.updated_at,

    mus.client_id,
    coalesce(mus.is_online, false) as is_online,
    mus.connected_at,
    mus.last_seen_at,
    mus.disconnected_at,
    mus.disconnect_reason,
    mus.remote_ip,
    mus.session_id,

    last_session.connected_at as last_connected_at,
    last_session.disconnected_at as last_disconnected_at,
    last_session.disconnect_reason as last_disconnect_reason,

    coalesce(
        jsonb_agg(
            jsonb_build_object(
                'id', ma.id,
                'permission', ma.permission,
                'action', ma.action,
                'topic', ma.topic
            )
            order by ma.id
        ) filter (where ma.id is not null),
        '[]'::jsonb
    ) as acl

from eqp.mqtt_user mu

left join eqp.mqtt_user_status mus
    on mus.mqtt_user_id = mu.id

left join lateral (
    select
        s.connected_at,
        s.disconnected_at,
        s.disconnect_reason
    from eqp.mqtt_connection_sessions s
    where s.mqtt_user_id = mu.id
    order by s.connected_at desc
    limit 1
) last_session on true

left join eqp.mqtt_acl ma
    on ma.username = mu.username

group by
    mu.id,
    mu.tbm_id,
    mu.username,
    mu.user_type,
    mu.topic_prefix,
    mu.is_superuser,
    mu.is_enabled,
    mu.created_at,
    mu.updated_at,

    mus.client_id,
    mus.is_online,
    mus.connected_at,
    mus.last_seen_at,
    mus.disconnected_at,
    mus.disconnect_reason,
    mus.remote_ip,
    mus.session_id,

    last_session.connected_at,
    last_session.disconnected_at,
    last_session.disconnect_reason;

select schema_name
from information_schema.schemata
where schema_name = 'realtime';

select *
from realtime.tbm_runtime_parameters
limit 1;

select schema_name
from information_schema.schemata
where schema_name = 'tbm';




grant usage, select on all sequences in schema public,tbm to anon, authenticated;

create role emqx_user
with login
password 'Luo112781@';

grant usage on schema epq to emqx_user;

grant select on table epq.mqtt_users to emqx_user;
grant select on table epq.mqtt_acl to emqx_user;


select permission, action, topic
from tbm.mqtt_acl
where username = 'RBNS427'
  and (
    action = 'subscribe'
    or action = 'all'
  );



  select
  rolname,
  rolcanlogin
from pg_roles
where rolname = 'emqx_user';





drop table eqp.tbm_connection_status cascade;
create table eqp.tbm_connection_status (
  tbm_id uuid not null references eqp.tbms(id),
  tunnel_id uuid references proj.tunnels(id),

  type text not null check (
    type in ('heartbeat', 'realdata')
  ),

  last_seen_at timestamptz not null,

  is_online boolean not null default false,

  updated_at timestamptz not null default now(),

  primary key (tbm_id, type)
);

create table eqp.tbm_connection_status_history (
  id uuid primary key default gen_random_uuid(),

  tbm_id uuid not null references eqp.tbms(id),
  tunnel_id uuid references proj.tunnels(id),

  type text not null check (
    type in ('heartbeat', 'realdata')
  ),

  status text not null check (
    status in ('online', 'offline')
  ),

  start_at timestamptz not null,
  end_at timestamptz,

  source text not null default 'auto',
  remark text,

  created_at timestamptz not null default now(),

  constraint tbm_connection_status_history_time_check
    check (
      end_at is null
      or end_at > start_at
    )
);

