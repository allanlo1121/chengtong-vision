create or replace function hr.upsert_employee_full(p_data jsonb)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_person_id uuid;
  v_employee_id uuid;
  v_existing_version int;
  v_incoming_version int;
  v_action text;
begin

  v_incoming_version := (p_data->>'externalVersion')::int;

  -- 1️⃣ 先查 existing version（关键）
  select external_version
  into v_existing_version
  from hr.employees
  where external_id = p_data->>'externalId';

  -- 2️⃣ version 判断（核心逻辑）
  if v_existing_version is not null
     and v_incoming_version <= v_existing_version then

    -- ❌ 直接跳过（整个流程终止）
    return jsonb_build_object(
      'employee_id', (
        select id from hr.employees
        where external_id = p_data->>'externalId'
      ),
      'action', 'skipped'
    );
  end if;

  -- =========================
  -- 下面才开始真正写入
  -- =========================

  -- 3️⃣ persons
  insert into hr.persons (
    name,
    code,
    gender_id,
    phone,
    email
  )
  values (
    p_data->>'name',
    p_data->>'code',
    (p_data->>'genderId')::uuid,
    p_data->>'phone',
    p_data->>'email'
  )
  on conflict (code)
  do update set
    name = excluded.name,
    phone = excluded.phone,
    email = excluded.email
  returning id into v_person_id;

  -- 4️⃣ employees
  insert into hr.employees (
    person_id,
    organization_id,
    employee_type_id,
    hire_date,
    external_id,
    external_version
  )
  values (
    v_person_id,
    (p_data->>'organizationId')::uuid,
    (p_data->>'employeeTypeId')::uuid,
    (p_data->>'hireDate')::timestamp,
    p_data->>'externalId',
    v_incoming_version
  )
  on conflict (external_id)
  do update set
    person_id = excluded.person_id,
    organization_id = excluded.organization_id,
    employee_type_id = excluded.employee_type_id,
    hire_date = excluded.hire_date,
    external_version = excluded.external_version
  returning id into v_employee_id;

  -- 5️⃣ employee_posts
  if p_data ? 'postId' then
    insert into hr.employee_posts (
      employee_id,
      post_id
    )
    values (
      v_employee_id,
      (p_data->>'postId')::uuid
    )
    on conflict do nothing;
  end if;

  -- 6️⃣ 返回结果
  if v_existing_version is null then
    v_action := 'inserted';
  else
    v_action := 'updated';
  end if;

  return jsonb_build_object(
    'id', v_employee_id,
    'action', v_action
  );

end;
$$;


alter table hr.employees
add constraint employees_external_id_unique unique (external_id);