create or replace view hr.v_employee_full as
select
  e.id,
  e.name,
  e.code,
  e.gender_id,

  -- =========================
  -- 📌 状态
  -- =========================
  e.employment_status_id,
  status.name as employment_status_name,

  e.employment_type_id,
  et.name as employment_type_name,

  -- =========================
  -- ⭐ 主岗 + 主组织
  -- =========================
  primary_post,

  primary_post ->> 'organization_id' as organization_id,
  primary_post ->> 'organization_name' as organization_name,

  -- =========================
  -- 📚 所有岗位
  -- =========================
  posts,

  -- =========================
  -- 🎓 职称
  -- =========================
  titles,

  -- =========================
  -- 🎓 学历
  -- =========================
  educations

from hr.employees e

-- =========================
-- 主岗（LATERAL）
-- =========================
left join lateral (
  select jsonb_build_object(
    'post_id', ea.post_id,
    'post_name', md.name,
    'organization_id', ea.organization_id,
    'organization_name', org.name
  ) as primary_post
  from hr.employee_assignments ea
  left join master_data md on md.id = ea.post_id
  left join organizations org on org.id = ea.organization_id
  where ea.employee_id = e.id
    and ea.is_primary = true
    and ea.end_date is null
  limit 1
) pp on true

-- =========================
-- 所有岗位
-- =========================
left join lateral (
  select jsonb_agg(
    jsonb_build_object(
      'post_id', ea.post_id,
      'post_name', md.name,
      'organization_id', ea.organization_id,
      'organization_name', org.name,
      'is_primary', ea.is_primary
    )
    order by ea.is_primary desc
  ) as posts
  from hr.employee_assignments ea
  left join master_data md on md.id = ea.post_id
  left join organizations org on org.id = ea.organization_id
  where ea.employee_id = e.id
    and ea.end_date is null
) ps on true

-- =========================
-- 职称
-- =========================
left join lateral (
  select jsonb_agg(
    jsonb_build_object(
      'title_id', t.title_id,
      'title_name', md.name,
      'obtained_date', t.obtained_date
    )
    order by t.obtained_date desc
  ) as titles
  from hr.employee_titles t
  left join master_data md on md.id = t.title_id
  where t.employee_id = e.id
) tt on true

-- =========================
-- 学历
-- =========================
left join lateral (
  select jsonb_agg(
    jsonb_build_object(
      'school', ed.school,      
      'education_level_id', ed.education_level_id,
      'degree_name', md.name,
      'start_date', ed.start_date,
      'end_date', ed.end_date
    )
    order by ed.start_date desc
  ) as educations
  from hr.educations ed
  left join master_data md on md.id = ed.education_level_id
  where ed.employee_id = e.id
) eds on true

left join master_data status on status.id = e.employment_status_id
left join master_data et on et.id = e.employment_type_id;


create or replace view hr.v_employee_list as
with primary_position as (
  select
    ea.employee_id,
    ea.post_id,
    ea.organization_id
  from hr.employee_assignments ea
  where ea.is_primary = true
    and ea.end_date is null
)

select
  e.id,
  e.name,
  e.code,

  -- 主组织（来自主岗位）
  pp.organization_id,
  org.name as organization_name,

  status.name as employment_status_name,
  e.sort_order,
  e.created_at,

  -- 主岗
  md.name as post_name

from hr.employees e

-- 主岗位
left join primary_position pp
  on pp.employee_id = e.id

-- 岗位名称
left join master_data md
  on md.id = pp.post_id

-- 主组织
left join organizations org
  on org.id = pp.organization_id

-- 状态
left join master_data status
  on status.id = e.employment_status_id;


-- 1. schema
grant usage on schema hr to anon, authenticated;

-- 2. 表
grant select on all tables in schema hr to anon, authenticated;

-- 3. view（批量）
do $$
declare r record;
begin
  for r in
    select table_name
    from information_schema.views
    where table_schema = 'hr'
  loop
    execute format(
      'grant select on hr.%I to anon, authenticated;',
      r.table_name
    );
  end loop;
end $$;

-- 4. 默认权限（未来）
alter default privileges in schema hr
grant select on tables to anon, authenticated;