
create table eqp.tbm_operations (

    id uuid primary key default gen_random_uuid(),

    tbm_id uuid not null
        references eqp.tbms(id),

    tunnel_id uuid not null
        references proj.tunnels(id),

    operation_status text not null
    check (
        operation_status in (
            'PREPARING',
            'WORKING',
            'PAUSED',
            'FINISHED',
            'CANCELLED'
        )
    ),

    start_at timestamptz not null,
    end_at timestamptz,

    remarks text
);

create table eqp.tbm_operation_modes (

    id bigserial primary key,

    tbm_id uuid not null
        references eqp.tbms(id),
    tunnel_id uuid not null
        references proj.tunnels(id),
    mode_id uuid not null
        references public.master_data(id),

    start_ring integer not null,
    end_ring integer,
    start_at timestamptz,
    end_at timestamptz,

    remark text
);


create or replace function eqp.validate_tbm_operation_mode()
returns trigger
language plpgsql
as $$

declare

    v_tbm_type_id uuid;

    v_exists boolean;

begin

    -- =====================================================
    -- get tbm type
    -- =====================================================

    select
        tbm_type_id
    into
        v_tbm_type_id
    from eqp.tbms
    where id = new.tbm_id;

    if v_tbm_type_id is null then
        raise exception
            'TBM type not found';
    end if;

    -- =====================================================
    -- check allowed mode
    -- =====================================================

    select exists (

        select 1
        from eqp.tbm_type_operation_modes m

        where m.tbm_type_id = v_tbm_type_id
          and m.operation_mode_id = new.mode_id

    )
    into v_exists;

    -- =====================================================
    -- validate
    -- =====================================================

    if not v_exists then

        raise exception
            'Operation mode is not supported by current TBM type';

    end if;

    return new;

end;

$$;

create trigger trg_validate_tbm_operation_mode
before insert or update
on eqp.tbm_operation_modes
for each row
execute function eqp.validate_tbm_operation_mode();





create extension if not exists btree_gist;

create table eqp.tbm_assignments (

    id uuid primary key default gen_random_uuid(),

    tbm_id uuid not null
        references eqp.tbms(id),

    tunnel_id uuid not null
        references proj.tunnels(id),

    start_date date not null,
    end_date date,

    remark text,

    constraint chk_date_range
      check (end_date is null or end_date >= start_date)
);

-- 当前唯一
create unique index uq_tbm_assignments_current
on eqp.tbm_assignments(tbm_id)
where end_date is null;

-- 防止时间重叠
alter table eqp.tbm_assignments
add constraint uq_tbm_assignments_no_overlap
exclude using gist (
  tbm_id with =,
  daterange(start_date, coalesce(end_date, 'infinity')) with &&
);