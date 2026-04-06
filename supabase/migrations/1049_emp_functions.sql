-- HR business functions

create or replace function hr.sync_employee_post_history()
returns trigger as $$
begin

  -- 1️⃣ INSERT
  if (tg_op = 'INSERT') then
    insert into hr.employee_post_history (
      employee_id,
      post_id,
      organization_id,
      post_type_id,
      start_date
    )
    values (
      new.employee_id,
      new.post_id,
      new.organization_id,
      new.post_type_id,
      coalesce(new.start_date, current_date)
    );
    return new;
  end if;

  -- 2️⃣ DELETE（关闭当前有效记录）
  if (tg_op = 'DELETE') then
    update hr.employee_post_history
    set end_date = current_date
    where employee_id = old.employee_id
      and post_id = old.post_id
      and coalesce(organization_id, '00000000-0000-0000-0000-000000000000')
          = coalesce(old.organization_id, '00000000-0000-0000-0000-000000000000')
      and coalesce(post_type_id, '00000000-0000-0000-0000-000000000000')
          = coalesce(old.post_type_id, '00000000-0000-0000-0000-000000000000')
      and end_date is null;
    return old;
  end if;

  -- 3️⃣ UPDATE（关键字段变化）
  if (tg_op = 'UPDATE') then

    -- 判断是否“关键变更”
    if (
      new.post_id is distinct from old.post_id or
      new.organization_id is distinct from old.organization_id or
      new.post_type_id is distinct from old.post_type_id or
      new.is_primary is distinct from old.is_primary
    ) then

      -- 3.1 关闭旧记录
      update hr.employee_post_history
      set end_date = current_date
      where employee_id = old.employee_id
        and post_id = old.post_id
        and coalesce(organization_id, '00000000-0000-0000-0000-000000000000')
            = coalesce(old.organization_id, '00000000-0000-0000-0000-000000000000')
        and coalesce(post_type_id, '00000000-0000-0000-0000-000000000000')
            = coalesce(old.post_type_id, '00000000-0000-0000-0000-000000000000')
        and end_date is null;

      -- 3.2 新增新记录
      insert into hr.employee_post_history (
        employee_id,
        post_id,
        organization_id,
        post_type_id,
        start_date
      )
      values (
        new.employee_id,
        new.post_id,
        new.organization_id,
        new.post_type_id,
        current_date
      );

    end if;

    return new;
  end if;

  return null;
end;
$$ language plpgsql;

drop trigger if exists trg_employee_post_history_all on hr.employee_posts;

create trigger trg_employee_post_history_all
after insert or update or delete on hr.employee_posts
for each row
execute function hr.sync_employee_post_history();


create or replace function hr.enforce_employee_post_rules()
returns trigger as $$
begin
  -- 仅处理 INSERT / UPDATE
  if (tg_op = 'INSERT' or tg_op = 'UPDATE') then

    -- 如果当前为主岗 → 清理其他主岗
    if new.is_primary = true then
      update hr.employee_posts
      set is_primary = false
      where employee_id = new.employee_id
        and id <> coalesce(new.id, '00000000-0000-0000-0000-000000000000');
    end if;

  end if;

  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_employee_post_rules on hr.employee_posts;

create trigger trg_employee_post_rules
before insert or update on hr.employee_posts
for each row
execute function hr.enforce_employee_post_rules();


