create or replace view hr.v_employee_full as
select
  e.id,

  -- 👤 人信息
  p.name,
  p.code,
  p.gender_id,

  -- 🏢 组织
  e.organization_id,
  org.name as organization_name,

  -- 📌 状态
  e.status_id,
  status.name as status_name,

  e.employee_type_id,
  et.name as employee_type_name,

  -- =========================
  -- ⭐ 主岗（只取一条）
  -- =========================
  (
    select jsonb_build_object(
      'post_id', ep.post_id,
      'post_name', md.name,
      'organization_id', ep.organization_id,
      'organization_name', org2.name
    )
    from hr.employee_posts ep
    left join master_data md on md.id = ep.post_id
    left join organizations org2 on org2.id = ep.organization_id
    where ep.employee_id = e.id
      and ep.is_primary = true
      and ep.end_date is null
    limit 1
  ) as primary_post,

  -- =========================
  -- 📚 所有岗位
  -- =========================
  (
    select jsonb_agg(
      jsonb_build_object(
        'post_id', ep.post_id,
        'post_name', md.name,
        'organization_id', ep.organization_id,
        'organization_name', org2.name,
        'is_primary', ep.is_primary
      )
      order by ep.is_primary desc
    )
    from hr.employee_posts ep
    left join master_data md on md.id = ep.post_id
    left join organizations org2 on org2.id = ep.organization_id
    where ep.employee_id = e.id
      and ep.end_date is null
  ) as posts,

  -- =========================
  -- 🎓 职称
  -- =========================
  (
    select jsonb_agg(
      jsonb_build_object(
        'title_id', t.title_id,
        'title_name', md.name,
        'obtained_date', t.obtained_date
      )
      order by t.obtained_date desc
    )
    from hr.employee_titles t
    left join master_data md on md.id = t.title_id
    where t.employee_id = e.id
  ) as titles,

  -- =========================
  -- 🎓 学历（注意：person_id）
  -- =========================
  (
    select jsonb_agg(
      jsonb_build_object(
        'school', ed.school,
        'degree_id', ed.degree_id,
        'degree_name', md.name,
        'start_date', ed.start_date,
        'end_date', ed.end_date
      )
      order by ed.start_date desc
    )
    from hr.educations ed
    left join master_data md on md.id = ed.degree_id
    where ed.person_id = p.id
  ) as educations

from hr.employees e
left join hr.persons p on p.id = e.person_id

left join organizations org on org.id = e.organization_id

left join master_data status on status.id = e.status_id
left join master_data et on et.id = e.employee_type_id;


create or replace view hr.v_employee_list as
select
  e.id,
  p.name,
  p.code,
  org.name as organization_name,

  status.name as status_name,

  -- 主岗（简化版）
  (
    select md.name
    from hr.employee_posts ep
    left join master_data md on md.id = ep.post_id
    where ep.employee_id = e.id
      and ep.is_primary = true
      and ep.end_date is null
    limit 1
  ) as primary_post_name

from hr.employees e
left join hr.persons p on p.id = e.person_id
left join organizations org on org.id = e.organization_id
left join master_data status on status.id = e.status_id;