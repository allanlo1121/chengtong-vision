

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


create view eqp.v_tbm_assignment_list as
select
    a.id,

    a.tbm_id,
    tbm.name as tbm_name,
    tbm.code as tbm_code,

    a.tunnel_id,
    t.name as tunnel_name,

    p.id as project_id,
    p.name as project_name,    

    a.start_date,
    a.end_date,

    a.remark

from eqp.tbm_assignments a

join eqp.tbms tbm
    on tbm.id = a.tbm_id

join proj.tunnels t
    on t.id = a.tunnel_id

left join proj.projects p
    on p.id = t.project_id;