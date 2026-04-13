


-- =========================================
-- 任职关系（employee_assignments）
-- =========================================
create table hr.employee_assignments (
  id uuid primary key default gen_random_uuid(),

  employee_id uuid not null,

  -- ✅ 核心：组织归属（精确到部门）
  organization_id uuid not null
    references public.organizations(id) on delete restrict,

  -- ✅ 可选：岗位（允许为空，兼容导入）
  post_id uuid
    references public.master_data(id) on delete set null,

  -- ✅ 是否主任职（主岗）
  is_primary boolean default false,

  -- ✅ 任职时间（支持历史）
  start_date date default current_date,
  end_date date,

  -- =========================
  -- 外键
  -- =========================
  constraint fk_assignment_employee
    foreign key (employee_id)
    references hr.employees(id)
    on delete cascade,

  -- =========================
  -- 唯一约束（防重复）
  -- =========================
  constraint uq_employee_assignment
    unique (employee_id, organization_id, post_id, start_date)
);

-- =========================================
-- 每人仅一个“当前主岗”
-- =========================================
create unique index uq_employee_primary_assignment
on hr.employee_assignments(employee_id)
where is_primary = true
  and end_date is null;

-- =========================================
-- 主岗必须有岗位（关键约束）
-- =========================================
alter table hr.employee_assignments
add constraint chk_primary_post_not_null
check (
  is_primary = false or post_id is not null
);

-- =========================================
-- 当前任职索引（高频查询）
-- =========================================
create index idx_employee_assignments_current
on hr.employee_assignments(employee_id)
where end_date is null;

-- =========================================
-- 按组织查询（权限 / 列表）
-- =========================================
create index idx_employee_assignments_org
on hr.employee_assignments(organization_id)
where end_date is null;

-- =========================================
-- 岗位查询（可选）
-- =========================================
create index idx_employee_assignments_post
on hr.employee_assignments(post_id)
where end_date is null;
