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
    'post_name', po.name,
    'organization_id', ea.organization_id,
    'organization_name', org.name
  ) as primary_post
  from hr.employee_assignments ea
  left join hr.posts po on po.id = ea.post_id
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
      'post_name', po.name,
      'organization_id', ea.organization_id,
      'organization_name', org.name,
      'is_primary', ea.is_primary
    )
    order by ea.is_primary desc
  ) as posts
  from hr.employee_assignments ea
  left join hr.posts po on po.id = ea.post_id
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
  po.name as post_name

from hr.employees e

-- 主岗位
left join primary_position pp
  on pp.employee_id = e.id

-- 岗位名称
left join hr.posts po
  on po.id = pp.post_id

-- 主组织
left join organizations org
  on org.id = pp.organization_id

-- 状态
left join master_data status
  on status.id = e.employment_status_id;


create or replace view hr.v_org_role_assignments as
select
  ea.id as assignment_id,

  -- 人
  e.id as employee_id,
  e.name as employee_name,

  -- 组织
  o.id as organization_id,
  o.name as organization_name,
  o.org_type_id,

  -- org_type 信息
  md_type.code as org_type_code,
  md_type.name as org_type_name,

  -- scope（组织层级抽象）
  sm.scope_code,

  -- 岗位
  p.id as post_id,
  p.name as post_name,

  -- 角色类型
  ea.org_role_type_id,
  md_role.code as role_type_code,
  md_role.name as role_type_name,

  -- 主岗
  ea.is_primary,

  -- 时间
  ea.start_date,
  ea.end_date

from hr.employee_assignments ea

join hr.employees e
  on e.id = ea.employee_id

join public.organizations o
  on o.id = ea.organization_id

-- 组织类型
left join public.master_data md_type
  on md_type.id = o.org_type_id

-- org_type → scope 映射
left join hr.org_type_scope_map sm
  on sm.org_type_id = o.org_type_id

-- 岗位
left join hr.posts p
  on p.id = ea.post_id

-- 角色类型（来自 master_data）
left join public.master_data md_role
  on md_role.id = ea.org_role_type_id

where ea.end_date is null;


create or replace view hr.v_org_responsibles as
select
  o.id as organization_id,
  o.name as organization_name,

  sm.scope_code,

  md_role.code as role_type_code,
  md_role.name as role_type_name,

  e.id as employee_id,
  e.name as employee_name

from hr.employee_assignments ea
join hr.employees e on e.id = ea.employee_id
join public.organizations o on o.id = ea.organization_id

left join hr.org_type_scope_map sm
  on sm.org_type_id = o.org_type_id

left join public.master_data md_role
  on md_role.id = ea.org_role_type_id

where ea.end_date is null;


-- 当前任职
create index idx_ea_current
on hr.employee_assignments (organization_id, org_role_type_id)
where end_date is null;

-- external_id（你会用）
create index idx_employee_external
on hr.employees (external_id);

-- org_type
create index idx_org_type
on public.organizations (org_type_id);