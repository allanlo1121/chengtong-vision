

drop table eqp.tbm_assignments cascade;
create table eqp.tbm_assignments (

    id uuid primary key default gen_random_uuid(),

    tbm_id uuid not null
        references eqp.tbms(id),

    tunnel_id uuid not null
        references proj.tunnels(id),

    start_date date not null,
     end_date date,

    remark text


);


create index idx_tbm_assignments_tbm
on eqp.tbm_assignments(tbm_id);

create index idx_tbm_assignments_tunnel
on eqp.tbm_assignments(tunnel_id);

create index idx_tbm_assignments_current
on eqp.tbm_assignments(tbm_id)
where end_date is null;