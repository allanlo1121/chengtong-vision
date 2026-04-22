


create table project_contracts (
  id uuid primary key default gen_random_uuid(),

  project_id uuid not null references projects(id) on delete cascade,

  contract_code text,
  contract_name text,

  contract_type text,  -- 主合同 / 补充协议 / 分包等

  sign_date date,

  owner_unit text

);


create table project_contract_versions (
  id uuid primary key default gen_random_uuid(),

  contract_id uuid not null references project_contracts(id) on delete cascade,

  version_no int not null,   -- 1,2,3...

  -- 💰 金额
  contract_amount numeric,
  change_amount numeric,

  -- 📅 时间（重点）
  contract_start_date date,
  contract_end_date date,
  commissioning_date date,

  -- 生效时间（业务时间）
  effective_from timestamptz not null,
  effective_to timestamptz,

  is_current boolean default true,

  -- 变更信息
  change_reason text,
  source text  -- import / manual

);


alter table project_contract_versions
add constraint no_overlap_contract_version
exclude using gist (
  contract_id with =,
  tstzrange(effective_from, coalesce(effective_to, 'infinity')) with &&
);

-- contract
create index idx_contract_current
on project_contract_versions (contract_id)
where effective_to is null;
