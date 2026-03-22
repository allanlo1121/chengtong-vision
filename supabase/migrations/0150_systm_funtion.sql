
-- ============================================
-- 1️  用户信息
-- ============================================

create or replace function system.current_user_id()
returns uuid
language sql
stable
as $$
  select auth.uid()
$$;

-- ============================================
-- 2 通用 updated_at 触发器函数
-- ============================================

create or replace function system.set_audit_on_update()
returns trigger
language plpgsql
security definer
as $$
begin
  -- 只有数据变化才更新时间（避免无效更新）
  if row(new.*) is distinct from row(old.*) then
    new.updated_at := now();
    new.updated_by := system.current_user_id();
  end if;

  return new;
end;
$$;


-- ============================================
-- 3 可选：通用软删除函数（如果需要统一调用）
-- ============================================

create or replace function system.soft_delete(
  p_table text,
  p_ids uuid[]
)
returns integer
language plpgsql
security definer
set search_path = public, system
as $$
declare
  v_sql text;
  v_count integer;
begin

  -- 安全校验：限制允许软删除的表（防止 SQL 注入）
  if p_table not in (
    'projects',
    'organizations',
    'employees',
    'tbms'
  ) then
    raise exception 'Table % is not allowed for soft delete', p_table;
  end if;

  -- 动态执行 UPDATE（软删除）
  v_sql := format(
    'update %I
     set deleted_at = now(),
         deleted_by = auth.uid(),
         updated_at = now()
     where id = any($1)
       and deleted_at is null',
    p_table
  );

  execute v_sql using p_ids;

  get diagnostics v_count = row_count;

  return v_count;
end;
$$;



-- ============================================
-- 4️ 建议的标准审计字段规范（说明性注释）
-- ============================================

comment on function system.set_audit_on_update()
is 'Auto-maintain updated_at before update';

comment on function system.soft_delete(text, uuid[])
is 'Optional soft delete trigger helper';